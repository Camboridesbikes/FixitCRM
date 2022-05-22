"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientHandlers_1 = require("../../controllers/handlers/clientHandlers");
const clientRoutes = (server, options, done) => {
    //add client
    server.post('/add', clientHandlers_1.addClient);
    server.get('/all', clientHandlers_1.getAllClients);
    server.get('/name/:clientName', clientHandlers_1.getClientsByName);
    server.get('/id/:id', clientHandlers_1.getClientById);
    server.delete('/delete/:id', clientHandlers_1.deleteClient);
    done();
};
exports.default = clientRoutes;
