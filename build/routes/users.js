"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("config"));
var express_validator_1 = require("express-validator");
var User = require('../models/User');
// @route       POST api/users
// @description Register a user
// @access      Public
router.post('/', [
    express_validator_1.check('name', 'Please add name')
        .not()
        .isEmpty(),
    express_validator_1.check('email', 'Please include valid email').isEmail(),
    express_validator_1.check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var errors, _a, name, email, password, user, salt, _b, payload, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, User.findOne({ email: email })];
            case 2:
                user = _c.sent();
                if (user) {
                    return [2 /*return*/, res.status(400).json({ message: 'User already existed' })];
                }
                user = new User({ name: name, email: email, password: password });
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 3:
                salt = _c.sent();
                _b = user;
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 4:
                _b.password = _c.sent();
                return [4 /*yield*/, user.save()];
            case 5:
                _c.sent();
                payload = {
                    user: {
                        id: user.id
                    }
                };
                jsonwebtoken_1.default.sign(payload, config_1.default.get('jwtSecret'), {
                    expiresIn: 360000
                }, function (err, token) {
                    if (err)
                        throw err;
                    res.json({ token: token });
                });
                return [3 /*break*/, 7];
            case 6:
                err_1 = _c.sent();
                console.error(err_1.message);
                res.status(500).send('Server Error');
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
