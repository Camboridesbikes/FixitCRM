"use strict";
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
exports.deleteClient = exports.getClientById = exports.getClientsByName = exports.getAllClients = exports.addClient = void 0;
const databaseConnection_1 = __importDefault(require("../../databaseConnection/databaseConnection"));
const addClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone } = req.body;
        const timeStamp = new Date();
        databaseConnection_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
            const clientId = yield (0, databaseConnection_1.default)('clients')
                .insert({
                client_name: name,
                email: email,
                phone_number: phone,
                created: timeStamp
            }, 'client_id')
                .onConflict(databaseConnection_1.default.raw('(email) where email'))
                .ignore();
            const data = yield (0, databaseConnection_1.default)('notes')
                .insert({
                client_id: clientId,
                last_updated: timeStamp
            });
            res.code(200).send(data);
        }));
    }
    catch (error) {
        res.status(400);
        console.log('error: ' + error);
    }
});
exports.addClient = addClient;
const getAllClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield databaseConnection_1.default.select()
            .from('clients')
            .timeout(10000, { cancel: true })
            .then((data) => res.send(data));
    }
    catch (error) {
        res.status(400);
        console.log('error: ' + error);
    }
});
exports.getAllClients = getAllClients;
const getClientsByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientName } = req.params;
        const data = yield databaseConnection_1.default.select()
            .from('clients')
            .whereILike('client_name', `%${clientName.replaceAll('%', '\\%')}%`)
            .timeout(10000, { cancel: true });
        yield res.code(200).send(data);
    }
    catch (error) {
        res.status(400);
        console.log('error: ' + error);
    }
});
exports.getClientsByName = getClientsByName;
const getClientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.prams;
        const data = yield databaseConnection_1.default.select()
            .from('clients')
            .where({
            client_id: `${id}`
        })
            .timeout(5000, { cancel: true });
        yield res.send(data);
    }
    catch (error) {
        res.status(400);
        console.log('error: ' + error);
    }
});
exports.getClientById = getClientById;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, databaseConnection_1.default)('clients')
            .where('client_id', id)
            .returning('*')
            .del();
        res.code(200).send(data);
    }
    catch (error) {
        res.status(400);
        console.log('error: ' + error);
    }
});
exports.deleteClient = deleteClient;
