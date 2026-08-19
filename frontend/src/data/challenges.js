// ═══════════════════════════════════════════════════════════════════════════
// CHALLENGE DATA MODEL + STARTER LIBRARY
// Every challenge has: id, title, language, difficulty, topic, description,
// inputFormat, outputFormat, constraints, examples, starterCode, testCases,
// hints, skills, estimatedMinutes.
// ═══════════════════════════════════════════════════════════════════════════

export const LANGUAGES = [
  { id: 'java', label: 'Java', color: '#f89820' },
  { id: 'python', label: 'Python', color: '#3776ab' },
  { id: 'javascript', label: 'JavaScript', color: '#f7df1e' },
  { id: 'sql', label: 'SQL', color: '#e38c00' },
  { id: 'bash', label: 'Bash', color: '#4eaa25' },
  { id: 'htmlcss', label: 'HTML/CSS', color: '#e34c26' },
]

export const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced']

export const CHALLENGES = [
  // ─── JAVA ───────────────────────────────────────────────────────────────
  {
    id: 'java-reverse-string',
    title: 'Reverse a String',
    language: 'java',
    difficulty: 'Beginner',
    topic: 'Strings',
    description: `Given a string, write a program to reverse it and print the result.\n\nThe input consists of a single line containing the string.`,
    inputFormat: 'A single line containing the string S.',
    outputFormat: 'Print the reversed string.',
    constraints: ['1 ≤ |S| ≤ 1000', 'S contains only printable ASCII characters'],
    examples: [
      { input: 'hello', output: 'olleh', explanation: 'The string "hello" reversed is "olleh".' },
      { input: 'PathForge', output: 'egroFhtap', explanation: '' },
    ],
    starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();

        // Write your solution here

    }
}`,
    testCases: [
      { id: 1, input: 'hello', expected: 'olleh', hidden: false },
      { id: 2, input: 'abcdef', expected: 'fedcba', hidden: false },
      { id: 3, input: 'a', expected: 'a', hidden: true },
      { id: 4, input: 'Racecar', expected: 'racecaR', hidden: true },
      { id: 5, input: '12345', expected: '54321', hidden: true },
    ],
    hints: [
      'Think about iterating through the string from the end to the beginning.',
      'You can use StringBuilder\'s reverse() method, or loop manually.',
      'String s = "hello"; StringBuilder sb = new StringBuilder(s); System.out.println(sb.reverse());',
    ],
    skills: ['Core Java', 'Strings'],
    estimatedMinutes: 15,
  },
  {
    id: 'java-find-largest',
    title: 'Find the Largest Number',
    language: 'java',
    difficulty: 'Beginner',
    topic: 'Arrays',
    description: `Given an array of integers, find and print the largest value.\n\nThe first line contains n (the number of elements).\nThe second line contains n space-separated integers.`,
    inputFormat: 'Line 1: n\nLine 2: n space-separated integers',
    outputFormat: 'Print the largest integer.',
    constraints: ['1 ≤ n ≤ 10^5', '-10^9 ≤ arr[i] ≤ 10^9'],
    examples: [
      { input: '5\n10 4 22 7 15', output: '22', explanation: 'The largest value in the array is 22.' },
      { input: '3\n-5 -2 -10', output: '-2', explanation: 'The largest value among negatives is -2.' },
    ],
    starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        // Write your solution here

    }
}`,
    testCases: [
      { id: 1, input: '5\n10 4 22 7 15', expected: '22', hidden: false },
      { id: 2, input: '3\n-5 -2 -10', expected: '-2', hidden: false },
      { id: 3, input: '1\n100', expected: '100', hidden: true },
      { id: 4, input: '4\n-1 -2 -3 -4', expected: '-1', hidden: true },
      { id: 5, input: '6\n5 5 5 5 5 5', expected: '5', hidden: true },
    ],
    hints: [
      'Initialize a variable with the first element of the array.',
      'Loop through the remaining elements and update if you find a larger one.',
      'int max = arr[0]; for (int i = 1; i < n; i++) { if (arr[i] > max) max = arr[i]; }',
    ],
    skills: ['Core Java', 'Arrays'],
    estimatedMinutes: 15,
  },
  {
    id: 'java-palindrome',
    title: 'Palindrome Check',
    language: 'java',
    difficulty: 'Beginner',
    topic: 'Strings',
    description: `Write a program to check if a given string is a palindrome.\n\nA palindrome reads the same forwards and backwards. Ignore case.`,
    inputFormat: 'A single line containing the string S.',
    outputFormat: 'Print "true" if the string is a palindrome, "false" otherwise.',
    constraints: ['1 ≤ |S| ≤ 1000'],
    examples: [
      { input: 'Racecar', output: 'true', explanation: '"Racecar" reversed is "racecar" which equals the lowercase version.' },
      { input: 'hello', output: 'false', explanation: '"hello" reversed is "olleh" which is different.' },
    ],
    starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();

        // Write your solution here

    }
}`,
    testCases: [
      { id: 1, input: 'Racecar', expected: 'true', hidden: false },
      { id: 2, input: 'hello', expected: 'false', hidden: false },
      { id: 3, input: 'A', expected: 'true', hidden: true },
      { id: 4, input: 'Madam', expected: 'true', hidden: true },
      { id: 5, input: 'ab', expected: 'false', hidden: true },
    ],
    hints: [
      'Convert the string to lowercase first.',
      'Compare the string with its reverse.',
      'Use two pointers: one from the start, one from the end.',
    ],
    skills: ['Core Java', 'Strings'],
    estimatedMinutes: 15,
  },
  {
    id: 'java-two-sum',
    title: 'Two Sum',
    language: 'java',
    difficulty: 'Intermediate',
    topic: 'Arrays',
    description: `Given an array of integers and a target, find two numbers that add up to the target.\n\nPrint their indices (0-based) separated by a space. If no solution exists, print "no solution".`,
    inputFormat: 'Line 1: n\nLine 2: n space-separated integers\nLine 3: target',
    outputFormat: 'Two space-separated indices, or "no solution".',
    constraints: ['2 ≤ n ≤ 10^4', '-10^9 ≤ arr[i] ≤ 10^9', 'Exactly one solution exists for test cases'],
    examples: [
      { input: '4\n2 7 11 15\n9', output: '0 1', explanation: 'arr[0] + arr[1] = 2 + 7 = 9.' },
      { input: '3\n3 2 4\n6', output: '1 2', explanation: 'arr[1] + arr[2] = 2 + 4 = 6.' },
    ],
    starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        int target = sc.nextInt();

        // Write your solution here

    }
}`,
    testCases: [
      { id: 1, input: '4\n2 7 11 15\n9', expected: '0 1', hidden: false },
      { id: 2, input: '3\n3 2 4\n6', expected: '1 2', hidden: false },
      { id: 3, input: '5\n1 5 3 7 2\n9', expected: '1 3', hidden: true },
      { id: 4, input: '4\n1 2 3 4\n5', expected: '0 3', hidden: true },
    ],
    hints: [
      'Use a HashMap to store each value and its index.',
      'For each element, check if (target - element) exists in the map.',
      'This gives O(n) time complexity instead of O(n²).',
    ],
    skills: ['Core Java', 'Data Structures'],
    estimatedMinutes: 25,
  },
  {
    id: 'java-collections-basics',
    title: 'Word Frequency Counter',
    language: 'java',
    difficulty: 'Intermediate',
    topic: 'Collections',
    description: `Given a sentence, count the frequency of each word (case-insensitive) and print each word with its count, sorted alphabetically.`,
    inputFormat: 'A single line containing words separated by spaces.',
    outputFormat: 'Each line: word count (sorted alphabetically).',
    constraints: ['1 ≤ number of words ≤ 1000', 'Words contain only alphabetic characters'],
    examples: [
      { input: 'the cat and the dog', output: 'and 1\ncat 1\ndog 1\nthe 2', explanation: '"the" appears twice, others once.' },
    ],
    starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().toLowerCase();

        // Write your solution here

    }
}`,
    testCases: [
      { id: 1, input: 'the cat and the dog', expected: 'and 1\ncat 1\ndog 1\nthe 2', hidden: false },
      { id: 2, input: 'hello hello hello', expected: 'hello 3', hidden: false },
      { id: 3, input: 'a b c a b a', expected: 'a 3\nb 2\nc 1', hidden: true },
    ],
    hints: [
      'Use a TreeMap to store word frequencies (automatically sorted).',
      'Split the line by spaces and iterate through each word.',
      'map.put(word, map.getOrDefault(word, 0) + 1);',
    ],
    skills: ['Core Java', 'Collections'],
    estimatedMinutes: 20,
  },
  {
    id: 'java-exception-handling',
    title: 'Safe Division Calculator',
    language: 'java',
    difficulty: 'Beginner',
    topic: 'Exceptions',
    description: `Read two integers and print their division. Handle the case where the divisor is zero by printing "Cannot divide by zero".`,
    inputFormat: 'Two lines: dividend and divisor.',
    outputFormat: 'Print the result of dividend / divisor, or the error message.',
    constraints: ['-10^9 ≤ dividend, divisor ≤ 10^9'],
    examples: [
      { input: '10\n3', output: '3', explanation: 'Integer division: 10 / 3 = 3.' },
      { input: '5\n0', output: 'Cannot divide by zero', explanation: 'Division by zero is handled.' },
    ],
    starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        // Write your solution here

    }
}`,
    testCases: [
      { id: 1, input: '10\n3', expected: '3', hidden: false },
      { id: 2, input: '5\n0', expected: 'Cannot divide by zero', hidden: false },
      { id: 3, input: '0\n5', expected: '0', hidden: true },
      { id: 4, input: '-10\n2', expected: '-5', hidden: true },
    ],
    hints: [
      'Use a try-catch block to handle ArithmeticException.',
      'Or simply check if the divisor is 0 before dividing.',
      'if (b == 0) { System.out.println("Cannot divide by zero"); } else { System.out.println(a / b); }',
    ],
    skills: ['Core Java', 'Exception Handling'],
    estimatedMinutes: 10,
  },
  {
    id: 'java-sorting',
    title: 'Sort Numbers',
    language: 'java',
    difficulty: 'Beginner',
    topic: 'Sorting',
    description: `Given n numbers, sort them in ascending order and print space-separated.`,
    inputFormat: 'Line 1: n\nLine 2: n space-separated integers',
    outputFormat: 'Sorted numbers separated by spaces.',
    constraints: ['1 ≤ n ≤ 1000'],
    examples: [
      { input: '5\n5 3 1 4 2', output: '1 2 3 4 5', explanation: '' },
    ],
    starterCode: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();

        // Write your solution here

    }
}`,
    testCases: [
      { id: 1, input: '5\n5 3 1 4 2', expected: '1 2 3 4 5', hidden: false },
      { id: 2, input: '3\n-1 -3 2', expected: '-3 -1 2', hidden: false },
      { id: 3, input: '1\n42', expected: '42', hidden: true },
    ],
    hints: [
      'Use Arrays.sort(arr) to sort in-place.',
      'Then print the array with a loop.',
    ],
    skills: ['Core Java', 'Sorting'],
    estimatedMinutes: 10,
  },

  // ─── PYTHON ─────────────────────────────────────────────────────────────
  {
    id: 'python-list-processing',
    title: 'List Sum and Average',
    language: 'python',
    difficulty: 'Beginner',
    topic: 'Lists',
    description: `Read a list of integers and print their sum and average (rounded to 2 decimal places).`,
    inputFormat: 'Line 1: n\nLine 2: n space-separated integers',
    outputFormat: 'Two lines: sum and average.',
    constraints: ['1 ≤ n ≤ 1000'],
    examples: [
      { input: '4\n10 20 30 40', output: '100\n25.0', explanation: 'Sum = 100, Average = 100/4 = 25.0' },
    ],
    starterCode: `n = int(input())
