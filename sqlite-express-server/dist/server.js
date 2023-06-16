"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const donorsPage_1 = __importDefault(require("./APIs/donorsPage"));
const incomesPage_1 = __importDefault(require("./APIs/incomesPage"));
const expensesPage_1 = __importDefault(require("./APIs/expensesPage"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // Enable CORS
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Serve the Angular app
const angularAppPath = path_1.default.join(__dirname, '../../angular-accounting/dist/angular-accounting');
app.use(express_1.default.static(angularAppPath));
// Middleware for API routes
app.use('/api/donors', donorsPage_1.default);
app.use('/api/incomes', incomesPage_1.default);
app.use('/api/expenses', expensesPage_1.default);
// For all other routes, return the index.html file
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(angularAppPath, 'index.html'));
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=server.js.map