// Node 18+ has native fetch
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
console.log("Testing Key:", apiKey ? "Present" : "Missing");

async function testModel(model) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    console.log(`\n--- Testing Model: ${model} ---`);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Hello" }] }]
            })
        });

        const data = await response.json();
        if (!response.ok) {
            console.log(`❌ Error ${response.status}:`, JSON.stringify(data, null, 2));
        } else {
            console.log("✅ Success!");
        }
    } catch (e) {
        console.log("Exception:", e.message);
    }
}

async function run() {
    await testModel('gemini-flash-latest');
    await testModel('gemini-1.5-flash');
    await testModel('gemini-pro');
}

run();
