// Topic-based MCQ question banks used for assessments.
// Topics align with roadmap items per career so assessments reflect the
// learner's selected career goal and roadmap.

export const ASSESSMENT_BANK = {
  'Java Basics': [
    {
      question: 'Which keyword is used to define a class in Java?',
      options: ['function', 'class', 'struct', 'module'],
      correctAnswer: 1,
    },
    {
      question: 'What is the entry point method of a Java application?',
      options: ['main()', 'run()', 'start()', 'init()'],
      correctAnswer: 0,
    },
    {
      question: 'Which of these is a primitive data type in Java?',
      options: ['String', 'Integer', 'int', 'Object'],
      correctAnswer: 2,
    },
    {
      question: 'What does the JVM stand for?',
      options: ['Java Virtual Machine', 'Java Version Manager', 'Java Variable Module', 'Java Visual Mode'],
      correctAnswer: 0,
    },
    {
      question: 'How do you declare a constant variable in Java?',
      options: ['const x = 5', 'final int x = 5', 'static x = 5', 'readonly int x = 5'],
      correctAnswer: 1,
    },
  ],
  'OOP': [
    {
      question: 'Which OOP principle hides internal details and exposes only necessary parts?',
      options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
      correctAnswer: 2,
    },
    {
      question: 'Which keyword is used to inherit a class in Java?',
      options: ['extends', 'implements', 'inherits', 'super'],
      correctAnswer: 0,
    },
    {
      question: 'Method overloading is an example of:',
      options: ['Compile-time polymorphism', 'Runtime polymorphism', 'Data hiding', 'Abstraction'],
      correctAnswer: 0,
    },
    {
      question: 'A class that cannot be instantiated is called a(n):',
      options: ['Final class', 'Static class', 'Abstract class', 'Interface'],
      correctAnswer: 2,
    },
    {
      question: 'What is the superclass of all Java classes?',
      options: ['Main', 'Object', 'Base', 'Root'],
      correctAnswer: 1,
    },
  ],
  'Collections Framework': [
    {
      question: 'Which collection maintains insertion order and allows duplicates?',
      options: ['Set', 'List', 'Map', 'Queue'],
      correctAnswer: 1,
    },
    {
      question: 'Which interface is the root of the Java Collections Framework?',
      options: ['Collection', 'List', 'Set', 'Map'],
      correctAnswer: 0,
    },
    {
      question: 'Which Map implementation offers constant-time average-case get/put?',
      options: ['TreeMap', 'Hashtable', 'HashMap', 'LinkedHashMap'],
      correctAnswer: 2,
    },
    {
      question: 'Which collection does NOT allow duplicate elements?',
      options: ['ArrayList', 'LinkedList', 'HashSet', 'Vector'],
      correctAnswer: 2,
    },
    {
      question: 'What is the time complexity of ArrayList.get(index)?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
      correctAnswer: 2,
    },
  ],
  'Exception Handling': [
    {
      question: 'Which keyword is used to manually throw an exception?',
      options: ['catch', 'throws', 'throw', 'finally'],
      correctAnswer: 2,
    },
    {
      question: 'Which block always executes regardless of an exception?',
      options: ['try', 'catch', 'finally', 'throw'],
      correctAnswer: 2,
    },
    {
      question: 'NullPointerException is a:',
      options: ['Checked exception', 'Unchecked exception', 'Error', 'Compile-time error'],
      correctAnswer: 1,
    },
    {
      question: 'Which keyword declares that a method may throw an exception?',
      options: ['throw', 'throws', 'catch', 'try'],
      correctAnswer: 1,
    },
    {
      question: 'What is the base class of all exceptions?',
      options: ['Error', 'RuntimeException', 'Throwable', 'Exception'],
      correctAnswer: 2,
    },
  ],
  'Multithreading': [
    {
      question: 'Which class can be extended to create a thread?',
      options: ['Thread', 'Runnable', 'Process', 'Executor'],
      correctAnswer: 0,
    },
    {
      question: 'Which interface should be implemented to create a runnable task?',
      options: ['Thread', 'Callable', 'Runnable', 'Executor'],
      correctAnswer: 2,
    },
    {
      question: 'Which keyword synchronizes access to a block or method?',
      options: ['volatile', 'synchronized', 'atomic', 'locked'],
      correctAnswer: 1,
    },
    {
      question: 'What method starts a new thread?',
      options: ['run()', 'start()', 'execute()', 'begin()'],
      correctAnswer: 1,
    },
    {
      question: 'A deadlock occurs when:',
      options: [
        'A thread is too fast',
        'Two threads wait for resources held by each other',
        'A thread runs out of memory',
        'A thread is interrupted',
      ],
      correctAnswer: 1,
    },
  ],
  'Java 8+ Features': [
    {
      question: 'Which feature allows passing behavior as a parameter?',
      options: ['Anonymous classes', 'Lambda expressions', 'Inner classes', 'Static methods'],
      correctAnswer: 1,
    },
    {
      question: 'What does the Optional class help with?',
      options: ['Async operations', 'Avoiding null pointer checks', 'Memory management', 'Thread safety'],
      correctAnswer: 1,
    },
    {
      question: 'The Stream API is used for:',
      options: ['Network I/O', 'Functional processing of collections', 'Database access', 'File reading'],
      correctAnswer: 1,
    },
    {
      question: 'Which method applies a function to each element of a stream?',
      options: ['map()', 'filter()', 'reduce()', 'collect()'],
      correctAnswer: 0,
    },
    {
      question: 'What does the ?::? operator notation represent in Java?',
      options: ['Ternary operator', 'Method reference', 'Lambda arrow', 'Generic wildcard'],
      correctAnswer: 1,
    },
  ],
  'JDBC': [
    {
      question: 'What does JDBC stand for?',
      options: ['Java Data Connectivity', 'Java Database Connectivity', 'Java Direct Connection', 'Java Database Class'],
      correctAnswer: 1,
    },
    {
      question: 'Which interface represents a connection to a database?',
      options: ['Statement', 'ResultSet', 'Connection', 'DriverManager'],
      correctAnswer: 2,
    },
    {
      question: 'Which method executes a SELECT query?',
      options: ['executeUpdate()', 'executeQuery()', 'execute()', 'query()'],
      correctAnswer: 1,
    },
    {
      question: 'Which class loads and manages JDBC drivers?',
      options: ['Driver', 'DriverManager', 'Connection', 'DataSource'],
      correctAnswer: 1,
    },
    {
      question: 'What is used to safely pass parameters into a query?',
      options: ['Statement', 'CallableStatement', 'PreparedStatement', 'ResultSet'],
      correctAnswer: 2,
    },
  ],
  'SQL': [
    {
      question: 'Which SQL clause filters rows?',
      options: ['ORDER BY', 'GROUP BY', 'WHERE', 'SELECT'],
      correctAnswer: 2,
    },
    {
      question: 'Which keyword combines rows from two tables with matching keys?',
      options: ['UNION', 'JOIN', 'MERGE', 'LINK'],
      correctAnswer: 1,
    },
    {
      question: 'Which function returns the number of rows?',
      options: ['COUNT()', 'SUM()', 'TOTAL()', 'NUM()'],
      correctAnswer: 0,
    },
    {
      question: 'A PRIMARY KEY column:',
      options: ['Can be null', 'Must be unique and non-null', 'Allows duplicates', 'Is always an integer'],
      correctAnswer: 1,
    },
    {
      question: 'Which clause groups rows for aggregation?',
      options: ['WHERE', 'ORDER BY', 'GROUP BY', 'HAVING'],
      correctAnswer: 2,
    },
  ],
  'Spring Boot': [
    {
      question: 'Which annotation marks the main Spring Boot application?',
      options: ['@SpringApplication', '@EnableBoot', '@SpringBootApplication', '@BootApp'],
      correctAnswer: 2,
    },
    {
      question: 'Which annotation maps an HTTP GET endpoint?',
      options: ['@PostMapping', '@GetMapping', '@PutMapping', '@RequestMapping'],
      correctAnswer: 1,
    },
    {
      question: 'Dependency injection is primarily handled by:',
      options: ['The developer manually', 'The Spring container', 'The JVM', 'The database'],
      correctAnswer: 1,
    },
    {
      question: 'Which file holds Spring Boot configuration?',
      options: ['config.properties', 'application.properties', 'boot.yml', 'app.config'],
      correctAnswer: 1,
    },
    {
      question: 'What does @Service annotation indicate?',
      options: ['A REST controller', 'A data repository', 'A business logic component', 'A configuration bean'],
      correctAnswer: 2,
    },
  ],
  'REST API': [
    {
      question: 'Which HTTP method is used to update an existing resource?',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      correctAnswer: 2,
    },
    {
      question: 'REST stands for:',
      options: [
        'Remote System Transfer',
        'Representational State Transfer',
        'Real-time Service Transfer',
        'Request State Technique',
      ],
      correctAnswer: 1,
    },
    {
      question: 'Which status code indicates a successful GET request?',
      options: ['201', '200', '404', '500'],
      correctAnswer: 1,
    },
    {
      question: 'What does stateless mean in REST?',
      options: [
        'No data is stored',
        'Each request contains all needed info',
        'Server remembers sessions',
        'Requests are cached',
      ],
      correctAnswer: 1,
    },
    {
      question: 'Which format is commonly used for REST request/response bodies?',
      options: ['CSV', 'XML only', 'JSON', 'YAML'],
      correctAnswer: 2,
    },
  ],
  'HTML & CSS': [
    {
      question: 'Which tag creates the largest heading?',
      options: ['<h6>', '<h1>', '<heading>', '<head>'],
      correctAnswer: 1,
    },
    {
      question: 'Which property sets the background color in CSS?',
      options: ['color', 'bgcolor', 'background-color', 'fill'],
      correctAnswer: 2,
    },
    {
      question: 'Which HTML element is used for an inline image?',
      options: ['<pic>', '<img>', '<image>', '<figure>'],
      correctAnswer: 1,
    },
    {
      question: 'Flexbox is primarily for:',
      options: ['Creating tables', 'Layout in one dimension', '3D transforms', 'Database styling'],
      correctAnswer: 1,
    },
    {
      question: 'Which selector targets an element with id="main"?',
      options: ['.main', '#main', '*main', '@main'],
      correctAnswer: 1,
    },
  ],
  'JavaScript': [
    {
      question: 'Which keyword declares a block-scoped variable?',
      options: ['var', 'let', 'def', 'int'],
      correctAnswer: 1,
    },
    {
      question: 'What is the output of typeof null?',
      options: ['"null"', '"undefined"', '"object"', '"number"'],
      correctAnswer: 2,
    },
    {
      question: 'Which method converts a JSON string to an object?',
      options: ['JSON.stringify()', 'JSON.parse()', 'JSON.object()', 'parse.JSON()'],
      correctAnswer: 1,
    },
    {
      question: 'The event loop is responsible for:',
      options: ['Rendering HTML', 'Handling async operations', 'Garbage collection', 'Type checking'],
      correctAnswer: 1,
    },
    {
      question: 'What does .map() return?',
      options: ['A new array', 'The original array', 'An object', 'A number'],
      correctAnswer: 0,
    },
  ],
  'React': [
    {
      question: 'Which hook manages component state?',
      options: ['useEffect', 'useState', 'useContext', 'useRef'],
      correctAnswer: 1,
    },
    {
      question: 'How do you pass data from parent to child?',
      options: ['State', 'Context', 'Props', 'Events'],
      correctAnswer: 2,
    },
    {
      question: 'Which hook runs side effects?',
      options: ['useState', 'useMemo', 'useEffect', 'useRef'],
      correctAnswer: 2,
    },
    {
      question: 'What is JSX?',
      options: [
        'A database query language',
        'A JavaScript syntax extension for UI',
        'A CSS preprocessor',
        'A build tool',
      ],
      correctAnswer: 1,
    },
    {
      question: 'Virtual DOM improves:',
      options: ['Network speed', 'Bundle size', 'Rendering performance', 'Security'],
      correctAnswer: 2,
    },
  ],
  'Node.js': [
    {
      question: 'Node.js is built on which JavaScript engine?',
      options: ['SpiderMonkey', 'V8', 'JavaScriptCore', 'Nashorn'],
      correctAnswer: 1,
    },
    {
      question: 'Which module creates an HTTP server?',
      options: ['fs', 'path', 'http', 'url'],
      correctAnswer: 2,
    },
    {
      question: 'npm is used for:',
      options: ['Running servers', 'Package management', 'Testing', 'Debugging'],
      correctAnswer: 1,
    },
    {
      question: 'What does Express provide?',
      options: ['A database', 'A web framework', 'A bundler', 'A runtime'],
      correctAnswer: 1,
    },
    {
      question: 'Which method handles an async route error?',
      options: ['catch()', 'next(err)', 'finally()', 'throw err'],
      correctAnswer: 1,
    },
  ],
  'Linux': [
    {
      question: 'Which command lists files in a directory?',
      options: ['cd', 'ls', 'pwd', 'mkdir'],
      correctAnswer: 1,
    },
    {
      question: 'Which command changes permissions?',
      options: ['chmod', 'chown', 'chgrp', 'umask'],
      correctAnswer: 0,
    },
    {
      question: 'Which file contains user account information?',
      options: ['/etc/passwd', '/etc/shadow', '/etc/group', '/etc/users'],
      correctAnswer: 0,
    },
    {
      question: 'What does sudo do?',
      options: ['Lists processes', 'Runs a command as superuser', 'Installs packages', 'Shuts down'],
      correctAnswer: 1,
    },
    {
      question: 'Which command shows running processes?',
      options: ['top', 'ps', 'both', 'kill'],
      correctAnswer: 2,
    },
  ],
  'Networking': [
    {
      question: 'Which protocol resolves domain names to IP addresses?',
      options: ['HTTP', 'DNS', 'FTP', 'SMTP'],
      correctAnswer: 1,
    },
    {
      question: 'Port 443 is commonly used for:',
      options: ['HTTP', 'HTTPS', 'SSH', 'FTP'],
      correctAnswer: 1,
    },
    {
      question: 'Which layer of the OSI model is the IP protocol?',
      options: ['Transport', 'Network', 'Data Link', 'Application'],
      correctAnswer: 1,
    },
    {
      question: 'A subnet mask determines:',
      options: ['Which ports are open', 'The network portion of an IP', 'Connection speed', 'DNS servers'],
      correctAnswer: 1,
    },
    {
      question: 'Which command tests network connectivity?',
      options: ['ping', 'netstat', 'traceroute', 'ssh'],
      correctAnswer: 0,
    },
  ],
  'Docker': [
    {
      question: 'A Docker image is best described as:',
      options: ['A running process', 'A read-only template', 'A container', 'A virtual machine'],
      correctAnswer: 1,
    },
    {
      question: 'Which command builds an image from a Dockerfile?',
      options: ['docker run', 'docker build', 'docker create', 'docker pull'],
      correctAnswer: 1,
    },
    {
      question: 'What isolates a container?',
      options: ['Virtualization', 'Namespaces and cgroups', 'Process isolation only', 'Java sandbox'],
      correctAnswer: 1,
    },
    {
      question: 'The Dockerfile instruction to define a base image is:',
      options: ['FROM', 'RUN', 'CMD', 'COPY'],
      correctAnswer: 0,
    },
    {
      question: 'Which command runs a container?',
      options: ['docker build', 'docker run', 'docker exec', 'docker push'],
      correctAnswer: 1,
    },
  ],
  'Kubernetes': [
    {
      question: 'The smallest deployable unit in Kubernetes is a:',
      options: ['Container', 'Pod', 'Node', 'Service'],
      correctAnswer: 1,
    },
    {
      question: 'Which resource provides stable network access to pods?',
      options: ['Deployment', 'Service', 'ConfigMap', 'Secret'],
      correctAnswer: 1,
    },
    {
      question: 'Which object defines the desired state of a workload?',
      options: ['Pod', 'Deployment', 'Node', 'Namespace'],
      correctAnswer: 1,
    },
    {
      question: 'What does kubectl do?',
      options: ['Builds images', 'Controls a Kubernetes cluster', 'Manages Docker daemons', 'Runs tests'],
      correctAnswer: 1,
    },
    {
      question: 'Horizontal scaling in Kubernetes is called:',
      options: ['Auto-healing', 'Scaling pods', 'Load balancing', 'Replication'],
      correctAnswer: 1,
    },
  ],
  'Terraform': [
    {
      question: 'Terraform is a tool for:',
      options: ['Container orchestration', 'Infrastructure as Code', 'Log monitoring', 'Database backups'],
      correctAnswer: 1,
    },
    {
      question: 'Which command applies configuration changes?',
      options: ['terraform init', 'terraform plan', 'terraform apply', 'terraform fmt'],
      correctAnswer: 2,
    },
    {
      question: 'Terraform state tracks:',
      options: ['Source code', 'Resource mappings', 'User sessions', 'Log files'],
      correctAnswer: 1,
    },
    {
      question: 'Which file defines the desired infrastructure?',
      options: ['.tf', '.json', '.yaml', '.dockerfile'],
      correctAnswer: 0,
    },
    {
      question: 'What is a provider in Terraform?',
      options: ['A cloud service account', 'A plugin that manages a cloud API', 'A VM instance', 'A resource type'],
      correctAnswer: 1,
    },
  ],
  'Python': [
    {
      question: 'Which keyword defines a function in Python?',
      options: ['func', 'def', 'function', 'lambda'],
      correctAnswer: 1,
    },
    {
      question: 'Which data type is immutable?',
      options: ['list', 'tuple', 'dict', 'set'],
      correctAnswer: 1,
    },
    {
      question: 'How do you create a list comprehension?',
      options: ['[x for x in items]', '(x for x in items)', '{x for x in items}', 'for x in items'],
      correctAnswer: 0,
    },
    {
      question: 'Which library is used for numerical computation?',
      options: ['requests', 'numpy', 'flask', 'os'],
      correctAnswer: 1,
    },
    {
      question: 'What does the "with" statement do?',
      options: ['Runs a loop', 'Manages resources automatically', 'Imports modules', 'Defines a class'],
      correctAnswer: 1,
    },
  ],
  'Statistics': [
    {
      question: 'The mean is a measure of:',
      options: ['Spread', 'Central tendency', 'Correlation', 'Causation'],
      correctAnswer: 1,
    },
    {
      question: 'Which measure describes data spread?',
      options: ['Median', 'Standard deviation', 'Mode', 'Mean'],
      correctAnswer: 1,
    },
    {
      question: 'A normal distribution is:',
      options: ['Skewed right', 'Symmetric bell-shaped', 'Bimodal', 'Uniform'],
      correctAnswer: 1,
    },
    {
      question: 'P-value helps determine:',
      options: ['Sample size', 'Statistical significance', 'Data quality', 'Data volume'],
      correctAnswer: 1,
    },
    {
      question: 'Correlation measures:',
      options: ['Causation', 'Relationship strength between variables', 'Data diversity', 'Sampling error'],
      correctAnswer: 1,
    },
  ],
  'Pandas & NumPy': [
    {
      question: 'Which function reads a CSV file into a DataFrame?',
      options: ['pd.load_csv()', 'pd.read_csv()', 'np.read_csv()', 'pd.csv()'],
      correctAnswer: 1,
    },
    {
      question: 'A NumPy array differs from a Python list by:',
      options: ['Being slower', 'Homogeneous typed data with vectorized ops', 'Only storing strings', 'Using more memory'],
      correctAnswer: 1,
    },
    {
      question: 'Which method drops missing values in pandas?',
      options: ['dropna()', 'fillna()', 'isna()', 'remove()'],
      correctAnswer: 0,
    },
    {
      question: 'What does .groupby() do?',
      options: ['Sorts rows', 'Groups data for aggregation', 'Filters columns', 'Joins tables'],
      correctAnswer: 1,
    },
    {
      question: 'Which attribute returns column names?',
      options: ['df.rows', 'df.columns', 'df.keys()', 'df.index'],
      correctAnswer: 1,
    },
  ],
  'Machine Learning': [
    {
      question: 'Supervised learning requires:',
      options: ['Unlabeled data', 'Labeled data', 'No data', 'Only categorical data'],
      correctAnswer: 1,
    },
    {
      question: 'Which algorithm is used for regression?',
      options: ['K-Means', 'Linear Regression', 'Apriori', 'DBSCAN'],
      correctAnswer: 1,
    },
    {
      question: 'Overfitting means the model:',
      options: ['Underperforms on training data', 'Performs well on training but poorly on new data', 'Is too simple', 'Has no parameters'],
      correctAnswer: 1,
    },
    {
      question: 'Which is a classification algorithm?',
      options: ['K-Means', 'Logistic Regression', 'PCA', 'K-Means++'],
      correctAnswer: 1,
    },
    {
      question: 'The training set is used to:',
      options: ['Evaluate final accuracy', 'Fit model parameters', 'Tune hyperparameters only', 'Do nothing'],
      correctAnswer: 1,
    },
  ],
  'Neural Networks': [
    {
      question: 'The activation function introduces:',
      options: ['Linearity', 'Non-linearity', 'Memory', 'Concurrency'],
      correctAnswer: 1,
    },
    {
      question: 'Backpropagation updates:',
      options: ['Inputs', 'Weights', 'Data', 'Labels'],
      correctAnswer: 1,
    },
    {
      question: 'A CNN is particularly good at:',
      options: ['Time series forecasting only', 'Image recognition', 'Text translation only', 'Optimization'],
      correctAnswer: 1,
    },
    {
      question: 'Which is a common loss function for classification?',
      options: ['MSE', 'Cross-entropy', 'Hinge', 'MAE'],
      correctAnswer: 1,
    },
    {
      question: 'The learning rate controls:',
      options: ['Batch size', 'Step size for weight updates', 'Number of layers', 'Dataset size'],
      correctAnswer: 1,
    },
  ],
  'scikit-learn': [
    {
      question: 'Which function splits data into train/test?',
      options: ['split()', 'train_test_split()', 'partition()', 'divide()'],
      correctAnswer: 1,
    },
    {
      question: 'Which metric measures classification accuracy?',
      options: ['R2', 'accuracy_score()', 'mean_squared_error()', 'f1_score()'],
      correctAnswer: 1,
    },
    {
      question: 'StandardScaler is used to:',
      options: ['Remove outliers', 'Normalize feature ranges', 'Reduce features', 'Sample data'],
      correctAnswer: 1,
    },
    {
      question: 'Which model is a tree-based ensemble?',
      options: ['KNN', 'RandomForest', 'SVM', 'LinearRegression'],
      correctAnswer: 1,
    },
    {
      question: 'GridSearchCV is used for:',
      options: ['Feature selection', 'Hyperparameter tuning', 'Data cleaning', 'Model serialization'],
      correctAnswer: 1,
    },
  ],
  'LLM & RAG': [
    {
      question: 'RAG stands for:',
      options: [
        'Rapid Application Generation',
        'Retrieval-Augmented Generation',
        'Relational Attribute Graph',
        'Runtime Assessment Guide',
      ],
      correctAnswer: 1,
    },
    {
      question: 'What is a token in LLM terms?',
      options: ['A security key', 'A unit of text', 'A database row', 'A GPU core'],
      correctAnswer: 1,
    },
    {
      question: 'Prompt engineering is:',
      options: ['Rewriting code', 'Crafting inputs to guide LLM output', 'Compiling models', 'Encrypting data'],
      correctAnswer: 1,
    },
    {
      question: 'A vector database is used in RAG to:',
      options: ['Cache HTTP requests', 'Store and search embeddings', 'Run SQL queries', 'Train models'],
      correctAnswer: 1,
    },
    {
      question: 'Embeddings represent text as:',
      options: ['Keywords', 'Numerical vectors', 'Markdown', 'Base64'],
      correctAnswer: 1,
    },
  ],
}

