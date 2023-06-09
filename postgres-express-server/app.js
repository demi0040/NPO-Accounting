const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up a connection pool with your database credentials
const pool = new Pool({
  host: "localhost",
  port: "5432",
  database: "play-accounting",
  user: "ihsan",
  password: "1234",
});

// Serve the Angular app
app.use(express.static(path.join(__dirname, '../angular-accounting/dist/angular-accounting')));

// Function to capitalize all letters in a string
function capitalizeAllLetters(str) {
  return str.replace(/./g, (char) => char.toUpperCase());
}

// Donors Table APIs
app.get("/api/donors", async (req, res) => {
  try {
    // Execute a query to retrieve all donors
    const query = "SELECT * FROM donors";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving donors");
  }
});

app.delete("/api/donors/:id", async (req, res) => {
  const donorId = req.params.id;

  try {
    // Execute a query to delete the donor with the specified ID
    const query = "DELETE FROM donors WHERE id = $1";
    const result = await pool.query(query, [donorId]);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting donor");
  }
});

app.post("/api/donors", async (req, res) => {
  let {
    first_name,
    last_name,
    address,
    postcode,
    phone,
    email,
    donor_area,
    donor_group,
    promised_amount,
    promised_date,
  } = req.body;

  try {
    // Capitalize specific fields
    first_name = capitalizeAllLetters(first_name);
    last_name = capitalizeAllLetters(last_name);
    address = capitalizeAllLetters(address);
    email = capitalizeAllLetters(email);
    postcode = capitalizeAllLetters(postcode);
    // Execute a query to add a new donor
    const query =
      "INSERT INTO donors (first_name, last_name, address, postcode, phone, email, donor_area, donor_group, promised_amount, promised_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    const values = [
      first_name,
      last_name,
      address,
      postcode,
      phone,
      email,
      donor_area,
      donor_group,
      promised_amount,
      promised_date,
    ];
    await pool.query(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding donor");
  }
});