nums = list(map(int, input().split()))

# Write your solution here

`,
    testCases: [
      { id: 1, input: '4\n10 20 30 40', expected: '100\n25.0', hidden: false },
      { id: 2, input: '1\n5', expected: '5\n5.0', hidden: false },
      { id: 3, input: '3\n-1 0 1', expected: '0\n0.0', hidden: true },
    ],
    hints: [
      'Use sum(nums) for the total.',
      'Use round(sum(nums) / len(nums), 2) for the average.',
    ],
    skills: ['Python', 'Lists'],
    estimatedMinutes: 10,
  },
  {
    id: 'python-dict-frequency',
    title: 'Character Frequency',
    language: 'python',
    difficulty: 'Beginner',
    topic: 'Dictionaries',
    description: `Given a string, count the frequency of each character and print them sorted by character.`,
    inputFormat: 'A single line containing the string.',
    outputFormat: 'Each line: character: count',
    constraints: ['1 ≤ |S| ≤ 1000'],
    examples: [
      { input: 'hello', output: 'e: 1\nh: 1\nl: 2\no: 1', explanation: '' },
    ],
    starterCode: `s = input()

# Write your solution here

`,
    testCases: [
      { id: 1, input: 'hello', expected: 'e: 1\nh: 1\nl: 2\no: 1', hidden: false },
      { id: 2, input: 'abc', expected: 'a: 1\nb: 1\nc: 1', hidden: false },
      { id: 3, input: 'aabbb', expected: 'a: 2\nb: 3', hidden: true },
    ],
    hints: [
      'Use a dictionary to count occurrences.',
      'sorted() will sort the keys alphabetically.',
    ],
    skills: ['Python', 'Dictionaries'],
    estimatedMinutes: 10,
  },
  {
    id: 'python-string-manip',
    title: 'Capitalize Words',
    language: 'python',
    difficulty: 'Beginner',
    topic: 'Strings',
    description: `Given a sentence, capitalize the first letter of each word and print the result.`,
    inputFormat: 'A single line containing the sentence.',
    outputFormat: 'The sentence with each word capitalized.',
    constraints: ['1 ≤ |S| ≤ 1000'],
    examples: [
      { input: 'hello world', output: 'Hello World', explanation: '' },
      { input: 'pathforge is awesome', output: 'PathForge Is Awesome', explanation: '' },
    ],
    starterCode: `s = input()

