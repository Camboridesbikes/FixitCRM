"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
/**
 * Set up database connection with variable configurations dependant
 * on environment
 */
const environment = process.env.NODE_ENV || 'development';
const dbConfig = require('./knexfile')[environment];
console.log(`db config :\n${JSON.stringify(dbConfig)}`);
const db = (0, knex_1.default)(dbConfig);
exports.default = db;
