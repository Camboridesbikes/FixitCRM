"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const noteHandlers_1 = require("../../controllers/handlers/noteHandlers");
const noteRoutes = (server, opts, done) => {
    server.put('/update', noteHandlers_1.updateNotes);
    server.get('/id/:clientId', noteHandlers_1.getNotesByClientId);
    done();
};
exports.default = noteRoutes;