# Write your solution here

`,
    testCases: [
      { id: 1, input: 'hello world', expected: 'Hello World', hidden: false },
      { id: 2, input: 'pathforge is awesome', expected: 'PathForge Is Awesome', hidden: false },
      { id: 3, input: 'a', expected: 'A', hidden: true },
    ],
    hints: [
      'Use s.title() for a quick solution.',
      'Or split by spaces and capitalize each word manually.',
    ],
    skills: ['Python', 'Strings'],
    estimatedMinutes: 10,
  },
  {
    id: 'python-data-filter',
    title: 'Filter Even Numbers',
    language: 'python',
    difficulty: 'Beginner',
    topic: 'Lists',
    description: `Read a list of integers and print only the even ones, space-separated.`,
    inputFormat: 'Line 1: n\nLine 2: n space-separated integers',
    outputFormat: 'Even numbers separated by spaces.',
    constraints: ['1 ≤ n ≤ 1000'],
    examples: [
      { input: '5\n1 2 3 4 5', output: '2 4', explanation: '' },
    ],
    starterCode: `n = int(input())
nums = list(map(int, input().split()))

# Write your solution here

`,
    testCases: [
      { id: 1, input: '5\n1 2 3 4 5', expected: '2 4', hidden: false },
      { id: 2, input: '3\n2 4 6', expected: '2 4 6', hidden: false },
      { id: 3, input: '3\n1 3 5', expected: '', hidden: true },
    ],
    hints: [
      'Use a list comprehension: [x for x in nums if x % 2 == 0]',
      'Print with " ".join(map(str, evens))',
    ],
    skills: ['Python', 'Lists'],
    estimatedMinutes: 10,
  },
  {
    id: 'python-file-parsing',
    title: 'CSV Column Extractor',
    language: 'python',
    difficulty: 'Intermediate',
    topic: 'File Parsing',
    description: `Given a CSV string (comma-separated values), extract and print the second column values, one per line.`,
    inputFormat: 'A single line of comma-separated values.',
    outputFormat: 'Values from the second column, one per line.',
    constraints: ['Each row has at least 2 columns'],
    examples: [
      { input: 'name,age,city\nAlice,25,NYC\nBob,30,LA', output: 'age\n25\n30', explanation: 'Extracts the second column.' },
    ],
    starterCode: `data = input()

