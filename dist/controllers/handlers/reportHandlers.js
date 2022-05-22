"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveReportHTML = exports.getReportIdHash = exports.deleteReport = exports.getReportById = exports.getReportsByClientId = exports.addReport = void 0;
const showdown = __importStar(require("showdown"));
const databaseConnection_1 = __importDefault(require("../../databaseConnection/databaseConnection"));
const addReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { client_id, bike_id, body } = req.body;
        const timestamp = new Date();
        yield (0, databaseConnection_1.default)('reports')
            .insert({
            client_id: client_id,
            bike_id: bike_id,
            body: body,
            created: timestamp,
            last_updated: timestamp
        }).then(() => {
            res.code(204).send();
        });
    }
    catch (error) {
        res.status(400);
    }
});
exports.addReport = addReport;
const getReportsByClientId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId } = req.params;
        const data = yield (0, databaseConnection_1.default)('reports')
            .select()
            .where('client_id', clientId);
        yield res.code(200).send(data);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.getReportsByClientId = getReportsByClientId;
const getReportById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, databaseConnection_1.default)('reports')
            .select()
            .where('report_id', id);
        res.code(200).send(data);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.getReportById = getReportById;
const deleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, databaseConnection_1.default)('reports')
            .where('report_id', id)
            .returning(['report_id', 'client_id', 'bike_id'])
            .del();
        res.code(200).send(data);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.deleteReport = deleteReport;
/**
 * returns a hash code of the report id
 * @param req
 * @param res
 */
const getReportIdHash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /*code body*/
    }
    catch (error) {
        res.status(400);
    }
});
exports.getReportIdHash = getReportIdHash;
/**
 * Translates markdown text stored in db into html and serves it to client
 *
 * @param req
 * @param res
 */
const serveReportHTML = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reportHash } = req.params;
        const data = yield (0, databaseConnection_1.default)('reports')
            .select('body')
            .where('report_id', reportHash);
        const converter = new showdown.Converter();
        console.log(data[0].body);
        const html = converter.makeHtml(data[0].body);
        console.log(data[0].body);
        res.code(200).send(html);
    }
    catch (error) {
        res.status(400);
    }
});
exports.serveReportHTML = serveReportHTML;
