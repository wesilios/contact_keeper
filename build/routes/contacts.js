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
var auth_1 = __importDefault(require("../middleware/auth"));
var Contact = require('../models/Contact');
// @route       GET api/contacts
// @description Get all user contact
// @access      Private
router.get('/', auth_1.default, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var contacts, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Contact.find({ user: req.user.id }).sort({
                        created_at: -1
                    })];
            case 1:
                contacts = _a.sent();
                res.json(contacts);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1.message);
                res.status(500).send('Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @route       POST api/contacts
// @description Add new contact
// @access      Private
router.post('/', auth_1.default, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, email, name, phone, type, newContact, contact, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, name = _a.name, phone = _a.phone, type = _a.type;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                newContact = new Contact({
                    name: name,
                    email: email,
                    phone: phone,
                    type: type,
                    user: req.user.id
                });
                return [4 /*yield*/, newContact.save()];
            case 2:
                contact = _b.sent();
                res.json(contact);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                console.error(err_2.message);
                res.status(500).send('Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @route       PUT api/contacts/:id
// @description Update contact
// @access      Private
router.put('/:id', auth_1.default, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, email, name, phone, type, contactFields, contact, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, name = _a.name, phone = _a.phone, type = _a.type;
                contactFields = {};
                if (name)
                    contactFields.name = name;
                if (email)
                    contactFields.email = email;
                if (phone)
                    contactFields.phone = phone;
                if (type)
                    contactFields.type = type;
                contactFields.update_at = Date.now;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Contact.findById(req.params.id)];
            case 2:
                contact = _b.sent();
                if (!contact)
                    return [2 /*return*/, res.status(404).json({ message: 'Contact not found' })];
                if (contact.user.toString() !== req.user.id) {
                    return [2 /*return*/, res.status(401).json({ message: 'Not authorized' })];
                }
                return [4 /*yield*/, Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true })];
            case 3:
                contact = _b.sent();
                res.json(contact);
                return [3 /*break*/, 5];
            case 4:
                err_3 = _b.sent();
                console.error(err_3.message);
                res.status(500).send('Server Error');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// @route       Delete api/contacts
// @description Delete contact
// @access      Private
router.delete('/:id', auth_1.default, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var contact, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Contact.findById(req.params.id)];
            case 1:
                contact = _a.sent();
                if (!contact)
                    return [2 /*return*/, res.status(404).json({ message: 'Contact not found' })];
                if (contact.user.toString() !== req.user.id) {
                    return [2 /*return*/, res.status(401).json({ message: 'Not authorized' })];
                }
                return [4 /*yield*/, Contact.findByIdAndRemove(req.params.id)];
            case 2:
                _a.sent();
                res.json({ message: 'Contact Deleted!' });
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error(err_4.message);
                res.status(500).send('Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
