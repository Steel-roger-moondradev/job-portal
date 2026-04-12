"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler_js_1 = __importDefault(require("./ErrorHandler.js"));
const TryCatch = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        }
        catch (error) {
            console.log("ERROR OBJECT:", error);
            if (error instanceof ErrorHandler_js_1.default) {
                return res.status(error.statusCode).json({
                    message: error.message,
                });
            }
            res.status(500).json({
                message: error.message,
            });
        }
        ;
    };
};
exports.default = TryCatch;