// Fallback question set for topics without a curated bank.
function fallbackQuestions(topic) {
  return [
    {
      question: `Which of the following best describes "${topic}"?`,
      options: ['A core concept of the topic', 'Unrelated to this topic', 'A tool used in testing', 'A database schema'],
      correctAnswer: 0,
    },
    {
      question: `When studying ${topic}, which approach is most effective?`,
      options: ['Skipping fundamentals', 'Practical application and practice', 'Memorizing only', 'Ignoring prerequisites'],
      correctAnswer: 1,
    },
    {
      question: `What is the best first step to master ${topic}?`,
      options: ['Learn the core principles', 'Build a huge project immediately', 'Buy advanced books only', 'Skip straight to interviews'],
      correctAnswer: 0,
    },
    {
      question: `Which skill pairs most closely with ${topic}?`,
      options: ['Problem solving', 'Memory games', 'Typing speed', 'Spreadsheet macros'],
      correctAnswer: 0,
    },
    {
      question: `To validate your understanding of ${topic}, you should:`,
      options: ['Take practice assessments', 'Move to the next topic', 'Stop learning', 'Only watch videos'],
      correctAnswer: 0,
    },
  ]
}

export function getQuestionsForTopic(topic) {
  return ASSESSMENT_BANK[topic] || fallbackQuestions(topic)
}

export function getAssessmentTopics(careerGoal) {
  const byCareer = {
    'Java Developer': ['Java Basics', 'OOP', 'Collections Framework', 'Exception Handling', 'Multithreading', 'Java 8+ Features', 'JDBC', 'SQL', 'Spring Boot', 'REST API'],
    'Full Stack Developer': ['HTML & CSS', 'JavaScript', 'React', 'Node.js', 'REST API', 'SQL'],
    'Cloud Engineer': ['Linux', 'Networking', 'Docker', 'Kubernetes', 'Terraform'],
    'Data Scientist': ['Python', 'Statistics', 'Pandas & NumPy', 'Machine Learning', 'scikit-learn'],
    'DevOps Engineer': ['Linux', 'Docker', 'Kubernetes', 'Terraform'],
    'AI/ML Engineer': ['Python', 'Machine Learning', 'scikit-learn', 'Neural Networks', 'LLM & RAG'],
  }
  return byCareer[careerGoal] || Object.keys(ASSESSMENT_BANK).slice(0, 6)
}
