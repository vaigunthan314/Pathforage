const TOPIC_CONTENT = {  'Java Basics': {
    title: 'Java Basics',
    subtitle: 'Core syntax and fundamentals of the Java programming language',
    estimatedTime: '60 min',
    whyItMatters: 'Java is one of the most widely used programming languages in enterprise software development. Its "write once, run anywhere" philosophy, strong type system, and rich standard library make it the backbone of millions of applications worldwide.',
    learningObjectives: [
      'Understand the structure of a Java program and how it executes',
      'Declare and use primitive data types and variables',
      'Write conditional statements and loops to control program flow',
      'Define and call methods with parameters and return values',
      'Use arrays and basic string operations'
    ],
    sections: [
      {
        title: 'Your First Java Program',
        content: 'Every Java program begins with a class definition. The main method serves as the entry point where execution starts. When you compile a Java source file, the compiler produces bytecode that runs on the Java Virtual Machine (JVM), which is why Java programs are platform-independent. The public class name must match the filename.',
        examples: ['java HelloWorld', 'javac HelloWorld.java'],
        codeSnippet: { language: 'java', code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' }
      },
      {
        title: 'Primitive Data Types',
        content: 'Java has eight primitive data types: byte, short, int, long, float, double, char, and boolean. Each type has a fixed size in memory, which ensures consistent behavior across platforms. Choosing the right type matters for memory efficiency and preventing overflow errors. Integers default to int (32 bits) while floating-point values default to double (64 bits).',
        examples: ['int count = 42;', 'double price = 19.99;', 'boolean isActive = true;'],
        codeSnippet: { language: 'java', code: 'public class DataTypes {\n    public static void main(String[] args) {\n        byte age = 25;\n        int population = 1400000;\n        long distance = 150000000L;\n        float temperature = 36.6f;\n        double pi = 3.141592653589793;\n        char grade = \'A\';\n        boolean passed = true;\n\n        System.out.println("Age: " + age);\n        System.out.println("Pi: " + pi);\n    }\n}' }
      },
      {
        title: 'Control Flow',
        content: 'Java provides if-else statements for conditional logic, and for, while, and do-while loops for repetition. The switch statement offers an alternative to multiple if-else chains when comparing a single variable against known values. Enhanced for loops (for-each) simplify iteration over arrays and collections.',
        examples: ['if (score >= 90) { grade = "A"; }', 'for (int i = 0; i < 10; i++) { ... }'],
        codeSnippet: { language: 'java', code: 'public class ControlFlow {\n    public static void main(String[] args) {\n        int[] scores = {85, 92, 78, 95, 88};\n\n        for (int score : scores) {\n            if (score >= 90) {\n                System.out.println(score + " - Excellent");\n            } else if (score >= 80) {\n                System.out.println(score + " - Good");\n            } else {\n                System.out.println(score + " - Needs improvement");\n            }\n        }\n    }\n}' }
      },
      {
        title: 'Methods',
        content: 'Methods are reusable blocks of code that perform a specific task. Every method has a return type, a name, parameters, and a body. The main method is special because the JVM calls it to start your program. You can overload methods by giving them the same name but different parameter lists, which is a form of polymorphism.',
        examples: ['public static int add(int a, int b)', 'System.out.println("text")'],
        codeSnippet: { language: 'java', code: 'public class Methods {\n    public static void main(String[] args) {\n        int result = add(10, 20);\n        System.out.println("10 + 20 = " + result);\n        System.out.println("Max: " + findMax(15, 42));\n    }\n\n    static int add(int a, int b) {\n        return a + b;\n    }\n\n    static int findMax(int a, int b) {\n        return (a > b) ? a : b;\n    }\n}' }
      },
      {
        title: 'Arrays and Strings',
        content: 'Arrays hold a fixed number of elements of the same type. They are zero-indexed, meaning the first element is at index 0. Java arrays know their own length via the .length property. Strings in Java are objects of the String class, not primitives. They are immutable, meaning every modification creates a new String object, which is important for performance and security.',
        examples: ['String[] names = {"Alice", "Bob"};', 'String s = "Hello"; s.length();'],
        codeSnippet: { language: 'java', code: 'public class ArraysAndStrings {\n    public static void main(String[] args) {\n        int[] numbers = {10, 20, 30, 40, 50};\n        for (int i = 0; i < numbers.length; i++) {\n            System.out.println("Index " + i + ": " + numbers[i]);\n        }\n\n        String greeting = "Hello, World!";\n        System.out.println("Length: " + greeting.length());\n        System.out.println("Uppercase: " + greeting.toUpperCase());\n        System.out.println("Contains World: " + greeting.contains("World"));\n    }\n}' }
      }
    ],
    keyTakeaways: [
      'Java programs are compiled to bytecode and run on the JVM, enabling platform independence',
      'Primitive types have fixed sizes; use the right type to prevent overflow and save memory',
      'Control flow statements (if-else, for, while) direct program execution',
      'Methods encapsulate reusable logic and support overloading for flexibility',
      'Strings are immutable objects, so modifications create new String instances'
    ],
    practice: [
      {
        question: 'What is the entry point of a Java application?',
        options: ['The constructor of the main class', 'The main() method', 'Any public static method', 'The init() method'],
        correctIndex: 1,
        explanation: 'The JVM looks for the public static void main(String[] args) method as the entry point. Without this method, the program cannot be executed.'
      },
      {
        question: 'Which of the following is NOT a primitive data type in Java?',
        options: ['int', 'boolean', 'String', 'char'],
        correctIndex: 2,
        explanation: 'String is a class in the java.lang package, not a primitive type. It is an object, unlike the eight primitive types (byte, short, int, long, float, double, char, boolean).'
      },
      {
        question: 'What happens when you modify a String in Java?',
        options: ['The original String is changed in memory', 'A new String object is created and the reference changes', 'The String is mutable like StringBuilder', 'A compile-time error is thrown'],
        correctIndex: 1,
        explanation: 'Strings in Java are immutable. Any operation like concatenation or substring creates a new String object rather than modifying the original.'
      },
      {
        question: 'What is the default value of an int variable in Java?',
        options: ['null', '1', '0', 'undefined'],
        correctIndex: 2,
        explanation: 'Primitive types in Java have default values: int defaults to 0, boolean to false, double to 0.0, and reference types to null.'
      },
      {
        question: 'Which loop guarantees the body executes at least once?',
        options: ['for loop', 'while loop', 'do-while loop', 'enhanced for loop'],
        correctIndex: 2,
        explanation: 'A do-while loop checks the condition after executing the body, so the body always runs at least once regardless of the condition.'
      }
    ]
  },

  'OOPs Concepts': {
    title: 'Object-Oriented Programming',
    subtitle: 'Mastering encapsulation, inheritance, polymorphism, and abstraction',
    estimatedTime: '75 min',
    whyItMatters: 'Object-Oriented Programming is a paradigm that organizes code into reusable, modular structures called objects. OOP principles make code easier to maintain, extend, and debug by modeling real-world entities and their relationships.',
    learningObjectives: [
      'Understand the four pillars of OOP: encapsulation, inheritance, polymorphism, and abstraction',
      'Define classes with constructors, fields, and methods',
      'Implement inheritance and use super to extend parent classes',
      'Apply polymorphism through method overriding and interface implementation',
      'Design abstract classes and interfaces for flexible architectures'
    ],
    sections: [
      {
        title: 'Classes and Objects',
        content: 'A class is a blueprint for creating objects. It defines properties (fields) and behaviors (methods). An object is an instance of a class with its own state. Constructors initialize object state at creation time. Java supports constructor overloading, allowing multiple ways to create an object.',
        examples: ['Car myCar = new Car("Toyota", 2024);'],
        codeSnippet: { language: 'java', code: 'public class Car {\n    private String make;\n    private int year;\n    private int speed;\n\n    public Car(String make, int year) {\n        this.make = make;\n        this.year = year;\n        this.speed = 0;\n    }\n\n    public void accelerate(int amount) {\n        speed += amount;\n        System.out.println(make + " accelerated to " + speed + " mph");\n    }\n\n    public static void main(String[] args) {\n        Car myCar = new Car("Toyota", 2024);\n        myCar.accelerate(30);\n        myCar.accelerate(20);\n    }\n}' }
      },
      {
        title: 'Encapsulation',
        content: 'Encapsulation hides internal state and exposes only what is necessary through public methods (getters and setters). Fields are marked private to prevent direct external access. This protects data integrity and allows you to change internal implementation without breaking client code. It is the foundation of the principle of least privilege.',
        examples: ['private int age;', 'public int getAge() { return age; }'],
        codeSnippet: { language: 'java', code: 'public class BankAccount {\n    private double balance;\n    private String owner;\n\n    public BankAccount(String owner, double initialDeposit) {\n        this.owner = owner;\n        this.balance = initialDeposit;\n    }\n\n    public double getBalance() {\n        return balance;\n    }\n\n    public void deposit(double amount) {\n        if (amount <= 0) {\n            throw new IllegalArgumentException("Deposit must be positive");\n        }\n        balance += amount;\n    }\n\n    public void withdraw(double amount) {\n        if (amount > balance) {\n            throw new IllegalArgumentException("Insufficient funds");\n        }\n        balance -= amount;\n    }\n}' }
      },
      {
        title: 'Inheritance',
        content: 'Inheritance allows a subclass to inherit fields and methods from a superclass, promoting code reuse. The extends keyword establishes the parent-child relationship. The super keyword calls the parent constructor or accesses parent methods. Java supports single inheritance only, each class can extend exactly one parent class, but can implement multiple interfaces.',
        examples: ['class ElectricCar extends Car', 'super(make, year);'],
        codeSnippet: { language: 'java', code: 'public class Animal {\n    protected String name;\n\n    public Animal(String name) {\n        this.name = name;\n    }\n\n    public void speak() {\n        System.out.println(name + " makes a sound");\n    }\n}\n\npublic class Dog extends Animal {\n    private String breed;\n\n    public Dog(String name, String breed) {\n        super(name);\n        this.breed = breed;\n    }\n\n    @Override\n    public void speak() {\n        System.out.println(name + " barks!");\n    }\n\n    public static void main(String[] args) {\n        Dog rex = new Dog("Rex", "German Shepherd");\n        rex.speak();\n    }\n}' }
      },
      {
        title: 'Polymorphism',
        content: 'Polymorphism lets you treat objects of different subclasses through a common parent type. Method overriding allows a subclass to provide its own implementation of a parent method. At runtime, Java determines which version of the method to call based on the actual object type, not the reference type. This enables flexible, extensible designs.',
        examples: ['Animal a = new Dog("Rex", "Shepherd"); a.speak();'],
        codeSnippet: { language: 'java', code: 'public class Shape {\n    public double area() {\n        return 0;\n    }\n}\n\npublic class Circle extends Shape {\n    private double radius;\n    public Circle(double radius) { this.radius = radius; }\n\n    @Override\n    public double area() {\n        return Math.PI * radius * radius;\n    }\n}\n\npublic class Rectangle extends Shape {\n    private double width, height;\n    public Rectangle(double w, double h) { this.width = w; this.height = h; }\n\n    @Override\n    public double area() {\n        return width * height;\n    }\n}\n\n// Polymorphism in action\nShape[] shapes = { new Circle(5), new Rectangle(4, 6) };\nfor (Shape s : shapes) {\n    System.out.println("Area: " + s.area());\n}' }
      },
      {
        title: 'Abstraction',
        content: 'Abstraction hides complex implementation details behind simple interfaces. Abstract classes cannot be instantiated and may contain abstract methods that subclasses must implement. Interfaces define a contract of methods that any implementing class must provide. Since Java 8, interfaces can also have default and static methods.',
        examples: ['abstract class Vehicle', 'interface Drawable { void draw(); }'],
        codeSnippet: { language: 'java', code: 'public interface Flyable {\n    void fly();\n\n    default void land() {\n        System.out.println("Landing safely");\n    }\n}\n\npublic interface Swimmable {\n    void swim();\n}\n\npublic class Duck implements Flyable, Swimmable {\n    @Override\n    public void fly() {\n        System.out.println("Duck is flying");\n    }\n\n    @Override\n    public void swim() {\n        System.out.println("Duck is swimming");\n    }\n}' }
      }
    ],
    keyTakeaways: [
      'Encapsulation protects data by making fields private and exposing methods for controlled access',
      'Inheritance promotes code reuse by allowing subclasses to extend parent classes',
      'Polymorphism enables treating different objects uniformly through a common interface',
      'Abstraction hides complexity behind abstract classes and interfaces',
      'Java supports single inheritance for classes but multiple inheritance through interfaces'
    ],
    practice: [
      {
        question: 'Which OOP principle hides internal state and exposes only necessary methods?',
        options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
        correctIndex: 2,
        explanation: 'Encapsulation restricts direct access to object fields and provides public getters/setters. This protects data integrity and decouples the internal implementation from the public API.'
      },
      {
        question: 'Can a Java class implement multiple interfaces?',
        options: ['No, Java only allows single inheritance', 'Yes, a class can implement any number of interfaces', 'Only if the interfaces share no common methods', 'Only in Java 17 and later'],
        correctIndex: 1,
        explanation: 'Java allows a class to implement multiple interfaces, which is how Java achieves a form of multiple inheritance. This enables objects to have multiple type behaviors.'
      },
      {
        question: 'What keyword is used to call a parent class constructor?',
        options: ['this', 'super', 'extends', 'parent'],
        correctIndex: 1,
        explanation: 'The super keyword calls the parent class constructor. It must be the first statement in the child constructor. this() calls another constructor in the same class.'
      },
      {
        question: 'What is method overriding?',
        options: ['Defining a method with the same name but different parameters in a subclass', 'Defining a method in a subclass that replaces a parent method with the same signature', 'Calling a parent method from a child class', 'Defining multiple methods with the same name in one class'],
        correctIndex: 1,
        explanation: 'Method overriding occurs when a subclass provides its own implementation of a method defined in its parent class, using the same name and parameter list.'
      },
      {
        question: 'Which keyword is used to prevent a class from being extended?',
        options: ['abstract', 'final', 'static', 'private'],
        correctIndex: 1,
        explanation: 'The final keyword prevents a class from being subclassed. A final class cannot have any child classes, which can improve security and performance.'
      }
    ]
  },

  'Collections Framework': {
    title: 'Collections Framework',
    subtitle: 'Working with lists, sets, maps, and queues in Java',
    estimatedTime: '60 min',
    whyItMatters: 'The Collections Framework provides standardized data structures for storing and manipulating groups of objects. Knowing when to use ArrayList vs LinkedList, HashSet vs TreeSet, or HashMap vs TreeMap is essential for writing efficient Java programs.',
    learningObjectives: [
      'Understand the Collection hierarchy and common interfaces',
      'Use List, Set, and Map implementations appropriately',
      'Iterate over collections using enhanced for loops and iterators',
      'Apply generics for type safety',
      'Use utility methods from Collections and Arrays classes'
    ],
    sections: [
      {
        title: 'The Collection Hierarchy',
        content: 'The Collections Framework is organized around several key interfaces: Collection (root), List (ordered, allows duplicates), Set (no duplicates), Queue (FIFO ordering), and Map (key-value pairs). Each interface has multiple implementations optimized for different use cases. Understanding these interfaces helps you choose the right data structure.',
        examples: ['List<String> names = new ArrayList<>();', 'Set<Integer> ids = new HashSet<>();'],
        codeSnippet: { language: 'java', code: 'import java.util.*;\n\npublic class CollectionBasics {\n    public static void main(String[] args) {\n        List<String> fruits = new ArrayList<>();\n        fruits.add("Apple");\n        fruits.add("Banana");\n        fruits.add("Cherry");\n        fruits.add("Apple");\n\n        System.out.println("Fruits: " + fruits);\n        System.out.println("Size: " + fruits.size());\n        System.out.println("Contains Banana: " + fruits.contains("Banana"));\n\n        Set<String> uniqueFruits = new HashSet<>(fruits);\n        System.out.println("Unique: " + uniqueFruits);\n    }\n}' }
      },
      {
        title: 'List Implementations',
        content: 'ArrayList uses a dynamic array internally, providing O(1) random access but O(n) insertion and deletion in the middle. LinkedList implements both List and Deque interfaces, using a doubly-linked list that offers O(1) insertion/deletion at known positions but O(n) access by index. For most use cases, ArrayList is preferred due to better cache locality.',
        examples: ['ArrayList<String> list = new ArrayList<>();', 'LinkedList<String> queue = new LinkedList<>();'],
        codeSnippet: { language: 'java', code: 'import java.util.*;\n\npublic class ListDemo {\n    public static void main(String[] args) {\n        ArrayList<String> list = new ArrayList<>();\n        list.add("Java");\n        list.add("Python");\n        list.add("C++");\n        list.add(1, "Rust");\n\n        list.remove("C++");\n\n        for (int i = 0; i < list.size(); i++) {\n            System.out.println(i + ": " + list.get(i));\n        }\n    }\n}' }
      },
      {
        title: 'Map Implementations',
        content: 'HashMap stores key-value pairs and provides O(1) average-case lookup. It does not guarantee ordering. TreeMap keeps entries sorted by key using a red-black tree, offering O(log n) operations. LinkedHashMap maintains insertion order. Maps are used extensively for caching, counting, and building indexes.',
        examples: ['Map<String, Integer> ages = new HashMap<>();', 'ages.put("Alice", 30);'],
        codeSnippet: { language: 'java', code: 'import java.util.*;\n\npublic class MapDemo {\n    public static void main(String[] args) {\n        Map<String, Integer> wordCount = new HashMap<>();\n        String text = "the cat sat on the mat the cat";\n\n        for (String word : text.split(" ")) {\n            wordCount.merge(word, 1, Integer::sum);\n        }\n\n        System.out.println("Word counts: " + wordCount);\n\n        for (Map.Entry<String, Integer> entry : wordCount.entrySet()) {\n            System.out.println(entry.getKey() + " -> " + entry.getValue());\n        }\n    }\n}' }
      },
      {
        title: 'Iterating and Sorting',
        content: 'Java provides several ways to iterate collections: enhanced for loop, iterator pattern, streams, and forEach with lambda expressions. Sorting can be done using Collections.sort() for natural ordering or a custom Comparator for custom logic. Lambda expressions in Java 8+ make comparator creation much cleaner.',
        examples: ['Collections.sort(list);', 'list.stream().filter(x -> x.length() > 3).collect(toList());'],
        codeSnippet: { language: 'java', code: 'import java.util.*;\nimport java.util.stream.*;\n\npublic class IterationDemo {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList("Charlie", "Alice", "Bob", "Diana");\n\n        Collections.sort(names);\n        System.out.println("Sorted: " + names);\n\n        names.sort(Comparator.comparingInt(String::length));\n        System.out.println("By length: " + names);\n\n        List<String> filtered = names.stream()\n            .filter(name -> name.length() > 3)\n            .map(String::toUpperCase)\n            .collect(Collectors.toList());\n        System.out.println("Filtered: " + filtered);\n    }\n}' }
      }
    ],
    keyTakeaways: [
      'Choose ArrayList for most list use cases due to O(1) random access',
      'HashMap provides O(1) average-case lookup for key-value data',
      'TreeMap and TreeSet maintain sorted order at the cost of O(log n) operations',
      'Use generics to enforce type safety at compile time',
      'Streams provide a functional approach to processing collections'
    ],
    practice: [
      {
        question: 'Which implementation is best for frequent random access by index?',
        options: ['LinkedList', 'ArrayList', 'HashSet', 'TreeMap'],
        correctIndex: 1,
        explanation: 'ArrayList uses an array internally, providing O(1) random access via get(index). LinkedList requires O(n) traversal to reach a specific index.'
      },
      {
        question: 'What does the HashMap.merge() method do?',
        options: ['Removes duplicate keys', 'Combines two maps into one', 'Updates a value using a remapping function', 'Sorts the map by values'],
        correctIndex: 2,
        explanation: 'merge(key, value, remappingFunction) updates the value for a key using the provided function. In the word count example, it increments the count by 1 for each occurrence.'
      },
      {
        question: 'Which collection interface does not allow duplicate elements?',
        options: ['List', 'Queue', 'Set', 'Deque'],
        correctIndex: 2,
        explanation: 'The Set interface models a collection that contains no duplicate elements. Implementations like HashSet, TreeSet, and LinkedHashSet enforce this constraint.'
      },
      {
        question: 'What is the difference between ArrayList and LinkedList for adding elements at the beginning?',
        options: ['ArrayList is faster', 'LinkedList is faster', 'They are the same speed', 'Neither supports adding at the beginning'],
        correctIndex: 1,
        explanation: 'LinkedList provides O(1) insertion at the beginning by adjusting pointers. ArrayList must shift all elements right, making it O(n) for prepending.'
      },
      {
        question: 'What does Collections.unmodifiableList() return?',
        options: ['A new list with doubled size', 'A read-only view of the original list', 'A copy of the list that cannot grow', 'An empty list'],
        correctIndex: 1,
        explanation: 'unmodifiableList returns a view that throws UnsupportedOperationException on any modification attempt. Changes to the original list are still reflected.'
      }
    ]
  },

  'Exception Handling': {
    title: 'Exception Handling',
    subtitle: 'Managing errors gracefully with try-catch and custom exceptions',
    estimatedTime: '45 min',
    whyItMatters: 'Robust programs must handle unexpected situations like invalid input, network failures, or file errors. Java\'s exception handling mechanism provides a structured way to detect, report, and recover from errors without crashing the application.',
    learningObjectives: [
      'Distinguish between checked and unchecked exceptions',
      'Use try-catch-finally blocks to handle exceptions',
      'Create and throw custom exceptions',
      'Apply best practices for exception handling in production code'
    ],
    sections: [
      {
        title: 'Types of Exceptions',
        content: 'Java exceptions fall into two categories: checked and unchecked. Checked exceptions (IOException, SQLException) must be declared or caught because they represent recoverable conditions. Unchecked exceptions (NullPointerException, IllegalArgumentException) extend RuntimeException and typically indicate programming errors. Errors (OutOfMemoryError) are serious system-level problems that should not be caught.',
        examples: ['try { ... } catch (IOException e) { ... }', 'throws IOException'],
        codeSnippet: { language: 'java', code: 'public class ExceptionTypes {\n    public static void main(String[] args) {\n        try {\n            FileReader file = new FileReader("config.txt");\n            BufferedReader reader = new BufferedReader(file);\n            String line = reader.readLine();\n            System.out.println(line);\n        } catch (FileNotFoundException e) {\n            System.out.println("Config file not found");\n        } catch (IOException e) {\n            System.out.println("Error reading file: " + e.getMessage());\n        }\n\n        try {\n            int[] arr = new int[5];\n            System.out.println(arr[10]);\n        } catch (ArrayIndexOutOfBoundsException e) {\n            System.out.println("Index out of bounds: " + e.getMessage());\n        }\n    }\n}' }
      },
      {
        title: 'Try-Catch-Finally',
        content: 'The try block encloses code that might throw an exception. Catch blocks handle specific exception types. The finally block always executes, whether an exception occurred or not, making it ideal for cleanup like closing resources. Multiple catch blocks should be ordered from most specific to most general. Since Java 7, try-with-resources automatically closes AutoCloseable resources.',
        examples: ['try (FileReader fr = new FileReader("data.txt")) { ... }'],
        codeSnippet: { language: 'java', code: 'public class TryCatchFinally {\n    public static void main(String[] args) {\n        try (BufferedReader reader = new BufferedReader(\n                new FileReader("data.txt"))) {\n            String line;\n            while ((line = reader.readLine()) != null) {\n                System.out.println(line);\n            }\n        } catch (FileNotFoundException e) {\n            System.out.println("File not found");\n        } catch (IOException e) {\n            System.out.println("Read error: " + e.getMessage());\n        } finally {\n            System.out.println("Cleanup complete");\n        }\n    }\n}' }
      },
      {
        title: 'Custom Exceptions',
        content: 'Creating custom exceptions lets you define application-specific error conditions with meaningful names and context. Extend Exception for checked exceptions or RuntimeException for unchecked ones. Include constructors that accept messages and cause exceptions for proper chaining. Custom exceptions make error handling more expressive and debugging easier.',
        examples: ['class InsufficientFundsException extends Exception', 'throw new InsufficientFundsException("Balance: " + balance);'],
        codeSnippet: { language: 'java', code: 'public class InsufficientFundsException extends Exception {\n    private double deficit;\n\n    public InsufficientFundsException(String message, double deficit) {\n        super(message);\n        this.deficit = deficit;\n    }\n\n    public double getDeficit() {\n        return deficit;\n    }\n}\n\npublic class Wallet {\n    private double balance;\n    public Wallet(double balance) { this.balance = balance; }\n\n    public void pay(double amount) throws InsufficientFundsException {\n        if (amount > balance) {\n            throw new InsufficientFundsException(\n                "Not enough money. Deficit: " + (amount - balance),\n                amount - balance);\n        }\n        balance -= amount;\n    }\n\n    public static void main(String[] args) {\n        Wallet wallet = new Wallet(100);\n        try {\n            wallet.pay(150);\n        } catch (InsufficientFundsException e) {\n            System.out.println(e.getMessage());\n            System.out.println("You need " + e.getDeficit() + " more.");\n        }\n    }\n}' }
      },
      {
        title: 'Best Practices',
        content: 'Never catch generic Exception or Throwable unless absolutely necessary. Catch specific types to avoid masking bugs. Log exceptions with sufficient context for debugging. Use finally or try-with-resources to release resources. Do not use exceptions for flow control in normal logic. Always preserve the cause when wrapping exceptions in custom types.',
        examples: ['catch (IOException e) { throw new ServiceException("Failed", e); }'],
        codeSnippet: { language: 'java', code: '// Bad practice\ntry {\n    processPayment(order);\n} catch (Exception e) {\n    System.out.println("Error");\n}\n\n// Good practice\ntry {\n    processPayment(order);\n} catch (PaymentDeclinedException e) {\n    logger.warn("Payment declined for order {}: {}", order.getId(), e.getMessage());\n    return new PaymentResult(false, e.getMessage());\n} catch (PaymentGatewayException e) {\n    logger.error("Gateway error processing order {}", order.getId(), e);\n    throw new ServiceException("Payment service unavailable", e);\n}' }
      }
    ],
    keyTakeaways: [
      'Checked exceptions must be caught or declared; unchecked exceptions indicate programming errors',
      'Use try-with-resources to automatically close resources like files and streams',
      'Order catch blocks from most specific to most general exception types',
      'Create custom exceptions for application-specific error conditions',
      'Log exceptions with context and never catch generic Exception without good reason'
    ],
    practice: [
      {
        question: 'Which block always executes regardless of whether an exception occurs?',
        options: ['try', 'catch', 'finally', 'else'],
        correctIndex: 2,
        explanation: 'The finally block always executes, whether the try block completes normally or an exception is thrown. This makes it ideal for cleanup operations.'
      },
      {
        question: 'What is a checked exception in Java?',
        options: ['An exception that extends RuntimeException', 'An exception that must be caught or declared in the method signature', 'An exception that occurs at compile time', 'An error that crashes the JVM'],
        correctIndex: 1,
        explanation: 'Checked exceptions extend Exception (not RuntimeException) and must be either caught or declared with the throws keyword. They represent recoverable conditions.'
      },
      {
        question: 'What does try-with-resources do?',
        options: ['Catches all exceptions automatically', 'Automatically closes resources that implement AutoCloseable', 'Replaces all catch blocks', 'Prevents exceptions from being thrown'],
        correctIndex: 1,
        explanation: 'Try-with-resources automatically calls close() on resources declared in the try statement. This ensures resources are properly released even if an exception occurs.'
      },
      {
        question: 'What is the difference between throw and throws?',
        options: ['No difference', 'throw is used to throw an exception, throws declares exceptions a method might throw', 'throw is for checked exceptions, throws for unchecked', 'throws is used in catch blocks'],
        correctIndex: 1,
        explanation: 'throw is a statement that explicitly throws an exception instance. throws is part of a method signature and declares which checked exceptions the method may throw.'
      },
      {
        question: 'Which exception type should you catch first in multiple catch blocks?',
        options: ['The most general exception', 'The most specific exception', 'It does not matter', 'RuntimeException'],
        correctIndex: 1,
        explanation: 'Catch blocks must be ordered from most specific to most general. A more specific exception type must appear before a broader one, otherwise the specific one becomes unreachable.'
      }
    ]
  },

  'Multithreading': {
    title: 'Multithreading',
    subtitle: 'Concurrent programming and parallel execution in Java',
    estimatedTime: '75 min',
    whyItMatters: 'Modern computers have multiple CPU cores, and multithreading allows your programs to leverage them effectively. Understanding threads, synchronization, and concurrent data structures is critical for building responsive applications and high-performance services.',
    learningObjectives: [
      'Create threads using the Thread class and Runnable interface',
      'Understand thread lifecycle and synchronization mechanisms',
      'Use synchronized blocks and locks to prevent race conditions',
      'Apply thread-safe collections and concurrent utilities',
      'Identify and resolve common concurrency issues like deadlocks'
    ],
    sections: [
      {
        title: 'Creating Threads',
        content: 'Java provides two primary ways to create threads: extending the Thread class and implementing the Runnable interface. Runnable is preferred because it allows your class to extend another class while still being runnable. The ExecutorService framework provides higher-level thread management with thread pools, task scheduling, and graceful shutdown.',
        examples: ['Thread t = new Thread(() -> System.out.println("Running"));', 'ExecutorService pool = Executors.newFixedThreadPool(4);'],
        codeSnippet: { language: 'java', code: 'public class ThreadDemo {\n    public static void main(String[] args) {\n        Runnable task = () -> {\n            for (int i = 0; i < 5; i++) {\n                System.out.println(Thread.currentThread().getName() + " - " + i);\n                try { Thread.sleep(100); } catch (InterruptedException e) {}\n            }\n        };\n\n        Thread t1 = new Thread(task, "Worker-1");\n        Thread t2 = new Thread(task, "Worker-2");\n        t1.start();\n        t2.start();\n\n        try {\n            t1.join();\n            t2.join();\n        } catch (InterruptedException e) {\n            Thread.currentThread().interrupt();\n        }\n        System.out.println("Both threads finished");\n    }\n}' }
      },
      {
        title: 'Synchronization',
        content: 'When multiple threads access shared mutable data, race conditions can occur. The synchronized keyword ensures only one thread executes a critical section at a time. synchronized methods lock on the object instance; static synchronized methods lock on the Class object. For finer-grained control, use synchronized blocks with explicit lock objects or the java.util.concurrent.locks package.',
        examples: ['synchronized void increment() { count++; }', 'synchronized(lock) { sharedList.add(item); }'],
        codeSnippet: { language: 'java', code: 'public class Counter {\n    private int count = 0;\n    private final Object lock = new Object();\n\n    public void increment() {\n        synchronized (lock) {\n            count++;\n        }\n    }\n\n    public int getCount() {\n        synchronized (lock) {\n            return count;\n        }\n    }\n\n    public static void main(String[] args) throws InterruptedException {\n        Counter counter = new Counter();\n        Runnable task = () -> {\n            for (int i = 0; i < 1000; i++) {\n                counter.increment();\n            }\n        };\n        Thread t1 = new Thread(task);\n        Thread t2 = new Thread(task);\n        t1.start();\n        t2.start();\n        t1.join();\n        t2.join();\n        System.out.println("Final count: " + counter.getCount());\n    }\n}' }
      },
      {
        title: 'Concurrent Collections',
        content: 'The java.util.concurrent package provides thread-safe collections that avoid the overhead of manual synchronization. ConcurrentHashMap uses lock striping for better performance than Collections.synchronizedMap. CopyOnWriteArrayList is optimized for read-heavy scenarios. BlockingQueue implementations like ArrayBlockingQueue provide producer-consumer patterns out of the box.',
        examples: ['ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();', 'BlockingQueue<String> queue = new LinkedBlockingQueue<>();'],
        codeSnippet: { language: 'java', code: 'import java.util.concurrent.*;\nimport java.util.*;\n\npublic class ConcurrentDemo {\n    public static void main(String[] args) throws InterruptedException {\n        ConcurrentHashMap<String, Integer> wordCount = new ConcurrentHashMap<>();\n        String[] words = {"apple", "banana", "apple", "cherry", "banana", "apple"};\n\n        Arrays.stream(words).parallel().forEach(word -> {\n            wordCount.merge(word, 1, Integer::sum);\n        });\n        System.out.println("Word counts: " + wordCount);\n\n        BlockingQueue<String> queue = new ArrayBlockingQueue<>(5);\n        Thread producer = new Thread(() -> {\n            try {\n                for (int i = 0; i < 10; i++) {\n                    queue.put("Item " + i);\n                    System.out.println("Produced: Item " + i);\n                    Thread.sleep(50);\n                }\n                queue.put("DONE");\n            } catch (InterruptedException e) {\n                Thread.currentThread().interrupt();\n            }\n        });\n\n        Thread consumer = new Thread(() -> {\n            try {\n                String item;\n                while (!(item = queue.take()).equals("DONE")) {\n                    System.out.println("Consumed: " + item);\n                    Thread.sleep(100);\n                }\n            } catch (InterruptedException e) {\n                Thread.currentThread().interrupt();\n            }\n        });\n\n        producer.start();\n        consumer.start();\n        producer.join();\n        consumer.join();\n    }\n}' }
      }
    ],
    keyTakeaways: [
      'Implement Runnable rather than extending Thread for flexible composition',
      'Use synchronized blocks or locks to prevent race conditions on shared state',
      'ConcurrentHashMap and BlockingQueue provide thread-safe alternatives to manual synchronization',
      'Avoid holding multiple locks simultaneously to prevent deadlocks',
      'The ExecutorService framework manages thread pools and task lifecycle'
    ],
    practice: [
      {
        question: 'What problem does the synchronized keyword solve?',
        options: ['Memory leaks', 'Race conditions on shared data', 'Deadlocks only', 'Thread creation overhead'],
        correctIndex: 1,
        explanation: 'Synchronized ensures that only one thread can execute a critical section at a time, preventing race conditions when multiple threads access shared mutable data.'
      },
      {
        question: 'Why is implementing Runnable preferred over extending Thread?',
        options: ['It runs faster', 'It allows extending another class and is more flexible', 'It prevents exceptions', 'It uses less memory'],
        correctIndex: 1,
        explanation: 'Runnable is an interface, so implementing it allows your class to extend another class. It separates the task from the thread mechanism, enabling better composition and reuse.'
      },
      {
        question: 'What is a deadlock?',
        options: ['A thread that runs forever', 'Two or more threads waiting for each other to release locks', 'A thread that throws an exception', 'A thread pool that is exhausted'],
        correctIndex: 1,
        explanation: 'A deadlock occurs when two or more threads each hold a lock the other needs, creating a circular wait. Neither thread can proceed, and the application hangs.'
      },
      {
        question: 'What is a thread pool?',
        options: ['A collection of objects shared between threads', 'A group of pre-created threads that are reused for executing tasks', 'A data structure for thread-safe operations', 'A way to limit CPU usage'],
        correctIndex: 1,
        explanation: 'A thread pool contains a fixed number of reusable threads. Tasks are submitted to the pool and executed by available threads, avoiding the overhead of creating new threads repeatedly.'
      },
      {
        question: 'What is the volatile keyword used for?',
        options: ['Making a variable thread-safe for compound operations', 'Ensuring a variable is always read from main memory, not cached', 'Preventing any thread from accessing the variable', 'Making a variable immutable'],
        correctIndex: 1,
        explanation: 'volatile ensures that reads and writes to a variable go directly to main memory rather than being cached in a thread\'s local cache. This guarantees visibility across threads.'
      }
    ]
  },

  'Java 8+ Features': {
    title: 'Java 8+ Features',
    subtitle: 'Lambdas, streams, optionals, and modern Java idioms',
    estimatedTime: '60 min',
    whyItMatters: 'Java 8 introduced a paradigm shift with lambdas and streams, enabling functional programming patterns in Java. Subsequent versions added records, sealed classes, pattern matching, and text blocks. These features make Java code more concise, expressive, and maintainable.',
    learningObjectives: [
      'Write lambda expressions and use functional interfaces',
      'Process collections with the Stream API',
      'Handle null values safely with Optional',
      'Use method references and default interface methods',
      'Apply modern Java features like records and var'
    ],
    sections: [
      {
        title: 'Lambda Expressions',
        content: 'Lambda expressions provide a concise way to implement anonymous classes for functional interfaces (interfaces with a single abstract method). The syntax is (parameters) -> expression or (parameters) -> { statements }. Lambdas enable passing behavior as data, which is the foundation of functional programming in Java.',
        examples: ['(a, b) -> a + b', 'Runnable r = () -> System.out.println("Hello");'],
        codeSnippet: { language: 'java', code: 'import java.util.*;\nimport java.util.function.*;\n\npublic class LambdaDemo {\n    public static void main(String[] args) {\n        Comparator<String> byLength = (a, b) -> a.length() - b.length();\n\n        List<String> names = Arrays.asList("Charlie", "Al", "Bob", "Diana");\n        names.sort(byLength);\n        System.out.println("Sorted by length: " + names);\n\n        Predicate<Integer> isEven = n -> n % 2 == 0;\n        Function<Integer, String> describe = n -> n + " is " + (isEven.test(n) ? "even" : "odd");\n        Consumer<String> print = System.out::println;\n\n        List.of(1, 2, 3, 4, 5).stream()\n            .filter(isEven)\n            .map(describe)\n            .forEach(print);\n    }\n}' }
      },
      {
        title: 'Stream API',
        content: 'The Stream API provides a declarative approach to processing collections. Streams support intermediate operations (filter, map, sorted) that are lazy, meaning they are not executed until a terminal operation (collect, forEach, reduce) is invoked. This design enables efficient pipeline processing and parallel execution.',
        examples: ['list.stream().filter(x -> x > 10).collect(Collectors.toList());'],
        codeSnippet: { language: 'java', code: 'import java.util.*;\nimport java.util.stream.*;\n\npublic class StreamDemo {\n    public static void main(String[] args) {\n        List<String> names = Arrays.asList("Charlie", "Alice", "Bob", "Diana");\n\n        List<String> result = names.stream()\n            .filter(name -> name.length() > 3)\n            .map(String::toUpperCase)\n            .sorted()\n            .collect(Collectors.toList());\n        System.out.println("Result: " + result);\n\n        int sum = IntStream.rangeClosed(1, 100).sum();\n        System.out.println("Sum 1-100: " + sum);\n    }\n}' }
      },
      {
        title: 'Optional',
        content: 'Optional is a container that may or may not hold a non-null value. It replaces null references with a type-safe alternative that forces you to handle the absent case. Methods like orElse, orElseThrow, and ifPresent provide clean ways to handle missing values without null checks.',
        examples: ['Optional.ofNullable(name).orElse("Unknown")', 'opt.ifPresent(System.out::println);'],
        codeSnippet: { language: 'java', code: 'import java.util.Optional;\n\npublic class OptionalDemo {\n    public static Optional<String> findUserEmail(int userId) {\n        if (userId == 1) return Optional.of("alice@example.com");\n        return Optional.empty();\n    }\n\n    public static void main(String[] args) {\n        String email = findUserEmail(1).orElse("No email found");\n        System.out.println("User 1: " + email);\n\n        String missing = findUserEmail(99).orElse("No email found");\n        System.out.println("User 99: " + missing);\n\n        Optional<String> result = findUserEmail(1)\n            .filter(e -> e.contains("@example.com"))\n            .map(String::toUpperCase);\n        result.ifPresent(System.out::println);\n    }\n}' }
      },
      {
        title: 'Records and Modern Features',
        content: 'Java 16+ introduced records as a concise way to create immutable data classes. Records automatically generate constructors, getters, equals(), hashCode(), and toString(). The var keyword (Java 10+) enables local variable type inference, reducing boilerplate. Text blocks (Java 15+) simplify multi-line strings.',
        examples: ['record Point(int x, int y) {}', 'var list = new ArrayList<String>();'],
        codeSnippet: { language: 'java', code: 'public record Employee(String name, String department, double salary) {\n    public Employee {\n        if (salary < 0) throw new IllegalArgumentException("Salary must be positive");\n    }\n\n    public static void main(String[] args) {\n        var emp = new Employee("Alice", "Engineering", 95000);\n        System.out.println(emp);\n        System.out.println("Name: " + emp.name());\n        System.out.println("Salary: " + emp.salary());\n\n        String json = "{\\n    \\"name\\": \\"" + emp.name() + "\\",\n    \\"department\\": \\"" + emp.department() + "\\"\n}";\n        System.out.println(json);\n    }\n}' }
      }
    ],
    keyTakeaways: [
      'Lambda expressions enable concise anonymous class implementations for functional interfaces',
      'Stream API provides declarative, lazy processing of collections',
      'Optional eliminates null pointer exceptions with type-safe absent value handling',
      'Records reduce boilerplate for immutable data classes',
      'Method references (::) provide even more concise lambda syntax'
    ],
    practice: [
      {
        question: 'What is a functional interface?',
        options: ['An interface with no methods', 'An interface with exactly one abstract method', 'An interface with only default methods', 'An interface that extends Runnable'],
        correctIndex: 1,
        explanation: 'A functional interface has exactly one abstract method and can have multiple default/static methods. It is the target type for lambda expressions.'
      },
      {
        question: 'When does a Stream execute its intermediate operations?',
        options: ['Immediately when called', 'Only when a terminal operation is invoked', 'On a separate thread automatically', 'At compile time'],
        correctIndex: 1,
        explanation: 'Intermediate operations are lazy. They build a pipeline but do not execute until a terminal operation (collect, forEach, reduce) triggers the actual processing.'
      },
      {
        question: 'What does Optional.empty() represent?',
        options: ['A null value', 'An Optional with no value present', 'An empty string', 'A default value'],
        correctIndex: 1,
        explanation: 'Optional.empty() creates an Optional that contains no value. You should use isPresent() or orElse() to handle this case rather than calling get() directly.'
      },
      {
        question: 'What is the difference between map() and flatMap() on a Stream?',
        options: ['No difference', 'map transforms each element, flatMap flattens nested streams into a single stream', 'map is faster than flatMap', 'flatMap is for parallel processing'],
        correctIndex: 1,
        explanation: 'map applies a function to each element producing a new element. flatMap applies a function that returns a stream for each element, then flattens all streams into one.'
      },
      {
        question: 'What does the method reference ClassName::new represent?',
        options: ['A static method call', 'A constructor reference', 'A field reference', 'A superclass reference'],
        correctIndex: 1,
        explanation: 'ClassName::new is a constructor reference that can be used wherever a functional interface expects a function that creates instances. It is shorthand for a lambda that calls the constructor.'
      }
    ]
  },

  'JDBC': {
    title: 'JDBC',
    subtitle: 'Connecting Java applications to relational databases',
    estimatedTime: '60 min',
    whyItMatters: 'JDBC (Java Database Connectivity) is the standard API for connecting Java applications to relational databases. While frameworks like Hibernate abstract away raw JDBC, understanding it is essential for debugging, performance tuning, and working with legacy systems.',
    learningObjectives: [
      'Establish database connections using JDBC drivers',
      'Execute SQL queries and process results with Statement and PreparedStatement',
      'Manage transactions with connection auto-commit settings',
      'Handle connection pooling for production applications',
      'Understand the differences between Statement, PreparedStatement, and CallableStatement'
    ],
    sections: [
      {
        title: 'Connecting to a Database',
        content: 'JDBC connections are established through the DriverManager class using a connection URL, username, and password. Each database has its own JDBC driver (MySQL Connector, PostgreSQL Driver, etc.). The connection URL format varies by database but follows the pattern jdbc:protocol://host:port/database. Always close connections in finally blocks or use try-with-resources.',
        examples: ['jdbc:mysql://localhost:3306/mydb', 'jdbc:postgresql://localhost:5432/mydb'],
        codeSnippet: { language: 'java', code: 'import java.sql.*;\n\npublic class JDBCConnect {\n    public static void main(String[] args) {\n        String url = "jdbc:mysql://localhost:3306/company";\n        String user = "root";\n        String password = "secret";\n\n        try (Connection conn = DriverManager.getConnection(url, user, password)) {\n            System.out.println("Connected to database!");\n            System.out.println("DB Version: " + conn.getMetaData().getDatabaseProductVersion());\n        } catch (SQLException e) {\n            System.out.println("Connection failed: " + e.getMessage());\n        }\n    }\n}' }
      },
      {
        title: 'Executing Queries',
        content: 'Statement is used for simple SQL with no parameters. PreparedStatement precompiles SQL with placeholders (?) to prevent SQL injection and improve performance for repeated queries. ResultSet iterates over query results with a cursor-like interface. Always use PreparedStatement over Statement for any user-supplied input.',
        examples: ['PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id = ?");', 'rs.getString("name");'],
        codeSnippet: { language: 'java', code: 'import java.sql.*;\n\npublic class QueryDemo {\n    public static void main(String[] args) {\n        String url = "jdbc:mysql://localhost:3306/company";\n        String sql = "SELECT id, name, email, salary FROM employees WHERE department = ?";\n\n        try (Connection conn = DriverManager.getConnection(url, "root", "secret");\n             PreparedStatement ps = conn.prepareStatement(sql)) {\n\n            ps.setString(1, "Engineering");\n\n            try (ResultSet rs = ps.executeQuery()) {\n                while (rs.next()) {\n                    int id = rs.getInt("id");\n                    String name = rs.getString("name");\n                    String email = rs.getString("email");\n                    double salary = rs.getDouble("salary");\n                    System.out.printf("%d: %s (%s) - $%.2f%n", id, name, email, salary);\n                }\n            }\n        } catch (SQLException e) {\n            e.printStackTrace();\n        }\n    }\n}' }
      },
      {
        title: 'Inserting, Updating, and Deleting',
        content: 'For INSERT, UPDATE, and DELETE operations, use executeUpdate() which returns the number of affected rows. Use executeBatch() for bulk operations to reduce round trips to the database. Always wrap write operations in transactions to ensure atomicity, either all changes succeed or none are applied.',
        examples: ['ps.executeUpdate();', 'conn.setAutoCommit(false); ... conn.commit();'],
        codeSnippet: { language: 'java', code: 'import java.sql.*;\n\npublic class MutationDemo {\n    public static void main(String[] args) {\n        String url = "jdbc:mysql://localhost:3306/company";\n\n        try (Connection conn = DriverManager.getConnection(url, "root", "secret")) {\n            conn.setAutoCommit(false);\n            String insertSql = "INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)";\n\n            try (PreparedStatement ps = conn.prepareStatement(insertSql)) {\n                ps.setString(1, "Bob Smith");\n                ps.setString(2, "bob@company.com");\n                ps.setString(3, "Engineering");\n                ps.setDouble(4, 85000.00);\n\n                int rows = ps.executeUpdate();\n                System.out.println(rows + " row(s) inserted");\n                conn.commit();\n            } catch (SQLException e) {\n                conn.rollback();\n                throw e;\n            }\n        } catch (SQLException e) {\n            e.printStackTrace();\n        }\n    }\n}' }
      }
    ],
    keyTakeaways: [
      'Always use PreparedStatement to prevent SQL injection and improve performance',
      'Use try-with-resources to ensure connections, statements, and result sets are properly closed',
      'Manage transactions with setAutoCommit(false), commit(), and rollback()',
      'Connection pooling (HikariCP, DBCP) is essential for production database access',
      'Never concatenate user input directly into SQL strings'
    ],
    practice: [
      {
        question: 'Why is PreparedStatement preferred over Statement?',
        options: ['It runs faster always', 'It prevents SQL injection and precompiles queries', 'It supports transactions only', 'It can only be used with MySQL'],
        correctIndex: 1,
        explanation: 'PreparedStatement uses parameterized queries that prevent SQL injection. It also precompiles the SQL, so repeated executions with different parameters are faster.'
      },
      {
        question: 'What does setAutoCommit(false) do?',
        options: ['Disables all database operations', 'Groups multiple operations into a single transaction', 'Prevents other users from accessing the database', 'Automatically rolls back errors'],
        correctIndex: 1,
        explanation: 'Setting auto-commit to false means SQL operations are not automatically committed. You must explicitly call commit() to save changes or rollback() to undo them.'
      },
      {
        question: 'What does executeUpdate() return for an INSERT statement?',
        options: ['The generated primary key', 'The number of rows inserted', 'true if successful', 'The entire inserted row'],
        correctIndex: 1,
        explanation: 'executeUpdate() returns an integer representing the number of rows affected by the SQL statement. For INSERT, this is the number of rows inserted.'
      },
      {
        question: 'What is the purpose of ResultSetMetaData in JDBC?',
        options: ['It executes SQL queries', 'It provides information about the columns in a ResultSet, such as name and type', 'It manages database connections', 'It handles transaction rollback'],
        correctIndex: 1,
        explanation: 'ResultSetMetaData describes the columns of a ResultSet — column names, types, and count. This is useful when the query result structure is not known at compile time.'
      },
      {
        question: 'What happens if you forget to close a JDBC Connection?',
        options: ['Nothing, Java handles it automatically', 'The connection may leak, exhausting the database connection pool over time', 'The database automatically removes it after 30 seconds', 'It causes a compile-time error'],
        correctIndex: 1,
        explanation: 'Unclosed connections are not returned to the connection pool. Over time, this exhausts available connections and causes ConnectionPoolTimeoutException in production systems.'
      }
    ]
  },

  'SQL': {
    title: 'SQL',
    subtitle: 'Querying and manipulating relational database data',
    estimatedTime: '90 min',
    whyItMatters: 'SQL is the universal language for interacting with relational databases. Whether you use MySQL, PostgreSQL, or SQL Server, SQL skills enable you to retrieve, filter, aggregate, and manipulate data efficiently. Mastering SQL joins, subqueries, and indexing is critical for any data-driven application.',
    learningObjectives: [
      'Write SELECT queries with WHERE, ORDER BY, and LIMIT clauses',
      'Perform INSERT, UPDATE, and DELETE operations',
      'Use JOIN operations to combine data from multiple tables',
      'Apply aggregate functions and GROUP BY for data analysis',
      'Create and index tables with appropriate constraints'
    ],
    sections: [
      {
        title: 'Basic Queries',
        content: 'SELECT is the most fundamental SQL statement. It retrieves data from one or more tables. The WHERE clause filters rows based on conditions. ORDER BY sorts results by one or more columns. LIMIT restricts the number of returned rows, which is essential for pagination and preventing excessive data transfer.',
        examples: ['SELECT * FROM employees WHERE salary > 50000 ORDER BY name LIMIT 10;'],
        codeSnippet: { language: 'sql', code: 'CREATE TABLE employees (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) UNIQUE,\n    department VARCHAR(50),\n    salary DECIMAL(10, 2),\n    hire_date DATE\n);\n\nINSERT INTO employees (name, email, department, salary, hire_date) VALUES\n(\'Alice Johnson\', \'alice@company.com\', \'Engineering\', 95000, \'2021-03-15\'),\n(\'Bob Smith\', \'bob@company.com\', \'Marketing\', 72000, \'2020-07-22\'),\n(\'Carol Davis\', \'carol@company.com\', \'Engineering\', 105000, \'2019-01-10\');\n\nSELECT name, department, salary FROM employees ORDER BY salary DESC;\nSELECT * FROM employees WHERE department = \'Engineering\' AND salary > 90000;' }
      },
      {
        title: 'Joins',
        content: 'Joins combine rows from two or more tables based on related columns. INNER JOIN returns only matching rows. LEFT JOIN returns all rows from the left table and matched rows from the right. RIGHT JOIN is the mirror. FULL JOIN returns all rows from both tables. Understanding join types is crucial for accurate data retrieval.',
        examples: ['SELECT e.name, d.name FROM employees e JOIN departments d ON e.dept_id = d.id;'],
        codeSnippet: { language: 'sql', code: 'CREATE TABLE departments (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    name VARCHAR(50),\n    location VARCHAR(100)\n);\n\nINSERT INTO departments (name, location) VALUES\n(\'Engineering\', \'Building A\'),\n(\'Marketing\', \'Building B\'),\n(\'Sales\', \'Building C\');\n\nSELECT e.name, e.salary, d.name AS department\nFROM employees e\nINNER JOIN departments d ON e.department = d.name;\n\nSELECT e.name, d.name AS department\nFROM employees e\nLEFT JOIN departments d ON e.department = d.name;' }
      },
      {
        title: 'Aggregation and Grouping',
        content: 'Aggregate functions (COUNT, SUM, AVG, MIN, MAX) summarize data across rows. GROUP BY divides rows into groups for per-group aggregation. HAVING filters groups after aggregation (unlike WHERE which filters rows before grouping). Window functions like ROW_NUMBER, RANK, and SUM OVER provide analytical capabilities without collapsing rows.',
        examples: ['SELECT department, AVG(salary) FROM employees GROUP BY department HAVING AVG(salary) > 80000;'],
        codeSnippet: { language: 'sql', code: 'SELECT\n    department,\n    COUNT(*) AS headcount,\n    AVG(salary) AS avg_salary,\n    MIN(salary) AS min_salary,\n    MAX(salary) AS max_salary\nFROM employees\nGROUP BY department\nHAVING COUNT(*) >= 2;\n\nSELECT\n    name,\n    department,\n    salary,\n    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank\nFROM employees;' }
      },
      {
        title: 'Indexing and Optimization',
        content: 'Indexes speed up data retrieval at the cost of slower writes and more storage. Create indexes on columns used in WHERE, JOIN, and ORDER BY clauses. Composite indexes (multiple columns) follow the leftmost prefix rule. Use EXPLAIN to analyze query execution plans and identify bottlenecks.',
        examples: ['CREATE INDEX idx_salary ON employees(salary);', 'EXPLAIN SELECT * FROM employees WHERE salary > 80000;'],
        codeSnippet: { language: 'sql', code: 'CREATE INDEX idx_emp_department ON employees(department);\nCREATE INDEX idx_emp_salary ON employees(salary);\nCREATE INDEX idx_emp_dept_salary ON employees(department, salary);\n\nEXPLAIN SELECT e.name, e.salary\nFROM employees e\nWHERE e.department = \'Engineering\' AND e.salary > 90000;' }
      }
    ],
    keyTakeaways: [
      'SELECT with WHERE, ORDER BY, and LIMIT provides precise data retrieval',
      'INNER JOIN returns only matches; LEFT JOIN preserves all left-side rows',
      'GROUP BY with HAVING enables per-group filtering after aggregation',
      'Indexes dramatically speed up reads but slow down writes, index strategically',
      'Window functions provide row-level analytics without collapsing groups'
    ],
    practice: [
      {
        question: 'What is the difference between WHERE and HAVING?',
        options: ['WHERE filters rows before grouping; HAVING filters groups after', 'WHERE is for SELECT; HAVING is for UPDATE', 'They are interchangeable', 'HAVING is faster than WHERE'],
        correctIndex: 0,
        explanation: 'WHERE filters individual rows before GROUP BY creates groups. HAVING filters groups after aggregation. You cannot use aggregate functions in WHERE because they operate on groups.'
      },
      {
        question: 'Which JOIN type returns all rows from both tables?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
        correctIndex: 3,
        explanation: 'FULL OUTER JOIN returns all rows from both tables. When there is no match, the result contains NULL for the missing side.'
      },
      {
        question: 'What does a composite index on (A, B) optimize?',
        options: ['Queries filtering only on B', 'Queries filtering on A, or A and B together', 'Queries filtering on A and B in any order', 'All queries on the table'],
        correctIndex: 1,
        explanation: 'A composite index (A, B) follows the leftmost prefix rule. It optimizes queries that filter on A alone, or A and B together. It does NOT optimize queries filtering only on B.'
      },
      {
        question: 'What is the difference between DELETE and TRUNCATE?',
        options: ['No difference', 'DELETE removes rows with WHERE clause support; TRUNCATE removes all rows and is faster', 'TRUNCATE is slower than DELETE', 'DELETE cannot be rolled back'],
        correctIndex: 1,
        explanation: 'DELETE removes specific rows and is logged row-by-row. TRUNCATE removes all rows by deallocating pages — it is faster, uses fewer logs, and resets auto-increment counters.'
      },
      {
        question: 'Which SQL clause is used to rename a column in a result set?',
        options: ['RENAME', 'AS', 'ALTER', 'SET'],
        correctIndex: 1,
        explanation: 'The AS clause creates an alias for a column or table in a query result. For example, SELECT salary AS annual_salary gives the column a friendlier name.'
      }
    ]
  },

  'Spring Boot': {
    title: 'Spring Boot',
    subtitle: 'Building production-ready Java applications with Spring',
    estimatedTime: '90 min',
    whyItMatters: 'Spring Boot is the most popular framework for building Java web applications. It eliminates the complexity of configuring Spring by providing sensible defaults, embedded servers, and auto-configuration. It is the industry standard for microservices and REST APIs in Java.',
    learningObjectives: [
      'Create a Spring Boot application with Spring Initializr',
      'Understand dependency injection and the Spring IoC container',
      'Build REST controllers and handle HTTP requests',
      'Use Spring Data JPA for database access',
      'Configure application properties and profiles'
    ],
    sections: [
      {
        title: 'Spring Boot Overview',
        content: 'Spring Boot builds on the Spring Framework and adds auto-configuration, embedded servers (Tomcat, Jetty), and production-ready features like health checks and metrics. It uses an opinionated approach by adding the right dependencies, Spring Boot configures your application with minimal code. The @SpringBootApplication annotation combines @Configuration, @EnableAutoConfiguration, and @ComponentScan.',
        examples: ['spring init -n myapp -d web,jpa,mysql', 'java -jar myapp.jar'],
        codeSnippet: { language: 'java', code: '@SpringBootApplication\npublic class MyApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(MyApplication.class, args);\n    }\n}' }
      },
      {
        title: 'Dependency Injection',
        content: 'Dependency Injection (DI) is the core principle of Spring. Instead of creating objects manually, you declare dependencies and Spring injects them. @Component marks a class as a Spring-managed bean. @Autowired injects dependencies by type. Constructor injection is preferred over field injection because it makes dependencies explicit and enables immutable beans.',
        examples: ['@Service', '@Repository', '@Autowired'],
        codeSnippet: { language: 'java', code: '@Service\npublic class OrderService {\n    private final OrderRepository orderRepo;\n    private final PaymentService paymentService;\n\n    public OrderService(OrderRepository orderRepo, PaymentService paymentService) {\n        this.orderRepo = orderRepo;\n        this.paymentService = paymentService;\n    }\n\n    public Order placeOrder(OrderRequest request) {\n        Order order = new Order(request.getItems(), request.getTotal());\n        paymentService.charge(order);\n        return orderRepo.save(order);\n    }\n}\n\n@Repository\npublic interface OrderRepository extends JpaRepository<Order, Long> {\n    List<Order> findByCustomerId(Long customerId);\n}' }
      },
      {
        title: 'REST Controllers',
        content: 'Spring MVC provides annotations to create REST endpoints. @RestController combines @Controller and @ResponseBody. @GetMapping, @PostMapping, @PutMapping, and @DeleteMapping map HTTP methods to handler methods. @RequestBody deserializes JSON request bodies, and @PathVariable extracts URL path segments. ResponseEntity gives full control over HTTP responses.',
        examples: ['@GetMapping("/api/users/{id}")', '@PostMapping("/api/orders")'],
        codeSnippet: { language: 'java', code: '@RestController\n@RequestMapping("/api/users")\npublic class UserController {\n\n    private final UserService userService;\n\n    public UserController(UserService userService) {\n        this.userService = userService;\n    }\n\n    @GetMapping\n    public List<UserDTO> getAllUsers() {\n        return userService.findAll();\n    }\n\n    @GetMapping("/{id}")\n    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {\n        return userService.findById(id)\n            .map(ResponseEntity::ok)\n            .orElse(ResponseEntity.notFound().build());\n    }\n\n    @PostMapping\n    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody CreateUserRequest request) {\n        UserDTO created = userService.create(request);\n        return ResponseEntity.status(HttpStatus.CREATED).body(created);\n    }\n}' }
      },
      {
        title: 'Exception Handling and Validation',
        content: '@ControllerAdvice provides global exception handling for all controllers. @ExceptionHandler catches specific exception types and returns appropriate HTTP responses. Use @Valid with Bean Validation annotations (@NotNull, @Size, @Email) to automatically validate request bodies. Spring Boot integrates with Hibernate Validator for runtime validation.',
        examples: ['@ControllerAdvice', '@ExceptionHandler(ResourceNotFoundException.class)'],
        codeSnippet: { language: 'java', code: '@ControllerAdvice\npublic class GlobalExceptionHandler {\n\n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {\n        ErrorResponse error = new ErrorResponse("NOT_FOUND", ex.getMessage());\n        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);\n    }\n\n    @ExceptionHandler(MethodArgumentNotValidException.class)\n    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {\n        String message = ex.getBindingResult().getFieldErrors().stream()\n            .map(e -> e.getField() + ": " + e.getDefaultMessage())\n            .collect(Collectors.joining(", "));\n        ErrorResponse error = new ErrorResponse("VALIDATION_ERROR", message);\n        return ResponseEntity.badRequest().body(error);\n    }\n}' }
      }
    ],
    keyTakeaways: [
      'Spring Boot auto-configures your application based on classpath dependencies',
      'Constructor injection makes dependencies explicit and enables immutable beans',
      '@RestController with @RequestMapping creates RESTful endpoints',
      '@ControllerAdvice provides centralized exception handling',
      '@Valid with Bean Validation ensures request data integrity'
    ],
    practice: [
      {
        question: 'What does @SpringBootApplication do?',
        options: ['Starts the embedded server only', 'Combines @Configuration, @EnableAutoConfiguration, and @ComponentScan', 'Creates a REST controller', 'Configures the database'],
        correctIndex: 1,
        explanation: '@SpringBootApplication is a composite annotation that enables auto-configuration, component scanning, and configuration in a single annotation.'
      },
      {
        question: 'Why is constructor injection preferred over field injection?',
        options: ['It uses less memory', 'It makes dependencies explicit and enables immutable beans', 'It is faster at runtime', 'It is required by Spring Boot'],
        correctIndex: 1,
        explanation: 'Constructor injection makes all dependencies explicit in the constructor signature. It allows fields to be final (immutable) and makes the class easier to test.'
      },
      {
        question: 'What annotation provides global exception handling?',
        options: ['@ExceptionHandler', '@ControllerAdvice', '@RestController', '@Component'],
        correctIndex: 1,
        explanation: '@ControllerAdvice is a component that intercepts exceptions thrown by controllers. Methods annotated with @ExceptionHandler inside it handle exceptions globally.'
      },
      {
        question: 'What does @RequestParam do in a Spring Controller?',
        options: ['Binds a URL path variable', 'Binds a query parameter or form parameter to a method argument', 'Deserializes the request body', 'Sets a response header'],
        correctIndex: 1,
        explanation: '@RequestParam extracts query parameters (e.g., ?page=0&size=20) or form-encoded data from the request URL and binds them to method parameters.'
      },
      {
        question: 'What is the purpose of @CrossOrigin in Spring Boot?',
        options: ['Enables database access', 'Configures CORS headers so browsers allow cross-origin requests', 'Secures API endpoints', 'Enables HTTPS'],
        correctIndex: 1,
        explanation: '@CrossOrigin adds CORS (Cross-Origin Resource Sharing) headers to responses, allowing the browser to accept responses from specified origins different from the server.'
      }
    ]
  },

  'REST API': {
    title: 'REST API',
    subtitle: 'Designing and consuming RESTful web services',
    estimatedTime: '60 min',
    whyItMatters: 'REST (Representational State Transfer) is the dominant architectural style for web services. Understanding REST principles, HTTP methods, status codes, and API design patterns is essential for building scalable, interoperable systems.',
    learningObjectives: [
      'Understand REST principles and the client-server model',
      'Use HTTP methods (GET, POST, PUT, PATCH, DELETE) correctly',
      'Return appropriate HTTP status codes for different scenarios',
      'Design consistent and intuitive API endpoints',
      'Implement pagination, filtering, and error handling'
    ],
    sections: [
      {
        title: 'REST Principles',
        content: 'REST is an architectural style built on stateless communication using standard HTTP methods. Key principles include statelessness (each request contains all information needed), uniform interface (consistent resource naming), resource-based URLs, and representation-based data transfer (usually JSON). REST APIs are platform-independent.',
        examples: ['GET /api/users', 'POST /api/orders'],
        codeSnippet: { language: 'text', code: 'REST Resource Naming Conventions:\nGET    /api/users          List all users\nGET    /api/users/123      Get user with ID 123\nPOST   /api/users          Create a new user\nPUT    /api/users/123      Update user 123 (full replace)\nPATCH  /api/users/123      Update user 123 (partial)\nDELETE /api/users/123      Delete user 123\n\nGET    /api/users/123/orders    Orders for user 123\nGET    /api/users?role=admin    Filter users by role\nGET    /api/users?page=2&size=10 Paginated results' }
      },
      {
        title: 'HTTP Methods and Status Codes',
        content: 'Each HTTP method has a specific semantic meaning. GET retrieves data and should be idempotent and safe. POST creates new resources. PUT replaces an entire resource (idempotent). PATCH partially updates a resource. DELETE removes a resource (idempotent). Status codes communicate the result: 2xx for success, 3xx for redirects, 4xx for client errors, and 5xx for server errors.',
        examples: ['201 Created', '400 Bad Request', '404 Not Found', '500 Internal Server Error'],
        codeSnippet: { language: 'java', code: '@RestController\n@RequestMapping("/api/products")\npublic class ProductController {\n\n    @GetMapping\n    public ResponseEntity<List<Product>> getAll() {\n        return ResponseEntity.ok(productService.findAll());\n    }\n\n    @GetMapping("/{id}")\n    public ResponseEntity<Product> getById(@PathVariable Long id) {\n        return productService.findById(id)\n            .map(p -> ResponseEntity.ok(p))\n            .orElse(ResponseEntity.notFound().build());\n    }\n\n    @PostMapping\n    public ResponseEntity<Product> create(@Valid @RequestBody ProductRequest req) {\n        Product created = productService.create(req);\n        return ResponseEntity.status(HttpStatus.CREATED)\n            .header("Location", "/api/products/" + created.getId())\n            .body(created);\n    }\n\n    @DeleteMapping("/{id}")\n    public ResponseEntity<Void> delete(@PathVariable Long id) {\n        productService.delete(id);\n        return ResponseEntity.noContent().build();\n    }\n}' }
      },
      {
        title: 'API Design Best Practices',
        content: 'Good API design is intuitive and consistent. Use nouns for resource URLs, not verbs. Version your API (e.g., /api/v1/users) to enable backward compatibility. Support pagination for list endpoints using page/size or cursor-based approaches. Provide meaningful error responses with error codes, messages, and validation details.',
        examples: ['/api/v1/users?page=0&size=20', '{"error": "VALIDATION_FAILED", "message": "Email is required"}'],
        codeSnippet: { language: 'java', code: 'public record PagedResponse<T>(\n    List<T> data,\n    int page,\n    int size,\n    long totalElements,\n    int totalPages\n) {}\n\npublic record ApiError(\n    String code,\n    String message,\n    List<FieldError> fieldErrors,\n    String timestamp\n) {\n    public record FieldError(String field, String message) {}\n}\n\n@GetMapping\npublic ResponseEntity<PagedResponse<UserDTO>> getUsers(\n        @RequestParam(defaultValue = "0") int page,\n        @RequestParam(defaultValue = "20") int size,\n        @RequestParam(required = false) String department) {\n\n    Page<User> userPage = (department != null)\n        ? userService.findByDepartment(department, PageRequest.of(page, size))\n        : userService.findAll(PageRequest.of(page, size));\n\n    PagedResponse<UserDTO> response = new PagedResponse<>(\n        userPage.getContent().stream().map(this::toDTO).collect(Collectors.toList()),\n        userPage.getNumber(),\n        userPage.getSize(),\n        userPage.getTotalElements(),\n        userPage.getTotalPages()\n    );\n    return ResponseEntity.ok(response);\n}' }
      },
      {
        title: 'Consuming REST APIs',
        content: 'Spring provides RestTemplate and WebClient for consuming external REST APIs. RestTemplate is synchronous and blocking, while WebClient supports reactive, non-blocking calls. Always handle errors gracefully when consuming external services, implement retries, circuit breakers, and timeouts to build resilient systems.',
        examples: ['RestTemplate.getForObject(url, String.class)'],
        codeSnippet: { language: 'java', code: '@Service\npublic class ExternalApiService {\n    private final RestTemplate restTemplate;\n    private final String baseUrl;\n\n    public ExternalApiService(RestTemplate restTemplate,\n                               @Value("${external.api.url}") String baseUrl) {\n        this.restTemplate = restTemplate;\n        this.baseUrl = baseUrl;\n    }\n\n    public WeatherData getWeather(String city) {\n        try {\n            String url = baseUrl + "/weather?q=" + city;\n            return restTemplate.getForObject(url, WeatherData.class);\n        } catch (HttpClientErrorException e) {\n            throw new ExternalApiException("Weather service error: " + e.getMessage());\n        } catch (ResourceAccessException e) {\n            throw new ExternalApiException("Weather service unavailable");\n        }\n    }\n}' }
      }
    ],
    keyTakeaways: [
      'Use nouns for resource URLs and HTTP methods to express operations',
      'Return appropriate status codes: 200 OK, 201 Created, 204 No Content, 4xx errors',
      'Version your API to maintain backward compatibility',
      'Paginate list endpoints to handle large datasets efficiently',
      'Handle external API errors with retries, timeouts, and circuit breakers'
    ],
    practice: [
      {
        question: 'Which HTTP method should be used to update a resource?',
        options: ['GET', 'POST', 'PUT or PATCH', 'DELETE'],
        correctIndex: 2,
        explanation: 'PUT replaces an entire resource (idempotent) and PATCH performs a partial update. POST creates new resources.'
      },
      {
        question: 'What does the 201 status code indicate?',
        options: ['Success with no content', 'A new resource was created', 'A redirect', 'A client error'],
        correctIndex: 1,
        explanation: 'HTTP 201 Created indicates that the request resulted in a new resource being created. It is typically returned after a successful POST request.'
      },
      {
        question: 'Why should REST APIs be stateless?',
        options: ['To reduce bandwidth usage', 'To enable horizontal scaling and load balancing', 'To simplify error handling', 'To support file uploads'],
        correctIndex: 1,
        explanation: 'Statelessness means each request contains all information needed to process it. This allows any server to handle any request, enabling horizontal scaling and load balancing.'
      },
      {
        question: 'What does it mean for an API to be idempotent?',
        options: ['It always returns the same status code', 'Making the same request multiple times has the same effect as making it once', 'It processes requests in order', 'It caches responses automatically'],
        correctIndex: 1,
        explanation: 'An idempotent API produces the same result whether a request is sent once or multiple times. GET, PUT, DELETE, and HEAD are idempotent; POST is not.'
      },
      {
        question: 'What HTTP header is used for content negotiation?',
        options: ['Authorization', 'Accept', 'Content-Type', 'Cache-Control'],
        correctIndex: 1,
        explanation: 'The Accept header tells the server which media types the client can process (e.g., application/json). The server uses this to select the appropriate response format.'
      }
    ]
  },

  // ==================== WEB DEVELOPMENT ====================

  'HTML & CSS': {
    title: 'HTML & CSS',
    subtitle: 'Building blocks of the web — structure and styling',
    estimatedTime: '60 min',
    whyItMatters: 'Every website you visit is built on HTML for structure and CSS for presentation. These are the foundational skills for any web developer.',
    learningObjectives: [
      'Create well-structured HTML documents with semantic elements',
      'Style pages using CSS selectors, box model, and layout',
      'Build responsive layouts with Flexbox and Grid'
    ],
    sections: [
      {
        title: 'Semantic HTML',
        content: 'HTML5 introduced semantic elements that describe their meaning to both browsers and developers. Instead of using generic <div> tags everywhere, use <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer>. This improves accessibility, SEO, and code readability. Forms use <input>, <select>, <textarea>, and <button> elements with various type attributes for validation.',
        codeSnippet: { language: 'html', code: '<!DOCTYPE html>\n<html lang="en">\n<head><meta charset="UTF-8"><title>My Page</title></head>\n<body>\n  <header><nav><a href="/">Home</a></nav></header>\n  <main>\n    <article>\n      <h1>Hello World</h1>\n      <p>Welcome to my site.</p>\n    </article>\n  </main>\n  <footer><p>&copy; 2024</p></footer>\n</body>\n</html>' }
      },
      {
        title: 'The Box Model & Selectors',
        content: 'Every HTML element is a rectangular box with content, padding, border, and margin. Understanding the box model is crucial for layout control. CSS selectors target elements by tag, class (.name), ID (#name), or attribute. Specificity determines which rule wins when multiple selectors match the same element: inline styles > IDs > classes > tags.',
        codeSnippet: { language: 'css', code: '.card {\n  background: white;\n  padding: 1.5rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 0.5rem;\n  box-shadow: 0 1px 3px rgba(0,0,0,0.1);\n}\n\n.card h2 {\n  font-size: 1.25rem;\n  margin-bottom: 0.5rem;\n}' }
      },
      {
        title: 'Flexbox & Grid Layout',
        content: 'Flexbox handles one-dimensional layouts (row or column). Set display: flex on a container and use justify-content and align-items to position children. Grid handles two-dimensional layouts (rows AND columns). Define grid-template-columns and grid-template-rows, then place items with grid-column and grid-row. Both are essential for responsive design.',
        codeSnippet: { language: 'css', code: '/* Flexbox */\n.flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}\n\n/* Grid */\n.grid-layout {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 1.5rem;\n}' }
      }
    ],
    keyTakeaways: [
      'Use semantic HTML elements for better accessibility and SEO',
      'The CSS box model: content → padding → border → margin',
      'Flexbox for 1D layouts, Grid for 2D layouts',
      'Mobile-first responsive design with media queries'
    ],
    practice: [
      { question: 'Which CSS property creates a flex container?', options: ['flex: 1', 'display: flex', 'flex-direction: row', 'justify-content: center'], correctIndex: 1, explanation: 'display: flex on a container element enables flexbox layout for its children.' },
      { question: 'What is the correct CSS specificity order (highest to lowest)?', options: ['Tags > Classes > IDs > Inline', 'Inline > IDs > Classes > Tags', 'Classes > Tags > IDs > Inline', 'IDs > Inline > Classes > Tags'], correctIndex: 1, explanation: 'Inline styles have highest specificity, followed by IDs, then classes, then tag selectors.' },
      { question: 'What does box-sizing: border-box do?', options: ['Removes all spacing', 'Includes padding and border in the element total width and height', 'Makes the box transparent', 'Forces margin collapse'], correctIndex: 1, explanation: 'border-box includes padding and border inside the element total width/height, so you can set width and padding without overflow.' },
      { question: 'What is the difference between display: none and visibility: hidden?', options: ['No difference', 'display: none removes the element from layout; visibility: hidden hides it but keeps space', 'visibility: hidden is faster', 'display: none keeps the space'], correctIndex: 1, explanation: 'display: none removes the element entirely from the document flow. visibility: hidden hides the element but it still occupies its space in the layout.' },
      { question: 'What does the position: sticky property do?', options: ['Fixes an element to the viewport', 'Alternates between relative and fixed positioning as the user scrolls', 'Removes the element from the document flow', 'Centers the element on the page'], correctIndex: 1, explanation: 'position: sticky makes an element behave like position: relative until it reaches a specified scroll threshold, then it switches to position: fixed.' }
    ]
  },

  'JavaScript Basics': {
    title: 'JavaScript Basics',
    subtitle: 'Variables, functions, DOM manipulation, and async patterns',
    estimatedTime: '75 min',
    whyItMatters: 'JavaScript powers interactive web pages and is the language of the browser. It is also the foundation for React, Node.js, and modern full-stack development.',
    learningObjectives: [
      'Declare variables with let, const, and understand scope',
      'Write functions and arrow functions',
      'Work with objects, arrays, and modern JS features',
      'Handle asynchronous code with Promises and async/await'
    ],
    sections: [
      {
        title: 'Variables and Scope',
        content: 'Use const for values that should not be reassigned, and let for values that change. var is function-scoped and should be avoided. Block scope means let and const are confined to the nearest curly braces. JavaScript is dynamically typed — you do not declare a variable\'s type, but modern engines optimize based on usage patterns.',
        codeSnippet: { language: 'javascript', code: 'const API_URL = "https://api.example.com";\nlet count = 0;\n\nif (true) {\n  let hidden = "block-scoped";\n  var notHidden = "function-scoped";\n}\n// console.log(hidden); // ReferenceError\nconsole.log(notHidden); // works' }
      },
      {
        title: 'Functions and Arrow Functions',
        content: 'Functions are first-class values in JavaScript — you can pass them as arguments, return them, and assign them to variables. Arrow functions (=>) provide shorter syntax and lexically bind this. Use them for callbacks and array methods. Regular functions are better for object methods when you need dynamic this binding.',
        codeSnippet: { language: 'javascript', code: 'const add = (a, b) => a + b;\n\nconst users = ["Alice", "Bob", "Charlie"];\nconst upper = users.map(u => u.toUpperCase());\n// ["ALICE", "BOB", "CHARLIE"]\n\nconst sum = [1, 2, 3].reduce((acc, n) => acc + n, 0);\n// 6' }
      },
      {
        title: 'Async/Await and Promises',
        content: 'Asynchronous operations (API calls, file reads, timers) return Promises. async/await is syntactic sugar over Promises that makes asynchronous code read like synchronous code. Always wrap await calls in try/catch for error handling. Promise.all runs multiple async operations in parallel.',
        codeSnippet: { language: 'javascript', code: 'async function fetchUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    if (!res.ok) throw new Error("Not found");\n    return await res.json();\n  } catch (err) {\n    console.error("Failed:", err.message);\n    return null;\n  }\n}\n\n// Parallel requests\nconst [users, posts] = await Promise.all([\n  fetch("/api/users"),\n  fetch("/api/posts")\n]);' }
      }
    ],
    keyTakeaways: [
      'Use const by default, let when reassignment is needed, never var',
      'Arrow functions for concise callbacks; regular functions for methods',
      'async/await makes asynchronous code readable and maintainable',
      'Destructuring, spread, and template literals are essential modern features'
    ],
    practice: [
      { question: 'What is the difference between let and const?', options: ['let is global, const is local', 'const cannot be reassigned, let can', 'let is faster than const', 'There is no difference'], correctIndex: 1, explanation: 'const prevents reassignment of the variable binding, but does not make objects immutable. let allows reassignment.' },
      { question: 'What does async/await return?', options: ['A string', 'A callback', 'A Promise', 'undefined'], correctIndex: 2, explanation: 'An async function always returns a Promise. The await keyword pauses execution until the Promise resolves.' },
      { question: 'What is the output of typeof null?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correctIndex: 2, explanation: 'typeof null returns "object" due to a long-standing bug in JavaScript. This is a well-known quirk of the language.' },
      { question: 'What does the spread operator (...) do in an array?', options: ['Concatenates two arrays', 'Expands an iterable into individual elements', 'Removes duplicates', 'Sorts the array'], correctIndex: 1, explanation: 'The spread operator expands an iterable (like an array) into individual elements. It is useful for copying arrays, merging, and passing arguments.' },
      { question: 'What is the difference between == and ===?', options: ['No difference', '=== checks type and value; == performs type coercion before comparing', '== is faster', '=== checks only value'], correctIndex: 1, explanation: '=== is strict equality and checks both type and value without coercion. == is loose equality and coerces types before comparing, which can produce surprising results.' }
    ]
  },

  'React Fundamentals': {
    title: 'React Fundamentals',
    subtitle: 'Components, props, state, hooks, and rendering',
    estimatedTime: '90 min',
    whyItMatters: 'React is the most popular frontend library for building interactive user interfaces. Understanding its component model, state management, and hooks is essential for modern web development.',
    learningObjectives: [
      'Create functional components with props',
      'Manage state with useState and useEffect',
      'Handle events and conditional rendering',
      'Fetch data and manage side effects'
    ],
    sections: [
      {
        title: 'Components and Props',
        content: 'React components are functions that return JSX (HTML-like syntax). Props are inputs passed as function arguments — they are read-only and flow downward from parent to child. Destructure props for clean component signatures. Components should be small, focused, and reusable. The component name must start with a capital letter.',
        codeSnippet: { language: 'jsx', code: 'function UserCard({ name, email, avatar }) {\n  return (\n    <div className="card">\n      <img src={avatar} alt={name} />\n      <h3>{name}</h3>\n      <p>{email}</p>\n    </div>\n  );\n}\n\n// Usage\n<UserCard name="Alice" email="alice@example.com" avatar="/alice.jpg" />' }
      },
      {
        title: 'useState and useEffect',
        content: 'useState holds component state that persists across renders. Call it at the top level of a component. useState returns [value, setter]. The setter triggers a re-render. useEffect handles side effects: data fetching, subscriptions, DOM manipulation. The dependency array controls when the effect re-runs. An empty array [] means run once on mount.',
        codeSnippet: { language: 'jsx', code: 'import { useState, useEffect } from "react";\n\nfunction UserList() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch("/api/users")\n      .then(r => r.json())\n      .then(data => {\n        setUsers(data);\n        setLoading(false);\n      });\n  }, []); // runs once on mount\n\n  if (loading) return <p>Loading...</p>;\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}' }
      },
      {
        title: 'Events and Conditional Rendering',
        content: 'Attach event handlers with camelCase props (onClick, onChange, onSubmit). Prevent default form submission with e.preventDefault(). Conditionally render UI with && (short-circuit), ternary operators, or if/else before the return statement. Lists require a unique key prop on each item for efficient reconciliation.',
        codeSnippet: { language: 'jsx', code: 'function TodoList() {\n  const [items, setItems] = useState([]);\n  const [input, setInput] = useState("");\n\n  const addItem = () => {\n    if (input.trim()) {\n      setItems([...items, { text: input, done: false }]);\n      setInput("");\n    }\n  };\n\n  return (\n    <div>\n      <input value={input} onChange={e => setInput(e.target.value)} />\n      <button onClick={addItem}>Add</button>\n      {items.length === 0 && <p>No items yet</p>}\n      {items.map((item, i) => (\n        <div key={i}>{item.text}</div>\n      ))}\n    </div>\n  );\n}' }
      }
    ],
    keyTakeaways: [
      'Components are pure functions that return JSX',
      'Props flow downward and are read-only',
      'useState for state, useEffect for side effects',
      'Always provide a key prop when rendering lists'
    ],
    practice: [
      { question: 'When does useEffect with [] dependency array run?', options: ['On every render', 'Only on mount', 'When state changes', 'Never'], correctIndex: 1, explanation: 'An empty dependency array means the effect runs only once after the initial render (mount).' },
      { question: 'What is the correct way to update state based on previous state?', options: ['setState(state + 1)', 'setState(prev => prev + 1)', 'setState = state + 1', 'this.state = state + 1'], correctIndex: 1, explanation: 'Use the functional form setState(prev => prev + 1) to ensure you are working with the latest state value.' },
      { question: 'What is the virtual DOM in React?', options: ['A copy of the real DOM stored in the browser', 'A lightweight in-memory representation of the real DOM used for efficient updates', 'A server-side rendering tool', 'A browser extension for debugging'], correctIndex: 1, explanation: 'The virtual DOM is a fast, lightweight copy of the real DOM. React compares the virtual DOM before and after a change to compute the minimal set of actual DOM updates needed.' },
      { question: 'Why must you provide a key prop when rendering lists?', options: ['Keys make the list look pretty', 'Keys help React identify which items changed for efficient reconciliation', 'Keys are required by HTML', 'Keys prevent memory leaks'], correctIndex: 1, explanation: 'Keys give each element a stable identity. React uses them to track items across renders, enabling efficient reordering and updating without re-rendering the entire list.' },
      { question: 'What are props in React?', options: ['Internal component state', 'Read-only inputs passed from parent to child components', 'Side effects triggered by events', 'Global variables accessible everywhere'], correctIndex: 1, explanation: 'Props are read-only data passed from a parent component to a child component. They flow downward and cannot be modified by the receiving component.' }
    ]
  },

  'State & Routing': {
    title: 'State & Routing',
    subtitle: 'Managing application state and navigation with React Router',
    estimatedTime: '60 min',
    whyItMatters: 'As applications grow, managing state across components and handling URL-based navigation become critical. This topic covers state management patterns and client-side routing.',
    learningObjectives: [
      'Use React Context for shared state across components',
      'Set up and navigate between routes with React Router',
      'Handle URL parameters and query strings'
    ],
    sections: [
      {
        title: 'Context API for State Management',
        content: 'React Context provides a way to pass data through the component tree without prop drilling. Create a context with createContext, provide values with a Provider component, and consume values with useContext. Context is ideal for theme, authentication, and locale data that many components need.',
        codeSnippet: { language: 'jsx', code: 'import { createContext, useContext, useState } from "react";\n\nconst AuthContext = createContext(null);\n\nexport function AuthProvider({ children }) {\n  const [user, setUser] = useState(null);\n  const login = (userData) => setUser(userData);\n  const logout = () => setUser(null);\n  return (\n    <AuthContext.Provider value={{ user, login, logout }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}\n\nexport const useAuth = () => useContext(AuthContext);' }
      },
      {
        title: 'React Router',
        content: 'React Router enables client-side routing — navigating between pages without full page reloads. Define routes with <Routes> and <Route>, use <Link> for navigation, and access URL parameters with useParams. Use Navigate component for programmatic redirects and useNavigate hook for imperative navigation.',
        codeSnippet: { language: 'jsx', code: 'import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <nav><Link to="/users">Users</Link></nav>\n      <Routes>\n        <Route path="/users" element={<UserList />} />\n        <Route path="/users/:id" element={<UserDetail />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\n\nfunction UserDetail() {\n  const { id } = useParams();\n  return <h1>User {id}</h1>;\n}' }
      },
      {
        title: 'Protected Routes and Layouts',
        content: 'Protected routes redirect unauthenticated users to a login page. Create a wrapper component that checks auth state and either renders children or redirects. Nested routes let you share layout components across pages — common headers, sidebars, or footers wrap multiple routes.',
        codeSnippet: { language: 'jsx', code: 'function ProtectedRoute({ children }) {\n  const { user } = useAuth();\n  if (!user) return <Navigate to="/login" replace />;\n  return children;\n}\n\n// Usage\n<Route path="/dashboard" element={\n  <ProtectedRoute><Dashboard /></ProtectedRoute>\n} />' }
      }
    ],
    keyTakeaways: [
      'Context eliminates prop drilling for cross-cutting concerns',
      'React Router provides URL-based navigation without page reloads',
      'URL params for dynamic routes, query strings for filtering',
      'Protected routes guard authenticated-only pages'
    ],
    practice: [
      { question: 'What hook gives you access to URL parameters?', options: ['useLocation', 'useParams', 'useNavigate', 'useSearchParams'], correctIndex: 1, explanation: 'useParams returns an object containing the URL path parameters defined in the route.' },
      { question: 'When should you use Context vs prop drilling?', options: ['Always use Context', 'Context for deeply nested shared data, props for 1-2 levels', 'Never use Context', 'Context is faster than props'], correctIndex: 1, explanation: 'Context is ideal when data must pass through many component layers. For 1-2 levels, prop drilling is simpler and more explicit.' },
      { question: 'What is the benefit of using React Router over window.location?', options: ['React Router is faster', 'React Router provides client-side navigation without full page reloads', 'React Router supports server-side rendering only', 'React Router is required for React apps'], correctIndex: 1, explanation: 'React Router enables single-page application navigation by changing the URL and rendering different components without reloading the entire page.' },
      { question: 'What does the Navigate component do in React Router?', options: ['Renders a navigation bar', 'Performs a programmatic redirect to a different route', 'Creates a new browser history entry', 'Navigates between browser tabs'], correctIndex: 1, explanation: 'The Navigate component replaces the current route with a different one, similar to a redirect. It is useful for conditional redirects based on authentication state.' },
      { question: 'What is the difference between URL params and query params in React Router?', options: ['No difference', 'URL params are path segments (/users/:id); query params are key-value pairs (?page=1)', 'Query params are required, URL params are optional', 'URL params are for React only'], correctIndex: 1, explanation: 'URL params are part of the route definition and represent required path segments. Query params are optional key-value pairs after the ? that can be used for filtering or pagination.' }
    ]
  },

  'Node.js & Express': {
    title: 'Node.js & Express',
    subtitle: 'Building servers and APIs with JavaScript on the backend',
    estimatedTime: '75 min',
    whyItMatters: 'Node.js lets you use JavaScript on the server, and Express is the most popular framework for building APIs. Together they power millions of production backends.',
    learningObjectives: [
      'Set up an Express server with routing and middleware',
      'Handle requests, responses, and error handling',
      'Connect to databases and serve REST APIs'
    ],
    sections: [
      {
        title: 'Express Basics',
        content: 'Express is a minimal Node.js framework that provides routing, middleware, and HTTP utilities. An Express app is created with express(), and routes define how the server responds to different HTTP methods and URL paths. Middleware functions execute sequentially, modifying the request/response objects or ending the cycle.',
        codeSnippet: { language: 'javascript', code: 'const express = require("express");\nconst app = express();\n\napp.use(express.json()); // Parse JSON bodies\n\napp.get("/api/users", (req, res) => {\n  res.json([{ id: 1, name: "Alice" }]);\n});\n\napp.post("/api/users", (req, res) => {\n  const user = { id: Date.now(), ...req.body };\n  res.status(201).json(user);\n});\n\napp.listen(3000, () => console.log("Server running on port 3000"));' }
      },
      {
        title: 'Middleware and Error Handling',
        content: 'Middleware functions have access to req, res, and next(). They can log requests, authenticate users, validate input, or transform data. Express error handling uses middleware with four parameters (err, req, res, next). Place error handlers after all routes to catch any unhandled errors.',
        codeSnippet: { language: 'javascript', code: '// Logging middleware\napp.use((req, res, next) => {\n  console.log(`${req.method} ${req.path}`);\n  next();\n});\n\n// Auth middleware\nconst auth = (req, res, next) => {\n  const token = req.headers.authorization;\n  if (!token) return res.status(401).json({ error: "Unauthorized" });\n  req.user = verifyToken(token);\n  next();\n};\n\n// Error handler\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: "Something went wrong" });\n});' }
      },
      {
        title: 'REST API Patterns',
        content: 'A well-designed REST API uses HTTP methods semantically: GET for reading, POST for creating, PUT/PATCH for updating, DELETE for removing. Return appropriate status codes and consistent JSON structures. Use route parameters for specific resources and query parameters for filtering, sorting, and pagination.',
        codeSnippet: { language: 'javascript', code: 'app.get("/api/posts", async (req, res) => {\n  const { page = 1, limit = 10, sort = "-createdAt" } = req.query;\n  const posts = await Post.find()\n    .sort(sort)\n    .skip((page - 1) * limit)\n    .limit(Number(limit));\n  const total = await Post.countDocuments();\n  res.json({ data: posts, total, page: Number(page) });\n});\n\napp.get("/api/posts/:id", async (req, res) => {\n  const post = await Post.findById(req.params.id);\n  if (!post) return res.status(404).json({ error: "Not found" });\n  res.json(post);\n});' }
      }
    ],
    keyTakeaways: [
      'Express routes map HTTP methods and paths to handler functions',
      'Middleware executes in order — place auth/logging before routes',
      'Always handle errors with a catch-all error middleware',
      'Use consistent JSON response structures and status codes'
    ],
    practice: [
      { question: 'What does express.json() middleware do?', options: ['Sends JSON responses', 'Parses incoming JSON request bodies', 'Validates JSON schemas', 'Compresses JSON output'], correctIndex: 1, explanation: 'express.json() parses incoming requests with JSON payloads, making the parsed data available on req.body.' },
      { question: 'How many parameters does an Express error handler have?', options: ['2', '3', '4', '1'], correctIndex: 2, explanation: 'Error handlers must have exactly 4 parameters: (err, req, res, next). Express uses the 4-parameter signature to distinguish error handlers from regular middleware.' },
      { question: 'What is middleware in Express?', options: ['A database driver', 'A function that has access to the request, response, and next function', 'A front-end template engine', 'A type of HTTP status code'], correctIndex: 1, explanation: 'Middleware functions execute during the request-response cycle. They can modify req/res, execute code, end the cycle, or call next() to pass control to the next middleware.' },
      { question: 'What does req.params contain in Express?', options: ['Query string values', 'URL path parameters defined in the route', 'Request headers', 'The request body'], correctIndex: 1, explanation: 'req.params contains route parameters (e.g., /users/:id makes id available as req.params.id). These are extracted from the URL path by Express.' },
      { question: 'What is the purpose of express.static() middleware?', options: ['Sends JSON responses', 'Serves static files like HTML, CSS, images from a directory', 'Compresses responses', 'Logs incoming requests'], correctIndex: 1, explanation: 'express.static() serves static assets from a specified directory, allowing the browser to request files like index.html, styles.css, and images directly.' }
    ]
  },

  'SQL Fundamentals': {
    title: 'SQL Fundamentals',
    subtitle: 'Database operations with Structured Query Language',
    estimatedTime: '60 min',
    whyItMatters: 'SQL is the standard language for interacting with relational databases. Nearly every application stores data in a database, making SQL essential for backend developers.',
    learningObjectives: [
      'Write SELECT queries with filters, sorting, and aggregation',
      'Perform JOINs across multiple tables',
      'Design database schemas with proper normalization'
    ],
    sections: [
      {
        title: 'Queries and Filtering',
        content: 'The SELECT statement retrieves data from tables. Use WHERE to filter rows, ORDER BY to sort results, and LIMIT to restrict output. Aggregate functions (COUNT, SUM, AVG, MIN, MAX) combine multiple rows. GROUP BY groups rows for aggregation, and HAVING filters after grouping.',
        codeSnippet: { language: 'sql', code: 'SELECT department, COUNT(*) as headcount, AVG(salary) as avg_salary\nFROM employees\nWHERE hire_date > \'2023-01-01\'\nGROUP BY department\nHAVING COUNT(*) > 5\nORDER BY avg_salary DESC\nLIMIT 10;' }
      },
      {
        title: 'JOINs',
        content: 'JOINs combine rows from two or more tables based on a related column. INNER JOIN returns only matching rows. LEFT JOIN returns all rows from the left table and matching from the right (NULL if no match). RIGHT JOIN is the reverse. FULL OUTER JOIN returns all rows from both tables.',
        codeSnippet: { language: 'sql', code: 'SELECT o.id, o.total, c.name, c.email\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.id\nWHERE o.total > 100\nORDER BY o.total DESC;\n\nSELECT c.name, COUNT(o.id) as order_count\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY c.id, c.name;' }
      },
      {
        title: 'Schema Design',
        content: 'Good database design follows normalization rules to reduce redundancy. First Normal Form (1NF) ensures each column holds atomic values. Second Normal Form (2NF) removes partial dependencies. Third Normal Form (3NF) removes transitive dependencies. Use primary keys for unique identification and foreign keys for relationships.',
        codeSnippet: { language: 'sql', code: 'CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE posts (\n  id SERIAL PRIMARY KEY,\n  title VARCHAR(255) NOT NULL,\n  body TEXT,\n  author_id INTEGER REFERENCES users(id),\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);' }
      }
    ],
    keyTakeaways: [
      'SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT',
      'INNER JOIN for matching rows, LEFT JOIN for all-left with optional right',
      'Normalize to 3NF to reduce redundancy, denormalize for read performance',
      'Always use parameterized queries to prevent SQL injection'
    ],
    practice: [
      { question: 'Which JOIN returns all rows from the left table?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'], correctIndex: 1, explanation: 'LEFT JOIN returns all rows from the left table and matching rows from the right table. Non-matching right rows appear as NULL.' },
      { question: 'What clause filters groups after aggregation?', options: ['WHERE', 'GROUP BY', 'HAVING', 'FILTER'], correctIndex: 2, explanation: 'HAVING filters groups created by GROUP BY. WHERE filters individual rows before grouping.' },
      { question: 'What is a primary key?', options: ['A column that allows null values', 'A column or set of columns that uniquely identifies each row in a table', 'A column with duplicate values', 'A column used only for sorting'], correctIndex: 1, explanation: 'A primary key uniquely identifies each row. It must contain unique values and cannot be NULL. Only one primary key is allowed per table.' },
      { question: 'What is a foreign key?', options: ['A key from another database', 'A column that references the primary key of another table, creating a relationship', 'A duplicate primary key', 'An encrypted key'], correctIndex: 1, explanation: 'A foreign key is a column that references the primary key of another table, enforcing referential integrity between the two tables.' },
      { question: 'What does the DISTINCT keyword do?', options: ['Removes all rows', 'Eliminates duplicate rows from query results', 'Sorts results in descending order', 'Limits the number of returned rows'], correctIndex: 1, explanation: 'DISTINCT removes duplicate rows from the result set, returning only unique combinations of the selected columns.' }
    ]
  },

  'React': {
    title: 'React',
    subtitle: 'Components, props, state, hooks, and routing',
    estimatedTime: '90 min',
    whyItMatters: 'React is the most popular frontend library for building interactive user interfaces. Understanding its component model, state management, and hooks is essential for modern web development.',
    learningObjectives: [
      'Create functional components with props',
      'Manage state with useState and useEffect',
      'Handle events and conditional rendering',
      'Fetch data and manage side effects'
    ],
    sections: [
      {
        title: 'Components and Props',
        content: 'React components are functions that return JSX (HTML-like syntax). Props are inputs passed as function arguments — they are read-only and flow downward from parent to child. Destructure props for clean component signatures. Components should be small, focused, and reusable. The component name must start with a capital letter.',
        codeSnippet: { language: 'jsx', code: 'function UserCard({ name, email, avatar }) {\n  return (\n    <div className="card">\n      <img src={avatar} alt={name} />\n      <h3>{name}</h3>\n      <p>{email}</p>\n    </div>\n  );\n}' }
      },
      {
        title: 'useState and useEffect',
        content: 'useState holds component state that persists across renders. Call it at the top level of a component. useState returns [value, setter]. The setter triggers a re-render. useEffect handles side effects: data fetching, subscriptions, DOM manipulation. The dependency array controls when the effect re-runs.',
        codeSnippet: { language: 'jsx', code: 'import { useState, useEffect } from "react";\n\nfunction UserList() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch("/api/users")\n      .then(r => r.json())\n      .then(data => { setUsers(data); setLoading(false); });\n  }, []);\n\n  if (loading) return <p>Loading...</p>;\n  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;\n}' }
      },
      {
        title: 'Events and Lists',
        content: 'Attach event handlers with camelCase props (onClick, onChange, onSubmit). Prevent default form submission with e.preventDefault(). Lists require a unique key prop on each item for efficient reconciliation. Conditional rendering uses && or ternary operators.',
        codeSnippet: { language: 'jsx', code: 'function TodoList() {\n  const [items, setItems] = useState([]);\n  const [input, setInput] = useState("");\n\n  return (\n    <div>\n      <input value={input} onChange={e => setInput(e.target.value)} />\n      <button onClick={() => { if (input.trim()) { setItems([...items, input]); setInput(""); } }}>Add</button>\n      {items.length === 0 && <p>No items yet</p>}\n      {items.map((item, i) => <div key={i}>{item}</div>)}\n    </div>\n  );\n}' }
      }
    ],
    keyTakeaways: [
      'Components are pure functions that return JSX',
      'Props flow downward and are read-only',
      'useState for state, useEffect for side effects',
      'Always provide a key prop when rendering lists'
    ],
    practice: [
      { question: 'When does useEffect with [] run?', options: ['Every render', 'Only on mount', 'On state change', 'Never'], correctIndex: 1, explanation: 'An empty dependency array means the effect runs only once after the initial render.' },
      { question: 'What is the correct way to update state based on previous state?', options: ['setState(state + 1)', 'setState(prev => prev + 1)', 'this.state = state + 1', 'state++'], correctIndex: 1, explanation: 'Use the functional form to ensure you work with the latest state value.' },
      { question: 'What is a React fragment and why use it?', options: ['A decorative element', 'A wrapper that groups elements without adding an extra DOM node', 'A type of component that renders nothing', 'A fragment of CSS'], correctIndex: 1, explanation: 'Fragments let you group multiple elements without introducing an extra wrapper div in the DOM. Use <Fragment> or shorthand <>...</>.' },
      { question: 'What does useCallback do?', options: ['Memoizes a callback function to prevent unnecessary re-creations', 'Creates a new callback on every render', 'Debounces user input', 'Stores callbacks in localStorage'], correctIndex: 0, explanation: 'useCallback returns a memoized version of a callback that only changes if its dependencies change. This prevents child components from re-rendering unnecessarily.' },
      { question: 'What is the difference between controlled and uncontrolled components?', options: ['No difference', 'Controlled: React manages state; Uncontrolled: DOM manages state', 'Controlled is for forms only', 'Uncontrolled is faster'], correctIndex: 1, explanation: 'In controlled components, React state drives the form input value. In uncontrolled components, the DOM maintains its own state, accessed via refs.' }
    ]
  },

  // ==================== CLOUD & DEVOPS ====================

  'Linux Fundamentals': {
    title: 'Linux Fundamentals',
    subtitle: 'Command line, filesystem, permissions, and process management',
    estimatedTime: '60 min',
    whyItMatters: 'Linux runs most servers, cloud infrastructure, and embedded systems. Command line proficiency is essential for developers and DevOps engineers.',
    learningObjectives: [
      'Navigate the filesystem and manage files with command-line tools',
      'Understand file permissions and user management',
      'Monitor and manage running processes'
    ],
    sections: [
      {
        title: 'Filesystem Navigation',
        content: 'The Linux filesystem is a tree starting at /. Key directories: /home (user files), /etc (config), /var (logs), /usr (programs), /tmp (temporary). Use ls to list files, cd to change directories, pwd to show current path, find to search, and grep to filter text output.',
        codeSnippet: { language: 'bash', code: 'ls -la /home/user          # list all files with details\ncd /var/log                # change directory\npwd                        # print working directory\nfind . -name "*.log"       # find files by name\ngrep -r "error" /var/log/  # search text in files' }
      },
      {
        title: 'File Permissions',
        content: 'Every file has owner, group, and other permissions for read (r=4), write (w=2), and execute (x=1). Use chmod to change permissions, chown to change ownership. The -R flag applies recursively. Understanding permissions is critical for security and troubleshooting.',
        codeSnippet: { language: 'bash', code: 'ls -la\n# -rw-r--r-- 1 user group 1024 Jan 1 file.txt\n# ^owner^group  rwxrwxrwx\n\nchmod 755 script.sh    # rwxr-xr-x\nchmod +x deploy.sh     # add execute\nchown user:group file  # change owner' }
      },
      {
        title: 'Process Management',
        content: 'Use ps to view running processes, top/htop for real-time monitoring, kill to terminate processes, and nohup to run background processes that survive disconnection. systemd manages services on modern Linux.',
        codeSnippet: { language: 'bash', code: 'ps aux | grep nginx     # find processes\ntop                      # real-time monitor\nkill -9 1234             # force kill process\nnohup ./server.sh &     # run in background\nsystemctl status nginx   # check service status' }
      }
    ],
    keyTakeaways: [
      'Master ls, cd, find, grep, and cat for daily filesystem work',
      'File permissions: r=4, w=2, x=1 for owner/group/other',
      'ps, top, kill for process management',
      'Use && to chain commands and || for conditional execution'
    ],
    practice: [
      { question: 'What does chmod 755 mean?', options: ['Read for everyone', 'Owner: rwx, Group: r-x, Other: r-x', 'Write only for owner', 'Execute for group only'], correctIndex: 1, explanation: '7=rwx, 5=r-x. Owner gets full access, group and others get read and execute.' },
      { question: 'How do you search for a file by name?', options: ['ls -la', 'find . -name "pattern"', 'grep "pattern" .', 'cat file'], correctIndex: 1, explanation: 'find recursively searches directories. grep searches file contents, not names.' },
      { question: 'What does the pipe (|) operator do in Linux?', options: ['Runs two commands sequentially', 'Redirects output from one command as input to another', 'Copies files between directories', 'Creates a symbolic link'], correctIndex: 1, explanation: 'The pipe operator takes the stdout of the left command and passes it as stdin to the right command, enabling command chaining for data processing.' },
      { question: 'What is the difference between rm -r and rm -rf?', options: ['No difference', '-f suppresses confirmation prompts; -r alone asks before deleting', '-r is recursive, -f is fast', '-f deletes files, -r deletes directories'], correctIndex: 1, explanation: 'rm -r removes directories recursively, prompting before each deletion. rm -rf forces deletion without prompts. The -f flag overrides any confirmation warnings.' },
      { question: 'What does the > operator do in a shell command?', options: ['Reads input', 'Redirects stdout to a file, overwriting existing content', 'Runs a command in the background', 'Deletes a file'], correctIndex: 1, explanation: '> redirects standard output to a file. If the file exists, it is overwritten. Use >> to append instead of overwrite.' }
    ]
  },

  'Networking Basics': {
    title: 'Networking Basics',
    subtitle: 'OSI model, IP addressing, DNS, and common protocols',
    estimatedTime: '60 min',
    whyItMatters: 'Every application communicates over a network. Understanding TCP/IP, DNS, HTTP, and subnetting is essential for building, deploying, and debugging distributed systems.',
    learningObjectives: [
      'Explain the OSI model layers and their functions',
      'Understand IP addressing, subnetting, and DNS resolution',
      'Debug network issues with common diagnostic tools'
    ],
    sections: [
      {
        title: 'The OSI Model and TCP/IP',
        content: 'The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. In practice, the TCP/IP model collapses these into 4 layers: Link, Internet (IP), Transport (TCP/UDP), Application (HTTP, DNS). TCP is reliable and connection-oriented; UDP is fast and connectionless.',
        codeSnippet: { language: 'bash', code: '# Common network diagnostics\nping google.com           # test connectivity\ntraceroute google.com     # trace route\nnslookup google.com       # DNS lookup\nnetstat -tlnp             # show listening ports\nss -tuln                  # modern netstat' }
      },
      {
        title: 'IP Addressing and DNS',
        content: 'IPv4 addresses are 32-bit numbers written as four octets (192.168.1.1). Subnet masks define network vs host portions. DNS translates domain names to IP addresses through a hierarchy: root → TLD → authoritative nameserver. DNS caching at multiple levels affects propagation time.',
        codeSnippet: { language: 'bash', code: '# Private IP ranges\n10.0.0.0/8       (10.x.x.x)\n172.16.0.0/12    (172.16-31.x.x)\n192.168.0.0/16   (192.168.x.x)\n\n# DNS resolution chain\nhost example.com\n# example.com → DNS → authoritative NS → IP' }
      },
      {
        title: 'HTTP/HTTPS and TLS',
        content: 'HTTP is a request-response protocol: client sends a request (method, headers, body), server returns a response (status code, headers, body). HTTPS adds TLS encryption. Status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error. HTTP/2 and HTTP/3 improve performance with multiplexing and QUIC.',
        codeSnippet: { language: 'bash', code: '# Inspect HTTP traffic\ncurl -v https://api.example.com/users\ncurl -X POST -H "Content-Type: application/json" \\\n  -d \'{"name":"Alice"}\' https://api.example.com/users\n\n# Check TLS certificate\nopenssl s_client -connect api.example.com:443' }
      }
    ],
    keyTakeaways: [
      'TCP for reliable communication, UDP for speed',
      'DNS resolves names to IPs through hierarchical lookup',
      'HTTP status codes: 2xx success, 4xx client error, 5xx server error',
      'Use curl, ping, and nslookup for debugging'
    ],
    practice: [
      { question: 'What protocol does DNS use?', options: ['TCP only', 'UDP only', 'Primarily UDP, TCP for large responses', 'HTTP'], correctIndex: 2, explanation: 'DNS primarily uses UDP for speed, but falls back to TCP for responses larger than 512 bytes or for zone transfers.' },
      { question: 'What does a 502 status code mean?', options: ['Not found', 'Bad gateway', 'Service unavailable', 'Timeout'], correctIndex: 1, explanation: '502 Bad Gateway means the server received an invalid response from an upstream server.' },
      { question: 'What is the difference between TCP and UDP?', options: ['No difference', 'TCP is reliable and connection-oriented; UDP is fast and connectionless', 'TCP is for DNS only', 'UDP guarantees delivery'], correctIndex: 1, explanation: 'TCP provides reliable, ordered delivery with error checking and retransmission. UDP is faster but does not guarantee delivery — ideal for streaming and gaming.' },
      { question: 'What port does HTTPS typically use?', options: ['80', '443', '8080', '3000'], correctIndex: 1, explanation: 'HTTPS uses port 443 by default. HTTP uses port 80. The port is part of the URL and can be overridden, but these are the standard ports.' },
      { question: 'What is the purpose of ARP (Address Resolution Protocol)?', options: ['Resolves IP addresses to MAC addresses', 'Resolves domain names to IP addresses', 'Encrypts network traffic', 'Routes packets between networks'], correctIndex: 0, explanation: 'ARP maps IP addresses to physical MAC addresses on a local network, enabling devices on the same LAN to communicate at the data link layer.' }
    ]
  },

  'Cloud Concepts': {
    title: 'Cloud Concepts',
    subtitle: 'Cloud computing fundamentals, models, and services',
    estimatedTime: '45 min',
    whyItMatters: 'Cloud computing underpins modern software delivery. Understanding IaaS, PaaS, SaaS, and deployment models is essential for any cloud engineer or developer.',
    learningObjectives: [
      'Define cloud computing and its key characteristics',
      'Distinguish between IaaS, PaaS, and SaaS',
      'Understand public, private, and hybrid cloud models'
    ],
    sections: [
      {
        title: 'What is Cloud Computing?',
        content: 'Cloud computing delivers computing resources (servers, storage, databases, networking, software) over the internet on a pay-as-you-go basis. Key characteristics include on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service. Instead of buying and maintaining physical hardware, you rent resources from providers like AWS, Azure, or GCP.',
        examples: ['AWS EC2 for virtual machines', 'Google Cloud Functions for serverless compute', 'Azure Blob Storage for object storage'],
      },
      {
        title: 'Service Models: IaaS, PaaS, SaaS',
        content: 'IaaS (Infrastructure as a Service) provides virtual machines, storage, and networking — you manage the OS, middleware, and apps. PaaS (Platform as a Service) provides a platform for deploying apps without managing infrastructure (e.g., Heroku, Google App Engine). SaaS (Software as a Service) provides fully managed applications (e.g., Gmail, Salesforce). The more you abstract, the less you manage.',
        examples: ['IaaS: AWS EC2, Azure VMs', 'PaaS: Heroku, Google App Engine', 'SaaS: Gmail, Slack, Salesforce'],
      },
      {
        title: 'Deployment Models',
        content: 'Public cloud shares infrastructure across multiple organizations (multi-tenant). Private cloud is dedicated to a single organization. Hybrid cloud combines public and private, allowing data and applications to move between them. Multi-cloud uses multiple public cloud providers. Most enterprises use a hybrid or multi-cloud strategy.',
        examples: ['Public: AWS, Azure, GCP', 'Private: VMware vSphere, OpenStack', 'Hybrid: AWS Outposts, Azure Arc'],
      }
    ],
    keyTakeaways: [
      'Cloud = on-demand resources over the internet, pay-as-you-go',
      'IaaS → PaaS → SaaS: increasing abstraction, decreasing management',
      'Public, private, hybrid, and multi-cloud deployment models',
      'Key benefits: scalability, reliability, cost optimization, global reach'
    ],
    practice: [
      { question: 'Which service model gives you the most control?', options: ['SaaS', 'PaaS', 'IaaS', 'FaaS'], correctIndex: 2, explanation: 'IaaS provides virtual machines, OS, and networking — you control the most while still avoiding physical hardware management.' },
      { question: 'What is a hybrid cloud?', options: ['Using two public clouds', 'Mixing public and private cloud resources', 'A cloud with redundant servers', 'An on-premise data center'], correctIndex: 1, explanation: 'Hybrid cloud combines public and private cloud environments, allowing data and applications to move between them.' },
      { question: 'What is elasticity in cloud computing?', options: ['The ability to resize infrastructure automatically based on demand', 'The cost of cloud resources', 'The speed of network connections', 'The number of data centers available'], correctIndex: 0, explanation: 'Elasticity is the cloud ability to automatically provision and deprovision resources in response to changing demand, scaling up during peaks and down during quiet periods.' },
      { question: 'What does the shared responsibility model define?', options: ['Who pays for the cloud', 'Which security tasks the cloud provider handles vs the customer', 'How many users can share an account', 'Which regions are available'], correctIndex: 1, explanation: 'The shared responsibility model divides security obligations: the provider secures the infrastructure (hardware, networking), while the customer secures their data, OS, and application configuration.' },
      { question: 'What is a multi-tenant cloud?', options: ['A cloud with multiple virtual machines', 'Infrastructure shared across multiple organizations', 'A cloud that supports multiple programming languages', 'A cloud with redundant storage'], correctIndex: 1, explanation: 'Multi-tenancy means the cloud infrastructure is shared among multiple customers (tenants), with each tenant data and configurations logically isolated.' }
    ]
  },

  'Compute & Storage': {
    title: 'Compute & Storage',
    subtitle: 'Virtual machines, object storage, and databases in the cloud',
    estimatedTime: '60 min',
    whyItMatters: 'Compute and storage are the core building blocks of any cloud architecture. Understanding VMs, containers, object storage, and managed databases is essential for designing scalable systems.',
    learningObjectives: [
      'Choose between compute options (VMs, containers, serverless)',
      'Use object storage for files, blocks for volumes, and managed databases',
      'Design storage strategies for performance and cost'
    ],
    sections: [
      {
        title: 'Compute Options',
        content: 'Virtual Machines (EC2, Azure VMs) give you full control over the OS and software. Containers (ECS, GKE) package applications with dependencies for consistent deployment. Serverless (Lambda, Cloud Functions) runs code without managing servers — you pay only for execution time. Choose based on control needs, scale patterns, and operational overhead.',
        examples: ['EC2 for custom OS configurations', 'ECS/EKS for container orchestration', 'Lambda for event-driven microservices'],
      },
      {
        title: 'Storage Types',
        content: 'Object storage (S3, Blob Storage) stores files as objects with metadata — ideal for images, backups, and static assets. Block storage (EBS, Persistent Disks) provides raw volumes for VMs — fast, like a hard drive. Managed databases (RDS, Cloud SQL) handle backups, patching, and replication. Choose based on access patterns, consistency requirements, and query needs.',
        examples: ['S3 for static website hosting', 'EBS for database volumes', 'RDS for relational data'],
      },
      {
        title: 'Cost Optimization',
        content: 'Cloud costs can spiral without governance. Use spot instances for fault-tolerant workloads (up to 90% savings). Reserved instances for predictable workloads. Auto-scaling to match demand. Lifecycle policies to move old data to cheaper storage tiers. Monitor with CloudWatch or Cost Explorer.',
        examples: ['Spot instances for batch processing', 'S3 lifecycle rules for archival', 'Auto-scaling groups for web servers'],
      }
    ],
    keyTakeaways: [
      'VMs = full control, Containers = portability, Serverless = zero ops',
      'Object storage for files, block storage for volumes, databases for queries',
      'Use lifecycle policies, spot instances, and auto-scaling to optimize costs',
      'Managed services reduce operational overhead at the cost of flexibility'
    ],
    practice: [
      { question: 'When should you use serverless over containers?', options: ['Always', 'For event-driven, short-running tasks', 'For long-running batch jobs', 'When you need full OS control'], correctIndex: 1, explanation: 'Serverless excels for event-driven workloads that run briefly. Containers are better for long-running or stateful applications.' },
      { question: 'What is the cheapest storage tier for rarely accessed data?', options: ['Standard S3', 'S3 Intelligent-Tiering', 'S3 Glacier Deep Archive', 'EBS SSD'], correctIndex: 2, explanation: 'Glacier Deep Archive is designed for data accessed less than once a year, at the lowest storage cost.' },
      { question: 'What is the difference between object storage and block storage?', options: ['No difference', 'Object storage stores files as objects with metadata; block storage provides raw volumes for VMs', 'Object storage is faster', 'Block storage is for images only'], correctIndex: 1, explanation: 'Object storage (S3) manages data as objects with metadata and a flat namespace. Block storage (EBS) provides raw disk volumes attached to VMs, like a hard drive.' },
      { question: 'When would you choose a container over a virtual machine?', options: ['When you need a different OS kernel', 'When you want lightweight, fast-starting, portable workloads', 'When you need full hardware control', 'Containers are always better'], correctIndex: 1, explanation: 'Containers share the host OS kernel, making them lightweight and fast to start. VMs provide full OS isolation but are heavier. Containers are ideal for microservices and CI/CD.' },
      { question: 'What is the benefit of using managed databases over self-hosted?', options: ['They are always cheaper', 'Managed databases handle backups, patching, and replication automatically', 'They support more query languages', 'They are faster than self-hosted'], correctIndex: 1, explanation: 'Managed databases (RDS, Cloud SQL) automate backups, software patching, replication, and failover, reducing operational overhead and improving reliability.' }
    ]
  },

  'Docker': {
    title: 'Docker',
    subtitle: 'Containers, images, Dockerfiles, and container networking',
    estimatedTime: '60 min',
    whyItMatters: 'Docker packages applications with their dependencies into portable containers that run consistently across environments — from your laptop to production servers.',
    learningObjectives: [
      'Write Dockerfiles to build container images',
      'Run, manage, and connect containers',
      'Use Docker Compose for multi-container applications'
    ],
    sections: [
      {
        title: 'Docker Images and Containers',
        content: 'A Docker image is a read-only template containing the application code, runtime, libraries, and dependencies. A container is a running instance of an image. Dockerfile defines how to build the image: base image, copy code, install dependencies, expose ports, and set the command. Use multi-stage builds to keep images small.',
        codeSnippet: { language: 'dockerfile', code: '# Multi-stage build\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nEXPOSE 3000\nCMD ["node", "dist/index.js"]' }
      },
      {
        title: 'Running and Managing Containers',
        content: 'docker run creates and starts a container. Use -d for detached mode, -p for port mapping, -v for volume mounts, -e for environment variables, and --name for naming. docker ps lists running containers, docker logs shows output, docker exec opens a shell inside a running container.',
        codeSnippet: { language: 'bash', code: 'docker run -d -p 3000:3000 --name myapp myimage\n\n# Environment and volumes\ndocker run -e DB_HOST=postgres -v ./data:/app/data myapp\n\n# Debug\ndocker logs myapp\ndocker exec -it myapp sh\n\n# Cleanup\ndocker stop myapp && docker rm myapp' }
      },
      {
        title: 'Docker Compose',
        content: 'Docker Compose defines multi-container applications in a YAML file. Define services (containers), networks, and volumes in docker-compose.yml. Run docker compose up to start everything, docker compose down to stop and remove. Compose is essential for local development with databases, caches, and message queues.',
        codeSnippet: { language: 'yaml', code: 'version: "3.8"\nservices:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - DB_HOST=postgres\n    depends_on:\n      - postgres\n\n  postgres:\n    image: postgres:16\n    environment:\n      POSTGRES_DB: myapp\n      POSTGRES_PASSWORD: secret\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n\nvolumes:\n  pgdata:' }
      }
    ],
    keyTakeaways: [
      'Images are templates, containers are running instances',
      'Multi-stage builds reduce image size significantly',
      'Use .dockerignore to exclude unnecessary files from the build context',
      'Docker Compose simplifies multi-container development environments'
    ],
    practice: [
      { question: 'What is the difference between COPY and ADD in Dockerfile?', options: ['No difference', 'ADD supports URLs and tar extraction automatically', 'COPY is faster than ADD', 'ADD is for directories, COPY is for files'], correctIndex: 1, explanation: 'ADD automatically extracts local tar archives and supports URLs. COPY is preferred for simple file copying as its behavior is more transparent.' },
      { question: 'What does docker compose up do?', options: ['Only starts containers', 'Builds images if needed and starts all services', 'Only builds images', 'Removes all containers'], correctIndex: 1, explanation: 'docker compose up builds images (if a build context is defined), creates containers, and starts all services defined in the compose file.' },
      { question: 'What is the difference between a Docker image and a container?', options: ['No difference', 'An image is a read-only template; a container is a running instance of an image', 'A container is smaller than an image', 'An image is created from a container'], correctIndex: 1, explanation: 'A Docker image is a static template with code and dependencies. A container is a runtime instance of an image that can be started, stopped, and interacted with.' },
      { question: 'What does the -v flag do in docker run?', options: ['Sets a version tag', 'Mounts a volume or bind mount from host to container', 'Verbose logging', 'Selects the Docker version'], correctIndex: 1, explanation: 'The -v flag maps a host directory or named volume into the container. For example, -v ./data:/app/data maps the local data folder into the container.' },
      { question: 'What is a Docker layer?', options: ['A network layer in Docker', 'Each instruction in a Dockerfile creates a layer; layers are cached and stacked', 'A storage disk for containers', 'A type of Docker network'], correctIndex: 1, explanation: 'Each Dockerfile instruction (FROM, RUN, COPY) creates a read-only layer. Layers are cached, so unchanged layers are reused on rebuilds, making builds faster.' }
    ]
  },

  'Kubernetes': {
    title: 'Kubernetes',
    subtitle: 'Pods, deployments, services, and cluster management',
    estimatedTime: '75 min',
    whyItMatters: 'Kubernetes orchestrates containers at scale — automating deployment, scaling, and management of containerized applications across clusters of machines.',
    learningObjectives: [
      'Understand Kubernetes architecture: nodes, pods, deployments, services',
      'Deploy and scale applications using kubectl and YAML manifests',
      'Configure networking, storage, and resource limits'
    ],
    sections: [
      {
        title: 'Core Concepts',
        content: 'A Pod is the smallest deployable unit — one or more containers sharing network and storage. A Deployment manages Pods with desired state (replicas, update strategy). A Service provides stable networking for Pods. Nodes are worker machines in the cluster. The control plane manages scheduling, scaling, and self-healing.',
        codeSnippet: { language: 'yaml', code: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n    spec:\n      containers:\n      - name: web\n        image: nginx:1.25\n        ports:\n        - containerPort: 80' }
      },
      {
        title: 'Services and Networking',
        content: 'Services expose Pods to the network. ClusterIP (internal), NodePort (external via node port), LoadBalancer (cloud load balancer), and Ingress (HTTP routing). Use kubectl to manage resources. Kubernetes self-heals by restarting failed Pods and replacing unhealthy nodes.',
        codeSnippet: { language: 'yaml', code: 'apiVersion: v1\nkind: Service\nmetadata:\n  name: web-service\nspec:\n  type: LoadBalancer\n  selector:\n    app: web\n  ports:\n  - port: 80\n    targetPort: 80' }
      },
      {
        title: 'Scaling and Storage',
        content: 'Horizontal Pod Autoscaler (HPA) scales pods based on CPU/memory usage. Vertical Pod Autoscaler adjusts resource requests. StatefulSets for stateful applications with stable network identities and persistent storage. PersistentVolumes provide durable storage that survives Pod restarts.',
        codeSnippet: { language: 'bash', code: 'kubectl scale deployment web --replicas=5\nkubectl autoscale deployment web --min=2 --max=10 --cpu-percent=70\nkubectl get pods -o wide\nkubectl logs web-abc123\nkubectl exec -it web-abc123 -- sh' }
      }
    ],
    keyTakeaways: [
      'Pod = smallest unit, Deployment = manages Pods, Service = networking',
      'ClusterIP for internal, NodePort for external, LoadBalancer for cloud',
      'HPA auto-scales based on metrics; StatefulSets for stateful apps',
      'kubectl is the primary CLI for managing Kubernetes clusters'
    ],
    practice: [
      { question: 'What is the smallest deployable unit in Kubernetes?', options: ['Node', 'Pod', 'Deployment', 'Container'], correctIndex: 1, explanation: 'A Pod is the smallest deployable unit. It can contain one or more containers that share networking and storage.' },
      { question: 'How does Kubernetes self-heal?', options: ['Manual intervention only', 'Restarts failed Pods and replaces unhealthy nodes', 'Ignores failures', 'Alerts and waits'], correctIndex: 1, explanation: 'Kubernetes continuously monitors Pod and node health. Failed Pods are restarted, and unhealthy nodes are drained and replaced.' },
      { question: 'What is the difference between a Deployment and a StatefulSet?', options: ['No difference', 'Deployments are for stateless apps; StatefulSets provide stable identities and persistent storage', 'StatefulSets are faster', 'Deployments support only one replica'], correctIndex: 1, explanation: 'Deployments manage stateless Pods with random names. StatefulSets provide stable network identities, ordered deployment, and persistent volumes for stateful applications like databases.' },
      { question: 'What is a Kubernetes Service used for?', options: ['Running containers', 'Providing a stable network endpoint to access a set of Pods', 'Building Docker images', 'Managing secrets'], correctIndex: 1, explanation: 'A Service provides a stable IP address and DNS name for a group of Pods, load-balancing traffic across them and surviving Pod restarts.' },
      { question: 'What does kubectl rollout undo do?', options: ['Deletes a deployment', 'Rolls back to the previous revision of a deployment', 'Stops all running Pods', 'Cancels a pending build'], correctIndex: 1, explanation: 'kubectl rollout undo reverts a Deployment to its previous revision, rolling back any changes that were deployed in the last update.' }
    ]
  },

  'Infrastructure as Code': {
    title: 'Infrastructure as Code',
    subtitle: 'Managing infrastructure with Terraform and automation',
    estimatedTime: '75 min',
    whyItMatters: 'Infrastructure as Code (IaC) lets you version, review, and automate infrastructure changes. Terraform is the industry standard for provisioning cloud resources declaratively.',
    learningObjectives: [
      'Write Terraform configurations to provision cloud resources',
      'Understand state management and resource dependencies',
      'Use modules and workspaces for reusable infrastructure'
    ],
    sections: [
      {
        title: 'Terraform Basics',
        content: 'Terraform uses HCL (HashiCorp Configuration Language) to declare desired infrastructure state. You define resources, and Terraform creates, updates, or destroys them to match. terraform init downloads providers, plan shows changes, apply executes them, and destroy tears everything down.',
        codeSnippet: { language: 'hcl', code: 'provider "aws" {\n  region = "us-east-1"\n}\n\nresource "aws_instance" "web" {\n  ami           = "ami-0c55b159cbfafe1f0"\n  instance_type = "t3.micro"\n  tags = {\n    Name = "web-server"\n  }\n}\n\noutput "public_ip" {\n  value = aws_instance.web.public_ip\n}' }
      },
      {
        title: 'State and Dependencies',
        content: 'Terraform state tracks which resources exist and their current configuration. Store state remotely (S3 + DynamoDB) for team collaboration. Dependencies are inferred automatically — if resource B references resource A, A is created first. Use terraform graph to visualize dependencies.',
        codeSnippet: { language: 'bash', code: '# Initialize and apply\nterraform init\nterraform plan     # preview changes\nterraform apply    # execute changes\n\n# State management\nterraform state list\nterraform state show aws_instance.web\nterraform import aws_instance.web i-1234567890\n\n# Destroy\nterraform destroy' }
      },
      {
        title: 'Modules and Best Practices',
        content: 'Modules are reusable Terraform configurations. Extract common patterns (VPC, ECS cluster, RDS) into modules and share them across projects. Best practices: use variables for configurability, outputs for data sharing, remote state for collaboration, and workspaces for environment separation.',
        codeSnippet: { language: 'hcl', code: 'module "vpc" {\n  source  = "terraform-aws-modules/vpc/aws"\n  version = "5.0.0"\n  name    = "my-vpc"\n  cidr    = "10.0.0.0/16"\n  azs     = ["us-east-1a", "us-east-1b"]\n  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]\n  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]\n}' }
      }
    ],
    keyTakeaways: [
      'Declarative: describe desired state, Terraform makes it happen',
      'terraform init → plan → apply is the core workflow',
      'Store state remotely for team collaboration and locking',
      'Modules enable reusable, shareable infrastructure components'
    ],
    practice: [
      { question: 'What does terraform plan do?', options: ['Applies changes immediately', 'Shows what changes will be made', 'Downloads providers', 'Destroys resources'], correctIndex: 1, explanation: 'terraform plan previews changes without executing them, allowing you to review before applying.' },
      { question: 'Why store Terraform state remotely?', options: ['It is faster', 'For team collaboration and state locking', 'To reduce costs', 'Because local state is deprecated'], correctIndex: 1, explanation: 'Remote state enables team collaboration (shared state file) and prevents concurrent modifications (state locking).' },
      { question: 'What does terraform destroy do?', options: ['Deletes only new resources', 'Destroys all infrastructure managed by the current Terraform configuration', 'Removes the Terraform binary', 'Deletes the state file only'], correctIndex: 1, explanation: 'terraform destroy tears down all resources defined in the configuration, returning the infrastructure to its state before Terraform managed it.' },
      { question: 'What is a Terraform module?', options: ['A single resource definition', 'A reusable, encapsulated collection of Terraform configurations', 'A deployment target', 'A type of provider'], correctIndex: 1, explanation: 'Modules are reusable building blocks that package multiple Terraform resources together with inputs and outputs, promoting consistency across projects.' },
      { question: 'What is an idempotent apply in Terraform?', options: ['Apply that runs only once', 'Apply that produces the same result whether run once or multiple times', 'Apply that is very fast', 'Apply that requires approval'], correctIndex: 1, explanation: 'Terraform apply is idempotent — running it multiple times on the same configuration produces the same infrastructure state, making it safe to re-run.' }
    ]
  },

  // ==================== CI/CD & VERSION CONTROL ====================

  'Git & Version Control': {
    title: 'Git & Version Control',
    subtitle: 'Tracking changes, branching, merging, and collaboration',
    estimatedTime: '50 min',
    whyItMatters: 'Git is the standard version control system for software development. It tracks changes, enables collaboration, and supports complex workflows like feature branching.',
    learningObjectives: [
      'Create repositories, commit changes, and manage branches',
      'Merge branches and resolve conflicts',
      'Use pull requests and collaboration workflows'
    ],
    sections: [
      {
        title: 'Git Basics',
        content: 'Git tracks changes in files over time. A repository contains the full history of all changes. Commits are snapshots with messages describing the changes. The staging area (git add) lets you selectively include changes before committing. Use git status to see the current state and git log to view history.',
        codeSnippet: { language: 'bash', code: 'git init                    # create repository\ngit add .                   # stage all changes\ngit commit -m "feat: add login"  # commit\ngit status                  # check status\ngit log --oneline           # view history' }
      },
      {
        title: 'Branching and Merging',
        content: 'Branches let you work on features in isolation. Create with git switch -c (or checkout -b), switch with git switch, and merge with git merge. Fast-forward merges are linear; three-way merges create merge commits. Use git rebase to linearize history before merging.',
        codeSnippet: { language: 'bash', code: 'git switch -c feature/auth    # create and switch to branch\n# ... make changes ...\ngit add . && git commit -m "auth"\ngit switch main              # switch back\ngit merge feature/auth       # merge feature into main\ngit branch -d feature/auth   # delete branch' }
      },
      {
        title: 'Conflict Resolution',
        content: 'Merge conflicts happen when the same lines are changed in both branches. Git marks conflicts with <<<<<<< and ======= markers. Open the file, choose which changes to keep, remove the conflict markers, and commit. Prevent conflicts by keeping branches short-lived and communicating with your team.',
        codeSnippet: { language: 'bash', code: '<<<<<<< HEAD\nconst port = 3000;\n=======\nconst port = 8080;\n>>>>>>> feature/port\n\n# After resolving:\ngit add .\ngit commit -m "resolve: port conflict"' }
      }
    ],
    keyTakeaways: [
      'Commit early, commit often — small, focused commits are easier to review',
      'Feature branches isolate work; merge or PR when ready',
      'Conflicts are normal — resolve them carefully and communicate',
      'Use .gitignore to exclude build artifacts, secrets, and dependencies'
    ],
    practice: [
      { question: 'What does git rebase do?', options: ['Creates a merge commit', 'Reapplies commits on top of another base', 'Deletes the branch', 'Merges with fast-forward only'], correctIndex: 1, explanation: 'git rebase replays commits from one branch onto another, creating a linear history. It avoids unnecessary merge commits.' },
      { question: 'How do you stage all changes for commit?', options: ['git commit -a', 'git add .', 'git stage --all', 'git push'], correctIndex: 1, explanation: 'git add . stages all modified and new files. git commit -a only stages modified (not new) files and commits in one step.' },
      { question: 'What does git stash do?', options: ['Deletes uncommitted changes', 'Saves uncommitted changes temporarily so you can work on a clean state', 'Merges two branches', 'Creates a new branch'], correctIndex: 1, explanation: 'git stash temporarily shelves your working directory changes, allowing you to switch branches or apply other changes cleanly. Use git stash pop to restore them.' },
      { question: 'What is the difference between git pull and git fetch?', options: ['No difference', 'git fetch downloads changes; git pull also merges them into your branch', 'git pull is deprecated', 'git fetch only works on GitHub'], correctIndex: 1, explanation: 'git fetch downloads remote changes without merging. git pull = git fetch + git merge, automatically integrating the fetched changes into your current branch.' },
      { question: 'What does .gitignore do?', options: ['Ignores all files', 'Specifies files and directories that Git should not track or include in commits', 'Deletes ignored files', 'Prevents others from cloning'], correctIndex: 1, explanation: '.gitignore tells Git which files to skip — typically build artifacts, dependencies, secrets, and OS-specific files that should not be version controlled.' }
    ]
  },

  'CI/CD Fundamentals': {
    title: 'CI/CD Fundamentals',
    subtitle: 'Continuous integration and delivery pipelines',
    estimatedTime: '60 min',
    whyItMatters: 'CI/CD automates testing, building, and deploying software. It catches bugs early, reduces deployment risk, and enables rapid, reliable releases.',
    learningObjectives: [
      'Design a CI/CD pipeline for a typical web application',
      'Configure automated testing, building, and deployment stages',
      'Use GitHub Actions or similar tools for pipeline automation'
    ],
    sections: [
      {
        title: 'Continuous Integration',
        content: 'CI means every code change is automatically built and tested. This catches integration issues early. A CI pipeline typically: checks out code, installs dependencies, runs linters, runs unit tests, runs integration tests, and builds the artifact. Failed builds block merges, ensuring the main branch is always deployable.',
        codeSnippet: { language: 'yaml', code: 'name: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20 }\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test\n      - run: npm run build' }
      },
      {
        title: 'Continuous Delivery vs Deployment',
        content: 'Continuous Delivery means every change is ready to deploy to production at any time, but requires manual approval. Continuous Deployment goes further — every passing change is automatically deployed. Both require a robust test suite and monitoring. Use staging environments for final validation.',
        codeSnippet: { language: 'yaml', code: '  deploy:\n    needs: test\n    runs-on: ubuntu-latest\n    if: github.ref == \'refs/heads/main\'\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm run build\n      - run: npm run deploy\n        env:\n          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}' }
      },
      {
        title: 'Pipeline Best Practices',
        content: 'Keep pipelines fast (under 10 minutes). Cache dependencies. Run tests in parallel. Use environment-specific configurations. Store secrets in vault systems, not code. Monitor pipeline health and flaky tests. Use branch protection rules to enforce CI passes before merging.',
        examples: ['Cache node_modules between runs', 'Run unit, integration, and e2e tests in separate jobs', 'Use matrix builds for multi-version testing'],
      }
    ],
    keyTakeaways: [
      'CI = automatic build + test on every change',
      'CDelivery = ready to deploy; CDeployment = auto-deployed',
      'Fast, reliable pipelines enable confident releases',
      'Always run tests before deployment; never skip CI to merge faster'
    ],
    practice: [
      { question: 'What is the difference between CDelivery and CDeployment?', options: ['No difference', 'Delivery requires manual approval; Deployment is automatic', 'Delivery is for staging; Deployment is for production', 'Deployment is faster than Delivery'], correctIndex: 1, explanation: 'Continuous Delivery means changes are ready to deploy but need manual approval. Continuous Deployment automatically deploys every passing change.' },
      { question: 'Why should CI pipelines be fast?', options: ['To save electricity', 'To give quick feedback and unblock developers', 'Because slow pipelines are deprecated', 'To reduce cloud costs'], correctIndex: 1, explanation: 'Fast pipelines give developers quick feedback on their changes, reducing wait time and encouraging frequent commits.' },
      { question: 'What is a pipeline artifact?', options: ['A test failure report', 'A file or set of files produced by one stage that is consumed by the next stage', 'A log file from CI runners', 'A type of Docker image'], correctIndex: 1, explanation: 'Artifacts are build outputs (JARs, binaries, compiled code) that persist between pipeline stages. The build stage produces an artifact that the deploy stage uses.' },
      { question: 'What does a flaky test indicate?', options: ['A test that passes sometimes and fails other times without code changes', 'A test that runs very slowly', 'A test with many assertions', 'A test that covers critical functionality'], correctIndex: 0, explanation: 'A flaky test produces inconsistent results — passing and failing randomly without any code changes. It erodes confidence in CI and must be fixed or quarantined.' },
      { question: 'Why use branch protection rules in CI/CD?', options: ['To prevent anyone from pushing code', 'To ensure code passes all CI checks before merging to main', 'To speed up the pipeline', 'To reduce cloud costs'], correctIndex: 1, explanation: 'Branch protection rules enforce that pull requests pass all tests, linting, and review requirements before merging, preventing broken code from reaching production.' }
    ]
  },

  'Shell Scripting': {
    title: 'Shell Scripting',
    subtitle: 'Automating tasks with Bash scripts',
    estimatedTime: '50 min',
    whyItMatters: 'Shell scripts automate repetitive tasks, system administration, and deployment workflows. They are the glue that holds DevOps pipelines together.',
    learningObjectives: [
      'Write Bash scripts with variables, conditionals, and loops',
      'Process input/output and handle errors',
      'Create实用 automation scripts'
    ],
    sections: [
      {
        title: 'Script Structure',
        content: 'Bash scripts start with a shebang (#!/bin/bash). Use variables without spaces around =. Conditionals use if/then/elif/else/fi. Loops iterate with for/while/until. Always quote variables ("$var") to handle spaces. Use set -e to exit on errors and set -u to catch undefined variables.',
        codeSnippet: { language: 'bash', code: '#!/bin/bash\nset -euo pipefail\n\nNAME="${1:-World}"  # default to World\nCOUNT=0\n\nfor file in *.log; do\n  if [[ -f "$file" ]]; then\n    echo "Processing $file"\n    ((COUNT++))\n  fi\ndone\n\necho "Processed $COUNT files"' }
      },
      {
        title: 'Functions and Error Handling',
        content: 'Functions group reusable logic. Use local variables inside functions. Return 0 for success, non-zero for failure. Trap errors with trap to clean up resources. Redirect stderr to stdout with 2>&1 for logging.',
        codeSnippet: { language: 'bash', code: 'deploy() {\n  local env="${1:?Environment required}"\n  echo "Deploying to $env..."\n  \n  if ! docker build -t "app:$env" .; then\n    echo "Build failed!" >&2\n    return 1\n  fi\n  \n  docker push "app:$env"\n  echo "Deployed to $env"\n}\n\ncleanup() {\n  echo "Cleaning up temporary files..."\n  rm -rf /tmp/deploy-*\n}\ntrap cleanup EXIT' }
      },
      {
        title: 'Practical Scripts',
        content: 'Common patterns: backup scripts with timestamps, log rotation, health checks, batch file processing, and deployment automation. Use cron for scheduling. Combine with curl for API calls, jq for JSON parsing, and ssh for remote execution.',
        codeSnippet: { language: 'bash', code: '#!/bin/bash\n# Backup script\nDATE=$(date +%Y%m%d_%H%M%S)\nBACKUP_DIR="/backups/$DATE"\nmkdir -p "$BACKUP_DIR"\n\npg_dump -U postgres mydb | gzip > "$BACKUP_DIR/db.sql.gz"\ncp -r /app/config "$BACKUP_DIR/"\n\n# Keep only last 7 backups\nls -dt /backups/*/ | tail -n +8 | xargs rm -rf\necho "Backup complete: $BACKUP_DIR"' }
      }
    ],
    keyTakeaways: [
      'Always start with set -euo pipefail for safer scripts',
      'Quote all variables to handle spaces and special characters',
      'Use functions for reusable logic and local for scope',
      'trap for cleanup on exit, especially for temporary files'
    ],
    practice: [
      { question: 'What does set -e do in a Bash script?', options: ['Enable verbose mode', 'Exit immediately if a command fails', 'Enable error tracing', 'Set the editor to vim'], correctIndex: 1, explanation: 'set -e causes the script to exit immediately if any command returns a non-zero status, preventing cascading failures.' },
      { question: 'How do you access the first argument to a script?', options: ['$first', '$1', '$arg1', '${args[0]}'], correctIndex: 1, explanation: 'Positional parameters $1, $2, etc. access script arguments. $0 is the script name itself.' },
      { question: 'What does for file in *.log; do...done iterate over?', options: ['All files in all directories', 'Only .log files in the current directory', 'Only text files', 'Hidden files'], correctIndex: 1, explanation: 'The glob pattern *.log expands to all files in the current directory ending with .log. It does not recurse into subdirectories by default.' },
      { question: 'What does the trap command do in Bash?', options: ['Traps errors and stops execution', 'Runs a specified command when the script receives a signal (like EXIT or INT)', 'Creates a recursive loop', 'Enables debug mode'], correctIndex: 1, explanation: 'trap registers a handler for signals. For example, trap cleanup EXIT ensures the cleanup function runs when the script exits, even if it exits due to an error.' },
      { question: 'What is the purpose of [[ ... ]] over [ ... ] in Bash?', options: ['No difference', '[[ ... ]] supports regex matching, pattern matching, and avoids word splitting issues', '[[ ... ]] is deprecated', '[ ... ] is faster'], correctIndex: 1, explanation: '[[ ... ]] is a Bash keyword with enhanced features: it supports regex matching with =~, glob pattern matching with ==, and does not require quoting for variable expansion.' }
    ]
  },

  // ==================== DATA SCIENCE ====================

  'Python Basics': {
    title: 'Python Basics',
    subtitle: 'Syntax, data structures, functions, and standard library',
    estimatedTime: '60 min',
    whyItMatters: 'Python is the most popular language for data science, machine learning, and scripting. Its readable syntax and rich ecosystem make it ideal for beginners and professionals alike.',
    learningObjectives: [
      'Write Python scripts with variables, loops, and conditionals',
      'Use lists, dictionaries, sets, and tuples effectively',
      'Define functions and use list comprehensions'
    ],
    sections: [
      {
        title: 'Data Structures',
        content: 'Python has four core data structures: lists (ordered, mutable), tuples (ordered, immutable), dictionaries (key-value pairs, mutable), and sets (unordered, unique). Lists support indexing, slicing, and methods like append, sort, and pop. Dictionaries use hash maps for O(1) lookups.',
        codeSnippet: { language: 'python', code: '# Lists\nfruits = ["apple", "banana", "cherry"]\nfruits.append("date")\nfirst, *rest = fruits  # unpacking\n\n# Dictionaries\nuser = {"name": "Alice", "age": 30}\nuser["email"] = "alice@example.com"\n\n# List comprehension\nsquares = [x**2 for x in range(10) if x % 2 == 0]\n# [0, 4, 16, 36, 64]\n\n# Dictionary comprehension\nword_len = {w: len(w) for w in ["hello", "world"]}' }
      },
      {
        title: 'Functions and Modules',
        content: 'Functions are defined with def and can have default parameters, *args (positional), and **kwargs (keyword). Python uses modules for code organization — import any file as a module. The standard library includes os, sys, json, datetime, collections, and itertools.',
        codeSnippet: { language: 'python', code: 'def calculate_stats(numbers, precision=2):\n    """Calculate mean, median, and std dev."""\n    n = len(numbers)\n    mean = sum(numbers) / n\n    sorted_nums = sorted(numbers)\n    median = sorted_nums[n // 2]\n    variance = sum((x - mean) ** 2 for x in numbers) / n\n    return {\n        "mean": round(mean, precision),\n        "median": median,\n        "std": round(variance ** 0.5, precision)\n    }\n\nresult = calculate_stats([1, 2, 3, 4, 5])' }
      },
      {
        title: 'File I/O and Error Handling',
        content: 'Use with statements for file operations — they automatically close files. Read/write modes: r (read), w (write), a (append), r+ (read+write). Handle errors with try/except/finally. Custom exceptions make error handling more descriptive.',
        codeSnippet: { language: 'python', code: 'import json\n\n# Read JSON file\nwith open("data.json") as f:\n    data = json.load(f)\n\n# Write file\nwith open("output.txt", "w") as f:\n    f.write("Hello, World!")\n\n# Error handling\ntry:\n    result = 10 / int(user_input)\nexcept ValueError:\n    print("Invalid number")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")' }
      }
    ],
    keyTakeaways: [
      'Lists for ordered data, dicts for key-value, sets for unique values',
      'List comprehensions are concise and Pythonic',
      'Use with statements for automatic file/resource cleanup',
      'Python is dynamically typed — but type hints improve readability'
    ],
    practice: [
      { question: 'What is a list comprehension?', options: ['A complex nested list', 'A concise way to create lists from expressions', 'A type of loop', 'A sorting algorithm'], correctIndex: 1, explanation: 'List comprehensions create new lists from expressions in a single line: [expr for item in iterable if condition].' },
      { question: 'What does **kwargs accept?', options: ['Only positional arguments', 'Any number of keyword arguments as a dictionary', 'Exactly two arguments', 'Only string arguments'], correctIndex: 1, explanation: '**kwargs collects any extra keyword arguments into a dictionary inside the function.' },
      { question: 'What is the difference between a list and a tuple in Python?', options: ['No difference', 'Lists are mutable; tuples are immutable', 'Tuples are faster to create', 'Lists cannot contain other lists'], correctIndex: 1, explanation: 'Lists use [] and can be modified after creation. Tuples use () and are immutable — once created, their elements cannot be changed. Tuples are hashable and can be dictionary keys.' },
      { question: 'What is a Python generator?', options: ['A class that creates objects', 'A function that uses yield to produce values lazily, one at a time', 'A type of loop', 'A file reader'], correctIndex: 1, explanation: 'Generators use yield to return values lazily, computing each value on demand. This is memory-efficient for large sequences since values are not all stored at once.' },
      { question: 'What does the if __name__ == "__main__": guard do?', options: ['Imports the main module', 'Ensures the block only runs when the script is executed directly, not when imported', 'Defines the main function', 'Starts a GUI'], correctIndex: 1, explanation: 'This guard prevents code from running when the module is imported by another script. It allows a file to be both importable as a library and executable as a standalone program.' }
    ]
  },

  'Statistics Fundamentals': {
    title: 'Statistics Fundamentals',
    subtitle: 'Descriptive statistics, probability distributions, and hypothesis testing',
    estimatedTime: '60 min',
    whyItMatters: 'Statistics is the foundation of data science and machine learning. Understanding distributions, correlations, and hypothesis testing is essential for making data-driven decisions.',
    learningObjectives: [
      'Calculate and interpret descriptive statistics (mean, median, std dev)',
      'Understand probability distributions and their applications',
      'Perform basic hypothesis testing'
    ],
    sections: [
      {
        title: 'Descriptive Statistics',
        content: 'Central tendency: mean (average), median (middle value), mode (most frequent). Spread: range (max-min), variance (average squared deviation), standard deviation (square root of variance). Skewness measures asymmetry. Kurtosis measures tail heaviness. Outliers can significantly affect the mean but not the median.',
        codeSnippet: { language: 'python', code: 'import numpy as np\nfrom scipy import stats\n\ndata = [23, 45, 12, 67, 34, 89, 56, 23, 45, 12]\n\nprint(f"Mean: {np.mean(data):.2f}")     # 40.60\nprint(f"Median: {np.median(data)}")      # 39.5\nprint(f"Std Dev: {np.std(data):.2f}")   # 23.18\nprint(f"Skewness: {stats.skew(data):.2f}")' }
      },
      {
        title: 'Probability Distributions',
        content: 'Normal (Gaussian) distribution is bell-shaped, defined by mean and standard deviation — most natural phenomena follow this. Binomial distribution counts successes in fixed trials. Poisson distribution counts events in a fixed interval. Uniform distribution has equal probability for all outcomes.',
        codeSnippet: { language: 'python', code: 'from scipy import stats\nimport numpy as np\n\n# Normal distribution\nnormal = stats.norm(loc=100, scale=15)  # IQ scores\nprint(f"P(X < 115): {normal.cdf(115):.4f}")  # 0.8413\n\n# Binomial distribution\nbinom = stats.binom(n=10, p=0.3)\nprint(f"P(X >= 3): {1 - binom.cdf(2):.4f}")\n\n# Generate random samples\nsamples = np.random.normal(100, 15, 1000)' }
      },
      {
        title: 'Hypothesis Testing',
        content: 'Hypothesis testing evaluates claims about population parameters. The null hypothesis (H0) assumes no effect. The p-value is the probability of observing the data if H0 is true. If p < significance level (typically 0.05), reject H0. Common tests: t-test (comparing means), chi-square (categorical data), ANOVA (comparing multiple means).',
        codeSnippet: { language: 'python', code: 'from scipy import stats\n\n# Two-sample t-test\ngroup_a = [85, 90, 78, 92, 88]\ngroup_b = [72, 80, 75, 70, 78]\n\nt_stat, p_value = stats.ttest_ind(group_a, group_b)\nprint(f"t-statistic: {t_stat:.3f}")\nprint(f"p-value: {p_value:.4f}")\n\nif p_value < 0.05:\n    print("Significant difference (reject H0)")\nelse:\n    print("No significant difference (fail to reject H0)")' }
      }
    ],
    keyTakeaways: [
      'Mean is sensitive to outliers; median is robust',
      'Normal distribution underlies many statistical tests',
      'p-value < 0.05 typically indicates statistical significance',
      'Always check assumptions before applying statistical tests'
    ],
    practice: [
      { question: 'When should you use the median instead of the mean?', options: ['Always', 'When data is symmetric', 'When data has outliers or is skewed', 'Never'], correctIndex: 2, explanation: 'The median is robust to outliers and skewed data, while the mean can be heavily influenced by extreme values.' },
      { question: 'What does a p-value of 0.03 indicate?', options: ['3% chance H0 is true', '3% probability of observing the data if H0 is true', '97% confidence in the result', 'The effect size is large'], correctIndex: 1, explanation: 'The p-value is the probability of observing data as extreme as yours if the null hypothesis is true. p < 0.05 typically leads to rejecting H0.' },
      { question: 'What is the standard deviation and what does it tell you?', options: ['The average value of the dataset', 'How spread out the data is from the mean', 'The most frequent value', 'The middle value'], correctIndex: 1, explanation: 'Standard deviation measures the average distance of data points from the mean. A small SD means data is clustered near the mean; a large SD means data is spread out.' },
      { question: 'What is the difference between a population and a sample?', options: ['No difference', 'Population is all data; sample is a subset used for analysis', 'Sample is always larger', 'Population is smaller than a sample'], correctIndex: 1, explanation: 'The population is the entire group you want to draw conclusions about. A sample is a subset of the population used to estimate population statistics.' },
      { question: 'What does correlation coefficient r = -0.9 indicate?', options: ['No relationship', 'A strong negative linear relationship between the variables', 'A weak positive relationship', 'The variables are identical'], correctIndex: 1, explanation: 'r ranges from -1 to +1. r = -0.9 means as one variable increases, the other decreases strongly. The closer to -1 or +1, the stronger the linear relationship.' }
    ]
  },

  'Pandas & NumPy': {
    title: 'Pandas & NumPy',
    subtitle: 'Data manipulation and numerical computing in Python',
    estimatedTime: '75 min',
    whyItMatters: 'Pandas and NumPy are the core data manipulation libraries in Python. NumPy provides fast array operations; Pandas provides DataFrames for structured data analysis.',
    learningObjectives: [
      'Perform array operations with NumPy',
      'Load, filter, group, and transform data with Pandas DataFrames',
      'Handle missing data and merge datasets'
    ],
    sections: [
      {
        title: 'NumPy Arrays',
        content: 'NumPy arrays are homogeneous, fixed-size, and much faster than Python lists for numerical operations. Broadcasting lets you perform operations on arrays of different shapes. Universal functions (ufuncs) apply element-wise operations. Slicing and indexing work like lists but support multi-dimensional access.',
        codeSnippet: { language: 'python', code: 'import numpy as np\n\narr = np.array([1, 2, 3, 4, 5])\nprint(arr * 2)          # [2, 4, 6, 8, 10]\nprint(arr.mean())       # 3.0\n\n# 2D array\nmatrix = np.array([[1, 2], [3, 4]])\nprint(matrix.T)         # transpose\nprint(np.linalg.inv(matrix))  # inverse\n\n# Broadcasting\na = np.array([[1], [2], [3]])  # (3,1)\nb = np.array([10, 20])          # (2,)\nprint(a + b)  # [[11,21],[12,22],[13,23]]' }
      },
      {
        title: 'Pandas DataFrames',
        content: 'DataFrames are tabular data structures with labeled rows and columns. Read CSV/Excel/JSON with pd.read_csv(), etc. Filter rows with boolean indexing, select columns with df["col"] or df[["col1", "col2"]]. Groupby aggregates data by categories. Describe() gives summary statistics.',
        codeSnippet: { language: 'python', code: 'import pandas as pd\n\ndf = pd.read_csv("sales.csv")\n\n# Filter\nhigh_sales = df[df["amount"] > 1000]\n\n# Group and aggregate\nsummary = df.groupby("region").agg(\n    total=("amount", "sum"),\n    count=("amount", "count"),\n    avg=("amount", "mean")\n).round(2)\n\n# Sort\ntop = df.nlargest(10, "amount")\n\n# New column\ndf["tax"] = df["amount"] * 0.08' }
      },
      {
        title: 'Handling Missing Data',
        content: 'Missing data is common in real-world datasets. Pandas represents missing values as NaN. Use df.isna().sum() to count missing values. Drop rows with df.dropna() or fill with df.fillna(value). For time series, use forward-fill (ffill) or interpolation. Always document your handling strategy.',
        codeSnippet: { language: 'python', code: '# Check missing values\nprint(df.isna().sum())\n\n# Drop rows with any missing\ndf_clean = df.dropna()\n\n# Fill with specific values\ndf["age"] = df["age"].fillna(df["age"].median())\ndf["city"] = df["city"].fillna("Unknown")\n\n# Forward fill for time series\ndf["price"] = df["price"].ffill()\n\n# Interpolate\ndf["temperature"] = df["temperature"].interpolate()' }
      }
    ],
    keyTakeaways: [
      'NumPy arrays are fast and support broadcasting for element-wise operations',
      'DataFrames provide SQL-like operations (select, filter, group, join)',
      'Always check and handle missing data before analysis',
      'Vectorized operations are much faster than Python loops'
    ],
    practice: [
      { question: 'How do you count missing values per column?', options: ['df.count()', 'df.isna().sum()', 'df.missing()', 'df.na_count()'], correctIndex: 1, explanation: 'df.isna() returns a boolean DataFrame, and .sum() counts True values (missing) per column.' },
      { question: 'What is the difference between loc and iloc?', options: ['No difference', 'loc uses labels, iloc uses integer positions', 'loc is faster than iloc', 'iloc is for single values only'], correctIndex: 1, explanation: 'loc selects by label (df.loc[0, "name"]), iloc selects by integer position (df.iloc[0, 1]).' },
      { question: 'What does df.merge() do?', options: ['Deletes rows', 'Combines two DataFrames based on a common key, similar to SQL JOIN', 'Sorts the DataFrame', 'Removes duplicates'], correctIndex: 1, explanation: 'merge() joins two DataFrames on a shared column or index. It supports inner, outer, left, and right joins, similar to SQL JOIN operations.' },
      { question: 'What is the difference between apply() and map() on a Series?', options: ['No difference', 'apply() accepts any function; map() is limited to element-wise operations', 'map() is slower', 'apply() is for DataFrames only'], correctIndex: 1, explanation: 'map() applies element-wise transformations on a Series. apply() is more flexible and can apply functions that operate on entire rows or columns.' },
      { question: 'What does df.pivot_table() do?', options: ['Rotates rows to columns', 'Creates a spreadsheet-like pivot table with aggregation', 'Deletes the original DataFrame', 'Creates a new column'], correctIndex: 1, explanation: 'pivot_table() reshapes data by creating a new DataFrame with specified index, columns, and values, applying an aggregation function (default: mean) to combine duplicates.' }
    ]
  },

  'Data Visualization': {
    title: 'Data Visualization',
    subtitle: 'Creating charts and dashboards with Matplotlib and Seaborn',
    estimatedTime: '60 min',
    whyItMatters: 'Visualization communicates data insights effectively. Charts reveal patterns, trends, and outliers that tables cannot. Matplotlib and Seaborn are Python\'s primary visualization libraries.',
    learningObjectives: [
      'Create common chart types: line, bar, scatter, histogram',
      'Customize plots with labels, titles, legends, and colors',
      'Use Seaborn for statistical visualizations'
    ],
    sections: [
      {
        title: 'Matplotlib Basics',
        content: 'Matplotlib is the foundation of Python visualization. pyplot provides a MATLAB-like interface. Figure is the top-level container; Axes is the actual plot area. Use plt.plot() for line charts, plt.bar() for bar charts, plt.scatter() for scatter plots, and plt.hist() for histograms.',
        codeSnippet: { language: 'python', code: 'import matplotlib.pyplot as plt\n\n# Line chart\nmonths = ["Jan", "Feb", "Mar", "Apr", "May"]\nsales = [100, 150, 130, 180, 200]\n\nplt.figure(figsize=(10, 6))\nplt.plot(months, sales, marker="o", linewidth=2)\nplt.title("Monthly Sales")\nplt.xlabel("Month")\nplt.ylabel("Sales ($)")\nplt.grid(True, alpha=0.3)\nplt.tight_layout()\nplt.savefig("sales.png", dpi=150)' }
      },
      {
        title: 'Statistical Plots with Seaborn',
        content: 'Seaborn builds on Matplotlib and provides beautiful statistical visualizations. Box plots show distributions and outliers. Heatmaps reveal correlations. Pair plots show relationships between all variable pairs. violin plots combine box plots with kernel density estimation.',
        codeSnippet: { language: 'python', code: 'import seaborn as sns\nimport pandas as pd\n\n# Correlation heatmap\ncorr = df[["age", "income", "score"]].corr()\nsns.heatmap(corr, annot=True, cmap="coolwarm", center=0)\nplt.title("Correlation Matrix")\n\n# Box plot\nsns.boxplot(data=df, x="category", y="value")\nplt.title("Distribution by Category")\n\n# Pair plot\nsns.pairplot(df, hue="species", diag_kind="kde")' }
      },
      {
        title: 'Customization and Best Practices',
        content: 'Always label axes, add titles, and include legends. Use colorblind-friendly palettes. Avoid chart junk — minimize gridlines, borders, and decorative elements. Choose the right chart type: bar for categories, line for trends, scatter for relationships, histogram for distributions. Save with plt.savefig() for reports.',
        examples: ['Use sns.color_palette("colorblind") for accessibility', 'plt.style.use("seaborn-v0_8-whitegrid") for clean look', 'Set font sizes with plt.rcParams["font.size"] = 12'],
      }
    ],
    keyTakeaways: [
      'Matplotlib for basic plots; Seaborn for statistical visualizations',
      'Always label axes, add titles, and include legends',
      'Choose chart type based on data type and question',
      'Save high-resolution figures with dpi=150 or 300'
    ],
    practice: [
      { question: 'Which chart shows the distribution of a single variable?', options: ['Bar chart', 'Scatter plot', 'Histogram', 'Line chart'], correctIndex: 2, explanation: 'A histogram shows the frequency distribution of a single continuous variable by dividing data into bins.' },
      { question: 'What does a correlation heatmap show?', options: ['Raw data values', 'Strength and direction of relationships between variables', 'Missing data locations', 'Time series trends'], correctIndex: 1, explanation: 'A correlation heatmap uses color intensity to show how strongly pairs of variables are related, from -1 (inverse) to +1 (direct).' },
      { question: 'What is the purpose of adding a legend to a chart?', options: ['To make the chart larger', 'To explain what each color, line, or symbol represents', 'To add data labels', 'To change the chart type'], correctIndex: 1, explanation: 'A legend maps visual encodings (colors, line styles, markers) to their meanings, allowing viewers to interpret multi-series or categorized data correctly.' },
      { question: 'What is the difference between plt.plot() and plt.scatter()?', options: ['No difference', 'plot() draws connected lines; scatter() draws individual points', 'scatter() is faster', 'plot() requires two arrays'], correctIndex: 1, explanation: 'plt.plot() connects data points with lines, ideal for trends. plt.scatter() draws individual dots, often used to show relationships between two continuous variables.' },
      { question: 'When should you use a box plot over a histogram?', options: ['Always', 'When comparing distributions across multiple categories side by side', 'When you have only one variable', 'When data is categorical'], correctIndex: 1, explanation: 'Box plots compactly show distribution summary (median, quartiles, outliers) and are ideal for comparing multiple groups. Histograms are better for detailed single-variable distribution shape.' }
    ]
  },

  'Python for AI': {
    title: 'Python for AI',
    subtitle: 'Python libraries and patterns for AI/ML development',
    estimatedTime: '60 min',
    whyItMatters: 'Python is the dominant language for AI development, with libraries for data manipulation, machine learning, deep learning, and NLP.',
    learningObjectives: [
      'Use NumPy, Pandas, and scikit-learn for ML workflows',
      'Understand the ML pipeline: data prep, training, evaluation',
      'Build and evaluate simple models'
    ],
    sections: [
      {
        title: 'ML Workflow',
        content: 'The machine learning pipeline: collect data → clean and preprocess → feature engineering → split into train/test → train model → evaluate → deploy. Each step requires specific Python libraries. Data loading: Pandas. Preprocessing: scikit-learn. Training: scikit-learn, PyTorch, TensorFlow. Evaluation: scikit-learn metrics.',
        codeSnippet: { language: 'python', code: 'import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\n# Load data\ndf = pd.read_csv("customers.csv")\n\n# Feature engineering\ndf["avg_purchase"] = df["total_spent"] / df["num_purchases"]\n\n# Split\nX_train, X_test, y_train, y_test = train_test_split(\n    df[["age", "avg_purchase", "tenure"]],\n    df["churned"],\n    test_size=0.2,\n    random_state=42\n)\n\n# Train\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\n\n# Evaluate\npreds = model.predict(X_test)\nprint(f"Accuracy: {accuracy_score(y_test, preds):.2%}")' }
      },
      {
        title: 'Feature Engineering',
        content: 'Features are the inputs to your model. Good features capture meaningful patterns. Common techniques: scaling (StandardScaler, MinMaxScaler), encoding (OneHotEncoder for categories), creating interaction features, handling missing values, and dimensionality reduction (PCA). Feature engineering often matters more than model choice.',
        codeSnippet: { language: 'python', code: 'from sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.compose import ColumnTransformer\n\n# Column transformer for mixed types\npreprocessor = ColumnTransformer([\n    ("num", StandardScaler(), ["age", "income"]),\n    ("cat", OneHotEncoder(), ["city", "gender"])\n])\n\n# Fit and transform\nX_processed = preprocessor.fit_transform(X)' }
      },
      {
        title: 'Model Evaluation',
        content: 'Never evaluate on training data. Use cross-validation for robust estimates. Metrics: accuracy (balanced classes), precision (minimize false positives), recall (minimize false negatives), F1 (balance), AUC-ROC (threshold-independent). Confusion matrices show all four outcomes.',
        codeSnippet: { language: 'python', code: 'from sklearn.model_selection import cross_val_score\nfrom sklearn.metrics import classification_report, confusion_matrix\n\n# Cross-validation\ncv_scores = cross_val_score(model, X, y, cv=5, scoring="accuracy")\nprint(f"CV Accuracy: {cv_scores.mean():.2%} (+/- {cv_scores.std():.2%})")\n\n# Detailed report\nprint(classification_report(y_test, preds, target_names=["Stayed", "Churned"]))\n\n# Confusion matrix\nprint(confusion_matrix(y_test, preds))' }
      }
    ],
    keyTakeaways: [
      'Follow the ML pipeline: data → features → train → evaluate → deploy',
      'Feature engineering often matters more than model architecture',
      'Always evaluate on held-out test data, never training data',
      'Cross-validation gives more reliable performance estimates'
    ],
    practice: [
      { question: 'Why should you never evaluate on training data?', options: ['It is too slow', 'The model memorizes training data, giving optimistic estimates', 'It does not work', 'Training data is always wrong'], correctIndex: 1, explanation: 'Models can overfit to training data. Evaluating on unseen test data gives a realistic estimate of generalization performance.' },
      { question: 'When should you use precision over accuracy?', options: ['Always', 'When false positives are costly', 'When classes are balanced', 'When you have lots of data'], correctIndex: 1, explanation: 'Precision measures how many predicted positives are actually positive. Use it when false positives are costly (e.g., spam filters).' },
      { question: 'What is the purpose of train_test_split()?', options: ['To clean data', 'To evaluate model performance on unseen data by holding out a test set', 'To train two models at once', 'To balance class distribution'], correctIndex: 1, explanation: 'train_test_split separates data into training and test sets. The model learns from the training set and is evaluated on the unseen test set to estimate real-world performance.' },
      { question: 'What is a Random Forest and why use it?', options: ['A single decision tree', 'An ensemble of decision trees that reduces overfitting through bagging', 'A type of neural network', 'A clustering algorithm'], correctIndex: 1, explanation: 'Random Forest trains multiple decision trees on random subsets of data and features, then averages their predictions. This reduces variance and overfitting compared to a single tree.' },
      { question: 'What does the random_state parameter do?', options: ['Sets the random seed for reproducibility', 'Enables parallel processing', 'Shuffles the dataset', 'Resets the model'], correctIndex: 0, explanation: 'random_state sets the seed for the random number generator, ensuring that the same train/test split and model initialization occur every time, making results reproducible.' }
    ]
  },

  'Linear Algebra': {
    title: 'Linear Algebra',
    subtitle: 'Vectors, matrices, and transformations for ML',
    estimatedTime: '50 min',
    whyItMatters: 'Linear algebra is the mathematical foundation of machine learning. Neural networks, dimensionality reduction, and recommendation systems all rely on matrix operations.',
    learningObjectives: [
      'Perform vector and matrix operations',
      'Understand eigenvalues and eigenvectors',
      'Apply linear algebra to ML concepts (PCA, embeddings)'
    ],
    sections: [
      {
        title: 'Vectors and Matrices',
        content: 'A vector is a one-dimensional array; a matrix is two-dimensional. Operations: addition, scalar multiplication, dot product, matrix multiplication. The dot product measures similarity (cosine similarity). Matrix multiplication chains transformations. NumPy handles all these operations efficiently.',
        codeSnippet: { language: 'python', code: 'import numpy as np\n\n# Vectors\nv1 = np.array([1, 2, 3])\nv2 = np.array([4, 5, 6])\n\n# Dot product\nprint(np.dot(v1, v2))  # 32\n\n# Cosine similarity\ncos_sim = np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))\nprint(f"Cosine similarity: {cos_sim:.3f}")\n\n# Matrix multiplication\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\nprint(A @ B)  # or np.matmul(A, B)' }
      },
      {
        title: 'Eigenvalues and Eigenvectors',
        content: 'An eigenvector of a matrix is a direction that only gets scaled (not rotated) when the matrix is applied to it. The eigenvalue is the scaling factor. PCA finds the eigenvectors of the covariance matrix — the principal components. These capture the most variance in the data.',
        codeSnippet: { language: 'python', code: 'import numpy as np\n\nA = np.array([[4, 2], [1, 3]])\neigenvalues, eigenvectors = np.linalg.eig(A)\n\nprint(f"Eigenvalues: {eigenvalues}")\nprint(f"Eigenvectors:\\n{eigenvectors}")\n\n# Verify: A @ v = lambda * v\nfor i in range(len(eigenvalues)):\n    lhs = A @ eigenvectors[:, i]\n    rhs = eigenvalues[i] * eigenvectors[:, i]\n    print(f"Match {i}: {np.allclose(lhs, rhs)}")' }
      },
      {
        title: 'Applications in ML',
        content: 'PCA (Principal Component Analysis) uses eigendecomposition to reduce dimensionality while preserving variance. SVD (Singular Value Decomposition) is used in recommendation systems and NLP. Word embeddings (Word2Vec, GloVe) represent words as vectors where semantic similarity corresponds to vector distance.',
        examples: ['PCA reduces 100 features to 10 principal components', 'SVD powers collaborative filtering in recommendation systems', 'Word embeddings: king - man + woman ≈ queen'],
      }
    ],
    keyTakeaways: [
      'Dot product measures vector similarity; matrix multiplication chains transformations',
      'Eigenvalues/vectors identify the most important directions in data',
      'PCA, SVD, and embeddings are key ML applications of linear algebra',
      'NumPy provides efficient implementations of all linear algebra operations'
    ],
    practice: [
      { question: 'What does PCA find?', options: ['The mean of the data', 'The principal components (directions of maximum variance)', 'The best model', 'The optimal hyperparameters'], correctIndex: 1, explanation: 'PCA finds eigenvectors of the covariance matrix — directions (principal components) along which the data varies the most.' },
      { question: 'What is the dot product used for?', options: ['Adding vectors', 'Measuring similarity between vectors', 'Multiplying matrices', 'Finding the inverse'], correctIndex: 1, explanation: 'The dot product measures how aligned two vectors are. When normalized, it gives cosine similarity — a common metric for text and recommendation systems.' },
      { question: 'What is matrix multiplication and when is it used in ML?', options: ['Element-wise multiplication', 'Combines two matrices by taking dot products of rows and columns; used in neural network forward passes', 'Adding two matrices together', 'Inverting a matrix'], correctIndex: 1, explanation: 'Matrix multiplication chains linear transformations. In neural networks, each layer computes Wx + b, where W is a weight matrix and x is the input vector.' },
      { question: 'What is the role of an identity matrix?', options: ['It inverts a matrix', 'When multiplied with any matrix, it returns the original matrix', 'It zeros out all values', 'It transposes a matrix'], correctIndex: 1, explanation: 'An identity matrix has 1s on the diagonal and 0s elsewhere. Multiplying by it leaves the original matrix unchanged, similar to multiplying by 1 in arithmetic.' },
      { question: 'Why is the transpose of a matrix important in ML?', options: ['It makes the matrix smaller', 'It switches rows and columns, used in computing gradients and normal equations', 'It removes zero values', 'It sorts the matrix'], correctIndex: 1, explanation: 'The transpose swaps rows and columns. It is critical in backpropagation (computing gradients) and in the normal equation for linear regression.' }
    ]
  },

  'Machine Learning Fundamentals': {
    title: 'Machine Learning Fundamentals',
    subtitle: 'Supervised, unsupervised, and reinforcement learning',
    estimatedTime: '75 min',
    whyItMatters: 'Machine learning enables computers to learn from data and make predictions. Understanding the types, algorithms, and evaluation methods is essential for building intelligent systems.',
    learningObjectives: [
      'Classify problems as supervised, unsupervised, or reinforcement learning',
      'Choose appropriate algorithms for different problem types',
      'Understand bias-variance tradeoff and overfitting'
    ],
    sections: [
      {
        title: 'Types of Machine Learning',
        content: 'Supervised learning learns from labeled data — input-output pairs (classification: spam detection; regression: price prediction). Unsupervised learning finds patterns in unlabeled data (clustering: customer segmentation; dimensionality reduction: PCA). Reinforcement learning learns through trial and error with rewards (game playing, robotics).',
        codeSnippet: { language: 'python', code: 'from sklearn.linear_model import LogisticRegression, LinearRegression\nfrom sklearn.cluster import KMeans\n\n# Supervised: Classification\nclf = LogisticRegression()\nclf.fit(X_train, y_train)  # y_train has labels\npreds = clf.predict(X_test)\n\n# Supervised: Regression\nreg = LinearRegression()\nreg.fit(X_train, y_train)  # y_train is continuous\npredictions = reg.predict(X_test)\n\n# Unsupervised: Clustering\nkmeans = KMeans(n_clusters=3)\nclusters = kmeans.fit_predict(X)' }
      },
      {
        title: 'Bias-Variance Tradeoff',
        content: 'High bias (underfitting): model is too simple, misses patterns. High variance (overfitting): model memorizes noise in training data. The goal is finding the sweet spot. Regularization (L1/L2), cross-validation, and ensemble methods help manage this tradeoff. More data helps reduce variance; more features can increase it.',
        codeSnippet: { language: 'python', code: 'from sklearn.model_selection import learning_curve\n\n# Learning curve shows bias-variance\ntrain_sizes, train_scores, val_scores = learning_curve(\n    model, X, y, cv=5, train_sizes=np.linspace(0.1, 1.0, 10)\n)\n\n# High gap = high variance (overfitting)\n# Both low = high bias (underfitting)\nprint(f"Train: {train_scores.mean():.3f}, Val: {val_scores.mean():.3f}")' }
      },
      {
        title: 'Model Selection',
        content: 'Linear models for simple, interpretable problems. Decision trees for tabular data. Random forests and gradient boosting for competitive performance. Neural networks for unstructured data (images, text). Start simple, add complexity only if needed. Always compare against a baseline.',
        examples: ['Logistic Regression for binary classification', 'Random Forest for tabular data', 'CNN for image classification', 'Transformer for NLP tasks'],
      }
    ],
    keyTakeaways: [
      'Supervised: labeled data → predictions; Unsupervised: unlabeled → patterns',
      'Bias-variance tradeoff: too simple = underfit, too complex = overfit',
      'Start with simple models; add complexity only when justified by data',
      'Cross-validation is more reliable than a single train/test split'
    ],
    practice: [
      { question: 'What is overfitting?', options: ['Model is too simple', 'Model memorizes training data and fails on new data', 'Model trains too slowly', 'Model uses too little data'], correctIndex: 1, explanation: 'Overfitting occurs when a model learns noise in training data rather than the underlying pattern, performing well on training but poorly on test data.' },
      { question: 'When should you use a neural network over a random forest?', options: ['Always', 'When data is unstructured (images, text, audio)', 'When you need interpretability', 'When data is small'], correctIndex: 1, explanation: 'Neural networks excel with unstructured data (images, text, audio) where feature engineering is difficult. Random forests work better on tabular data with engineered features.' },
      { question: 'What is unsupervised learning used for?', options: ['Predicting labeled outcomes', 'Discovering hidden patterns and structure in unlabeled data', 'Classifying emails as spam or not', 'Generating text'], correctIndex: 1, explanation: 'Unsupervised learning finds patterns in data without labels. Common uses include clustering (grouping similar data points), dimensionality reduction, and anomaly detection.' },
      { question: 'What is the difference between classification and regression?', options: ['No difference', 'Classification predicts categories; regression predicts continuous values', 'Classification is unsupervised', 'Regression is faster'], correctIndex: 1, explanation: 'Classification assigns inputs to discrete categories (spam/not spam). Regression predicts continuous numeric values (house prices, temperatures).' },
      { question: 'What is cross-validation and why use it?', options: ['Training on the test set', 'Splitting data into multiple folds to evaluate model performance more reliably', 'Using multiple models simultaneously', 'A type of data augmentation'], correctIndex: 1, explanation: 'Cross-validation splits data into K folds, training on K-1 and testing on 1, rotating K times. This gives a more reliable performance estimate than a single train/test split.' }
    ]
  },

  'Model Evaluation': {
    title: 'Model Evaluation',
    subtitle: 'Metrics, cross-validation, and model comparison',
    estimatedTime: '60 min',
    whyItMatters: 'Choosing the right evaluation metric and validating your model properly prevents deploying models that fail in production.',
    learningObjectives: [
      'Select appropriate metrics for classification and regression',
      'Use cross-validation for robust performance estimation',
      'Interpret confusion matrices and ROC curves'
    ],
    sections: [
      {
        title: 'Classification Metrics',
        content: 'Accuracy = (TP + TN) / Total. Precision = TP / (TP + FP) — how many predicted positives are correct. Recall = TP / (TP + FN) — how many actual positives were found. F1 = harmonic mean of precision and recall. AUC-ROC measures the tradeoff between true positive rate and false positive rate across thresholds.',
        codeSnippet: { language: 'python', code: 'from sklearn.metrics import (accuracy_score, precision_score, recall_score,\n                             f1_score, roc_auc_score, confusion_matrix)\n\ny_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]\ny_pred = [1, 0, 1, 0, 0, 1, 1, 0, 1, 0]\n\nprint(f"Accuracy: {accuracy_score(y_true, y_pred):.2%}")\nprint(f"Precision: {precision_score(y_true, y_pred):.2%}")\nprint(f"Recall: {recall_score(y_true, y_pred):.2%}")\nprint(f"F1: {f1_score(y_true, y_pred):.2%}")\nprint(f"AUC-ROC: {roc_auc_score(y_true, y_pred):.2%}")' }
      },
      {
        title: 'Regression Metrics',
        content: 'MAE (Mean Absolute Error): average absolute difference. MSE (Mean Squared Error): penalizes large errors more. RMSE: square root of MSE, in original units. R²: proportion of variance explained (1 = perfect, 0 = baseline). Use MAE for robust evaluation, RMSE when large errors matter.',
        codeSnippet: { language: 'python', code: 'from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\nimport numpy as np\n\ny_true = [100, 200, 300, 400, 500]\ny_pred = [110, 190, 310, 380, 520]\n\nprint(f"MAE: {mean_absolute_error(y_true, y_pred):.2f}")\nprint(f"RMSE: {np.sqrt(mean_squared_error(y_true, y_pred)):.2f}")\nprint(f"R²: {r2_score(y_true, y_pred):.2%}")' }
      },
      {
        title: 'Cross-Validation and Comparison',
        content: 'K-fold cross-validation splits data into K folds, training on K-1 and testing on 1, rotating. This gives K performance estimates. Stratified K-fold preserves class distribution. Use paired statistical tests (McNemar\'s, paired t-test) to compare models. Always test on a completely held-out test set only once.',
        codeSnippet: { language: 'python', code: 'from sklearn.model_selection import cross_val_score, StratifiedKFold\nfrom sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier\n\n# Compare models with cross-validation\nmodels = {\n    "Random Forest": RandomForestClassifier(n_estimators=100),\n    "Gradient Boosting": GradientBoostingClassifier(),\n}\n\nfor name, model in models.items():\n    scores = cross_val_score(model, X, y, cv=StratifiedKFold(5), scoring="f1")\n    print(f"{name}: F1 = {scores.mean():.3f} (+/- {scores.std():.3f})")' }
      }
    ],
    keyTakeaways: [
      'Accuracy alone is misleading for imbalanced datasets',
      'Precision for minimizing false positives; recall for minimizing false negatives',
      'Cross-validation gives more reliable estimates than a single split',
      'Always compare models against a simple baseline'
    ],
    practice: [
      { question: 'When is accuracy misleading?', options: ['When data is balanced', 'When one class dominates (imbalanced dataset)', 'When you have many features', 'When the model is complex'], correctIndex: 1, explanation: 'A model predicting the majority class can achieve high accuracy but be useless. Use F1 or AUC-ROC for imbalanced datasets.' },
      { question: 'What does R² = 0.85 mean?', options: ['85% accuracy', 'The model explains 85% of the variance in the target', '85% of predictions are correct', 'The model is 85% confident'], correctIndex: 1, explanation: 'R² measures the proportion of variance in the dependent variable that is predictable from the independent variables.' },
      { question: 'What is the purpose of a confusion matrix?', options: ['To display model hyperparameters', 'To show the counts of true positives, false positives, true negatives, and false negatives', 'To plot training loss', 'To visualize feature importance'], correctIndex: 1, explanation: 'A confusion matrix is a table showing actual vs predicted labels, revealing where the model is making errors and which classes are being confused.' },
      { question: 'When should you prefer F1 score over accuracy?', options: ['When data is balanced', 'When you have imbalanced classes and want a balance between precision and recall', 'Always', 'When you have lots of data'], correctIndex: 1, explanation: 'F1 is the harmonic mean of precision and recall. It is more informative than accuracy for imbalanced datasets where one class dominates.' },
      { question: 'What does the ROC curve plot?', options: ['Training loss vs epochs', 'True positive rate vs false positive rate across different thresholds', 'Precision vs recall', 'Predicted values vs actual values'], correctIndex: 1, explanation: 'The ROC curve shows the tradeoff between sensitivity (TPR) and specificity (1 - FPR) at various classification thresholds. The area under the curve (AUC) summarizes overall performance.' }
    ]
  },

  'Deep Learning Basics': {
    title: 'Deep Learning Basics',
    subtitle: 'Neural networks, backpropagation, and training fundamentals',
    estimatedTime: '75 min',
    whyItMatters: 'Deep learning powers image recognition, natural language processing, and generative AI. Understanding neural network fundamentals is essential for modern AI development.',
    learningObjectives: [
      'Understand neural network architecture: layers, neurons, activation functions',
      'Explain backpropagation and gradient descent',
      'Build and train a simple neural network'
    ],
    sections: [
      {
        title: 'Neural Network Architecture',
        content: 'A neural network consists of layers of neurons. Input layer receives features. Hidden layers transform data through weighted connections. Output layer produces predictions. Each neuron computes a weighted sum, adds bias, and applies an activation function (ReLU, sigmoid, softmax). Depth (layers) and width (neurons per layer) determine model capacity.',
        codeSnippet: { language: 'python', code: 'import torch.nn as nn\n\n# Simple neural network\nmodel = nn.Sequential(\n    nn.Linear(784, 256),  # input → hidden\n    nn.ReLU(),\n    nn.Dropout(0.2),\n    nn.Linear(256, 128),  # hidden → hidden\n    nn.ReLU(),\n    nn.Linear(128, 10)    # hidden → output\n)\n\n# For classification, add softmax\nsoftmax = nn.Softmax(dim=1)' }
      },
      {
        title: 'Training with Backpropagation',
        content: 'Training minimizes a loss function by updating weights. Forward pass computes predictions. Loss function measures error (cross-entropy for classification, MSE for regression). Backpropagation computes gradients using the chain rule. Optimizer (SGD, Adam) updates weights to reduce loss. Learning rate controls step size.',
        codeSnippet: { language: 'python', code: 'import torch.optim as optim\n\n# Loss and optimizer\ncriterion = nn.CrossEntropyLoss()\noptimizer = optim.Adam(model.parameters(), lr=0.001)\n\n# Training loop\nfor epoch in range(10):\n    for batch_X, batch_y in train_loader:\n        optimizer.zero_grad()        # reset gradients\n        output = model(batch_X)      # forward pass\n        loss = criterion(output, batch_y)  # compute loss\n        loss.backward()              # backward pass\n        optimizer.step()             # update weights\n    print(f"Epoch {epoch+1}, Loss: {loss.item():.4f}")' }
      },
      {
        title: 'Overfitting Prevention',
        content: 'Deep networks easily overfit. Techniques: dropout (randomly disable neurons during training), batch normalization (stabilize learning), data augmentation (expand training set), early stopping (halt when validation loss increases), weight decay (L2 regularization). More data is the most effective remedy.',
        codeSnippet: { language: 'python', code: '# Early stopping\nclass EarlyStopping:\n    def __init__(self, patience=5):\n        self.patience = patience\n        self.counter = 0\n        self.best_loss = float("inf")\n    \n    def check(self, val_loss):\n        if val_loss < self.best_loss:\n            self.best_loss = val_loss\n            self.counter = 0\n            return False  # continue training\n        self.counter += 1\n        return self.counter >= self.patience  # stop' }
      }
    ],
    keyTakeaways: [
      'Neural networks learn hierarchical representations of data',
      'Backpropagation computes gradients; optimizers update weights',
      'Dropout, batch norm, and early stopping prevent overfitting',
      'Start simple, increase complexity only when needed'
    ],
    practice: [
      { question: 'What does the ReLU activation do?', options: ['Returns the input unchanged', 'Returns max(0, x) — negative values become zero', 'Returns a probability between 0 and 1', 'Normalizes the output'], correctIndex: 1, explanation: 'ReLU (Rectified Linear Unit) outputs max(0, x). It introduces non-linearity and is computationally efficient, making it the most common activation for hidden layers.' },
      { question: 'What is dropout?', options: ['Removing training data', 'Randomly disabling neurons during training to prevent overfitting', 'A type of activation function', 'Reducing the learning rate'], correctIndex: 1, explanation: 'Dropout randomly sets a fraction of neurons to zero during each training step. This prevents co-adaptation and acts as a form of ensemble learning.' },
      { question: 'What is the vanishing gradient problem?', options: ['Gradients become too large and explode', 'Gradients shrink toward zero in early layers, making them hard to update', 'The model stops training', 'The loss function becomes negative'], correctIndex: 1, explanation: 'In deep networks, gradients can shrink exponentially as they propagate backward through many layers. Early layers receive near-zero updates, preventing learning. ReLU and batch norm help mitigate this.' },
      { question: 'What is the role of a loss function?', options: ['To generate predictions', 'To measure the difference between predictions and actual values', 'To optimize hyperparameters', 'To preprocess data'], correctIndex: 1, explanation: 'The loss function quantifies how wrong the model predictions are compared to ground truth. Training minimizes this loss by adjusting model weights through gradient descent.' },
      { question: 'What does batch normalization do?', options: ['Removes batch dimensions', 'Normalizes layer inputs to stabilize and accelerate training', 'Increases batch size', 'Normalizes output to a probability distribution'], correctIndex: 1, explanation: 'Batch normalization normalizes the inputs of each layer to have zero mean and unit variance, stabilizing training and allowing higher learning rates.' }
    ]
  },

  'Feature Engineering': {
    title: 'Feature Engineering',
    subtitle: 'Creating, transforming, and selecting features for ML models',
    estimatedTime: '60 min',
    whyItMatters: 'Feature engineering is often more impactful than model selection. The right features can dramatically improve model performance and interpretability.',
    learningObjectives: [
      'Create new features from existing data',
      'Encode categorical variables and scale numerical features',
      'Select the most important features for your model'
    ],
    sections: [
      {
        title: 'Feature Creation',
        content: 'Create features that capture domain knowledge: date parts (day of week, month, is_weekend), ratios (price per square foot), aggregations (average purchase per customer), text features (word count, sentiment), and interaction features (price × quantity). Domain expertise is the most valuable input.',
        codeSnippet: { language: 'python', code: 'import pandas as pd\n\ndf["purchase_date"] = pd.to_datetime(df["purchase_date"])\ndf["day_of_week"] = df["purchase_date"].dt.dayofweek\ndf["is_weekend"] = df["day_of_week"].isin([5, 6]).astype(int)\ndf["price_per_unit"] = df["total"] / df["quantity"].clip(lower=1)\ndf["avg_purchase"] = df.groupby("customer_id")["total"].transform("mean")' }
      },
      {
        title: 'Encoding and Scaling',
        content: 'Categorical encoding: OneHotEncoder for nominal (no order), OrdinalEncoder for ordinal (has order), LabelEncoder for target variable. Numerical scaling: StandardScaler (zero mean, unit variance) for most algorithms, MinMaxScaler (0-1 range) for neural networks, RobustScaler (median-based) for data with outliers.',
        codeSnippet: { language: 'python', code: 'from sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.compose import ColumnTransformer\n\npreprocessor = ColumnTransformer([\n    ("num", StandardScaler(), ["age", "income", "tenure"]),\n    ("cat", OneHotEncoder(drop="first", sparse_output=False),\n     ["city", "gender", "plan_type"])\n])\n\nX_processed = preprocessor.fit_transform(X)\nprint(f"Features: {X_processed.shape[1]}")' }
      },
      {
        title: 'Feature Selection',
        content: 'Remove irrelevant or redundant features. Methods: correlation analysis (remove features with >0.95 correlation), mutual information (measure dependency with target), recursive feature elimination (iteratively remove least important), and tree-based feature importance (Random Forest ranks features).',
        codeSnippet: { language: 'python', code: 'from sklearn.feature_selection import SelectKBest, mutual_info_classif\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Mutual information\nselector = SelectKBest(mutual_info_classif, k=10)\nX_selected = selector.fit_transform(X, y)\nselected_features = X.columns[selector.get_support()]\n\n# Tree-based importance\nrf = RandomForestClassifier(n_estimators=100)\nrf.fit(X, y)\nimportances = pd.Series(rf.feature_importances_, index=X.columns)\nimportances.nlargest(10).plot(kind="barh")' }
      }
    ],
    keyTakeaways: [
      'Feature engineering requires domain knowledge — understand the problem',
      'Encode categoricals and scale numericals before training',
      'Remove redundant features to reduce overfitting and improve speed',
      'Feature selection improves model interpretability and performance'
    ],
    practice: [
      { question: 'When should you use OneHotEncoder vs OrdinalEncoder?', options: ['Always OneHot', 'OneHot for nominal data, Ordinal for ordered categories', 'Always Ordinal', 'They are interchangeable'], correctIndex: 1, explanation: 'OneHotEncoder is for nominal categories (no inherent order like city names). OrdinalEncoder is for ordinal categories (has order like education level).' },
      { question: 'Why remove highly correlated features?', options: ['They slow down training', 'They add redundant information and can cause multicollinearity', 'They use too much memory', 'They are always irrelevant'], correctIndex: 1, explanation: 'Highly correlated features carry redundant information. Keeping both can cause multicollinearity (especially in linear models) and increase overfitting risk.' },
      { question: 'What is binning and when is it useful?', options: ['Sorting data alphabetically', 'Converting continuous values into discrete categories or ranges', 'Removing outliers', 'Adding more features'], correctIndex: 1, explanation: 'Binning groups continuous values into intervals (e.g., age into age groups). It can help with non-linear relationships, reduce the effect of small data variations, and improve model robustness.' },
      { question: 'What is the curse of dimensionality?', options: ['Models run too slowly', 'As features increase, data becomes sparse and distances become less meaningful', 'Too many classes to predict', 'The model has too many parameters'], correctIndex: 1, explanation: 'In high-dimensional spaces, data points become sparse and equidistant from each other, making similarity measures less useful and increasing the risk of overfitting.' },
      { question: 'What is the purpose of log transformation on skewed features?', options: ['To make the feature normally distributed', 'To compress the range of large values and reduce skewness', 'To remove missing values', 'To add new features'], correctIndex: 1, explanation: 'Log transformation compresses the range of right-skewed data, making the distribution more symmetric. This helps algorithms that assume normality and reduces the influence of outliers.' }
    ]
  },

  // ==================== AI/ML SPECIALIZED ====================

  'scikit-learn': {
    title: 'scikit-learn',
    subtitle: 'Practical ML workflows with Python\'s premier ML library',
    estimatedTime: '75 min',
    whyItMatters: 'scikit-learn provides consistent, well-documented APIs for the entire ML pipeline — from preprocessing to model evaluation. It is the industry standard for classical ML.',
    learningObjectives: [
      'Build end-to-end ML pipelines with scikit-learn',
      'Use pipelines for reproducible preprocessing and training',
      'Tune hyperparameters with GridSearchCV'
    ],
    sections: [
      {
        title: 'Pipelines',
        content: 'Pipelines chain preprocessing and model steps into a single object. This prevents data leakage (fitting preprocessors on test data) and ensures reproducibility. Use make_pipeline for quick creation or Pipeline for named steps. Access steps with pipeline[0] or pipeline.named_steps.',
        codeSnippet: { language: 'python', code: 'from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import cross_val_score\n\n# Create pipeline\npipe = Pipeline([\n    ("scaler", StandardScaler()),\n    ("classifier", RandomForestClassifier(n_estimators=100))\n])\n\n# Cross-validate the entire pipeline\nscores = cross_val_score(pipe, X, y, cv=5, scoring="f1")\nprint(f"F1: {scores.mean():.3f}")' }
      },
      {
        title: 'Hyperparameter Tuning',
        content: 'Hyperparameters are settings you choose before training (not learned from data). GridSearchCV exhaustively searches a parameter grid. RandomizedSearchCV samples from distributions — faster for large search spaces. Always use cross-validation to evaluate each combination.',
        codeSnippet: { language: 'python', code: 'from sklearn.model_selection import GridSearchCV\n\nparam_grid = {\n    "classifier__n_estimators": [50, 100, 200],\n    "classifier__max_depth": [5, 10, 20, None],\n    "classifier__min_samples_split": [2, 5, 10]\n}\n\ngrid = GridSearchCV(pipe, param_grid, cv=5, scoring="f1", n_jobs=-1)\ngrid.fit(X_train, y_train)\n\nprint(f"Best params: {grid.best_params_}")\nprint(f"Best F1: {grid.best_score_:.3f}")\nbest_model = grid.best_estimator_' }
      },
      {
        title: 'Common Workflows',
        content: 'Classification: train/test split → preprocess → train → evaluate → tune → deploy. Regression: same but with regression metrics (MAE, RMSE, R²). Clustering: preprocess → determine k (elbow method, silhouette) → fit → analyze clusters. Each workflow follows a consistent pattern.',
        codeSnippet: { language: 'python', code: 'from sklearn.model_selection import train_test_split\nfrom sklearn.metrics import classification_report\n\n# Complete workflow\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42\n)\n\npipe.fit(X_train, y_train)\ny_pred = pipe.predict(X_test)\n\nprint(classification_report(y_test, y_pred))\n\n# Save model\nimport joblib\njoblib.dump(pipe, "model.pkl")\nloaded_pipe = joblib.load("model.pkl")' }
      }
    ],
    keyTakeaways: [
      'Pipelines prevent data leakage and ensure reproducibility',
      'GridSearchCV for exhaustive search, RandomizedSearchCV for large spaces',
      'Always use stratified splits for classification',
      'joblib for saving and loading trained models'
    ],
    practice: [
      { question: 'Why use pipelines instead of separate fit/transform?', options: ['Pipelines are faster', 'Pipelines prevent data leakage and ensure consistency', 'Pipelines use less memory', 'Pipelines are required by scikit-learn'], correctIndex: 1, explanation: 'Pipelines ensure the same preprocessing is applied during training and prediction, and prevent fitting on test data (data leakage).' },
      { question: 'What does n_jobs=-1 do in GridSearchCV?', options: ['Uses no parallelism', 'Uses all available CPU cores', 'Runs one job at a time', 'Disables cross-validation'], correctIndex: 1, explanation: 'n_jobs=-1 tells scikit-learn to use all available CPU cores for parallel computation, significantly speeding up the search.' },
      { question: 'What is the purpose of ColumnTransformer?', options: ['To stack DataFrames vertically', 'To apply different preprocessing steps to different column types in one object', 'To delete columns', 'To rename columns'], correctIndex: 1, explanation: 'ColumnTransformer applies different transformers to different subsets of columns — e.g., StandardScaler for numeric and OneHotEncoder for categorical — in a single fit/transform call.' },
      { question: 'What does cross_val_score return?', options: ['The best model', 'An array of scores, one for each CV fold', 'The accuracy only', 'The trained model'], correctIndex: 1, explanation: 'cross_val_score returns a numpy array of scores for each fold of cross-validation, allowing you to assess model stability and performance variance.' },
      { question: 'When should you use a Pipeline instead of manual preprocessing?', options: ['Never', 'When you want to ensure preprocessing and model are applied consistently and avoid data leakage', 'When the dataset is small', 'When you have no missing values'], correctIndex: 1, explanation: 'Pipelines encapsulate preprocessing and model into one object, ensuring the same transformations are applied during training and prediction, and preventing data leakage.' }
    ]
  },

  'Neural Networks': {
    title: 'Neural Networks',
    subtitle: 'Perceptrons, backpropagation, CNNs, and training basics',
    estimatedTime: '75 min',
    whyItMatters: 'Neural networks are the foundation of deep learning, powering image recognition, language models, and generative AI.',
    learningObjectives: [
      'Explain how a neuron computes output',
      'Understand backpropagation and gradient descent',
      'Build a simple neural network for classification'
    ],
    sections: [
      {
        title: 'The Perceptron',
        content: 'A single neuron (perceptron) computes a weighted sum of inputs, adds a bias, and applies an activation function. Multiple neurons form a layer. Stacking layers creates a network. Each layer learns increasingly abstract representations. The output layer produces the final prediction.',
        codeSnippet: { language: 'python', code: 'import torch\nimport torch.nn as nn\n\nclass SimpleNet(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.layers = nn.Sequential(\n            nn.Linear(784, 256),\n            nn.ReLU(),\n            nn.Dropout(0.3),\n            nn.Linear(256, 128),\n            nn.ReLU(),\n            nn.Linear(128, 10)\n        )\n    \n    def forward(self, x):\n        return self.layers(x)' }
      },
      {
        title: 'Backpropagation',
        content: 'Backpropagation computes gradients of the loss with respect to each weight using the chain rule. Starting from the output layer, it propagates errors backward through the network. Gradients indicate how much each weight contributed to the error. The optimizer uses these gradients to update weights.',
        codeSnippet: { language: 'python', code: 'model = SimpleNet()\noptimizer = torch.optim.Adam(model.parameters(), lr=0.001)\ncriterion = nn.CrossEntropyLoss()\n\n# Training step\nfor inputs, labels in train_loader:\n    optimizer.zero_grad()      # clear gradients\n    outputs = model(inputs)     # forward pass\n    loss = criterion(outputs, labels)  # compute loss\n    loss.backward()             # backpropagation\n    optimizer.step()            # update weights' }
      },
      {
        title: 'CNNs for Images',
        content: 'Convolutional Neural Networks use convolutional layers that apply learnable filters to detect patterns (edges, textures, objects). Pooling layers reduce spatial dimensions. CNNs are translation-invariant — they detect features regardless of position. ResNet, VGG, and EfficientNet are popular architectures.',
        codeSnippet: { language: 'python', code: 'class ConvNet(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.conv_layers = nn.Sequential(\n            nn.Conv2d(1, 32, 3, padding=1),  # 28x28 → 28x28\n            nn.ReLU(),\n            nn.MaxPool2d(2),                   # 28x28 → 14x14\n            nn.Conv2d(32, 64, 3, padding=1),  # 14x14 → 14x14\n            nn.ReLU(),\n            nn.MaxPool2d(2),                   # 14x14 → 7x7\n        )\n        self.fc_layers = nn.Sequential(\n            nn.Flatten(),\n            nn.Linear(64 * 7 * 7, 128),\n            nn.ReLU(),\n            nn.Linear(128, 10)\n        )\n    \n    def forward(self, x):\n        x = self.conv_layers(x)\n        return self.fc_layers(x)' }
      }
    ],
    keyTakeaways: [
      'Neurons compute weighted sums with activation functions',
      'Backpropagation uses the chain rule to compute gradients',
      'CNNs use convolutional layers for spatial feature extraction',
      'Dropout and batch normalization prevent overfitting'
    ],
    practice: [
      { question: 'What is the purpose of an activation function?', options: ['To normalize inputs', 'To introduce non-linearity into the network', 'To reduce the number of parameters', 'To speed up training'], correctIndex: 1, explanation: 'Without activation functions, a neural network would be a linear model regardless of depth. Non-linear activations enable learning complex patterns.' },
      { question: 'What does a Conv2d layer learn?', options: ['Full connections', 'Local spatial patterns (filters)', 'Global patterns', 'Nothing — it is fixed'], correctIndex: 1, explanation: 'Conv2d layers learn small filters (e.g., 3×3) that detect local patterns like edges, textures, and shapes. Multiple filters capture different features.' },
      { question: 'What is the purpose of MaxPool2d?', options: ['To increase the image size', 'To reduce spatial dimensions while keeping the most important features', 'To add more channels', 'To normalize pixel values'], correctIndex: 1, explanation: 'MaxPool2d downsamples the feature map by taking the maximum value in each pooling window. This reduces computation and provides translational invariance.' },
      { question: 'What is a weight initializer and why does it matter?', options: ['A random number generator', 'A method to set initial weights so that activations and gradients flow properly during training', 'A type of optimizer', 'A loss function'], correctIndex: 1, explanation: 'Poor initialization can cause vanishing/exploding gradients. Proper initialization (Xavier, He) ensures activations and gradients remain in reasonable ranges at the start of training.' },
      { question: 'What is the difference between a fully connected layer and a convolutional layer?', options: ['No difference', 'FC connects every input to every output; conv uses local receptive fields with shared weights', 'FC is for images, conv is for text', 'Conv is always deeper'], correctIndex: 1, explanation: 'Fully connected layers have weights connecting every input neuron to every output neuron. Convolutional layers use local receptive fields and weight sharing, making them parameter-efficient for spatial data.' }
    ]
  },

  'TensorFlow / PyTorch': {
    title: 'TensorFlow / PyTorch',
    subtitle: 'Building and training deep learning models',
    estimatedTime: '90 min',
    whyItMatters: 'PyTorch and TensorFlow are the two dominant deep learning frameworks. PyTorch is favored for research; TensorFlow for production deployment.',
    learningObjectives: [
      'Build, train, and evaluate models in PyTorch',
      'Understand automatic differentiation (autograd)',
      'Save and load trained models'
    ],
    sections: [
      {
        title: 'PyTorch Fundamentals',
        content: 'PyTorch uses dynamic computation graphs (define-by-run). Tensors are like NumPy arrays with GPU support. autograd tracks operations and computes gradients automatically. Define models as nn.Module subclasses with a forward() method. Use DataLoader for batching and Dataset for data loading.',
        codeSnippet: { language: 'python', code: 'import torch\nimport torch.nn as nn\nfrom torch.utils.data import DataLoader, TensorDataset\n\n# Create data\nX = torch.randn(1000, 10)\ny = torch.randint(0, 2, (1000,))\ndataset = TensorDataset(X, y)\nloader = DataLoader(dataset, batch_size=32, shuffle=True)\n\n# Define model\nclass Classifier(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.net = nn.Sequential(\n            nn.Linear(10, 64), nn.ReLU(),\n            nn.Linear(64, 32), nn.ReLU(),\n            nn.Linear(32, 2)\n        )\n    def forward(self, x):\n        return self.net(x)' }
      },
      {
        title: 'Training Loop',
        content: 'The standard PyTorch training loop: iterate over epochs, for each batch compute predictions, calculate loss, backpropagate, and update weights. Track metrics like loss and accuracy. Use torch.no_grad() for evaluation to disable gradient computation.',
        codeSnippet: { language: 'python', code: 'model = Classifier()\noptimizer = torch.optim.Adam(model.parameters(), lr=0.001)\ncriterion = nn.CrossEntropyLoss()\n\nfor epoch in range(20):\n    model.train()\n    total_loss = 0\n    for batch_X, batch_y in loader:\n        optimizer.zero_grad()\n        outputs = model(batch_X)\n        loss = criterion(outputs, batch_y)\n        loss.backward()\n        optimizer.step()\n        total_loss += loss.item()\n    \n    # Evaluate\n    model.eval()\n    with torch.no_grad():\n        test_outputs = model(X_test)\n        accuracy = (test_outputs.argmax(1) == y_test).float().mean()\n    print(f"Epoch {epoch+1}: Loss={total_loss/len(loader):.4f}, Acc={accuracy:.4f}")' }
      },
      {
        title: 'Model Saving and Deployment',
        content: 'Save model state_dict (recommended) rather than the entire model. Load with model.load_state_dict(). For production, export to ONNX format for cross-framework compatibility. TorchScript (torch.jit.script) optimizes for inference. Use torch.export for PyTorch 2.0+.',
        codeSnippet: { language: 'python', code: '# Save\n torch.save(model.state_dict(), "model.pth")\n\n# Load\nmodel = Classifier()\nmodel.load_state_dict(torch.load("model.pth"))\nmodel.eval()\n\n# TorchScript for production\nscripted = torch.jit.script(model)\nscripted.save("model_scripted.pt")\n\n# Inference\nwith torch.no_grad():\n    prediction = model(new_data)' }
      }
    ],
    keyTakeaways: [
      'PyTorch uses dynamic computation graphs — define by run',
      'autograd automatically computes gradients for backpropagation',
      'Always call model.eval() and torch.no_grad() for inference',
      'Save state_dict, not the entire model, for portability'
    ],
    practice: [
      { question: 'What is a state_dict?', options: ['A dictionary of model hyperparameters', 'A dictionary mapping layer names to their parameter tensors', 'A training log', 'A data preprocessing config'], correctIndex: 1, explanation: 'A state_dict is a dictionary containing all learnable parameters (weights and biases) of a model, keyed by layer name.' },
      { question: 'Why use torch.no_grad() during evaluation?', options: ['It speeds up training', 'It disables gradient computation, saving memory and computation', 'It prevents model updates', 'It is required for inference'], correctIndex: 1, explanation: 'Gradients are only needed for training. Disabling them during evaluation saves memory and computation since no backward pass is needed.' },
      { question: 'What is the purpose of model.train() and model.eval()?', options: ['To print model summary', 'To set the model to training or evaluation mode, affecting layers like Dropout and BatchNorm', 'To save and load models', 'To reset weights'], correctIndex: 1, explanation: 'model.train() enables dropout and training-specific behavior. model.eval() disables dropout and uses running statistics in batch norm, ensuring consistent behavior during inference.' },
      { question: 'What is a DataLoader in PyTorch?', options: ['A file reader', 'An iterable that batches, shuffles, and parallelizes data loading for training', 'A model optimizer', 'A loss function'], correctIndex: 1, explanation: 'DataLoader wraps a Dataset and provides batching, shuffling, and multi-process data loading, making it efficient to feed data to the model during training.' },
      { question: 'What is the advantage of using GPU over CPU for deep learning?', options: ['GPUs are cheaper', 'GPUs have thousands of cores for parallel matrix operations, which neural networks rely on', 'CPUs cannot run Python', 'GPUs use less power'], correctIndex: 1, explanation: 'GPUs have thousands of cores optimized for parallel computation. Matrix operations that dominate neural network training run orders of magnitude faster on GPUs than CPUs.' }
    ]
  },

  'Prompt Engineering': {
    title: 'Prompt Engineering',
    subtitle: 'Designing effective prompts for large language models',
    estimatedTime: '45 min',
    whyItMatters: 'Prompt engineering is the art of communicating effectively with AI models. Good prompts unlock better outputs, while bad prompts produce irrelevant or incorrect results.',
    learningObjectives: [
      'Write clear, specific prompts that produce desired outputs',
      'Use advanced techniques: few-shot, chain-of-thought, role prompting',
      'Evaluate and iterate on prompt quality'
    ],
    sections: [
      {
        title: 'Prompt Design Principles',
        content: 'Be specific: vague prompts produce vague outputs. Provide context: give the model relevant background information. Use examples: few-shot prompting shows the model what you want. Specify format: tell the model whether you want JSON, markdown, code, or prose. Set constraints: length, style, tone.',
        examples: ['Bad: "Write about dogs"', 'Good: "Write a 200-word informative paragraph about the history of dog domestication, suitable for a science blog audience"'],
      },
      {
        title: 'Advanced Techniques',
        content: 'Chain-of-thought (CoT): ask the model to think step-by-step before answering. Role prompting: assign a role ("You are an expert data scientist"). Few-shot: provide input-output examples before the actual task. Zero-shot CoT: add "Let\'s think step by step" to improve reasoning.',
        codeSnippet: { language: 'text', code: '# Chain-of-thought\nSolve this step by step: If a train travels 60mph for 2.5 hours, then 80mph for 1.5 hours, what is the total distance?\n\n# Role prompting\nYou are a senior software engineer. Review this code and suggest improvements:\n...\n\n# Few-shot\nClassify these reviews:\n"Great product!" → Positive\n"Terrible experience" → Negative\n"Works fine, nothing special" → ?' }
      },
      {
        title: 'Evaluation and Iteration',
        content: 'Test prompts systematically with varied inputs. Check for: accuracy, relevance, completeness, format compliance, and safety. Use A/B testing to compare prompt versions. Document what works and what doesn\'t. Build a prompt library for common tasks.',
        examples: ['Test with edge cases (empty input, very long input, adversarial input)', 'Version control your prompts like code', 'Measure output quality with automated metrics when possible'],
      }
    ],
    keyTakeaways: [
      'Specificity and context are the foundations of good prompts',
      'Chain-of-thought improves reasoning; few-shot improves format compliance',
      'Always test prompts with diverse inputs',
      'Iterate: prompt engineering is experimental, not deterministic'
    ],
    practice: [
      { question: 'What is chain-of-thought prompting?', options: ['Asking the model to write a chain of thoughts', 'Instructing the model to reason step-by-step before answering', 'Connecting multiple prompts', 'A type of few-shot prompting'], correctIndex: 1, explanation: 'Chain-of-thought prompting asks the model to show its reasoning process, which improves accuracy on complex reasoning tasks.' },
      { question: 'Why use few-shot examples?', options: ['To make prompts shorter', 'To show the model the expected input-output format', 'To reduce API costs', 'To bypass content filters'], correctIndex: 1, explanation: 'Few-shot examples demonstrate the pattern you want the model to follow, reducing ambiguity and improving output quality.' },
      { question: 'What is temperature in LLM inference?', options: ['The ambient temperature of the server', 'A parameter controlling randomness: lower values are more focused, higher values more creative', 'The number of tokens generated', 'The model size'], correctIndex: 1, explanation: 'Temperature scales the probability distribution before sampling. Lower values (0-0.2) make outputs more deterministic and focused. Higher values increase diversity and creativity.' },
      { question: 'What is a system prompt?', options: ['A programming language', 'A message that sets the model role, behavior, and constraints for the conversation', 'A debugging tool', 'A type of model'], correctIndex: 1, explanation: 'The system prompt is a special message that configures the model persona, rules, and output format. It persists across the conversation and guides all responses.' },
      { question: 'What is prompt injection?', options: ['Adding code to a prompt', 'A malicious technique where user input overrides the system prompt instructions', 'A type of few-shot learning', 'A way to improve prompt quality'], correctIndex: 1, explanation: 'Prompt injection is an attack where malicious user input tricks the model into ignoring or overriding the system prompt, potentially causing it to leak information or behave unexpectedly.' }
    ]
  },

  'RAG & LLM Apps': {
    title: 'RAG & LLM Apps',
    subtitle: 'Retrieval-Augmented Generation and LLM application patterns',
    estimatedTime: '75 min',
    whyItMatters: 'RAG combines the power of large language models with external knowledge retrieval, enabling AI systems to answer questions based on specific documents and data.',
    learningObjectives: [
      'Understand RAG architecture: retrieval + generation',
      'Implement document embedding and similarity search',
      'Build a basic RAG pipeline'
    ],
    sections: [
      {
        title: 'RAG Architecture',
        content: 'RAG (Retrieval-Augmented Generation) answers questions by first retrieving relevant documents from a knowledge base, then generating answers based on those documents. This grounds LLM responses in factual data and reduces hallucination. Pipeline: embed documents → store in vector DB → embed query → find similar docs → generate answer.',
        codeSnippet: { language: 'python', code: 'from sentence_transformers import SentenceTransformer\nimport numpy as np\n\n# 1. Embed documents\nmodel = SentenceTransformer("all-MiniLM-L6-v2")\ndocuments = [\n    "Python is a programming language",\n    "Machine learning uses data to train models",\n    "Docker containers package applications"\n]\nembeddings = model.encode(documents)\n\n# 2. Search for similar documents\nquery = "What is Python?"\nquery_embedding = model.encode(query)\nsimilarities = np.dot(embeddings, query_embedding)\ntop_idx = np.argmax(similarities)\nprint(f"Most relevant: {documents[top_idx]}")' }
      },
      {
        title: 'Vector Databases',
        content: 'Vector databases store embeddings and enable fast similarity search. Options: Pinecone (managed), Weaviate (open-source), ChromaDB (lightweight), FAISS (Facebook, local). Use approximate nearest neighbor (ANN) algorithms for efficient search at scale. Index types include HNSW, IVF, and PQ.',
        codeSnippet: { language: 'python', code: 'import chromadb\n\n# Create collection\nclient = chromadb.Client()\ncollection = client.create_collection("docs")\n\n# Add documents\ncollection.add(\n    documents=["Python basics", "Docker tutorial", "React guide"],\n    metadatas=[{"source": "book"}, {"source": "web"}, {"source": "course"}],\n    ids=["doc1", "doc2", "doc3"]\n)\n\n# Query\nresults = collection.query(query_texts=["programming language"], n_results=2)\nprint(results["documents"])' }
      },
      {
        title: 'Building a RAG App',
        content: 'Full pipeline: load documents → split into chunks → embed chunks → store in vector DB → retrieve relevant chunks → construct prompt with context → generate answer. Chunk size affects retrieval quality — too small loses context, too large adds noise. Overlap chunks to preserve context at boundaries.',
        codeSnippet: { language: 'python', code: 'from langchain.text_splitter import RecursiveCharacterTextSplitter\nfrom langchain.vectorstores import Chroma\nfrom langchain.embeddings import OpenAIEmbeddings\nfrom langchain.chat_models import ChatOpenAI\nfrom langchain.chains import RetrievalQA\n\n# Split documents\nsplitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)\nchunks = splitter.split_documents(documents)\n\n# Build RAG chain\nvectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())\nqa_chain = RetrievalQA.from_chain_type(\n    llm=ChatOpenAI(model="gpt-4"),\n    retriever=vectorstore.as_retriever(search_kwargs={"k": 3})\n)\n\nanswer = qa_chain.run("What is this document about?")' }
      }
    ],
    keyTakeaways: [
      'RAG = retrieval (find relevant docs) + generation (answer based on docs)',
      'Vector embeddings enable semantic similarity search',
      'Chunk size and overlap significantly affect retrieval quality',
      'RAG reduces hallucination by grounding responses in real data'
    ],
    practice: [
      { question: 'Why use RAG instead of just an LLM?', options: ['RAG is faster', 'RAG grounds responses in specific documents, reducing hallucination', 'RAG uses less memory', 'RAG does not need an LLM'], correctIndex: 1, explanation: 'LLMs can hallucinate or lack knowledge of specific documents. RAG retrieves relevant context from a knowledge base, making responses more accurate and grounded.' },
      { question: 'What is chunking?', options: ['Breaking text into characters', 'Splitting documents into smaller segments for embedding and retrieval', 'Compressing documents', 'Encrypting document content'], correctIndex: 1, explanation: 'Chunking splits documents into smaller pieces (e.g., 500 tokens each) so that embedding and retrieval can work with focused, relevant segments.' },
      { question: 'What is an embedding in the context of RAG?', options: ['A model architecture', 'A dense vector representation of text that captures semantic meaning', 'A database index', 'A type of prompt'], correctIndex: 1, explanation: 'Embeddings convert text into numerical vectors where similar meanings are close in vector space. They enable semantic search beyond keyword matching.' },
      { question: 'What is the role of a vector store in RAG?', options: ['To generate answers', 'To store and efficiently search embeddings for similar documents', 'To train the LLM', 'To format prompts'], correctIndex: 1, explanation: 'The vector store indexes document embeddings and supports fast approximate nearest neighbor search, retrieving the most semantically similar documents for a query.' },
      { question: 'What does top-k retrieval control?', options: ['The model temperature', 'How many of the most similar documents to retrieve and include as context', 'The number of tokens generated', 'The embedding dimension'], correctIndex: 1, explanation: 'Top-k determines how many of the most similar documents to retrieve. More documents provide broader context but may add noise and increase token costs.' }
    ]
  },

  'Build Production API': {
    title: 'Build Production API',
    subtitle: 'Designing and shipping a production-ready REST API with Spring Boot',
    estimatedTime: '3 weeks',
    whyItMatters: 'Most software you use daily is powered by APIs that must be reliable, secure, and easy to evolve. This capstone trains you to build an API the way professional teams do: layered architecture, strict input validation, consistent error responses, and automated tests that let you ship changes confidently.',
    learningObjectives: [
      'Separate responsibilities into controller, service, and repository layers',
      'Protect the API with DTOs and Bean Validation',
      'Return consistent, useful error responses with a global exception handler',
      'Persist data with Spring Data JPA',
      'Write unit and integration tests that run in CI'
    ],
    sections: [
      {
        title: 'Layered Architecture',
        content: 'A production API is organized into three main layers: the Controller handles HTTP and JSON, the Service owns business logic and transactions, and the Repository talks to the database. Each layer depends only on the layer below it, which keeps the code testable and swappable. Enforce this by injecting dependencies through constructors and keeping entities inside the data layer.',
        examples: ['Controller -> Service -> Repository', 'Constructor injection keeps layers decoupled'],
        codeSnippet: { language: 'java', code: '@RestController\n@RequestMapping("/api/books")\npublic class BookController {\n\n    private final BookService bookService;\n\n    public BookController(BookService bookService) {\n        this.bookService = bookService;\n    }\n\n    @GetMapping("/{id}")\n    public ResponseEntity<BookDTO> getBook(@PathVariable Long id) {\n        return bookService.findById(id)\n            .map(ResponseEntity::ok)\n            .orElse(ResponseEntity.notFound().build());\n    }\n}\n\n@Service\npublic class BookService {\n\n    private final BookRepository bookRepository;\n\n    public BookService(BookRepository bookRepository) {\n        this.bookRepository = bookRepository;\n    }\n\n    public Optional<BookDTO> findById(Long id) {\n        return bookRepository.findById(id).map(BookDTO::from);\n    }\n}\n\n@Repository\npublic interface BookRepository extends JpaRepository<Book, Long> {\n}' }
      },
      {
        title: 'DTOs & Validation',
        content: 'DTOs (Data Transfer Objects) are the contract between your API and its clients. They prevent request and response payloads from leaking internal entity fields, and they give you a stable interface even when the database schema changes. Always validate incoming data with Bean Validation annotations and trigger it by placing @Valid on the request body parameter — never trust client input.',
        examples: ['@NotBlank, @Size, @Email, @DecimalMin', 'Validate at the boundary, not deep inside services'],
        codeSnippet: { language: 'java', code: 'public record CreateBookRequest(\n    @NotBlank(message = "Title is required")\n    @Size(max = 200)\n    String title,\n\n    @NotBlank(message = "Author is required")\n    String author,\n\n    @NotNull\n    @DecimalMin(value = "0.01", message = "Price must be positive")\n    BigDecimal price\n) {}\n\npublic record BookDTO(\n    Long id,\n    String title,\n    String author,\n    BigDecimal price\n) {\n    public static BookDTO from(Book book) {\n        return new BookDTO(book.getId(), book.getTitle(), book.getAuthor(), book.getPrice());\n    }\n}\n\n@PostMapping\npublic ResponseEntity<BookDTO> create(@Valid @RequestBody CreateBookRequest request) {\n    BookDTO created = bookService.create(request);\n    return ResponseEntity.status(HttpStatus.CREATED).body(created);\n}' }
      },
      {
        title: 'Exceptions & Error Handling',
        content: 'Unhandled exceptions leak stack traces and expose internals. Build a global error handler with @ControllerAdvice so every failure returns a consistent JSON structure with a status code, a machine-readable code, and a human message. Map the most common cases: 404 for missing resources, 400 for validation failures, and 409 for conflicts.',
        examples: ['404 NOT_FOUND', '400 VALIDATION_ERROR', '500 INTERNAL_ERROR'],
        codeSnippet: { language: 'java', code: '@ControllerAdvice\npublic class GlobalExceptionHandler {\n\n    @ExceptionHandler(ResourceNotFoundException.class)\n    public ResponseEntity<ApiError> handleNotFound(ResourceNotFoundException ex) {\n        return ResponseEntity.status(HttpStatus.NOT_FOUND)\n            .body(new ApiError("NOT_FOUND", ex.getMessage()));\n    }\n\n    @ExceptionHandler(MethodArgumentNotValidException.class)\n    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex) {\n        String message = ex.getBindingResult().getFieldErrors().stream()\n            .map(error -> error.getField() + " " + error.getDefaultMessage())\n            .collect(Collectors.joining(", "));\n        return ResponseEntity.badRequest()\n            .body(new ApiError("VALIDATION_ERROR", message));\n    }\n\n    @ExceptionHandler(Exception.class)\n    public ResponseEntity<ApiError> handleUnexpected(Exception ex) {\n        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)\n            .body(new ApiError("INTERNAL_ERROR", "Something went wrong"));\n    }\n\n    public record ApiError(String code, String message) {}\n}' }
      },
      {
        title: 'Tests & Deployment',
        content: 'A production API is only as good as its test suite. Write unit tests for services with mocked repositories, @WebMvcTest slice tests for controllers, and @DataJpaTest integration tests for repositories. Run the suite in CI and package the app as a single runnable JAR with Maven, then deploy it behind a reverse proxy with health checks.',
        examples: ['mvn test', 'mvn package', 'java -jar target/app.jar'],
        codeSnippet: { language: 'java', code: '@SpringBootTest\n@AutoConfigureMockMvc\nclass BookControllerTest {\n\n    @Autowired\n    private MockMvc mockMvc;\n\n    @MockBean\n    private BookService bookService;\n\n    @Test\n    void createBook_returnsCreated() throws Exception {\n        when(bookService.create(any())).thenReturn(new BookDTO(1L, "1984", "Orwell", new BigDecimal("19.99")));\n\n        mockMvc.perform(post("/api/books")\n                .contentType(MediaType.APPLICATION_JSON)\n                .content("{\\"title\\":\\"1984\\",\\"author\\":\\"Orwell\\",\\"price\\":19.99}"))\n            .andExpect(status().isCreated())\n            .andExpect(jsonPath("$.title").value("1984"));\n    }\n}' }
      }
    ],
    keyTakeaways: [
      'Keep controllers thin, services authoritative, repositories technical',
      'DTOs are your public contract; entities are your internals',
      'Validate every request at the boundary with @Valid',
      'A global exception handler gives clients consistent errors',
      'Automated tests plus CI make production changes safe'
    ],
    practice: [
      {
        question: 'Which layer owns business rules like "price must not exceed inventory value"?',
        options: ['Controller', 'Service', 'Repository', 'Entity'],
        correctIndex: 1,
        explanation: 'The service layer owns business logic. Controllers only translate HTTP, and repositories only persist data.'
      },
      {
        question: 'What is the main reason to use DTOs in a REST API?',
        options: ['They make queries faster', 'They decouple the API contract from internal entity structure', 'They replace validation', 'They automatically create database tables'],
        correctIndex: 1,
        explanation: 'DTOs give clients a stable, intentional payload shape and prevent internal entity fields from leaking into the API.'
      },
      {
        question: 'What triggers Bean Validation on a request body in Spring MVC?',
        options: ['@Valid on the parameter', '@NotNull on the field', '@RequestBody alone', 'Validation always runs automatically'],
        correctIndex: 0,
        explanation: 'Spring validates the request body when the parameter is annotated with @Valid (or @Validated). The constraints themselves live on the DTO fields.'
      },
      {
        question: 'Why use @Transactional on a service method?',
        options: ['It makes the method faster', 'It ensures all database operations succeed or fail as a unit', 'It prevents exceptions', 'It locks the database table'],
        correctIndex: 1,
        explanation: '@Transactional wraps the method in a database transaction. If any exception occurs, all changes are rolled back, maintaining data consistency.'
      },
      {
        question: 'What is the purpose of @Autowired in Spring?',
        options: ['Creates a new bean', 'Automatically injects a Spring-managed dependency into a field or parameter', 'Removes a bean from the container', 'Disables a component'],
        correctIndex: 1,
        explanation: '@Autowired tells Spring to find a matching bean and inject it. It can be used on fields, constructors, or setter methods for dependency injection.'
      }
    ]
  },

  'Full Stack Project': {
    title: 'Full Stack Project',
    subtitle: 'Connecting a React frontend to a Node/Express API and MongoDB',
    estimatedTime: '3 weeks',
    whyItMatters: 'Full stack developers are the most versatile members of a team: they turn ideas into working products end to end. This capstone builds the classic MERN-shaped stack — React, Node.js/Express, and MongoDB — the same architecture used by thousands of production applications.',
    learningObjectives: [
      'Structure a project with separate client and server folders',
      'Consume REST APIs from React with fetch',
      'Model and persist data in MongoDB with Mongoose',
      'Handle authentication and environment configuration',
      'Deploy the frontend and backend to the cloud'
    ],
    sections: [
      {
        title: 'Project Structure',
        content: 'Keep the project organized into client/ and server/ folders with a root package.json for scripts. The server exposes an Express API with routes, models, and controllers; the client holds React components, pages, and API helpers. Shared conventions — folder names, error shapes, naming — matter more than any specific tooling.',
        examples: ['client/ for React, server/ for Express', 'One root package.json with scripts for both'],
        codeSnippet: { language: 'text', code: 'my-app/\n├── client/            # React frontend\n│   ├── src/\n│   │   ├── components/\n│   │   ├── pages/\n│   │   └── api/\n├── server/            # Express backend\n│   ├── models/\n│   ├── routes/\n│   ├── controllers/\n│   └── index.js\n├── package.json\n└── .env' }
      },
      {
        title: 'REST from React',
        content: 'React talks to the backend with fetch or axios. Keep API calls in a dedicated api/ module, wrap them in functions, and always handle loading, success, and error states. For authenticated requests, attach the JWT in the Authorization header. Remember the browser enforces CORS: the server must whitelist the frontend origin.',
        examples: ['fetch with method, headers, and body', 'Handle 401 responses by redirecting to login'],
        codeSnippet: { language: 'javascript', code: '// client/src/api/tasks.js\nexport async function fetchTasks() {\n  const res = await fetch("/api/tasks", {\n    headers: {\n      "Authorization": "Bearer " + localStorage.getItem("token")\n    }\n  });\n  if (!res.ok) throw new Error("Failed to load tasks");\n  return res.json();\n}\n\nexport async function createTask(title) {\n  const res = await fetch("/api/tasks", {\n    method: "POST",\n    headers: {\n      "Content-Type": "application/json",\n      "Authorization": "Bearer " + localStorage.getItem("token")\n    },\n    body: JSON.stringify({ title: title })\n  });\n  if (!res.ok) throw new Error("Failed to create task");\n  return res.json();\n}' }
      },
      {
        title: 'Persistence with MongoDB',
        content: 'MongoDB stores documents in collections, and Mongoose provides schemas with validation and types. Define a schema for each entity, use refs for relationships, and validate both in the schema and at the API boundary. Index the fields you query often — like the owner of a task — so reads stay fast as data grows.',
        examples: ['Schema validation: required, trim, maxlength', 'Index frequently queried fields with .index()'],
        codeSnippet: { language: 'javascript', code: '// server/models/Task.js\nconst mongoose = require("mongoose");\n\nconst taskSchema = new mongoose.Schema({\n  title: { type: String, required: true, trim: true, maxlength: 200 },\n  done: { type: Boolean, default: false },\n  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }\n}, { timestamps: true });\n\ntaskSchema.index({ owner: 1 });\n\nmodule.exports = mongoose.model("Task", taskSchema);\n\n// server/routes/tasks.js\nrouter.post("/", async (req, res) => {\n  const task = await Task.create({ ...req.body, owner: req.user.id });\n  res.status(201).json(task);\n});' }
      },
      {
        title: 'Deployment',
        content: 'Deploy the backend on a platform like Render or Railway and the frontend on Vercel or Netlify, or serve the built React app from the Express server. Set environment variables (database URI, JWT secret) in the hosting platform, never in code. Add a health endpoint and read the logs when something misbehaves after launch.',
        examples: ['Config lives in environment variables, not in code', 'Serve the built frontend from Express in production'],
        codeSnippet: { language: 'javascript', code: '// server/index.js\nrequire("dotenv").config();\nconst express = require("express");\nconst cors = require("cors");\nconst mongoose = require("mongoose");\nconst path = require("path");\n\nconst app = express();\napp.use(express.json());\napp.use(cors({ origin: process.env.CLIENT_URL }));\n\napp.get("/api/health", (req, res) => res.json({ status: "ok" }));\napp.use("/api/auth", require("./routes/auth"));\napp.use("/api/tasks", require("./routes/tasks"));\n\nif (process.env.NODE_ENV === "production") {\n  app.use(express.static(path.join(__dirname, "../client/dist")));\n  app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../client/dist/index.html")));\n}\n\nmongoose.connect(process.env.MONGO_URI)\n  .then(() => app.listen(process.env.PORT || 3000))\n  .catch(err => { console.error(err); process.exit(1); });' }
      }
    ],
    keyTakeaways: [
      'Separate client and server so each can be developed and deployed independently',
      'Centralize API calls in one module and handle loading/error states everywhere',
      'Validate data twice: in the Mongoose schema and in route handlers',
      'CORS is a browser rule — configure it on the server, not the client',
      'Secrets and config live in environment variables, never in source code'
    ],
    practice: [
      {
        question: 'Why does the browser block fetch calls from http://localhost:5173 to http://localhost:3000 by default?',
        options: ['The server is too slow', 'The same-origin policy restricts cross-origin requests', 'Localhost cannot make network requests', 'React does not support fetch'],
        correctIndex: 1,
        explanation: 'Browsers enforce the same-origin policy: a page can only read responses from its own origin. The backend must send Access-Control-Allow-Origin headers to permit the frontend origin.'
      },
      {
        question: 'Which operation creates a new document in a MongoDB collection with Mongoose?',
        options: ['find()', 'Model.create() or insertOne()', 'updateOne()', 'aggregate()'],
        correctIndex: 1,
        explanation: 'Model.create() and collection.insertOne() persist a new document. find() reads, updateOne() modifies existing documents, and aggregate() builds analytics pipelines.'
      },
      {
        question: 'How should a React app send a JWT with an authenticated request?',
        options: ['In the URL query string', 'In the Authorization header as "Bearer <token>"', 'In the request body', 'As a hidden form field'],
        correctIndex: 1,
        explanation: 'Bearer tokens travel in the Authorization header. Query strings and bodies are logged and cached, making them insecure places for credentials.'
      },
      {
        question: 'What is the purpose of CORS in a full stack application?',
        options: ['To encrypt data', 'To allow the browser to accept responses from a different origin than the server', 'To speed up requests', 'To prevent SQL injection'],
        correctIndex: 1,
        explanation: 'CORS (Cross-Origin Resource Sharing) is a browser security feature. The backend must send Access-Control-Allow-Origin headers to permit the frontend to read the response.'
      },
      {
        question: 'Why use environment variables instead of hardcoding secrets?',
        options: ['They are faster', 'Secrets in code can be leaked in version control; env vars keep them separate', 'Environment variables are encrypted', 'Hardcoded values do not work in production'],
        correctIndex: 1,
        explanation: 'Hardcoding secrets in source code risks exposure through version control. Environment variables keep configuration separate from code and can be set per environment.'
      }
    ]
  },

  'Cloud Architecture Project': {
    title: 'Cloud Architecture Project',
    subtitle: 'Designing a resilient multi-tier architecture on AWS',
    estimatedTime: '3 weeks',
    whyItMatters: 'Production systems must survive traffic spikes, instance failures, and even full availability zone outages. This capstone trains you to design cloud architectures that scale and heal automatically, using VPCs, load balancers, auto scaling, and managed storage — the same patterns that power most internet companies.',
    learningObjectives: [
      'Translate availability, scalability, and cost goals into architectural choices',
      'Design a VPC with public and private subnets across multiple availability zones',
      'Choose the right compute and storage services for each tier',
      'Make every tier redundant and self-healing'
    ],
    sections: [
      {
        title: 'Design Goals',
        content: 'Start with requirements, not services. Define the availability target (for example 99.9%), the expected traffic, and the recovery time objective. Every decision — spanning availability zones, adding a load balancer, or enabling auto scaling — is a trade-off between cost, complexity, and reliability. Document the goals before drawing the diagram.',
        examples: ['99.9% availability allows roughly 8.7 hours of downtime per year', 'RTO/RPO targets shape the backup strategy'],
      },
      {
        title: 'Network Topology',
        content: 'A classic multi-tier AWS architecture places the web tier in public subnets and everything else in private subnets. A VPC spans multiple availability zones, each with its own subnets, so the loss of one AZ does not take down the system. An Internet Gateway routes traffic in, a NAT Gateway lets private instances fetch updates, and security groups act as instance-level firewalls.',
        examples: ['Public subnets only for the load balancer tier', 'Private subnets for app and database tiers'],
        codeSnippet: { language: 'yaml', code: 'Architecture: Multi-Tier Web Application\nVPC: 10.0.0.0/16\n  Subnets:\n    - Public-Web-AZ-a:   10.0.1.0/24   (Internet Gateway route)\n    - Public-Web-AZ-b:   10.0.2.0/24   (Internet Gateway route)\n    - Private-App-AZ-a:  10.0.11.0/24  (NAT Gateway route)\n    - Private-App-AZ-b:  10.0.12.0/24  (NAT Gateway route)\n    - Private-DB-AZ-a:   10.0.21.0/24  (no internet route)\n    - Private-DB-AZ-b:   10.0.22.0/24  (no internet route)\n\n  Gateways:\n    - Internet Gateway (IGW): public traffic in/out\n    - NAT Gateway: private egress for updates\n\n  Security Groups:\n    - ALB-SG: allow 443 from 0.0.0.0/0\n    - Web-SG: allow 80 from ALB-SG only\n    - DB-SG: allow 3306 from Web-SG only' }
      },
      {
        title: 'Compute & Storage',
        content: 'EC2 instances in an Auto Scaling Group (ASG) run the application across at least two availability zones; the ASG replaces failed instances and scales out under load. An Application Load Balancer (ALB) sits in front and runs health checks. Static assets go to S3 behind CloudFront, and the database runs on RDS with Multi-AZ replication so failover is automatic.',
        examples: ['ALB + ASG spread across two AZs', 'RDS Multi-AZ for automatic failover'],
        codeSnippet: { language: 'yaml', code: 'Compute & Storage Plan\n  Application Tier:\n    - EC2 instances inside an Auto Scaling Group\n      min=2, max=10, desired=2\n      spread across AZ-a and AZ-b\n      scale-out rule: average CPU > 60% for 5 minutes\n    - Application Load Balancer\n      health check: GET /health every 30s\n      forwards traffic to the ASG target group\n\n  Storage:\n    - S3 bucket for uploads and static assets\n    - CloudFront CDN in front of S3\n\n  Database:\n    - RDS MySQL with Multi-AZ (synchronous replica in AZ-b)\n    - Automated backups with 7-day retention\n    - Read replica for reporting workloads (optional)' }
      },
      {
        title: 'Resiliency',
        content: 'Resiliency means the system survives failures without human intervention. Health checks drive the load balancer to stop routing to unhealthy instances and the ASG to replace them. Database failover is automatic with Multi-AZ. Data loss is bounded by RDS backups and S3 versioning, and the whole stack can be rebuilt from infrastructure as code in minutes.',
        examples: ['Design for failure: every tier needs a backup', 'Test failures on purpose in staging before they happen in production'],
        codeSnippet: { language: 'yaml', code: 'Failure Scenarios & Mitigations\n\n1. EC2 instance crashes\n   -> ALB health check fails\n   -> ASG terminates and launches a replacement\n   -> users see no downtime\n\n2. Entire availability zone fails\n   -> ASG rebalances into the healthy AZ\n   -> RDS Multi-AZ fails over to the replica\n\n3. Database disk corruption\n   -> RDS restores from automated snapshot\n   -> RPO bounded by backup frequency\n\n4. Full region disaster\n   -> restore the infrastructure-as-code stack in a second region\n   -> restore the latest S3 and RDS backups' }
      }
    ],
    keyTakeaways: [
      'Start from availability and cost goals, then choose services',
      'Spread every tier across at least two availability zones',
      'Public subnets only for the load balancer; app and DB stay private',
      'ASG plus ALB health checks make the fleet self-healing',
      'RDS Multi-AZ and S3 versioning bound the worst-case data loss'
    ],
    practice: [
      {
        question: 'Which component distributes incoming traffic to healthy instances across AZs?',
        options: ['Internet Gateway', 'Application Load Balancer', 'NAT Gateway', 'Security group'],
        correctIndex: 1,
        explanation: 'The ALB routes traffic to healthy targets across AZs and removes any instance that fails its health check.'
      },
      {
        question: 'Why place the database tier in private subnets with no internet route?',
        options: ['It is cheaper', 'Attackers cannot reach it directly from the internet', 'RDS requires it', 'Private subnets are faster'],
        correctIndex: 1,
        explanation: 'Databases hold the most sensitive data. With no internet route, only the app tier (via security groups) can reach them, drastically shrinking the attack surface.'
      },
      {
        question: 'What does an Auto Scaling Group do when an instance fails its health check?',
        options: ['Ignores it and keeps serving traffic', 'Terminates it and launches a replacement instance', 'Restarts the VPC', 'Sends a ticket to support'],
        correctIndex: 1,
        explanation: 'The ASG detects the unhealthy instance via ELB health checks, terminates it, and launches a replacement to maintain desired capacity — automatic self-healing.'
      },
      {
        question: 'What is the purpose of a NAT Gateway in a VPC?',
        options: ['To allow inbound traffic from the internet', 'To allow instances in private subnets to access the internet for updates while remaining unreachable', 'To replace the Internet Gateway', 'To encrypt all network traffic'],
        correctIndex: 1,
        explanation: 'A NAT Gateway lets instances in private subnets initiate outbound connections (e.g., for package updates) while preventing inbound connections from the internet.'
      },
      {
        question: 'Why use RDS Multi-AZ instead of a single database instance?',
        options: ['It is cheaper', 'It provides automatic failover to a standby replica if the primary fails', 'It increases read speed', 'It reduces storage costs'],
        correctIndex: 1,
        explanation: 'RDS Multi-AZ maintains a synchronous standby replica in a different availability zone. If the primary fails, RDS automatically fails over to the replica with minimal downtime.'
      }
    ]
  },

  'End-to-End ML Project': {
    title: 'End-to-End ML Project',
    subtitle: 'From raw data to a served machine learning model',
    estimatedTime: '3 weeks',
    whyItMatters: 'Real ML projects are mostly engineering: cleaning data, framing the problem, and evaluating honestly. This capstone walks you through a complete cycle — data preparation, model training, evaluation, and serving predictions — the skills teams need to ship models that actually work in production.',
    learningObjectives: [
      'Frame a business problem as a supervised learning task',
      'Clean and prepare data with pandas and scikit-learn transformers',
      'Train and tune a model with cross-validation and GridSearchCV',
      'Evaluate with metrics that match the problem, then serve predictions'
    ],
    sections: [
      {
        title: 'Problem Framing & Data',
        content: 'Before any model, define the target variable, the prediction unit, and the success metric. Split data into train, validation, and test sets once, at the start, so the test set stays pristine. Clean the data: handle missing values, encode categoricals, and scale features. Preprocessing must be learned on the training split only to avoid leaking information.',
        examples: ['Hold out the test set first and never touch it until the end', 'ColumnTransformer applies the right preprocessing per column type'],
        codeSnippet: { language: 'python', code: 'import pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.impute import SimpleImputer\n\ndf = pd.read_csv("house_prices.csv")\nX = df.drop(columns=["price"])\ny = df["price"]\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)\n\npreprocessor = ColumnTransformer([\n    ("num", Pipeline([\n        ("impute", SimpleImputer(strategy="median")),\n        ("scale", StandardScaler())\n    ]), ["sqft", "beds", "baths"]),\n    ("cat", SimpleImputer(strategy="most_frequent"), ["neighborhood"])\n])' }
      },
      {
        title: 'Training & Tuning',
        content: 'Train a baseline first — a simple model beats a tuned complex one that is guessed. Wrap preprocessing and the model in one Pipeline so cross-validation applies the same steps to every fold. GridSearchCV searches hyperparameter combinations with cross-validation and returns the best estimator, but keep the search small or it becomes computationally expensive.',
        examples: ['scoring="neg_root_mean_squared_error" for regression', 'Name hyperparameters with a double underscore: model__n_estimators'],
        codeSnippet: { language: 'python', code: 'from sklearn.ensemble import RandomForestRegressor\nfrom sklearn.model_selection import GridSearchCV, cross_val_score\n\npipeline = Pipeline([\n    ("preprocess", preprocessor),\n    ("model", RandomForestRegressor(random_state=42))\n])\n\n# Baseline\nbaseline = cross_val_score(pipeline, X_train, y_train,\n                           cv=5, scoring="neg_root_mean_squared_error")\nprint("Baseline RMSE:", -baseline.mean())\n\n# Tuned\ngrid = GridSearchCV(\n    pipeline,\n    param_grid={"model__n_estimators": [100, 200],\n                "model__max_depth": [10, 20, None]},\n    cv=5, scoring="neg_root_mean_squared_error"\n)\ngrid.fit(X_train, y_train)\nprint("Best params:", grid.best_params_)' }
      },
      {
        title: 'Evaluation',
        content: 'Evaluate the final model on the untouched test set — this is the honest estimate of real-world performance. Always compare against a baseline or the status quo. For classification, use accuracy only when classes are balanced; otherwise prefer precision, recall, F1, or ROC-AUC. Look at error distributions, not just a single number.',
        examples: ['The test set is used exactly once', 'R2 = 0.85 means the model explains 85% of the variance'],
        codeSnippet: { language: 'python', code: 'from sklearn.metrics import mean_absolute_error, r2_score\n\n# Evaluate the tuned pipeline on the untouched test set\npreds = grid.best_estimator_.predict(X_test)\n\nmae = mean_absolute_error(y_test, preds)\nr2 = r2_score(y_test, preds)\n\nprint("Test MAE:", round(mae, 2))\nprint("Test R2:", round(r2, 3))\n\n# Inspect the worst errors\nerrors = (y_test - preds).abs()\nprint("Worst 5 predictions:")\nprint(pd.DataFrame({"actual": y_test, "pred": preds,\n                    "abs_error": errors}).sort_values("abs_error",\n                    ascending=False).head())' }
      },
      {
        title: 'Serving',
        content: 'Serving turns the trained model into a usable product: an API endpoint that returns predictions. Save the fitted pipeline with joblib, load it in a small FastAPI app, and validate input before predicting. Log predictions and actuals after deployment so you can monitor data drift.',
        examples: ['joblib.dump and load serialize the whole pipeline', 'Validate input types with Pydantic before predicting'],
        codeSnippet: { language: 'python', code: 'import joblib\nfrom fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\njoblib.dump(grid.best_estimator_, "model.joblib")\n\napp = FastAPI()\nmodel = joblib.load("model.joblib")\n\nclass HouseRequest(BaseModel):\n    sqft: float\n    beds: int\n    baths: int\n    neighborhood: str\n\n@app.post("/predict")\ndef predict(house: HouseRequest):\n    features = [[house.sqft, house.beds, house.baths, house.neighborhood]]\n    try:\n        price = model.predict(features)[0]\n    except Exception:\n        raise HTTPException(status_code=400, detail="Invalid input")\n    return {"predicted_price": round(float(price), 2)}' }
      }
    ],
    keyTakeaways: [
      'Frame the problem and pick the metric before touching the model',
      'Preprocess inside a Pipeline so every fold gets identical steps',
      'Test data is sacred: evaluate once, at the very end',
      'Compare every model against a simple baseline',
      'Serve the trained pipeline through an API and log predictions'
    ],
    practice: [
      {
        question: 'Why must preprocessing be fitted only on the training split?',
        options: ['It is faster', 'Fitting on the test set leaks information and inflates performance', 'The test set is too small', 'Scalers cannot be fitted twice'],
        correctIndex: 1,
        explanation: 'If the scaler or imputer is fitted on the full dataset, test information leaks into training, so the reported performance is unrealistically good.'
      },
      {
        question: 'What does GridSearchCV do?',
        options: ['Trains one model with default settings', 'Searches hyperparameter combinations using cross-validation', 'Cleans missing values automatically', 'Deploys the model to production'],
        correctIndex: 1,
        explanation: 'GridSearchCV trains the pipeline on every combination in param_grid, scores each with cross-validation, and returns the best_estimator_ and best_params_.'
      },
      {
        question: 'For an imbalanced classification problem (5% positive), why is accuracy misleading?',
        options: ['Accuracy is always wrong', 'A model that always predicts the majority class gets high accuracy without solving the problem', 'Accuracy needs more data', 'Accuracy overfits the test set'],
        correctIndex: 1,
        explanation: 'Predicting "negative" for everything is 95% accurate yet useless. Precision, recall, F1, and ROC-AUC reward actually finding the rare positive class.'
      },
      {
        question: 'Why evaluate the final model on the test set only once?',
        options: ['The test set is too small for multiple evaluations', 'Repeated evaluation leads to overfitting the test set — you tune to a specific test result', 'The test set expires after one use', 'scikit-learn requires it'],
        correctIndex: 1,
        explanation: 'If you repeatedly evaluate and tweak based on test set results, the model effectively overfits the test set. The test set must remain a final, untouched benchmark.'
      },
      {
        question: 'What is the benefit of wrapping preprocessing and model in a Pipeline?',
        options: ['Pipelines are faster', 'Pipelines ensure the same preprocessing steps are applied during training and prediction, preventing data leakage', 'Pipelines automatically tune hyperparameters', 'Pipelines reduce memory usage'],
        correctIndex: 1,
        explanation: 'Pipelines bundle preprocessing and the model, ensuring that cross-validation and production predictions use identical steps. This prevents fitting scalers on test data (data leakage).'
      }
    ]
  },

  'DevOps Pipeline Project': {
    title: 'DevOps Pipeline Project',
    subtitle: 'Automating build, test, and deployment with CI/CD',
    estimatedTime: '3 weeks',
    whyItMatters: 'Fast, reliable software delivery is a competitive advantage. A CI/CD pipeline automates the boring and risky parts of shipping: building, testing, packaging into a container, and deploying. This capstone builds that pipeline end to end and deploys a real app to a staging environment.',
    learningObjectives: [
      'Design a pipeline with clear stages, gates, and artifacts',
      'Automate build and test so every commit is verified',
      'Package the application into a Docker image',
      'Deploy the image to staging with a health check and rollback plan'
    ],
    sections: [
      {
        title: 'Pipeline Design',
        content: 'A pipeline is a series of stages connected by gates. Typical stages: checkout -> install dependencies -> build -> test -> build image -> push image -> deploy to staging -> deploy to production (after approval). Each stage produces an artifact the next stage consumes, so the exact same binary moves through every environment — nothing is rebuilt late.',
        examples: ['Fail fast: a failing stage stops the pipeline', 'Deploy to staging on every merge, production only from main'],
        codeSnippet: { language: 'yaml', code: 'stages:\n  - install\n  - build\n  - test\n  - package\n  - deploy-staging\n  - deploy-production\n\ninstall:\n  stage: install\n  script:\n    - npm ci\n\nbuild:\n  stage: build\n  script:\n    - npm run build\n  artifacts:\n    paths: [dist/]\n\ntest:\n  stage: test\n  script:\n    - npm test\n  rules:\n    - if: $CI_PIPELINE_SOURCE == "merge_request_event"\n\ndeploy-staging:\n  stage: deploy-staging\n  environment: staging\n  script:\n    - docker push $IMAGE_TAG\n    - helm upgrade --install myapp ./chart -f values-staging.yaml' }
      },
      {
        title: 'Build & Test Stage',
        content: 'The build stage compiles the application and produces an artifact. The test stage runs unit, integration, and lint checks. Publish test results and coverage as artifacts so failures are visible in the pipeline UI. Failures must stop the pipeline — a red build prevents broken code from ever reaching staging.',
        examples: ['Artifacts survive between stages', 'JUnit XML reports render directly in the pipeline UI'],
        codeSnippet: { language: 'yaml', code: 'build:\n  stage: build\n  script:\n    - mvn -B clean package\n  artifacts:\n    paths:\n      - target/*.jar\n    expire_in: 1 week\n\ntest:\n  stage: test\n  script:\n    - mvn -B test\n  artifacts:\n    when: always\n    reports:\n      junit: target/surefire-reports/TEST-*.xml\n  coverage: /\\d+\\s*% coverage/' }
      },
      {
        title: 'Containerization',
        content: 'A Dockerfile turns the build artifact into a deployable image. Use a multi-stage build: one stage compiles the app, a slim runtime stage copies only the artifact, and the container runs as a non-root user. The resulting image is small, contains exactly what the app needs, and behaves identically in every environment.',
        examples: ['Multi-stage builds keep images small', 'Run as non-root inside the container'],
        codeSnippet: { language: 'dockerfile', code: '# Stage 1: build\nFROM maven:3.9-eclipse-temurin-17 AS builder\nWORKDIR /app\nCOPY pom.xml .\nRUN mvn -B dependency:go-offline\nCOPY src ./src\nRUN mvn -B clean package -DskipTests\n\n# Stage 2: runtime\nFROM eclipse-temurin:17-jre\nWORKDIR /app\nCOPY --from=builder /app/target/*.jar app.jar\nUSER nonroot\nEXPOSE 8080\nENTRYPOINT ["java", "-jar", "app.jar"]' }
      },
      {
        title: 'Deploy Stage',
        content: 'The deploy stage pushes the image to a registry and rolls it out to staging. Modern approaches use Helm charts or Docker Compose with environment-specific values files. Make deploys safe: probe health after rollout, and automate rollback by keeping the previous image tag. Only a green staging deploy should unlock production.',
        examples: ['A failing health check fails the deploy', 'Keep the previous image tag for instant rollback'],
        codeSnippet: { language: 'yaml', code: 'deploy-staging:\n  stage: deploy-staging\n  environment:\n    name: staging\n    url: https://staging.example.com\n  script:\n    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY\n    - docker pull $IMAGE_TAG\n    - docker compose -f docker-compose.staging.yml up -d\n    - curl --fail --retry 10 --retry-delay 5 \\\n        https://staging.example.com/api/health\n  after_script:\n    - echo "Rollback: docker compose -f docker-compose.staging.yml down"\n  only:\n    - main' }
      }
    ],
    keyTakeaways: [
      'Design stages so each one gates the next; fail fast',
      'Build once, then promote the same artifact through environments',
      'Test results and coverage are pipeline artifacts, not afterthoughts',
      'Small, non-root, multi-stage images deploy faster and are safer',
      'Health checks after rollout plus saved image tags make rollback trivial'
    ],
    practice: [
      {
        question: 'Why run automated tests inside the pipeline?',
        options: ['To make the pipeline longer', 'To catch regressions before code reaches deployment', 'To replace manual QA entirely', 'To satisfy a certification'],
        correctIndex: 1,
        explanation: 'Automated tests in CI verify every commit and merge, catching regressions when they are cheapest to fix — long before they reach staging or production.'
      },
      {
        question: 'What is the point of a multi-stage Dockerfile?',
        options: ['It builds faster with more RAM', 'The build stage compiles the app and the runtime stage copies only the small final artifact', 'It allows two apps in one image', 'It bypasses Docker daemon limits'],
        correctIndex: 1,
        explanation: 'Multi-stage builds keep heavy build tooling out of the final image: stage one compiles, stage two copies only the artifact, producing a small, secure, single-purpose image.'
      },
      {
        question: 'Why promote the same artifact (image/binary) from staging to production?',
        options: ['It is cheaper than rebuilding', 'What was tested in staging is exactly what runs in production', 'Registries require it', 'It is the only way to use Helm'],
        correctIndex: 1,
        explanation: 'Reusing the identical artifact guarantees that the version validated in staging is the version deployed to production — no surprise differences from a late rebuild.'
      },
      {
        question: 'What is the purpose of a Docker health check in a deployment pipeline?',
        options: ['To check if Docker is installed', 'To verify the container application is running and ready to accept traffic', 'To scan for vulnerabilities', 'To optimize image size'],
        correctIndex: 1,
        explanation: 'Health checks verify the application inside the container is responsive and functioning. Orchestrators like Kubernetes use them to restart unhealthy containers and route traffic only to healthy ones.'
      },
      {
        question: 'What is a deployment rollback and why plan for it?',
        options: ['A way to speed up deployments', 'Reverting to a previous working version when a new deployment causes failures', 'Deleting all deployment history', 'A type of CI/CD stage'],
        correctIndex: 1,
        explanation: 'Rollbacks restore the previous working version when a deployment introduces bugs or failures. Planning for rollbacks (keeping previous image tags, automated rollback triggers) minimizes downtime.'
      }
    ]
  },

  'AI Application Project': {
    title: 'AI Application Project',
    subtitle: 'Building an LLM-powered application with prompt engineering and RAG',
    estimatedTime: '3 weeks',
    whyItMatters: 'LLM applications are reshaping every industry, but shipping them well takes engineering discipline: grounding answers in real data, designing prompts, and measuring quality. This capstone builds a complete LLM application with a RAG backend and evaluation — the core of modern AI products.',
    learningObjectives: [
      'Define the application concept: users, input, output, and quality bar',
      'Build a RAG backend that retrieves relevant knowledge for the model',
      'Design system and user prompts that control behavior',
      'Evaluate answers for relevance and grounding'
    ],
    sections: [
      {
        title: 'Application Concept',
        content: 'Start with the user need: who asks what, and what does a good answer look like? Define the input schema, output format, and a small set of quality criteria before writing code. Choose your LLM and decide whether answers must be grounded in your own documents — if they must, you need RAG, not just a chat model.',
        examples: ['Example: a support chatbot answering from the company FAQ and runbooks', 'Define failure modes: wrong answers, hallucinated URLs, unsafe output'],
        codeSnippet: { language: 'python', code: '# app.py - minimal LLM app shell\nfrom openai import OpenAI\n\nclient = OpenAI()\n\nSYSTEM_PROMPT = (\n    "You are a support assistant for Acme Cloud. Answer only using the "\n    "context provided. If the context does not contain the answer, say so "\n    "and suggest the user contact support."\n)\n\ndef answer(question, context):\n    response = client.chat.completions.create(\n        model="gpt-4o-mini",\n        messages=[\n            {"role": "system", "content": SYSTEM_PROMPT},\n            {"role": "user", "content": "Context: " + context + "\\n\\nQuestion: " + question}\n        ],\n        temperature=0.2\n    )\n    return response.choices[0].message.content' }
      },
      {
        title: 'RAG Backend',
        content: 'The RAG backend turns your documents into retrievable knowledge. Chunk documents with overlap, embed the chunks into a vector store, and on every question retrieve the top-k most similar chunks to build the context. Chunk size and k control the trade-off between focus and coverage; evaluate both before locking them in.',
        examples: ['Top-k retrieval: 4 chunks is a good starting point', 'Chunk overlap preserves context across boundaries'],
        codeSnippet: { language: 'python', code: 'from langchain_community.vectorstores import FAISS\nfrom langchain_huggingface import HuggingFaceEmbeddings\nfrom langchain.text_splitter import RecursiveCharacterTextSplitter\n\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=600, chunk_overlap=100)\nchunks = splitter.split_documents(documents)\n\nembeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")\nvectorstore = FAISS.from_documents(chunks, embeddings)\nvectorstore.save_local("faiss_index")\n\n# On each request\nvectorstore = FAISS.load_local(\n    "faiss_index", embeddings, allow_dangerous_deserialization=True)\nretrieved = vectorstore.similarity_search(question, k=4)\ncontext = "\\n---\\n".join(doc.page_content for doc in retrieved)' }
      },
      {
        title: 'Prompt Design',
        content: 'The system prompt defines the assistant: role, rules, output format, and what to do with missing information. The user prompt carries the question plus the retrieved context. Be explicit: forbid claims not in the context, specify the JSON schema for structured output, and use a low temperature for factual tasks. Iterate against a fixed set of test questions.',
        examples: ['Low temperature (0-0.2) for factual answers', 'Explicit rules beat vague guidance'],
        codeSnippet: { language: 'python', code: 'SYSTEM = (\n    "You are a strict citation engine.\\n"\n    "1. Answer only from the provided context.\\n"\n    "2. If the context is insufficient, reply exactly: I could not find an "\n    "answer in the knowledge base.\\n"\n    "3. Quote the source id for every fact: (source: <id>).\\n"\n    "4. Never invent numbers, names, or URLs."\n)\n\nUSER = (\n    "Context:\\n" + context +\n    "\\n\\nQuestion: " + question +\n    "\\n\\nRespond in JSON: {\\"answer\\": \\"...\\", \\"sources\\": [\\"...\\"]}"\n)' }
      },
      {
        title: 'Evaluation',
        content: 'An LLM app without evaluation is an accident waiting to happen. Build a golden set of questions with reference answers, run the app on all of them after every change, and measure answer correctness, groundedness (does the answer stay within the retrieved context?), and format compliance. Track these scores over time and gate releases on regressions.',
        examples: ['Re-run the golden set before every release', 'Track faithfulness and relevancy, not just impressions'],
        codeSnippet: { language: 'python', code: 'from ragas.metrics import faithfulness, answer_relevancy\nfrom ragas import evaluate\n\n# Golden set: (question, ground_truth)\ngolden_set = [\n    ("How do I rotate API keys?", "Go to Settings > Keys and click Rotate."),\n    ("What is the refund policy?", "Refunds are issued within 30 days.")\n]\n\nresults = []\nfor question, truth in golden_set:\n    answer, sources = run_rag_app(question)\n    results.append({\n        "question": question,\n        "answer": answer,\n        "ground_truth": truth,\n        "grounded": check_citations_in_context(answer, sources)\n    })\n\n# Faithfulness: fraction of claims supported by the retrieved context\nscore = evaluate(\n    dataset=make_dataset(results),\n    metrics=[faithfulness, answer_relevancy]\n)\nprint(score)' }
      }
    ],
    keyTakeaways: [
      'Define quality criteria before writing any AI code',
      'RAG grounds answers in your documents and reduces hallucination',
      'The system prompt is code — version it and test it',
      'Low temperature for factual tasks, explicit output schemas',
      'Golden-set evaluation catches regressions when prompts or models change'
    ],
    practice: [
      {
        question: 'Why add RAG to an LLM application instead of fine-tuning for company docs?',
        options: ['RAG is always cheaper to run', 'New documents are searchable immediately without retraining, and answers stay grounded', 'RAG removes the need for embeddings', 'Fine-tuning cannot answer questions'],
        correctIndex: 1,
        explanation: 'RAG updates instantly when documents change, needs no expensive retraining, and lets the model cite sources — ideal for frequently changing company knowledge.'
      },
      {
        question: 'What is the main purpose of the system prompt?',
        options: ['To pass the user question to the model', 'To define the assistant role, rules, and output constraints', 'To retrieve documents', 'To store the API key'],
        correctIndex: 1,
        explanation: 'The system prompt configures behavior: who the assistant is, what it must and must not do, and how the output should be formatted.'
      },
      {
        question: 'What does a faithfulness (groundedness) evaluation measure?',
        options: ['How fast the API responds', 'Whether every claim in the answer is supported by the retrieved context', 'The size of the context window', 'How many documents were retrieved'],
        correctIndex: 1,
        explanation: 'Faithfulness checks that the answer does not invent facts beyond the retrieved context — the direct guard against hallucination.'
      },
      {
        question: 'Why use a golden set of test questions for LLM evaluation?',
        options: ['Golden sets are required by API providers', 'They provide consistent, repeatable benchmarks to measure quality over time', 'Golden sets make the model faster', 'They reduce API costs'],
        correctIndex: 1,
        explanation: 'A golden set of questions with reference answers lets you measure answer quality consistently across prompt or model changes, catching regressions before they reach users.'
      },
      {
        question: 'What is the advantage of using a low temperature (0-0.2) for factual tasks?',
        options: ['It makes responses longer', 'It makes the model more deterministic and focused, reducing hallucinated or creative answers', 'It makes the model faster', 'It increases vocabulary size'],
        correctIndex: 1,
        explanation: 'Low temperature makes the model pick the most probable tokens consistently, reducing creative variation and increasing the likelihood of factual, deterministic responses.'
      }
    ]
  },

  'File Handling': {
    title: 'File Handling',
    subtitle: 'Reading, writing, and managing files with the java.io and java.nio APIs',
    estimatedTime: '60 min',
    whyItMatters: 'Almost every real-world Java application reads or writes data: configuration files, logs, CSV exports, uploaded documents, and data pipelines. File handling is where the Java standard library\u2019s streams, buffers, and the modern java.nio.file API come together. Getting it right matters for error handling, performance, and data safety.',
    learningObjectives: [
      'Use FileReader, FileWriter, BufferedReader, and BufferedWriter for character-based I/O',
      'Use FileInputStream and FileOutputStream for binary data',
      'Read and write files using the modern java.nio.file.Files and Path APIs',
      'Handle checked exceptions (IOException) and use try-with-resources correctly',
      'Create, delete, rename, and inspect files and directories'
    ],
    sections: [
      {
        title: 'Character-Based I/O with Readers and Writers',
        content: 'Text files are read and written with Reader and Writer classes. FileReader reads characters from a file, and FileWriter writes characters to it. Wrapping them in BufferedReader and BufferedWriter adds an internal buffer, which drastically reduces the number of underlying I/O operations and improves performance. Always close these resources; try-with-resources closes them automatically even when an exception is thrown.',
        examples: ['try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) { ... }'],
        codeSnippet: { language: 'java', code: 'import java.io.*;\nimport java.nio.charset.StandardCharsets;\n\npublic class ReadFile {\n    public static void main(String[] args) {\n        try (BufferedReader br = new BufferedReader(\n                new InputStreamReader(\n                    new FileInputStream("notes.txt"), StandardCharsets.UTF_8))) {\n            String line;\n            while ((line = br.readLine()) != null) {\n                System.out.println(line);\n            }\n        } catch (IOException e) {\n            System.err.println("Error reading file: " + e.getMessage());\n        }\n    }\n}' }
      },
      {
        title: 'Binary I/O with Streams',
        content: 'Binary data (images, video, serialized objects) cannot be processed textually. FileInputStream and FileOutputStream move raw bytes. For large files, reading in chunks with a byte array buffer is far more efficient than reading byte-by-byte. The read(byte[]) method returns the number of bytes actually read and returns -1 at end of file.',
        examples: ['byte[] buffer = new byte[8192]; int n = in.read(buffer);'],
        codeSnippet: { language: 'java', code: 'import java.io.*;\n\npublic class CopyBinary {\n    public static void main(String[] args) {\n        try (FileInputStream in = new FileInputStream("photo.jpg");\n             FileOutputStream out = new FileOutputStream("photo-copy.jpg")) {\n            byte[] buffer = new byte[8192];\n            int n;\n            while ((n = in.read(buffer)) != -1) {\n                out.write(buffer, 0, n);\n            }\n            System.out.println("Copied successfully");\n        } catch (IOException e) {\n            System.err.println("Copy failed: " + e.getMessage());\n        }\n    }\n}' }
      },
      {
        title: 'The Modern java.nio.file API',
        content: 'Since Java 7, the recommended way to work with the file system is the java.nio.file package. The Files class provides one-line operations: Files.readAllLines, Files.writeString, Files.createDirectories, Files.copy, and Files.move. The Path interface replaces java.io.File and works uniformly on all operating systems. These APIs handle character encoding and directory traversal more safely than the old File class.',
        examples: ['List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);'],
        codeSnippet: { language: 'java', code: 'import java.nio.file.*;\nimport java.nio.charset.StandardCharsets;\nimport java.util.List;\n\npublic class NioExample {\n    public static void main(String[] args) throws Exception {\n        Path dataDir = Paths.get("data");\n        Files.createDirectories(dataDir);\n\n        Path file = dataDir.resolve("report.txt");\n        Files.writeString(file, "first line\\nsecond line\\n", StandardCharsets.UTF_8);\n\n        List<String> lines = Files.readAllLines(file, StandardCharsets.UTF_8);\n        System.out.println("Read " + lines.size() + " lines");\n        System.out.println("File size: " + Files.size(file) + " bytes");\n    }\n}' }
      },
      {
        title: 'Error Handling and Resource Management',
        content: 'File operations throw checked IOException subclasses, so code that touches files must handle or declare them. Try-with-resources (try (...)) closes every AutoCloseable automatically. Use Files.exists / Files.isDirectory before operations when the outcome depends on state, but remember: check-then-act is still racy, so catch FileNotFoundException and NoSuchFileException too. Prefer throwing meaningful exceptions over swallowing them.',
        examples: ['if (Files.exists(path)) { ... }', 'catch (NoSuchFileException e) { ... }'],
        codeSnippet: { language: 'java', code: 'import java.nio.file.*;\n\npublic class SafeFileOps {\n    public static void main(String[] args) {\n        Path p = Paths.get("config.properties");\n        try {\n            if (Files.exists(p)) {\n                System.out.println("Config: " + Files.readString(p));\n            } else {\n                System.out.println("No config file yet — creating...");\n                Files.writeString(p, "name=PathForge\\n");\n            }\n        } catch (Exception e) {\n            System.err.println("I/O error: " + e.getMessage());\n        }\n    }\n}' }
      }
    ],
    keyTakeaways: [
      'Wrap FileReader/FileWriter in buffered classes to reduce I/O and improve performance',
      'Use byte streams (FileInputStream/FileOutputStream) for binary data, readers/writers for text',
      'The java.nio.file.Files API is the modern, preferred way to read, write, and manage files',
      'Always close resources — try-with-resources does it automatically and safely',
      'Handle IOException explicitly; never ignore filesystem errors silently'
    ],
    practice: [
      {
        question: 'Which class is best suited for reading a large text file line by line?',
        options: ['FileReader alone', 'BufferedReader wrapped around a FileReader', 'FileInputStream alone', 'StringReader'],
        correctIndex: 1,
        explanation: 'BufferedReader.readLine() reads an entire line at once and buffers the underlying stream, minimizing I/O calls. A bare FileReader would read one character at a time, which is slow for large files.'
      },
      {
        question: 'What is the main advantage of reading binary files with a byte array buffer?',
        options: ['It validates the file format', 'It reduces the number of low-level I/O operations, improving performance', 'It automatically decompresses the file', 'It prevents data corruption'],
        correctIndex: 1,
        explanation: 'Reading into an 8 KB (or larger) buffer transfers many bytes per system call instead of one byte at a time, dramatically reducing overhead on large files.'
      },
      {
        question: 'What does the read(byte[]) method return at the end of the file?',
        options: ['0', '-1', 'null', 'An empty byte array'],
        correctIndex: 1,
        explanation: 'InputStream.read(byte[]) returns -1 when the end of the stream has been reached, which is how loops terminate in standard copy implementations.'
      },
      {
        question: 'What does try-with-resources guarantee?',
        options: ['Files are compressed automatically', 'All AutoCloseable resources are closed even if an exception is thrown', 'Exceptions are never thrown', 'The file is deleted after use'],
        correctIndex: 1,
        explanation: 'Try-with-resources calls close() on every resource in the try clause in reverse order, including when an exception propagates, preventing resource leaks.'
      },
      {
        question: 'Which package contains the modern Files and Path classes?',
        options: ['java.io', 'java.nio.file', 'java.util', 'java.lang'],
        correctIndex: 1,
        explanation: 'java.nio.file provides Path, Files, and related classes, which are the recommended way to work with the file system since Java 7.'
      }
    ]
  },

  'MongoDB': {
    title: 'MongoDB',
    subtitle: 'Document-oriented NoSQL storage with flexible schemas and the aggregation pipeline',
    estimatedTime: '75 min',
    whyItMatters: 'MongoDB is the most widely used document database and a core part of the modern full-stack stack alongside Node.js. Its flexible document model is excellent for rapidly evolving schemas, JSON-shaped data, and applications that need horizontal scaling. Understanding when to choose MongoDB over SQL — and when not to — is a real job skill.',
    learningObjectives: [
      'Understand the document model and how it differs from relational tables',
      'Use the MongoDB shell and MongoDB Compass to insert, query, update, and delete documents',
      'Write filter, projection, and sorting queries with the query operators',
      'Build aggregations using $match, $group, $sort, and $project',
      'Model data and choose indexes for common access patterns'
    ],
    sections: [
      {
        title: 'Documents, Collections, and Databases',
        content: 'In MongoDB, a database holds collections, and a collection holds documents. A document is a BSON object — JSON-like, with embedded arrays and nested subdocuments. Unlike a SQL table, a collection does not enforce a uniform schema: each document may have different fields. This flexibility shines when your data shape changes often, but it also means your application must enforce invariants that the database will not.',
        examples: ['db.users.insertOne({ name: "Ava", age: 28, tags: ["backend", "java"] })'],
        codeSnippet: { language: 'shell', code: '// MongoDB shell\n> use pathforge\ndb.users.insertOne({\n  name: "Ava",\n  age: 28,\n  role: "backend-engineer",\n  projects: [{ title: "Student API", status: "completed" }]\n})\n\ndb.users.find({ role: "backend-engineer" })' }
      },
      {
        title: 'CRUD and Query Operators',
        content: 'Querying uses the find() method with a filter document. Comparison operators like $gt, $gte, $lt, and $ne express ranges; $in matches any of several values; $regex performs pattern matching. Updates use $set to modify fields, $inc to increment numerically, and $push/$pull to manipulate arrays. dot notation reaches nested fields without breaking documents apart.',
        examples: ['db.orders.find({ total: { $gte: 100 } })', 'db.orders.updateOne({ _id: 1 }, { $inc: { total: 25 } })'],
        codeSnippet: { language: 'js', code: '// Insert several documents\ndb.orders.insertMany([\n  { _id: 1, customer: "Ava", total: 120, status: "paid" },\n  { _id: 2, customer: "Leo", total: 45, status: "pending" },\n  { _id: 3, customer: "Ava", total: 300, status: "shipped" }\n])\n\n// All orders over $100\nprintjson(db.orders.find({ total: { $gte: 100 } }).toArray())\n\n// Ava paid orders sorted by total\ndb.orders.find({ customer: "Ava", status: "paid" }).sort({ total: -1 })' }
      },
      {
        title: 'The Aggregation Pipeline',
        content: 'Aggregations process documents through a pipeline of stages. $match filters early to reduce work, $group groups by a key and computes accumulators ($sum, $avg, $count, $max), $sort orders results, and $project shapes the output with computed fields. The aggregation framework is MongoDB\'s answer to SQL GROUP BY and is essential for reporting and analytics.',
        examples: ['db.orders.aggregate([{ $group: { _id: "$customer", totalSpent: { $sum: "$total" } } }])'],
        codeSnippet: { language: 'js', code: '// Total spent per customer, only counting paid orders, highest first\ndb.orders.aggregate([\n  { $match: { status: "paid" } },\n  { $group: { _id: "$customer", totalSpent: { $sum: "$total" } } },\n  { $sort: { totalSpent: -1 } },\n  { $project: { customer: "$_id", totalSpent: 1, _id: 0 } }\n])' }
      },
      {
        title: 'Indexes and Data Modeling',
        content: 'Indexes make queries fast by allowing MongoDB to jump straight to matching documents. Without an index, MongoDB scans every document (a collection scan). Create indexes on fields used in filters and sorts — especially fields that combine with equality and range filters. For your own learning projects, adding an index on the field you query most (e.g., status or userId) is the single biggest performance win.',
        examples: ['db.orders.createIndex({ customer: 1, total: -1 })', 'db.orders.getIndexes()'],
        codeSnippet: { language: 'js', code: '// Before: explain() shows a COLLSCAN\ndb.orders.find({ customer: "Ava" }).explain("executionStats")\n\n// After: create an index and re-run\ndb.orders.createIndex({ customer: 1 })\ndb.orders.find({ customer: "Ava" }).explain("executionStats")\n// The plan now shows IXSCAN with just a few examined documents' }
      }
    ],
    keyTakeaways: [
      'MongoDB stores documents (BSON objects) in collections — a flexible, schema-less data model',
      'Use $gt/$lt/$in/$regex for rich filters and $set/$inc/$push for targeted updates',
      'The aggregation pipeline ($match → $group → $sort → $project) replaces SQL GROUP BY for analytics',
      'Indexes (e.g., createIndex on queried fields) turn collection scans into fast seeks',
      'Choose MongoDB for flexible, document-shaped data; relational data with heavy joins still favors SQL'
    ],
    practice: [
      {
        question: 'What is the MongoDB equivalent of a SQL table?',
        options: ['A database', 'A collection', 'A document', 'An index'],
        correctIndex: 1,
        explanation: 'A collection holds documents, analogous to a table holding rows. Databases hold collections, and a document is closer to a row.'
      },
      {
        question: 'Which query finds all orders with a total greater than or equal to 100?',
        options: ['db.orders.find({ total: { $gt: 100 } })', 'db.orders.find({ total: { $gte: 100 } })', 'db.orders.find({ total >= 100 })', 'db.orders.findBy({ total: 100 })'],
        correctIndex: 1,
        explanation: '$gte means "greater than or equal to", which includes exactly 100. The $gt operator would exclude 100 itself. Comparison operators are always wrapped in a subdocument like { $gte: 100 }.'
      },
      {
        question: 'What does the $group stage in an aggregation do?',
        options: ['Deletes duplicate documents', 'Groups documents by a key and computes accumulators like $sum and $avg', 'Joins two collections', 'Sorts the documents'],
        correctIndex: 1,
        explanation: 'The $group stage is MongoDB\'s GROUP BY: it groups by the _id key and computes accumulator values ($sum, $avg, $count, $max) over each group.'
      },
      {
        question: 'What does a collection scan (COLLSCAN) mean?',
        options: ['MongoDB checks every document in the collection because no index matches the query', 'MongoDB deletes the collection', 'An error in the query syntax', 'MongoDB uses an in-memory cache'],
        correctIndex: 0,
        explanation: 'A COLLSCAN examines each document one by one. Creating an index on the queried field switches the plan to IXSCAN, which only reads the matching documents.'
      },
      {
        question: 'Why is a document database a good fit for a React + Node.js app?',
        options: ['It requires no coding', 'JSON-shaped documents map directly to JavaScript objects with no ORM impedance mismatch', 'It is always faster than SQL', 'It removes the need for indexes'],
        correctIndex: 1,
        explanation: 'Documents serialize to JSON, which maps naturally to JavaScript objects. This eliminates the object-relational mapping layer needed with SQL databases. It is not automatically faster or index-free though.'
      }
    ]
  }
};

// --- Helper functions ---

export default TOPIC_CONTENT;

export { TOPIC_CONTENT };

export function getTopicContent(name) {
  return TOPIC_CONTENT[name] || null;
}

export function getAllTopicNames() {
  return Object.keys(TOPIC_CONTENT);
}

export function hasTopicContent(name) {
  return name in TOPIC_CONTENT;
}

// ═══════════════════════════════════════════════════════════════════════════
// REAL-WORLD USE + COMMON MISTAKES — curated per topic (keyed by the canonical
// content title). Rendered as dedicated lesson sections so every topic offers
// practical context, not just theory.
// ═══════════════════════════════════════════════════════════════════════════
export const TOPIC_EXTRAS = {
  'Java Basics': {
    realWorldUse: 'Java powers Android apps, banking backends, and large enterprise systems — the same syntax, types, and control flow you learn here run billions of daily transactions.',
    commonMistakes: [
      'Forgetting that integer division truncates (5 / 2 is 2, not 2.5)',
      'Comparing strings with == instead of .equals()',
      'Naming variables inconsistently or with meaningless names',
    ],
  },
  'OOPs Concepts': {
    realWorldUse: 'Frameworks like Spring and Hibernate are built on encapsulation, inheritance, and interfaces — understanding these lets you read real framework code instead of treating it as magic.',
    commonMistakes: [
      'Overusing inheritance where composition would be cleaner',
      'Making fields public "for convenience" instead of using private + getters',
      'Designing interfaces with too many responsibilities',
    ],
  },
  'Collections Framework': {
    realWorldUse: 'Every Java application uses collections — lists for ordered data, maps for lookups, sets for uniqueness. Choosing the right collection is a daily production decision that affects speed and memory.',
    commonMistakes: [
      'Using ArrayList when you need unique elements (should be HashSet)',
      'Iterating and modifying a list at the same time, causing ConcurrentModificationException',
      'Ignoring hash/equals consistency, breaking HashSet and HashMap lookups',
    ],
  },
  'Exception Handling': {
    realWorldUse: 'Production systems must fail gracefully: a database outage, a missing file, or invalid input should produce a clean error response, not a crash. Exception handling is what separates resilient services from brittle ones.',
    commonMistakes: [
      'Swallowing exceptions with an empty catch block, hiding real failures',
      'Catching Exception broadly and losing the original error details',
      'Forgetting to close resources — leaking file handles and connections',
    ],
  },
  'File Handling': {
    realWorldUse: 'Log files, config files, CSV exports, and uploaded documents all flow through file I/O — the streams and java.nio.file APIs here are what production batch jobs use to process millions of records.',
    commonMistakes: [
      'Reading a whole file into memory when streaming would handle large inputs',
      'Hardcoding file paths instead of using Path and relative locations',
      'Not handling missing files or permission errors explicitly',
    ],
  },
  'Multithreading': {
    realWorldUse: 'Web servers, message queues, and data pipelines all run concurrent tasks — shared counters and caches must be synchronized or the app produces wrong results under load.',
    commonMistakes: [
      'Reading and writing shared state without synchronization',
      'Using Thread.sleep to "fix" race conditions instead of proper coordination',
      'Creating unbounded threads instead of using an executor pool',
    ],
  },
  'Java 8+ Features': {
    realWorldUse: 'Streams and lambdas dominate modern Java codebases — Spring Data, Kafka clients, and nearly every open-source Java library use them, so reading current code requires these features.',
    commonMistakes: [
      'Using streams for everything, even trivial loops where they hurt readability',
      'Missing terminal operations (like collect) and wondering why nothing runs',
      'Mutating shared state inside lambda expressions',
    ],
  },
  'JDBC': {
    realWorldUse: 'Every Java service that talks to a database starts with JDBC under the hood — connection management and result-set handling here explain why frameworks like Hibernate behave the way they do.',
    commonMistakes: [
      'Leaking connections by not closing them in finally blocks or try-with-resources',
      'Concatenating user input into SQL strings (SQL injection)',
      'Not using prepared statements for parameterized queries',
    ],
  },
  'REST API': {
    realWorldUse: 'REST is the lingua franca of modern systems: your backend talks to the web app, mobile app, and third-party integrations through the same JSON endpoints you design here.',
    commonMistakes: [
      'Using verbs in URLs (/getUser) instead of HTTP methods (GET /users/1)',
      'Returning 200 for everything instead of meaningful status codes',
      'Not validating input and returning unclear error bodies',
    ],
  },
  'Spring Boot': {
    realWorldUse: 'Spring Boot is the standard for Java services — most production Java backends you will encounter are Spring applications with autoconfigured web, data, and security layers.',
    commonMistakes: [
      'Letting circular dependencies appear instead of restructuring components',
      'Putting business logic in controllers instead of services',
      'Ignoring the default error handling until a client reports a confusing 500',
    ],
  },
  'Build Production API': {
    realWorldUse: 'This capstone mirrors a real delivery: a versioned JSON API with validation, error handling, tests, and deployment — the same checklist teams use when shipping services to production.',
    commonMistakes: [
      'Skipping input validation and accepting malformed payloads',
      'Hardcoding configuration and secrets into the code',
      'Deploying without basic health checks or structured logging',
    ],
  },
  'SQL': {
    realWorldUse: 'SQL is the most widely used language in the world of data — reports, analytics, and application backends all query relational databases with the same SELECT/JOIN/GROUP BY patterns.',
    commonMistakes: [
      'SELECT * everywhere, pulling unused columns and slowing queries',
      'Forgetting JOIN conditions, producing accidental cross products',
      'Doing filtering and aggregation in application code that SQL can do better',
    ],
  },
  'HTML & CSS': {
    realWorldUse: 'Every webpage you visit is HTML and CSS — this is the foundation of the entire web, from marketing sites to the most complex web applications.',
    commonMistakes: [
      'Using divs for everything instead of semantic tags like header, main, and section',
      'Relying on fixed pixel widths instead of responsive units',
      'Ignoring accessibility attributes like alt text and labels',
    ],
  },
  'JavaScript Basics': {
    realWorldUse: 'JavaScript runs in every browser and on every server through Node.js — variables, functions, and async flows here are the foundation of all frontend and most backend web work.',
    commonMistakes: [
      'Confusing == with === (type coercion surprises)',
      'Blocking the event loop with synchronous heavy loops',
      'Letting variables leak out of scope (missing const/let)',
    ],
  },
  'React Fundamentals': {
    realWorldUse: 'React powers the frontends of companies from Airbnb to Netflix — the component and state model here is the same one used in production web apps at massive scale.',
    commonMistakes: [
      'Mutating state directly instead of using the updater function',
      'Putting expensive logic in render instead of useMemo/useEffect',
      'Over-nesting components instead of composing smaller pieces',
    ],
  },
  'State & Routing': {
    realWorldUse: 'Real apps have many screens and shared state — routing and state libraries are how multi-page products like dashboards and marketplaces stay coherent.',
    commonMistakes: [
      'Storing everything in global state instead of local or server state',
      'Forgetting to handle the 404/no-match route',
      'Duplicating state between stores and components until they drift',
    ],
  },
  'Node.js & Express': {
    realWorldUse: 'Node.js and Express run millions of APIs and microservices — the same request-handling model you build here powers real-world backends for startups and enterprises.',
    commonMistakes: [
      'Not handling errors in async handlers, crashing the process',
      'Blocking the event loop with CPU-heavy synchronous work',
      'Missing request timeouts and letting slow clients hold resources',
    ],
  },
  'SQL Fundamentals': {
    realWorldUse: 'From e-commerce checkout to banking, relational databases with SQL at the core store the world\'s critical data — joins and indexes are what make those systems fast.',
    commonMistakes: [
      'Writing queries without understanding what an index does',
      'Using implicit cross joins instead of explicit JOIN ... ON',
      'Not thinking about NULL behavior in comparisons',
    ],
  },
  'MongoDB': {
    realWorldUse: 'MongoDB is the leading document database — flexible schemas power content systems, catalogs, and analytics workloads where relational rigidity gets in the way.',
    commonMistakes: [
      'Modeling one-to-many relationships with unbounded embedded arrays',
      'Querying without indexes and wondering why reads are slow',
      'Ignoring the 16MB document size limit until production',
    ],
  },
  'Full Stack Project': {
    realWorldUse: 'This capstone ties together a frontend, an API, and a database — the exact architecture used by real products to serve customers end to end.',
    commonMistakes: [
      'Treating the frontend and backend as separate projects without a shared data contract',
      'Skipping end-to-end testing of the actual user flows',
      'Deploying with hardcoded URLs that break between environments',
    ],
  },
  'Linux Fundamentals': {
    realWorldUse: 'Linux runs the vast majority of servers and containers — every deployment, CI pipeline, and cloud console you touch in a technical career is Linux under the hood.',
    commonMistakes: [
      'Running sudo for everything instead of learning file permissions',
      'Killing processes with the wrong signal (SIGKILL instead of SIGTERM)',
      'Not knowing how to read the output of ps, top, and df',
    ],
  },
  'Networking Basics': {
    realWorldUse: 'Everything from a browser request to a load balancer to a VPN depends on IP addressing, DNS, and TCP — debugging production issues starts at the network layer.',
    commonMistakes: [
      'Confusing public and private IP ranges',
      'Forgetting that DNS caching causes "it worked yesterday" mysteries',
      'Troubleshooting blindly instead of starting with ping, traceroute, and curl',
    ],
  },
  'Cloud Concepts': {
    realWorldUse: 'Almost every modern service runs on AWS, Azure, or Google Cloud — pay-per-use servers, storage, and databases you provision today mirror what you will manage professionally.',
    commonMistakes: [
      'Choosing regions without considering latency and compliance',
      'Ignoring cost implications of idle resources and oversized instances',
      'Treating the shared responsibility model as someone else\'s problem',
    ],
  },
  'Compute & Storage': {
    realWorldUse: 'EC2-style virtual machines, S3-style object storage, and managed databases are the building blocks of cloud applications — this is where cloud budget and architecture decisions are made.',
    commonMistakes: [
      'Leaving security groups open to 0.0.0.0/0',
      'Storing sensitive data in buckets that should be private',
      'Picking the largest instance type instead of right-sizing to the workload',
    ],
  },
  'Docker': {
    realWorldUse: 'Containers are the packaging standard of modern software — every CI/CD pipeline, Kubernetes cluster, and developer environment you will use runs on Docker images.',
    commonMistakes: [
      'Copying secrets into images via environment variables baked at build time',
      'Running containers as root in production',
      'Building huge images with unnecessary layers instead of slim multi-stage builds',
    ],
  },
  'Kubernetes': {
    realWorldUse: 'Kubernetes orchestrates the container workloads of almost every cloud platform — the pods, deployments, and services you learn here are what production systems actually run on.',
    commonMistakes: [
      'Skipping resource requests/limits and letting noisy neighbors starve pods',
      'Forgetting liveness and readiness probes, causing traffic to hit unhealthy pods',
      'Storing configuration and secrets in plaintext manifests',
    ],
  },
  'Infrastructure as Code': {
    realWorldUse: 'Terraform lets teams describe cloud infrastructure in version-controlled code — this is how real companies make environments reproducible, auditable, and reviewable.',
    commonMistakes: [
      'Drifting from the code by manually editing cloud resources in the console',
      'Storing state files with secrets in unencrypted locations',
      'Not using plan output review before applying changes',
    ],
  },
  'CI/CD Fundamentals': {
    realWorldUse: 'GitHub Actions and similar pipelines run the tests, builds, and deployments for essentially every modern software team — a green pipeline is what makes shipping safe and boring.',
    commonMistakes: [
      'Running long, flaky builds instead of splitting fast unit tests from slow integration ones',
      'Hardcoding secrets in workflow files instead of repository secrets',
      'Deploying automatically without any test or review gate',
    ],
  },
  'Cloud Architecture Project': {
    realWorldUse: 'This capstone practices designing a resilient, scalable cloud system — the same trade-offs (availability, cost, security) architects weigh for real workloads.',
    commonMistakes: [
      'Designing single points of failure with no failover story',
      'Adding complexity before a simple architecture is proven',
      'Ignoring cost estimates until the bill arrives',
    ],
  },
  'Git & Version Control': {
    realWorldUse: 'Git is the backbone of every software team — branching, merging, and reviewing changes are daily rituals in every company you will join.',
    commonMistakes: [
      'Committing secrets or large binaries into history',
      'Writing vague commit messages that are useless six months later',
      'Merging without checking for conflicts and broken builds',
    ],
  },
  'Shell Scripting': {
    realWorldUse: 'Shell scripts automate deployments, backups, and monitoring — the glue that keeps cloud and DevOps workflows running without manual steps.',
    commonMistakes: [
      'Forgetting to quote variables, breaking on paths with spaces',
      'Not handling command failures with set -e or explicit checks',
      'Writing scripts that only work on one machine configuration',
    ],
  },
  'Python Basics': {
    realWorldUse: 'Python is the language of data, AI, and automation — from web frameworks like Django to every major machine learning library, this syntax is the common denominator.',
    commonMistakes: [
      'Confusing mutable default arguments and aliasing lists/dicts',
      'Catching all exceptions and hiding bugs',
      'Using range(len(x)) when enumerate would be cleaner',
    ],
  },
  'Statistics Fundamentals': {
    realWorldUse: 'Descriptive statistics and distributions are how data teams summarize behavior — A/B tests, dashboards, and ML feature choices all rest on these concepts.',
    commonMistakes: [
      'Reporting the mean without looking at the distribution (outliers skew it)',
      'Confusing correlation with causation in analysis',
      'Ignoring sample size when interpreting results',
    ],
  },
  'Pandas & NumPy': {
    realWorldUse: 'Pandas and NumPy are the standard toolkit for data wrangling — almost every real analysis, ML pipeline, and data science portfolio project starts with these libraries.',
    commonMistakes: [
      'Chaining operations that modify the original frame instead of copies',
      'Using Python loops where vectorized operations are orders of magnitude faster',
      'Ignoring missing values until they silently corrupt results',
    ],
  },
  'Data Visualization': {
    realWorldUse: 'Clear charts communicate findings to stakeholders — matplotlib and seaborn charts are how data teams make insights actionable in reports and dashboards.',
    commonMistakes: [
      'Misleading axis scales that exaggerate differences',
      'Overcrowding charts until they are unreadable',
      'Choosing colors and sizes without considering print and accessibility',
    ],
  },
  'Machine Learning Fundamentals': {
    realWorldUse: 'Supervised and unsupervised learning power recommendation, fraud detection, and forecasting systems — the train/evaluate loop here is how real models are built.',
    commonMistakes: [
      'Evaluating on the training data instead of a held-out test set',
      'Leaking target information into features',
      'Applying models without checking class balance and data quality',
    ],
  },
  'Model Evaluation': {
    realWorldUse: 'Accuracy alone misleads on imbalanced problems like fraud or rare diseases — precision, recall, and ROC are the metrics teams actually report and tune.',
    commonMistakes: [
      'Tuning on the test set and then reporting optimistic scores',
      'Picking accuracy on an imbalanced dataset',
      'Ignoring the confusion matrix when things look "good"',
    ],
  },
  'Deep Learning Basics': {
    realWorldUse: 'Deep learning drives image recognition, speech, and generative AI — the neuron/backpropagation model here underlies every modern framework and model you will use.',
    commonMistakes: [
      'Training with too-small datasets and overfitting immediately',
      'Ignoring normalization, producing exploding or vanishing gradients',
      'Adding more layers to fix problems that are really data problems',
    ],
  },
  'Feature Engineering': {
    realWorldUse: 'Real-world ML projects live or die by features — the encodings, aggregations, and transformations here are what practitioners spend most of their time on in production systems.',
    commonMistakes: [
      'Fitting scaling/scalers on the full dataset including the test split',
      'Creating features that use future information (lookahead leakage)',
      'Adding redundant features that just slow training',
    ],
  },
  'End-to-End ML Project': {
    realWorldUse: 'This capstone covers the full ML lifecycle — data, model, evaluation, and deployment — mirroring how ML teams deliver models that actually serve users in production.',
    commonMistakes: [
      'Skipping a proper train/test split and reporting inflated results',
      'Not versioning data, code, and model artifacts together',
      'Deploying a model without monitoring for drift',
    ],
  },
  'Python for AI': {
    realWorldUse: 'NumPy, pandas, and scikit-learn are the AI/ML stack of the industry — this topic builds the Python fluency every AI role assumes you already have.',
    commonMistakes: [
      'Writing slow Python loops where vectorized libraries are available',
      'Ignoring library versions and breaking reproducibility',
      'Not isolating environments per project (dependency hell)',
    ],
  },
  'Linear Algebra': {
    realWorldUse: 'Vectors, matrices, and transformations are the math under every ML model — from dot products in neural nets to PCA, this is the language of machine learning papers and code.',
    commonMistakes: [
      'Memorizing formulas without building geometric intuition',
      'Mixing row and column vector conventions when implementing',
      'Ignoring matrix dimension rules and getting shape errors',
    ],
  },
  'scikit-learn': {
    realWorldUse: 'scikit-learn is the most widely used ML library — its estimators, pipelines, and cross-validation utilities are how most real-world classical ML models are built.',
    commonMistakes: [
      'Fitting transformers on the whole dataset instead of the training fold',
      'Leaking scalers into the test set through careless pipelines',
      'Ignoring the random_state parameter and getting unreproducible results',
    ],
  },
  'Neural Networks': {
    realWorldUse: 'Neural networks are the engine behind modern AI — the layers and activation functions you learn here are what PyTorch and TensorFlow models are made of.',
    commonMistakes: [
      'Using sigmoid on hidden layers and suffering vanishing gradients',
      'Forgetting to normalize input features',
      'Increasing network size to compensate for bad data or bad loss curves',
    ],
  },
  'TensorFlow / PyTorch': {
    realWorldUse: 'PyTorch and TensorFlow train virtually all production deep learning models — the tensor and autograd model here is the foundation of everything from recommendation systems to generative AI.',
    commonMistakes: [
      'Calling .item() or converting to CPU in hot loops, killing GPU throughput',
      'Forgetting .zero_grad() and accumulating gradients across steps',
      'Mixing training and inference modes, producing inconsistent results',
    ],
  },
  'Prompt Engineering': {
    realWorldUse: 'Prompt design determines what LLM-powered products actually deliver — the techniques here are used daily to build assistants, content pipelines, and coding tools on top of models like GPT and Gemini.',
    commonMistakes: [
      'Giving vague instructions and expecting precise output',
      'Not constraining output format, producing unparseable responses',
      'Ignoring temperature and context limits when designing calls',
    ],
  },
  'RAG & LLM Apps': {
    realWorldUse: 'Retrieval-augmented generation is how production chatbots answer questions about private documents — the embedding, retrieval, and generation loop here is the core of modern AI applications.',
    commonMistakes: [
      'Retrieving chunks without relevance filtering, polluting the context',
      'Sending the entire document corpus to the model instead of retrieved chunks',
      'Ignoring source attribution, letting the model answer from memory instead of retrieved facts',
    ],
  },
  'AI Application Project': {
    realWorldUse: 'This capstone builds a working LLM-backed product end to end — the same pattern (pipeline, API, UI, guardrails) that real AI products ship with.',
    commonMistakes: [
      'Testing only happy-path prompts and ignoring edge cases',
      'Shipping without rate limits, timeouts, or failure fallbacks',
      'Not logging prompts and responses for debugging and cost tracking',
    ],
  },
  'React': {
    realWorldUse: 'React is the component library behind most modern web frontends — the props, hooks, and rendering model here are the same ones used in production at scale.',
    commonMistakes: [
      'Calling hooks conditionally, breaking React\'s rules of hooks',
      'Mutating props or state objects directly instead of immutably',
      'Forgetting to clean up subscriptions and intervals in effects',
    ],
  },
  'DevOps Pipeline Project': {
    realWorldUse: 'This capstone assembles a complete CI/CD pipeline — build, test, and deploy automation that mirrors the delivery pipelines real DevOps teams operate every day.',
    commonMistakes: [
      'Making the pipeline depend on a developer\'s local machine',
      'Hardcoding credentials instead of using CI/CD secrets',
      'Deploying with no rollback plan or health verification after release',
    ],
  },
};
