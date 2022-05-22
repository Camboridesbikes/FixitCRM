"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bicycleHandlers_1 = require("../../controllers/handlers/bicycleHandlers");
const bicycleRoutes = (server, opts, done) => {
    server.post('/add', bicycleHandlers_1.addBicycle);
    server.get('/all', bicycleHandlers_1.getAllBicycles);
    server.get('/id/:id', bicycleHandlers_1.getBicycleByID);
    server.get('/clentId/:clientId', bicycleHandlers_1.getBicycleByClientId);
    server.get('/reportId/:reportId', bicycleHandlers_1.getBicycleByReportId);
    server.delete('/delete/:id', bicycleHandlers_1.deleteBicycle);
    done();
};
exports.default = bicycleRoutes;
