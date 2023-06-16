"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const databaseSetup_1 = require("../dbOperations/databaseSetup");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const db = await (0, databaseSetup_1.connectDatabase)();
        const result = await db.all('SELECT * FROM expenses');
        res.json(result);
    }
    catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = router;
//# sourceMappingURL=expensesPage.js.map