# Write your solution here

`,
    testCases: [
      { id: 1, input: 'name,age,city\nAlice,25,NYC\nBob,30,LA', expected: 'age\n25\n30', hidden: false },
      { id: 2, input: 'a,b\nc,d', expected: 'b\nd', hidden: false },
    ],
    hints: [
      'Split by newline first, then split each row by comma.',
      'Access index 1 of each row.',
    ],
    skills: ['Python', 'Data Processing'],
    estimatedMinutes: 15,
  },

  // ─── JAVASCRIPT ─────────────────────────────────────────────────────────
  {
    id: 'js-array-methods',
    title: 'Array Transformation',
    language: 'javascript',
    difficulty: 'Beginner',
    topic: 'Arrays',
    description: `Given an array of numbers, return a new array where each element is doubled.\n\nWrite a function that takes an array and returns the transformed array.`,
    inputFormat: 'A JSON array of numbers.',
    outputFormat: 'A JSON array with each element doubled.',
    constraints: ['1 ≤ array.length ≤ 1000'],
    examples: [
      { input: '[1, 2, 3]', output: '[2, 4, 6]', explanation: 'Each element doubled.' },
      { input: '[-1, 0, 5]', output: '[-2, 0, 10]', explanation: '' },
    ],
    starterCode: `function doubleArray(arr) {
    // Write your solution here

}

