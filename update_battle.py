
import os

file_path = r'c:\Users\ADMIN\Desktop\Codera-main\index.html'
start_line = 3945 - 1  # 0-indexed
end_line = 4194      # 0-indexed, exclusive in slice but inclusive in line count? 
# We want to replace lines 3945 to 4194 (inclusive).
# In 0-indexed, that is 3944 to 4194.

new_code = r'''                let structuredResults = [];
                let overallStatus = "Accepted";

                for (let i = 0; i < problem.testCases.length; i++) {
                    const test = problem.testCases[i];

                    // Get function name based on problem
                    const functionName = battleProblemId === 1 ? 'twoSum' :
                        battleProblemId === 2 ? 'addTwoNumbers' :
                            battleProblemId === 3 ? 'lengthOfLongestSubstring' :
                                battleProblemId === 4 ? 'findMedianSortedArrays' :
                                    battleProblemId === 5 ? 'reverseList' : 'twoSum';

                    const pythonFunctionName = battleProblemId == 1 ? 'two_sum' :
                        battleProblemId == 2 ? 'add_two_numbers' :
                            battleProblemId == 3 ? 'length_of_longest_substring' :
                                battleProblemId == 4 ? 'find_median_sorted_arrays' :
                                    battleProblemId == 5 ? 'reverse_list' : 'two_sum';

                    const javaFunctionName = battleProblemId == 1 ? 'twoSum' :
                        battleProblemId == 2 ? 'addTwoNumbers' :
                            battleProblemId == 3 ? 'lengthOfLongestSubstring' :
                                battleProblemId == 4 ? 'findMedianSortedArrays' :
                                    battleProblemId == 5 ? 'reverseList' : 'twoSum';

                    const cppFunctionName = battleProblemId == 1 ? 'twoSum' :
                        battleProblemId == 2 ? 'addTwoNumbers' :
                            battleProblemId == 3 ? 'lengthOfLongestSubstring' :
                                battleProblemId == 4 ? 'findMedianSortedArrays' :
                                    battleProblemId == 5 ? 'reverseList' : 'twoSum';

                    // Handle different parameter structures for different problems
                    let functionCall = "";

                    if (battleProblemId == 1) {
                        // Two Sum: twoSum(nums, target)
                        if (selectedLanguage === "javascript") {
                            functionCall = `${functionName}(${JSON.stringify(test.input)}, ${test.target})`;
                        } else if (selectedLanguage === "python") {
                            functionCall = `${pythonFunctionName}(${JSON.stringify(test.input)}, ${test.target})`;
                        } else if (selectedLanguage === "java") {
                            functionCall = `${javaFunctionName}(new int[]{${test.input.join(',')}}, ${test.target})`;
                        } else if (selectedLanguage === "cpp") {
                            functionCall = `${cppFunctionName}({${test.input.join(',')}}, ${test.target})`;
                        }
                    } else if (battleProblemId == 2) {
                        // Add Two Numbers: addTwoNumbers(l1, l2)
                        if (selectedLanguage === "javascript") {
                            functionCall = `${functionName}(${JSON.stringify(test.input.l1)}, ${JSON.stringify(test.input.l2)})`;
                        } else if (selectedLanguage === "python") {
                            functionCall = `${pythonFunctionName}(${JSON.stringify(test.input.l1)}, ${JSON.stringify(test.input.l2)})`;
                        } else if (selectedLanguage === "java") {
                            functionCall = `${javaFunctionName}(new int[]{${test.input.l1.join(',')}}, new int[]{${test.input.l2.join(',')}})`;
                        } else if (selectedLanguage === "cpp") {
                            functionCall = `${cppFunctionName}({${test.input.l1.join(',')}}, {${test.input.l2.join(',')}})`;
                        }
                    } else if (battleProblemId == 3) {
                        // Longest Substring: lengthOfLongestSubstring(s)
                        if (selectedLanguage === "javascript") {
                            functionCall = `${functionName}(${JSON.stringify(test.input)})`;
                        } else if (selectedLanguage === "python") {
                            functionCall = `${pythonFunctionName}(${JSON.stringify(test.input)})`;
                        } else if (selectedLanguage === "java") {
                            functionCall = `${javaFunctionName}("${test.input}")`;
                        } else if (selectedLanguage === "cpp") {
                            functionCall = `${cppFunctionName}("${test.input}")`;
                        }
                    } else if (battleProblemId == 4) {
                        // Median of Arrays: findMedianSortedArrays(nums1, nums2)
                        if (selectedLanguage === "javascript") {
                            functionCall = `${functionName}(${JSON.stringify(test.input.nums1)}, ${JSON.stringify(test.input.nums2)})`;
                        } else if (selectedLanguage === "python") {
                            functionCall = `${pythonFunctionName}(${JSON.stringify(test.input.nums1)}, ${JSON.stringify(test.input.nums2)})`;
                        } else if (selectedLanguage === "java") {
                            functionCall = `${javaFunctionName}(new int[]{${test.input.nums1.join(',')}}, new int[]{${test.input.nums2.join(',')}})`;
                        } else if (selectedLanguage === "cpp") {
                            functionCall = `${cppFunctionName}({${test.input.nums1.join(',')}}, {${test.input.nums2.join(',')}})`;
                        }
                    } else if (battleProblemId == 5) {
                        // Reverse List: reverseList(head)
                        if (selectedLanguage === "javascript") {
                            functionCall = `${functionName}(${JSON.stringify(test.input)})`;
                        } else if (selectedLanguage === "python") {
                            functionCall = `${pythonFunctionName}(${JSON.stringify(test.input)})`;
                        } else if (selectedLanguage === "java") {
                            functionCall = `${javaFunctionName}(new int[]{${test.input.join(',')}})`;
                        } else if (selectedLanguage === "cpp") {
                            functionCall = `${cppFunctionName}({${test.input.join(',')}})`;
                        }
                    }

                    // Fallback: if functionCall is still empty, use a default
                    if (!functionCall) {
                        if (selectedLanguage === "javascript") {
                            functionCall = `${functionName}(${JSON.stringify(test.input)}, ${test.target})`;
                        } else if (selectedLanguage === "python") {
                            functionCall = `${pythonFunctionName}(${JSON.stringify(test.input)}, ${test.target})`;
                        } else if (selectedLanguage === "java") {
                            functionCall = `${javaFunctionName}(new int[]{${test.input.join(',')}}, ${test.target})`;
                        } else if (selectedLanguage === "cpp") {
                            functionCall = `${cppFunctionName}({${test.input.join(',')}}, ${test.target})`;
                        }
                    }

                    // Generate wrapped code based on language
                    let wrappedCode = "";
                    if (selectedLanguage === "javascript") {
                        wrappedCode = `${player1Code}

// Auto-call the function with test case
try {
    const result = ${functionCall};
    console.log(JSON.stringify(result));
} catch (error) {
    console.error(error.message);
}`;
                    } else if (selectedLanguage === "python") {
                        wrappedCode = `
${player1Code}

# Auto-call the function with test case
import json
print(json.dumps(${functionCall}))
`;
                    } else if (selectedLanguage === "java") {
                        // Extract the method body from user code
                        let methodBody = player1Code.trim();

                        // Remove 'public' prefix if it exists
                        if (methodBody.startsWith('public ')) {
                            methodBody = methodBody.replace(/^public\s+/, '');
                        }

                        // Ensure it has public static prefix
                        if (!methodBody.startsWith('static ')) {
                            methodBody = 'public static ' + methodBody;
                        } else {
                            methodBody = 'public ' + methodBody;
                        }

                        // For problems that return non-array types, don't use Arrays.toString()
                        const needsArraysToString = battleProblemId === 1 || battleProblemId === 2 || battleProblemId === 5;
                        const printStatement = needsArraysToString ? `Arrays.toString(${functionCall})` : `${functionCall}`;

                        wrappedCode = `import java.util.*;

public class Main {
    ${methodBody}
    
    public static void main(String[] args) {
        try {
            System.out.println(${printStatement});
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}`;
                    } else if (selectedLanguage === "cpp") {
                        wrappedCode = `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <sstream>
using namespace std;

// Helper function to print vectors
template<typename T>
void printVector(const vector<T>& vec) {
    cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        cout << vec[i];
        if (i < vec.size() - 1) cout << ",";
    }
    cout << "]";
}

${player1Code}

int main() {
    try {
        auto result = ${functionCall};
        
        // Handle different return types
        if constexpr (std::is_same_v<decltype(result), vector<int>>) {
            printVector(result);
        } else {
            cout << result;
        }
        cout << endl;
    } catch (const exception& e) {
        cerr << "Error: " << e.what() << endl;
    }
    return 0;
}`;
                    }

                    try {
                        const res = await fetch(
                            "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                                    "x-rapidapi-key": "1f4bcaf085mshdb3d102dc891ab6p12b4d2jsn3480d98ed8c1"
                                },
                                body: JSON.stringify({
                                    source_code: btoa(wrappedCode),
                                    language_id: languageMap[selectedLanguage],
                                    stdin: btoa(""),
                                }),
                            }
                        );

                        const result = await res.json();
                        let status = "Wrong Answer";
                        let actual = null;
                        let error = null;

                        if (result.stdout) {
                            try {
                                const userOutput = JSON.parse(atob(result.stdout).trim());
                                actual = userOutput;
                                status = JSON.stringify(userOutput) === JSON.stringify(test.expected) ? "Accepted" : "Wrong Answer";
                            } catch (e) {
                                // Fallback for raw output usage
                                const rawOutput = atob(result.stdout).trim();
                                status = rawOutput === JSON.stringify(test.expected) ? "Accepted" : "Wrong Answer";
                                actual = rawOutput;
                            }
                        } else if (result.stderr) {
                            status = "Runtime Error";
                            error = atob(result.stderr);
                        } else if (result.compile_output) {
                            status = "Compilation Error";
                            error = atob(result.compile_output);
                        }

                        if (status !== "Accepted") overallStatus = status === "Compilation Error" ? "Compilation Error" : "Wrong Answer";

                        structuredResults.push({
                            testCaseId: i + 1,
                            status,
                            input: test.input,
                            expected: test.expected,
                            actual,
                            error
                        });

                    } catch (err) {
                        structuredResults.push({
                            testCaseId: i + 1,
                            status: "System Error",
                            input: test.input,
                            expected: test.expected,
                            actual: null,
                            error: err.message
                        });
                        overallStatus = "System Error";
                    }
                } // end for loop

                setSubmissionResults({
                    overallStatus,
                    results: structuredResults
                });

                // Calculate progress
                const passedTests = structuredResults.filter(r => r.status === 'Accepted').length;
                const totalTests = problem.testCases.length;
                const progressPercent = Math.round((passedTests / totalTests) * 100);

                setPlayer1Progress(progressPercent);

                // Check for completion
                if (passedTests === totalTests) {
                     if (player2Progress === 100) { // Both completed
                        setBattleStatus("Ended");
                        setWinner('player1'); // Simple win logic
                    }
                    if (db && roomId) {
                         // Update progress in DB (placeholder)
                    }
                }

                setLoading(false);'''

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    print(f"Original line count: {len(lines)}")
    print(f"Replacing lines {start_line + 1} to {end_line}")
    print(f"Original content around start: {lines[start_line].strip()}")
    print(f"Original content around end: {lines[end_line-1].strip()}")

    # Replace
    lines[start_line:end_line] = [new_code + '\n']

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    print("Successfully updated file.")

except Exception as e:
    print(f"Error: {e}")
