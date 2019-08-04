"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./config/db"));
var path = require('path');
var app = express_1.default();
// Connect DB
db_1.default();
// Init Middleware
app.use(express_1.default.json());
// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
// Serve static asset in production
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
    app.get('*', function (req, res) {
        return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    return console.log("Development Server: http://localhost:" + PORT);
});
