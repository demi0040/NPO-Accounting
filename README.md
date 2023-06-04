# Play-Accounting-App-Backend
## Introduction
Welcome to the documentation for the project developed using Angular, PostgreSQL, ExpressJS, and ng2-charts. This comprehensive application provides a powerful dashboard, allowing users to efficiently manage and visualize income, expenses, and donor information. With seamless integration of Material UI and ng2-charts, this project offers an intuitive and visually appealing user interface.

The application encompasses several key features. The dashboard presents crucial insights through various charts, including monthly income and expense summaries, comparisons, and donation received trends. Additionally, the donor table provides detailed information on individual donors, including their contributions and total donations made.

The application consists of several distinct pages, each serving a specific purpose. The "Donors" page enables users to view, add, edit, and delete donor records, empowering efficient management of donor information. The "Income" page allows users to manage income data, including viewing, adding, editing, and deleting income entries. Similarly, the "Expenses" page facilitates the same functionality for expense records.

Future plans for the application include the development of a comprehensive reporting module, aimed at generating insightful reports. This feature will provide users with in-depth analysis and visualization of the financial data gathered by the application.


Tools and Technologies
In the development of this project, various frameworks, libraries, and technologies were utilized to create a robust and efficient application. Here are the key tools and technologies employed in different aspects of the project:

### Frontend:

Angular: Angular is a popular TypeScript-based open-source framework for building dynamic web applications. It provides a comprehensive platform for creating responsive and scalable user interfaces.
Material UI: Material UI is a set of pre-designed and customizable UI components that follow the Material Design guidelines. It enhances the visual appeal and usability of the application.
ng2-charts: ng2-charts is a library that integrates Chart.js into Angular applications, enabling the creation of interactive and visually appealing charts and graphs.
SCSS: SCSS (Sassy CSS) is a CSS preprocessor that enhances the capabilities of traditional CSS, allowing for easier maintenance, reuse, and organization of stylesheets.
TypeScript: TypeScript is a superset of JavaScript that introduces static typing and additional features to enhance development productivity and code maintainability.

### Backend:

ExpressJS: ExpressJS is a fast and minimalist web application framework for Node.js. It simplifies the creation of robust APIs and provides essential features for handling HTTP requests, routing, and middleware.

### Database:

PostgreSQL: PostgreSQL is a powerful, open-source relational database management system. It offers a rich set of features, including ACID compliance, scalability, and extensibility, making it an excellent choice for storing and managing structured data.
Other Libraries:

Hoppscotch: Hoppscotch is an open-source API development and testing tool that simplifies the process of making HTTP requests and testing APIs. It provides a user-friendly interface for exploring and interacting with backend APIs.
These tools and technologies were carefully chosen to ensure a seamless development experience, high performance, and an intuitive user interface. By leveraging the capabilities of Angular, Material UI, ng2-charts, ExpressJS, and PostgreSQL, the project delivers a robust and feature-rich application to effectively manage income, expenses, and donor information.



## Installation and Setup
By following these steps, you should have the project set up and ready to use on your local machine. Make sure to adjust the configuration files, such as `app.js`, with the appropriate settings for your environment.

To set up the project environment and run the application, follow the steps below:

### 1. Prerequisites:
- Ensure you have Node.js installed on your system. You can download it from the official Node.js website (https://nodejs.org).
- Install PostgreSQL on your system. You can download it from the official PostgreSQL website (https://www.postgresql.org).

### 2. Clone the project:
- Open your terminal or command prompt.
    - Navigate to the desired directory where you want to clone the project.
    - Run the following command to clone the backend repository:
    ```
    git clone https://github.com/demi0040/Play-Accounting-App-Backend.git
    ```
    - Navigate to project folder and clone the angular project:
    ```
    git clone https://github.com/demi0040/angular-accounting.git
    ```

### 3. Install the dependencies:
   - Open a new terminal or command prompt window.
   - Navigate to the project's frontend directory.
   - Run the following command to install the frontend dependencies
     ```
     cd .\angular-accounting\
     
     npm install
     ```
   - Navigate to the project's backend directory.
   - Run the following command to install the backend dependencies
     ```
     cd .\expressjs-backend\
     
     npm install
     ```

### 4. Restore the database:
   - Locate the `database.sql` file provided in the project's `assets/data` folder.
   - Use the PostgreSQL command-line tool or a GUI tool (such as pgAdmin) to restore the database from the `database.sql` file. This will create the necessary tables and populate them with sample data.

### 5. Configure the backend:
   - Open the `app.js` file located in the project's backend directory: `.\expressjs-backend`.
   - Review and update the configuration settings in the `app.js` file as per your PostgreSQL database credentials and any other required configurations.

### 6. Run the backend server:
   - In the terminal or command prompt, navigate to the project's backend directory:
   - Run the following command to start the backend server:
     ```
     cd .\expressjs-backend\
     
     npm start
     ```

### 7. Run the frontend application:
   - In a separate terminal or command prompt window, navigate to the project's frontend directory:
   - Run the following command to start the frontend application:
     ```
     cd .\angular-accounting\
     
     ng serve
     ```

### 8. Access the application:
   - Open your web browser and visit `http://localhost:4200`.
   - The application should be up and running, allowing you to explore its various features and functionalities.

By following these steps, you should have the project set up and ready to use on your local machine. Make sure to adjust the configuration files, such as `app.js`, with the appropriate settings for your environment.
