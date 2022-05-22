"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reportHandlers_1 = require("../../controllers/handlers/reportHandlers");
const reportRoutes = (server, options, done) => {
    server.post('/add', reportHandlers_1.addReport);
    server.get('/clientId/:clientId', reportHandlers_1.getReportsByClientId);
    server.get('/id/:id', reportHandlers_1.getReportById);
    server.delete('/delete/:id', reportHandlers_1.deleteReport);
    done();
};
exports.default = reportRoutes;
