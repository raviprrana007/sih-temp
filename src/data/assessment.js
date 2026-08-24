export const assessmentQuestions = [
  // JavaScript
  {
    id: 1, category: 'JavaScript', difficulty: 'Medium',
    question: 'What is the output of: console.log(typeof null)?',
    options: ['"null"', '"undefined"', '"object"', '"string"'],
    correct: 2,
    explanation: 'typeof null returns "object" — this is a well-known quirk in JavaScript that has been present since the language was created.',
  },
  {
    id: 2, category: 'JavaScript', difficulty: 'Hard',
    question: 'Which of the following creates a closure in JavaScript?',
    options: [
      'A function that uses a variable from its outer scope',
      'A function that calls itself recursively',
      'An arrow function with no parameters',
      'A function declared with the "class" keyword',
    ],
    correct: 0,
    explanation: 'A closure is created when a function retains access to variables from its outer lexical scope even after the outer function has returned.',
  },
  {
    id: 3, category: 'JavaScript', difficulty: 'Easy',
    question: 'What does the "=== " operator check?',
    options: ['Only value equality', 'Both value and type equality', 'Only type equality', 'Reference equality only'],
    correct: 1,
    explanation: 'The strict equality operator (===) checks both value AND type without performing type coercion.',
  },
  // React
  {
    id: 4, category: 'React', difficulty: 'Medium',
    question: 'Which hook should you use to run a side effect after every render?',
    options: ['useState', 'useCallback', 'useEffect with no dependency array... wait — to run after EVERY render, use useEffect with no second argument', 'useMemo'],
    correct: 2,
    explanation: 'useEffect without a dependency array runs after every render. With an empty array [], it runs only once. With values in the array, it runs when those values change.',
  },
  {
    id: 5, category: 'React', difficulty: 'Easy',
    question: 'What is the virtual DOM?',
    options: [
      'A physical copy of the real DOM stored on the server',
      'A lightweight JavaScript representation of the actual DOM that React uses to optimize rendering',
      'A browser extension that enhances DOM performance',
      'A new HTML standard introduced in HTML5',
    ],
    correct: 1,
    explanation: 'The virtual DOM is a JavaScript object that is a lightweight copy of the actual DOM. React uses it to batch updates and minimize expensive DOM operations.',
  },
  {
    id: 6, category: 'React', difficulty: 'Hard',
    question: 'When would you use useCallback vs useMemo?',
    options: [
      'useCallback for values, useMemo for functions',
      'useCallback memoizes a function reference; useMemo memoizes a computed value',
      'They are identical and interchangeable',
      'useCallback is for class components; useMemo is for functional components',
    ],
    correct: 1,
    explanation: 'useCallback returns a memoized callback function, while useMemo returns a memoized value. Use useCallback to prevent unnecessary re-renders of child components that receive functions as props.',
  },
  // Node.js
  {
    id: 7, category: 'Node.js', difficulty: 'Easy',
    question: 'Node.js is built on which JavaScript engine?',
    options: ['SpiderMonkey', 'V8', 'JavaScriptCore', 'Chakra'],
    correct: 1,
    explanation: "Node.js is built on Google's V8 JavaScript engine, which compiles JavaScript to native machine code.",
  },
  {
    id: 8, category: 'Node.js', difficulty: 'Medium',
    question: 'What does the Event Loop in Node.js do?',
    options: [
      'Loops through all HTML elements on a page',
      'Manages synchronous code execution',
      'Handles asynchronous operations and callbacks by queuing them for execution',
      'Creates multiple threads for parallel processing',
    ],
    correct: 2,
    explanation: "Node.js is single-threaded, and the Event Loop is what allows it to handle non-blocking I/O operations by offloading operations to the system kernel whenever possible.",
  },
  // SQL
  {
    id: 9, category: 'SQL', difficulty: 'Easy',
    question: 'Which SQL clause is used to filter rows?',
    options: ['HAVING', 'GROUP BY', 'WHERE', 'ORDER BY'],
    correct: 2,
    explanation: 'The WHERE clause filters individual rows before any grouping. HAVING filters groups after GROUP BY.',
  },
  {
    id: 10, category: 'SQL', difficulty: 'Medium',
    question: 'What is the difference between INNER JOIN and LEFT JOIN?',
    options: [
      'INNER JOIN returns all rows from both tables; LEFT JOIN returns only the left table',
      'INNER JOIN returns only matching rows; LEFT JOIN returns all rows from left table and matching rows from right',
      'They are the same in most databases',
      'LEFT JOIN is faster than INNER JOIN',
    ],
    correct: 1,
    explanation: 'INNER JOIN returns only rows where there is a match in both tables. LEFT JOIN (also known as LEFT OUTER JOIN) returns all rows from the left table, even if there is no match in the right table.',
  },
  // Git
  {
    id: 11, category: 'Git', difficulty: 'Easy',
    question: 'What does "git stash" do?',
    options: [
      'Permanently deletes uncommitted changes',
      'Temporarily saves uncommitted changes so you can switch branches',
      'Pushes changes to the remote repository',
      'Creates a new branch from the current state',
    ],
    correct: 1,
    explanation: 'git stash temporarily shelves (or stashes) changes you\'ve made to your working copy so you can work on something else, then come back and re-apply them later.',
  },
  {
    id: 12, category: 'Git', difficulty: 'Medium',
    question: 'What is the purpose of "git rebase"?',
    options: [
      'To delete a branch permanently',
      'To move or combine a sequence of commits to a new base commit',
      'To reset a file to its original state',
      'To create a copy of a repository',
    ],
    correct: 1,
    explanation: 'Rebase integrates changes from one branch into another by moving the entire branch to a new starting point, creating a cleaner, more linear history.',
  },
  // Communication
  {
    id: 13, category: 'Communication', difficulty: 'Easy',
    question: 'You need to explain a complex technical concept to a non-technical stakeholder. What is the best approach?',
    options: [
      'Use as much technical jargon as possible to appear knowledgeable',
      'Avoid the conversation since they won\'t understand',
      'Use analogies, simple language, and focus on the business impact',
      'Send them a technical document and ask them to study it first',
    ],
    correct: 2,
    explanation: 'Effective technical communication to non-technical audiences requires simplification, relatable analogies, and focusing on outcomes rather than implementation details.',
  },
  {
    id: 14, category: 'Teamwork', difficulty: 'Easy',
    question: 'Your team is behind schedule on a project. What is the best action?',
    options: [
      'Work in isolation to catch up without telling anyone',
      'Immediately raise the issue to your manager and propose solutions',
      'Ignore it and hope the deadline gets extended',
      'Blame other team members for the delay',
    ],
    correct: 1,
    explanation: 'Proactive communication about risks and blockers — along with proposed solutions — is a key indicator of professional maturity and strong teamwork.',
  },
  {
    id: 15, category: 'Problem Solving', difficulty: 'Medium',
    question: 'What is the best first step when debugging a complex, unknown bug?',
    options: [
      'Randomly change code until it works',
      'Rewrite the entire module from scratch',
      'Reproduce the bug consistently, then isolate it systematically using logs and breakpoints',
      'Ask your manager to fix it',
    ],
    correct: 2,
    explanation: 'Good debugging starts with consistent reproduction, then systematic isolation. Form hypotheses, test them, and narrow down the cause before attempting fixes.',
  },
];

export const assessmentSections = [
  { id: 'technical', name: 'Technical Skills', questionCount: 12, duration: 25 },
  { id: 'soft', name: 'Soft Skills', questionCount: 3, duration: 5 },
];
