"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("config"));
function default_1(req, res, next) {
    // Get token from header
    var token = req.header('x-auth-token');
    // Check if not token
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }
    try {
        var decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtSecret'));
        req.user = decoded.user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}
exports.default = default_1;
