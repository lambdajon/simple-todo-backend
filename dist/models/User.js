"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = require("bcryptjs");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verifyCode: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        hidden: true,
    },
}, {
    versionKey: false,
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    },
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (this.password) {
                const salt = yield bcryptjs_1.genSalt(10);
                const hashedPassword = yield bcryptjs_1.hash(this.password, salt);
                if (hashedPassword) {
                    this.password = hashedPassword;
                }
            }
            next();
        }
        catch (e) {
            next(e);
            throw new Error(`User password hashing error: ${e}`);
        }
    });
});
exports.default = mongoose_1.default.model("User", UserSchema);