// Do not modify below this line
const input = JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf-8'));
console.log(JSON.stringify(doubleArray(input)));`,
    testCases: [
      { id: 1, input: '[1, 2, 3]', expected: '[2, 4, 6]', hidden: false },
      { id: 2, input: '[-1, 0, 5]', expected: '[-2, 0, 10]', hidden: false },
      { id: 3, input: '[100]', expected: '[200]', hidden: true },
      { id: 4, input: '[]', expected: '[]', hidden: true },
    ],
    hints: [
      'Use arr.map(x => x * 2) for a concise solution.',
      'Or use a for loop and push to a new array.',
    ],
    skills: ['JavaScript', 'Arrays'],
    estimatedMinutes: 10,
  },
  {
    id: 'js-async-await',
    title: 'Fetch and Process Data',
    language: 'javascript',
    difficulty: 'Intermediate',
    topic: 'Async/Await',
    description: `Write an async function that fetches data from a mock API and returns the names of active users.\n\nThe function should use async/await and handle errors gracefully.`,
    inputFormat: 'A JSON array of user objects: [{ name, active }]',
    outputFormat: 'A JSON array of active user names.',
    constraints: ['Users array length ≤ 100'],
    examples: [
      { input: '[{"name":"Alice","active":true},{"name":"Bob","active":false}]', output: '["Alice"]', explanation: 'Only active users.' },
    ],
    starterCode: `async function getActiveUsers(users) {
    // Write your solution here

}

// Do not modify below this line
const input = JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf-8'));
getActiveUsers(input).then(r => console.log(JSON.stringify(r)));`,
    testCases: [
      { id: 1, input: '[{"name":"Alice","active":true},{"name":"Bob","active":false}]', expected: '["Alice"]', hidden: false },
      { id: 2, input: '[{"name":"A","active":true},{"name":"B","active":true}]', expected: '["A","B"]', hidden: false },
      { id: 3, input: '[]', expected: '[]', hidden: true },
    ],
    hints: [
      'Use filter() to get active users.',
      'Use map() to extract names.',
      'return users.filter(u => u.active).map(u => u.name);',
    ],
    skills: ['JavaScript', 'Async/Await'],
    estimatedMinutes: 15,
  },
  {
    id: 'js-dom-manip',
    title: 'DOM Element Counter',
    language: 'javascript',
    difficulty: 'Intermediate',
    topic: 'DOM',
    description: `Write a function that counts the number of elements with a given CSS class in a DOM tree.\n\nFor this challenge, we simulate the DOM with a nested object structure.`,
    inputFormat: 'A JSON object representing a DOM tree and a class name.',
    outputFormat: 'The count of elements with that class.',
    constraints: ['Tree depth ≤ 20'],
    examples: [
      { input: '{"tag":"div","class":"container","children":[{"tag":"span","class":"item"},{"tag":"div","class":"item"}]},"className":"item"', output: '2', explanation: 'Two elements have class "item".' },
    ],
    starterCode: `function countByClass(node, className) {
    // Write your solution here

}

