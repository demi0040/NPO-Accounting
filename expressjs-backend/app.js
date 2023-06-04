const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up a connection pool with your database credentials
const pool = new Pool({
    host: 'localhost',
    port: '5432',
    database: 'play-accounting',
    user: 'postgres',
    password: '1234'
});

// Donors Table APIs
app.get('/api/donors', async(req, res) => {
    try {
        // Execute a query to retrieve all donors
        const query = 'SELECT * FROM donors';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving donors');
    }
});

app.delete('/api/donors/:id', async(req, res) => {
    const donorId = req.params.id;

    try {
        // Execute a query to delete the donor with the specified ID
        const query = 'DELETE FROM donors WHERE id = $1';
        const result = await pool.query(query, [donorId]);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting donor');
    }
});

app.post('/api/donors', async(req, res) => {
    const { first_name, last_name, address, postcode, phone, email, donor_area, donor_group, promised_amount, promised_date } = req.body;

    try {
        // Execute a query to add a new donor
        const query = 'INSERT INTO donors (first_name, last_name, address, postcode, phone, email, donor_area, donor_group, promised_amount, promised_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
        const values = [first_name, last_name, address, postcode, phone, email, donor_area, donor_group, promised_amount, promised_date];
        await pool.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding donor');
    }
});

app.put('/api/donors/:id', async(req, res) => {
    const donorId = req.params.id;
    const { first_name, last_name, address, postcode, phone, email, donor_area, donor_group, promised_amount, promised_date } = req.body;

    try {
        // Execute a query to update the donor with the specified ID
        const query = 'UPDATE donors SET first_name = $1, last_name = $2, address = $3, postcode = $4, phone = $5, email = $6, donor_area = $7, donor_group = $8, promised_amount = $9, promised_date = $10 WHERE id = $11';
        const values = [first_name, last_name, address, postcode, phone, email, donor_area, donor_group, promised_amount, promised_date, donorId];
        await pool.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating donor');
    }
});

// Income Table APIs
app.get('/api/incomes', async(req, res) => {
    try {
        // Execute a query to retrieve all incomes
        const query = 'SELECT * FROM incomes';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving incomes');
    }
});

app.delete('/api/incomes/:id', async(req, res) => {
    const incomeId = req.params.id;

    try {
        // Execute a query to delete the income with the specified ID
        const query = 'DELETE FROM incomes WHERE id = $1';
        const result = await pool.query(query, [incomeId]);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting income');
    }
});

app.post('/api/incomes', async(req, res) => {
    const { income_category, payment_method, income_amount, income_date, income_source_name, donor_id, description } = req.body;

    const donorId = donor_id === "" ? null : donor_id;

    try {
        // Execute a query to add a new income
        const query = 'INSERT INTO incomes (income_category, payment_method, income_amount, income_date, income_source_name, donor_id, description) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        const values = [income_category, payment_method, income_amount, income_date, income_source_name, donorId, description];
        await pool.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding income');
    }
});

app.put('/api/incomes/:id', async(req, res) => {
    const incomeId = req.params.id;
    const { income_category, payment_method, income_amount, income_date, income_source_name, donor_id, description } = req.body;

    try {
        // Execute a query to update the income with the specified ID
        const query = 'UPDATE incomes SET income_category = $1, payment_method = $2, income_amount = $3, income_date = $4, income_source_name = $5, donor_id = $6, description = $7 WHERE id = $8';
        const values = [income_category, payment_method, income_amount, income_date, income_source_name, donor_id, description, incomeId];
        await pool.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating income');
    }
});

// Expenses Table APIs
app.get('/api/expenses', async(req, res) => {
    try {
        // Execute a query to retrieve all expenses
        const query = 'SELECT * FROM expenses';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving expenses');
    }
});

app.delete('/api/expenses/:id', async(req, res) => {
    const expenseId = req.params.id;

    try {
        // Execute a query to delete the expense with the specified ID
        const query = 'DELETE FROM expenses WHERE id = $1';
        const result = await pool.query(query, [expenseId]);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting expense');
    }
});

app.post('/api/expenses', async(req, res) => {
    const { expense_name, payment_method, expense_category, payee_information, expense_amount, expense_date, expense_description } = req.body;

    try {
        // Execute a query to add a new expense
        const query = 'INSERT INTO expenses (expense_name, payment_method, expense_category, payee_information, expense_amount, expense_date, expense_description) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        const values = [expense_name, payment_method, expense_category, payee_information, expense_amount, expense_date, expense_description];
        await pool.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding expense');
    }
});

app.put('/api/expenses/:id', async(req, res) => {
    const expenseId = req.params.id;
    const { expense_name, payment_method, expense_category, payee_information, expense_amount, expense_date, expense_description } = req.body;

    try {
        // Execute a query to update the expense with the specified ID
        const query = 'UPDATE expenses SET expense_name = $1, payment_method = $2, expense_category = $3, payee_information = $4, expense_amount = $5, expense_date = $6, expense_description = $7 WHERE id = $8';
        const values = [expense_name, payment_method, expense_category, payee_information, expense_amount, expense_date, expense_description, expenseId];
        await pool.query(query, values);

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating expense');
    }
});

// Monthly Income View APIs
app.get('/api/monthly-income', async(req, res) => {
    try {
        const query = 'SELECT * FROM monthly_income';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching monthly income data');
    }
});

// Monthly Expense View APIs
app.get('/api/monthly-expense', async(req, res) => {
    try {
        const query = 'SELECT * FROM monthly_expense';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching monthly income data');
    }
});

// Monthly Donations View APIs
app.get('/api/monthly-donations', async(req, res) => {
    try {
        const query = 'SELECT * FROM monthly_donations';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching monthly income data');
    }
});

// Donors with income and promise difference APIs
app.get('/api/donors-with-income', async(req, res) => {
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
        res.status(500).send('Error retrieving donors with income');
    }
});


const port = 3000; // Define the port number

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
