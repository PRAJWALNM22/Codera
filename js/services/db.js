/**
 * Database Service
 * Centralizes all Firestore interactions to enforce schema consistency.
 */
class DatabaseService {
    constructor() {
        this.db = null;
        this.auth = null;
    }

    initialize(db, auth) {
        this.db = db;
        this.auth = auth;
        console.log('✅ DatabaseService initialized');
    }

    // --- Users Collection ---

    /**
     * Get or create a user profile
     * @param {string} userId 
     * @param {object} initialData - Data to set if creating fresh
     */
    async getUserProfile(userId, initialData = {}) {
        if (!this.db) throw new Error('DB not initialized');
        const ref = this.db.collection('users').doc(userId);
        const doc = await ref.get();

        if (!doc.exists && Object.keys(initialData).length > 0) {
            const defaults = {
                username: 'Anonymous',
                email: '',
                photoURL: '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                settings: { theme: 'dark' },
                stats: { wins: 0, practiceSolved: 0, streak: 0 },
                friends: [],
                friendRequests: [],
                ...initialData
            };
            await ref.set(defaults);
            return { id: userId, ...defaults };
        }

        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    async updateUserProfile(userId, updates) {
        if (!this.db) throw new Error('DB not initialized');
        await this.db.collection('users').doc(userId).update(updates);
    }

    async searchUsers(usernameQuery) {
        // Note: Firestore doesn't support native partial text search easily.
        // This is a simple exact match or client-side filtering approach helper.
        // For production, use Algolia or Typesense.
        if (!this.db) return [];
        const snapshot = await this.db.collection('users')
            .where('username', '>=', usernameQuery)
            .where('username', '<=', usernameQuery + '\uf8ff')
            .limit(10)
            .get();

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    // --- Friend Management ---

    async sendFriendRequest(fromId, toId) {
        if (!this.db) throw new Error('DB not initialized');
        // Add fromId to toId's friendRequests
        await this.db.collection('users').doc(toId).update({
            friendRequests: firebase.firestore.FieldValue.arrayUnion(fromId)
        });
    }

    async acceptFriendRequest(userId, requesterId) {
        if (!this.db) throw new Error('DB not initialized');
        const batch = this.db.batch();
        const myRef = this.db.collection('users').doc(userId);
        const theirRef = this.db.collection('users').doc(requesterId);

        // Add to my friends, remove from requests
        batch.update(myRef, {
            friends: firebase.firestore.FieldValue.arrayUnion(requesterId),
            friendRequests: firebase.firestore.FieldValue.arrayRemove(requesterId)
        });

        // Add to their friends
        batch.update(theirRef, {
            friends: firebase.firestore.FieldValue.arrayUnion(userId)
        });

        await batch.commit();
    }

    async declineFriendRequest(userId, requesterId) {
        if (!this.db) throw new Error('DB not initialized');
        await this.db.collection('users').doc(userId).update({
            friendRequests: firebase.firestore.FieldValue.arrayRemove(requesterId)
        });
    }

    async getFriendsProfiles(friendIds) {
        if (!this.db || !friendIds || friendIds.length === 0) return [];
        const limit = 10;
        const chunks = [];
        for (let i = 0; i < friendIds.length; i += limit) {
            const chunkIds = friendIds.slice(i, i + limit);
            if (chunkIds.length === 0) continue;
            const q = await this.db.collection('users')
                .where(firebase.firestore.FieldPath.documentId(), 'in', chunkIds)
                .get();
            q.forEach(d => chunks.push({ id: d.id, ...d.data() }));
        }
        return chunks;
    }

    async subscribeToUser(userId, callback) {
        if (!this.db) return () => { };
        return this.db.collection('users').doc(userId).onSnapshot(doc => {
            if (doc.exists) callback({ id: doc.id, ...doc.data() });
        });
    }

    async getDiscoverUsers(userId, excludeIds = []) {
        if (!this.db) return [];
        const snapshot = await this.db.collection('users').limit(20).get();
        return snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(u => u.id !== userId && !excludeIds.includes(u.id));
    }

    async createBattle(hostId, problemId, options = {}) {
        if (!this.db) throw new Error('DB not initialized');

        const battleData = {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'waiting', // waiting, active, finished
            problemId: String(problemId),
            createdBy: hostId,
            durationSeconds: options.duration || 600,
            participants: {
                [hostId]: {
                    online: true,
                    joinedAt: new Date().toISOString(),
                    name: options.hostName || 'Anonymous'
                }
            },
            playerStates: {
                [hostId]: { code: '', completed: false, score: 0 }
            },
            ...options
        };

        const ref = await this.db.collection('battles').add(battleData);
        return ref.id;
    }

    async joinBattle(battleId, userId, username) {
        if (!this.db) throw new Error('DB not initialized');
        const ref = this.db.collection('battles').doc(battleId);

        await this.db.runTransaction(async (transaction) => {
            const doc = await transaction.get(ref);
            if (!doc.exists) throw new Error("Battle does not exist!");

            const data = doc.data();
            if (data.status === 'finished') throw new Error("Battle already finished");

            const participants = data.participants || {};
            participants[userId] = {
                online: true,
                joinedAt: new Date().toISOString(),
                name: username
            };

            // Initialize state if not present
            const playerStates = data.playerStates || {};
            if (!playerStates[userId]) {
                playerStates[userId] = { code: '', completed: false, score: 0 };
            }

            transaction.update(ref, { participants, playerStates });
        });
    }

    subscribeToBattle(battleId, callback) {
        if (!this.db) return () => { };
        return this.db.collection('battles').doc(battleId).onSnapshot(doc => {
            if (doc.exists) callback({ id: doc.id, ...doc.data() });
            else callback(null);
        });
    }

    async updateBattleCode(battleId, userId, code) {
        if (!this.db) return;
        // Dot notation to update specific field in map
        const update = {};
        update[`playerStates.${userId}.code`] = code;
        update['lastUpdated'] = firebase.firestore.FieldValue.serverTimestamp();

        await this.db.collection('battles').doc(battleId).update(update);
    }

    async startBattle(battleId) {
        if (!this.db) return;
        await this.db.collection('battles').doc(battleId).update({
            startedAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'active'
        });
    }

    async leaveBattle(battleId, userId) {
        if (!this.db) return;
        const update = {};
        update[`participants.${userId}`] = {
            online: false,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        // Note: This replaces the whole object for that user key, ensuring we update online status
        // If we wanted to keep other fields we'd need dot notation for specific fields, 
        // but online:false is main goal.
        // Actually, better to use merge if possible, but dot notation works best for nested updates.
        // Let's stick to dot notation for safety.
        await this.db.collection('battles').doc(battleId).update({
            [`participants.${userId}.online`]: false,
            [`participants.${userId}.updatedAt`]: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    async updateCodeShare(battleId, data) {
        if (!this.db) return;
        await this.db.collection('battles').doc(battleId).set({
            codeShare: {
                ...data,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
        }, { merge: true });
    }

    subscribeToCodeShare(battleId, callback) {
        if (!this.db) return () => { };
        return this.db.collection('battles').doc(battleId).onSnapshot(doc => {
            if (doc.exists) callback(doc.data());
        });
    }

    // --- Problems Collection ---

    async getProblem(problemId) {
        if (!this.db) throw new Error('DB not initialized');
        const doc = await this.db.collection('problems').doc(String(problemId)).get();
        if (doc.exists) return { id: doc.id, ...doc.data() };
        return null;
    }

    async getAllProblems() {
        if (!this.db) return [];
        const snapshot = await this.db.collection('problems').orderBy('id').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    // Helper to seed problems (Admin use)
    async seedProblem(problemId, problemData) {
        if (!this.db) return;
        await this.db.collection('problems').doc(String(problemId)).set(problemData);
    }
}

// Global instance
window.dbService = new DatabaseService();
