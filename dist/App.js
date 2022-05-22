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
const path = __importStar(require("path"));
const fastify_1 = __importDefault(require("fastify"));
const static_1 = __importDefault(require("@fastify/static"));
const build = () => __awaiter(void 0, void 0, void 0, function* () {
    // }
    const server = (0, fastify_1.default)();
    server.register(static_1.default, {
        root: path.join(__dirname, '../public')
    });
    //allow react-router to catch the routes I'm not expressly registering on the server
    server.setNotFoundHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield res.code(200)
            .type('text/html')
            .sendFile('index.html');
    }));
    server.register((openRoutes) => __awaiter(void 0, void 0, void 0, function* () {
        openRoutes.get('/logo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            yield res.code(200)
                .type('image/svg+xml')
                .sendFile(__dirname, `../public/Images/logo.svg`);
        }));
        openRoutes.register(require('./routes/webPortal'), { prefix: '/web-portal' });
        openRoutes.register(require('./routes/api/clients'), { prefix: '/api/clients' });
        openRoutes.register(require('./routes/api/bicycles'), { prefix: '/api/bicycles' });
        openRoutes.register(require('./routes/api/reports'), { prefix: '/api/reports' });
        openRoutes.register(require('./routes/api/notes'), { prefix: '/api/notes' });
    }));
    return server;
});
exports.default = build;