// Do not modify below this line
const data = JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf-8'));
console.log(countByClass(data.node, data.className));`,
    testCases: [
      { id: 1, input: '{"node":{"tag":"div","class":"container","children":[{"tag":"span","class":"item"}]},"className":"item"}', expected: '1', hidden: false },
      { id: 2, input: '{"node":{"tag":"div","class":"root","children":[{"tag":"span","class":"a"},{"tag":"div","class":"b"}]},"className":"a"}', expected: '1', hidden: false },
    ],
    hints: [
      'Use recursion to traverse the tree.',
      'Check if node.class === className at each level.',
    ],
    skills: ['JavaScript', 'DOM'],
    estimatedMinutes: 20,
  },
  {
    id: 'js-data-transform',
    title: 'Group By Property',
    language: 'javascript',
    difficulty: 'Intermediate',
    topic: 'Data Transformation',
    description: `Given an array of objects, group them by a specified property and return an object where keys are the property values and values are arrays of matching objects.`,
    inputFormat: 'A JSON array of objects and a property name.',
    outputFormat: 'A JSON object with grouped data.',
    constraints: ['Array length ≤ 1000'],
    examples: [
      { input: '[{"type":"fruit","name":"apple"},{"type":"veggie","name":"carrot"},{"type":"fruit","name":"banana"}],"key":"type"', output: '{"fruit":[{"type":"fruit","name":"apple"},{"type":"fruit","name":"banana"}],"veggie":[{"type":"veggie","name":"carrot"}]}', explanation: '' },
    ],
    starterCode: `function groupBy(arr, key) {
    // Write your solution here

}

// Do not modify below this line
const data = JSON.parse(require('fs').readFileSync('/dev/stdin', 'utf-8'));
console.log(JSON.stringify(groupBy(data.arr, data.key)));`,
    testCases: [
      { id: 1, input: '[{"type":"a","v":1},{"type":"b","v":2},{"type":"a","v":3}],"key":"type"', expected: '{"a":[{"type":"a","v":1},{"type":"a","v":3}],"b":[{"type":"b","v":2}]}', hidden: false },
    ],
    hints: [
      'Use reduce() to build the grouped object.',
      'For each item, get the key value and push the item into the corresponding array.',
    ],
    skills: ['JavaScript', 'Data Processing'],
    estimatedMinutes: 15,
  },

  // ─── SQL ────────────────────────────────────────────────────────────────
  {
    id: 'sql-select-basics',
    title: 'Select Active Users',
    language: 'sql',
    difficulty: 'Beginner',
    topic: 'SELECT',
    description: `Given a users table, write a query to select all active users (status = 'active'), ordered by name ascending.`,
    inputFormat: 'Table: users (id INT, name VARCHAR, email VARCHAR, status VARCHAR)',
    outputFormat: 'Rows of active users sorted by name.',
    constraints: ['Table may contain up to 10,000 rows'],
    examples: [
      { input: 'users: [(1,"Alice","a@test.com","active"),(2,"Bob","b@test.com","inactive"),(3,"Carol","c@test.com","active")]', output: '1,"Alice","a@test.com","active"\n3,"Carol","c@test.com","active"', explanation: 'Only active users, sorted by name.' },
    ],
    starterCode: `SELECT * FROM users
