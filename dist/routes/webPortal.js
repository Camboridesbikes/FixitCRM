"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reportHandlers_1 = require("../controllers/handlers/reportHandlers");
const webPortalRoutes = (server, opts, done) => {
    server.get('/report/:reportHash', reportHandlers_1.serveReportHTML);
    done();
};
exports.default = webPortalRoutes;