app.put("/api/donors/:id", async (req, res) => {
  const donorId = req.params.id;
  let {
    first_name,
    last_name,
    address,
    postcode,
    phone,
    email,
    donor_area,
    donor_group,
    promised_amount,
    promised_date,
  } = req.body;

  try {
    // Capitalize specific fields
    first_name = capitalizeAllLetters(first_name);
    last_name = capitalizeAllLetters(last_name);
    address = capitalizeAllLetters(address);
    email = capitalizeAllLetters(email);
    postcode = capitalizeAllLetters(postcode);
    // Execute a query to update the donor with the specified ID
    const query =
      "UPDATE donors SET first_name = $1, last_name = $2, address = $3, postcode = $4, phone = $5, email = $6, donor_area = $7, donor_group = $8, promised_amount = $9, promised_date = $10 WHERE id = $11";
    const values = [
      first_name,
      last_name,
      address,
      postcode,
      phone,
      email,
      donor_area,
      donor_group,
      promised_amount,
      promised_date,
      donorId,
    ];
    await pool.query(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating donor");
  }
});

// Income Table APIs
app.get("/api/incomes", async (req, res) => {
  try {
    // Execute a query to retrieve all incomes
    const query = "SELECT * FROM incomes";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving incomes");
  }
});

app.delete("/api/incomes/:id", async (req, res) => {
  const incomeId = req.params.id;

  try {
    // Execute a query to delete the income with the specified ID
    const query = "DELETE FROM incomes WHERE id = $1";
    const result = await pool.query(query, [incomeId]);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting income");
  }
});

app.post("/api/incomes", async (req, res) => {
  let {
    income_category,
    payment_method,
    income_amount,
    income_date,
    income_source_name,
    donor_id,
    description,
  } = req.body;

  const donorId = donor_id === "" ? null : donor_id;

  try {
    // Capitalize specific fields
    income_category = capitalizeAllLetters(income_category);
    payment_method = capitalizeAllLetters(payment_method);
    income_source_name = capitalizeAllLetters(income_source_name);
    // Execute a query to add a new income
    const query =
      "INSERT INTO incomes (income_category, payment_method, income_amount, income_date, income_source_name, donor_id, description) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const values = [
      income_category,
      payment_method,
      income_amount,
      income_date,
      income_source_name,
      donorId,
      description,
    ];
    await pool.query(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding income");
  }
});

app.put("/api/incomes/:id", async (req, res) => {
  const incomeId = req.params.id;
  let {
    income_category,
    payment_method,
    income_amount,
    income_date,
    income_source_name,
    donor_id,
    description,
  } = req.body;

  try {
    // Capitalize specific fields
    income_category = capitalizeAllLetters(income_category);
    payment_method = capitalizeAllLetters(payment_method);
    income_source_name = capitalizeAllLetters(income_source_name);
    // Execute a query to update the income with the specified ID
    const query =
      "UPDATE incomes SET income_category = $1, payment_method = $2, income_amount = $3, income_date = $4, income_source_name = $5, donor_id = $6, description = $7 WHERE id = $8";
    const values = [
      income_category,
      payment_method,
      income_amount,
      income_date,
      income_source_name,
      donor_id,
      description,
      incomeId,
    ];
    await pool.query(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating income");
  }
});

// Expenses Table APIs
app.get("/api/expenses", async (req, res) => {
  try {
    // Execute a query to retrieve all expenses
    const query = "SELECT * FROM expenses";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving expenses");
  }
});

app.delete("/api/expenses/:id", async (req, res) => {
  const expenseId = req.params.id;

  try {
    // Execute a query to delete the expense with the specified ID
    const query = "DELETE FROM expenses WHERE id = $1";
    const result = await pool.query(query, [expenseId]);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting expense");
  }
});

app.post("/api/expenses", async (req, res) => {
  let {
    expense_name,
    payment_method,
    expense_category,
    payee_information,
    expense_amount,
    expense_date,
    expense_description,
  } = req.body;

  try {
    // Capitalize specific fields
    expense_name = capitalizeAllLetters(expense_name);
    payment_method = capitalizeAllLetters(payment_method);
    expense_category = capitalizeAllLetters(expense_category);
    payee_information = capitalizeAllLetters(payee_information);
    // Execute a query to add a new expense
    const query =
      "INSERT INTO expenses (expense_name, payment_method, expense_category, payee_information, expense_amount, expense_date, expense_description) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    const values = [
      expense_name,
      payment_method,
      expense_category,
      payee_information,
      expense_amount,
      expense_date,
      expense_description,
    ];
    await pool.query(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding expense");
  }
});

app.put("/api/expenses/:id", async (req, res) => {
  const expenseId = req.params.id;
  let {
    expense_name,
    payment_method,
    expense_category,
    payee_information,
    expense_amount,
    expense_date,
    expense_description,
  } = req.body;

  try {
    // Capitalize specific fields
    expense_name = capitalizeAllLetters(expense_name);
    payment_method = capitalizeAllLetters(payment_method);
    expense_category = capitalizeAllLetters(expense_category);
    payee_information = capitalizeAllLetters(payee_information);
    // Execute a query to update the expense with the specified ID
    const query =
      "UPDATE expenses SET expense_name = $1, payment_method = $2, expense_category = $3, payee_information = $4, expense_amount = $5, expense_date = $6, expense_description = $7 WHERE id = $8";
    const values = [
      expense_name,
      payment_method,
      expense_category,
      payee_information,
      expense_amount,
      expense_date,
      expense_description,
      expenseId,
    ];
    await pool.query(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating expense");
  }
});

// Monthly Income View APIs
app.get("/api/monthly-income", async (req, res) => {
  try {
    const query = "SELECT * FROM monthly_income";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching monthly income data");
  }
});

// Monthly Expense View APIs
app.get("/api/monthly-expense", async (req, res) => {
  try {
    const query = "SELECT * FROM monthly_expense";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching monthly income data");
  }
});

// Monthly Donations View APIs
app.get("/api/monthly-donations", async (req, res) => {
  try {
    const query = "SELECT * FROM monthly_donations";
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching monthly income data");
  }
});

// Donors with income and promise difference APIs
app.get("/api/donors-with-income", async (req, res) => {
  try {
    // Execute a query to retrieve donors with total_actual_income and difference
    const query = `
            SELECT d.*, COALESCE(SUM(i.income_amount), 0) AS total_actual_income, COALESCE(d.promised_amount - SUM(i.income_amount), d.promised_amount) AS difference
            FROM donors d
            LEFT JOIN incomes i ON d.id = i.donor_id
            GROUP BY d.id
        `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving donors with income");
  }
});

app.get("/api/donors-area-group", async (req, res) => {
  try {
    // Execute a query to retrieve donors with total_actual_income, difference, area, and group
    const query = `
            SELECT d.*, COALESCE(SUM(i.income_amount), 0) AS total_actual_income, COALESCE(d.promised_amount - SUM(i.income_amount), d.promised_amount) AS difference, d.donor_area AS area, d.donor_group AS group
            FROM donors d
            LEFT JOIN incomes i ON d.id = i.donor_id
            GROUP BY d.id, d.donor_area, d.donor_group
            ORDER BY d.donor_area, d.donor_group
      `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving donors with income");
  }
});

// Montly income by income category APIs
app.get("/api/monthly-income-by-category", async (req, res) => {
  try {
    // Execute a query to retrieve monthly income by income category
    const query = `
            SELECT * FROM monthly_incomes_by_category
            ORDER BY month, income_category
        `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving monthly income by category");
  }
});

// Montly income by income payment method APIs
app.get("/api/monthly-income-by-payment-method", async (req, res) => {
  try {
    // Execute a query to retrieve monthly income by income payment method
    const query = `
            SELECT * FROM monthly_incomes_by_payment_method
            ORDER BY month, payment_method
        `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving monthly income by payment method");
  }
});

// Montly income by income source name APIs
app.get("/api/monthly-income-by-source-name", async (req, res) => {
  try {
    // Execute a query to retrieve monthly income by income source name
    const query = `
            SELECT * FROM monthly_incomes_by_income_source
            ORDER BY month, income_source_name
        `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving monthly income by source name");
  }
});

// Montly expense by expense category APIs
app.get("/api/monthly-expense-by-category", async (req, res) => {
  try {
    // Execute a query to retrieve monthly expense by expense category
    const query = `
            SELECT * FROM monthly_expenses_by_category
            ORDER BY month, expense_category
        `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving monthly expense by category");
  }
});

// Montly expense by expense payment method APIs
app.get("/api/monthly-expense-by-payment-method", async (req, res) => {
  try {
    // Execute a query to retrieve monthly expense by expense payment method
    const query = `
            SELECT * FROM monthly_expenses_by_payment_method
            ORDER BY month, payment_method
        `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving monthly expense by payment method");
  }
});

// Montly expense by expense name APIs
app.get("/api/monthly-expense-by-expense-name", async (req, res) => {
  try {
    // Execute a query to retrieve monthly expense by expense name
    const query = `
            SELECT * FROM monthly_expenses_by_expense_name
            ORDER BY month, expense_name
        `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving monthly expense by expense name");
  }
});

// Montly expense by expense payee information APIs
app.get("/api/monthly-expense-by-payee", async (req, res) => {
  try {
    // Execute a query to retrieve monthly expense by expense payee information
    const query = `
            SELECT * FROM monthly_expenses_by_payee_information
            ORDER BY month, payee_information
        `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Error retrieving monthly expense by payee information");
  }
});

// For all other routes, return the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../angular-accounting/dist/angular-accounting/index.html'));
});

const port = 3000; // Define the port number

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