WHERE -- Write your condition here
ORDER BY -- Write your ordering here;`,
    testCases: [
      { id: 1, input: 'users: [(1,"A","a@x.com","active"),(2,"B","b@x.com","inactive")]', expected: '1,"A","a@x.com","active"', hidden: false },
      { id: 2, input: 'users: [(1,"Z","z@x.com","active"),(2,"A","a@x.com","active")]', expected: '2,"A","a@x.com","active"\n1,"Z","z@x.com","active"', hidden: false },
    ],
    hints: [
      'Use WHERE status = \'active\'.',
      'Use ORDER BY name ASC.',
    ],
    skills: ['SQL', 'SELECT'],
    estimatedMinutes: 10,
  },
  {
    id: 'sql-join',
    title: 'User Orders Join',
    language: 'sql',
    difficulty: 'Intermediate',
    topic: 'JOIN',
    description: `Write a query to get all orders with the user's name. Include only orders placed in 2024.`,
    inputFormat: 'Tables: users (id, name), orders (id, user_id, amount, order_date)',
    outputFormat: 'user_name, order_date, amount',
    constraints: ['Use LEFT JOIN or INNER JOIN as appropriate'],
    examples: [
      { input: 'users: [(1,"Alice")], orders: [(1,1,100,"2024-01-15"),(2,1,200,"2023-12-01")]', expected: 'Alice,2024-01-15,100', explanation: 'Only 2024 orders.' },
    ],
    starterCode: `SELECT u.name, o.order_date, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE -- Write your condition here;`,
    testCases: [
      { id: 1, input: 'users: [(1,"A")], orders: [(1,1,100,"2024-06-01")]', expected: 'A,2024-06-01,100', hidden: false },
      { id: 2, input: 'users: [(1,"A")], orders: [(1,1,50,"2023-01-01")]', expected: '', hidden: true },
    ],
    hints: [
      'Use WHERE o.order_date >= \'2024-01-01\' AND o.order_date < \'2025-01-01\'.',
      'Or use YEAR(o.order_date) = 2024.',
    ],
    skills: ['SQL', 'JOIN'],
    estimatedMinutes: 15,
  },
  {
    id: 'sql-group-by',
    title: 'Sales by Category',
    language: 'sql',
    difficulty: 'Intermediate',
    topic: 'GROUP BY',
    description: `Write a query to get total sales amount per category, ordered by total descending.`,
    inputFormat: 'Table: sales (id, category VARCHAR, amount INT)',
    outputFormat: 'category, total_amount',
    constraints: ['At least 1 row in the table'],
    examples: [
      { input: 'sales: [(1,"Electronics",500),(2,"Electronics",300),(3,"Clothing",200)]', expected: 'Electronics,800\nClothing,200', explanation: '' },
    ],
    starterCode: `SELECT category, SUM(amount) as total_amount
FROM sales
GROUP BY -- Write your grouping here
ORDER BY -- Write your ordering here;`,
    testCases: [
      { id: 1, input: 'sales: [(1,"A",100),(2,"B",200),(3,"A",300)]', expected: 'A,400\nB,200', hidden: false },
      { id: 2, input: 'sales: [(1,"X",50)]', expected: 'X,50', hidden: false },
    ],
    hints: [
      'Use GROUP BY category.',
      'Use SUM(amount) for the total.',
      'ORDER BY total_amount DESC.',
    ],
    skills: ['SQL', 'GROUP BY'],
    estimatedMinutes: 15,
  },
  {
    id: 'sql-aggregations',
    title: 'Average Score Calculator',
    language: 'sql',
    difficulty: 'Intermediate',
    topic: 'Aggregations',
    description: `Write a query to find the average score per student. Only include students with at least 2 scores.`,
    inputFormat: 'Table: scores (id, student_name VARCHAR, score INT)',
    outputFormat: 'student_name, avg_score (rounded to 1 decimal)',
    constraints: ['0 ≤ score ≤ 100'],
    examples: [
      { input: 'scores: [(1,"Alice",90),(2,"Alice",80),(3,"Bob",70)]', expected: 'Alice,85.0', explanation: 'Alice has 2 scores, Bob only 1.' },
    ],
    starterCode: `SELECT student_name, ROUND(AVG(score), 1) as avg_score
FROM scores
GROUP BY student_name
HAVING -- Write your condition here;`,
    testCases: [
      { id: 1, input: 'scores: [(1,"A",80),(2,"A",90),(3,"A",70)]', expected: 'A,80.0', hidden: false },
      { id: 2, input: 'scores: [(1,"X",100),(2,"Y",50),(3,"Y",60)]', expected: 'Y,55.0', hidden: false },
    ],
    hints: [
      'Use HAVING COUNT(*) >= 2 to filter students.',
      'Use ROUND(AVG(score), 1) for the average.',
    ],
    skills: ['SQL', 'Aggregations'],
    estimatedMinutes: 15,
  },

  // ─── BASH ───────────────────────────────────────────────────────────────
  {
    id: 'bash-file-ops',
    title: 'Count Lines in Files',
    language: 'bash',
    difficulty: 'Beginner',
    topic: 'File Operations',
    description: `Write a bash script that counts the total number of lines across all .txt files in the current directory.`,
    inputFormat: 'A list of filenames (one per line) simulating directory contents.',
    outputFormat: 'A single number: total lines.',
    constraints: ['At least one .txt file exists'],
    examples: [
      { input: 'a.txt\nb.txt\nc.py', output: '2', explanation: 'Count lines in a.txt and b.txt only.' },
    ],
    starterCode: `#!/bin/bash

# Write your solution here

`,
    testCases: [
      { id: 1, input: 'a.txt\nb.txt', expected: '0', hidden: false },
      { id: 2, input: 'x.py', expected: '0', hidden: false },
    ],
    hints: [
      'Use wc -l to count lines.',
      'Use a for loop to iterate over *.txt files.',
      'for f in *.txt; do wc -l < "$f"; done | awk \'{s+=$1} END {print s}\'',
    ],
    skills: ['Bash', 'File Operations'],
    estimatedMinutes: 15,
  },
  {
    id: 'bash-variables',
    title: 'String Manipulator',
    language: 'bash',
    difficulty: 'Beginner',
    topic: 'Variables',
    description: `Write a bash script that reads a string, converts it to uppercase, reverses it, and prints both results.`,
    inputFormat: 'A single line containing the string.',
    outputFormat: 'Line 1: uppercase version\nLine 2: reversed version',
    constraints: ['1 ≤ |S| ≤ 100'],
    examples: [
      { input: 'hello', output: 'HELLO\nolleh', explanation: '' },
    ],
    starterCode: `#!/bin/bash

# Write your solution here

`,
    testCases: [
      { id: 1, input: 'hello', expected: 'HELLO\nolleh', hidden: false },
      { id: 2, input: 'PathForge', expected: 'PATHFORGE\negroFhtap', hidden: false },
    ],
    hints: [
      'Use echo "${s^^}" for uppercase.',
      'Use echo "$s" | rev for reversal.',
    ],
    skills: ['Bash', 'Variables'],
    estimatedMinutes: 10,
  },
  {
    id: 'bash-loops',
    title: 'Number Range Printer',
    language: 'bash',
    difficulty: 'Beginner',
    topic: 'Loops',
    description: `Write a bash script that prints all numbers from 1 to n, one per line. For multiples of 3, print "Fizz" instead. For multiples of 5, print "Buzz". For multiples of both, print "FizzBuzz".`,
    inputFormat: 'A single integer n.',
    outputFormat: 'Numbers or Fizz/Buzz/FizzBuzz.',
    constraints: ['1 ≤ n ≤ 100'],
    examples: [
      { input: '5', output: '1\n2\nFizz\n4\nBuzz', explanation: '' },
    ],
    starterCode: `#!/bin/bash

# Write your solution here

`,
    testCases: [
      { id: 1, input: '5', expected: '1\n2\nFizz\n4\nBuzz', hidden: false },
      { id: 2, input: '15', expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz', hidden: false },
    ],
    hints: [
      'Use a for loop: for ((i=1; i<=n; i++))',
      'Check divisibility with $((i % 3)) and $((i % 5)).',
    ],
    skills: ['Bash', 'Loops'],
    estimatedMinutes: 15,
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export function getChallengeById(id) {
  return CHALLENGES.find(c => c.id === id) || null
}

export function getChallengesByLanguage(lang) {
  return CHALLENGES.filter(c => c.language === lang)
}

export function getChallengesByDifficulty(diff) {
  return CHALLENGES.filter(c => c.difficulty === diff)
}

export function getChallengesByTopic(topic) {
  return CHALLENGES.filter(c => c.topic.toLowerCase().includes(topic.toLowerCase()))
}

export function getRecommendedChallenges(profile, limit = 3) {
  if (!profile) return CHALLENGES.slice(0, limit)
  const skillProgress = profile?.progress?.skillProgress || []
  const completed = profile?.progress?.completedChallenges || []

  // Prioritize challenges for skills the user is working on
  const activeSkills = skillProgress.filter(s => s.level > 0 && s.level < 80).map(s => s.name)
  const recommended = CHALLENGES.filter(c => !completed.includes(c.id))
    .sort((a, b) => {
      const aMatch = a.skills.some(s => activeSkills.includes(s)) ? 1 : 0
      const bMatch = b.skills.some(s => activeSkills.includes(s)) ? 1 : 0
      return bMatch - aMatch
    })

  return recommended.slice(0, limit)
}
