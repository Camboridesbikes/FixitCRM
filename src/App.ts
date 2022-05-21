import * as fs from "fs";
import * as path from "path";

import fastify from 'fastify';
import fastifyStatic from '@fastify/static';


const build = async () => {
/**
 * These interfaces are not currently in use. Move them to a types folder at 
 * some point to use for db access
 */
// declare module 'knex/types/tables' {
    interface Client {
        id: number;
        name: string;
        phone: number;
        email: string;
        created: Date;
    }

    interface ClientNotes{
        client_id: number;
        text: string;
        last_updated: Date;
    }

    interface Report{
        id: number;
        client_id: number;
        bikeId: number;
        text: string;
        created: Date;
        last_update: Date;

    }

    interface BikeTable{
        bike_id: number;
        client_id: number;
        make: string;
        model: string;
        color: string;
        serial_number: string;

    }
// }



const server = fastify();
server.register(fastifyStatic, {
    root: path.join(__dirname, '../public')
})

//allow react-router to catch the routes I'm not expressly registering on the server
server.setNotFoundHandler(async (req, res) => {
    await res.code(200)
        .type('text/html')
        .sendFile('index.html')
})

server.register(async openRoutes => {
    openRoutes.get('/logo', async (req, res) => {

        await res.code(200)
            .type('image/svg+xml')
            .sendFile(__dirname, `../public/Images/logo.svg`)
    })

    openRoutes.register(require('./routes/webPortal'), {prefix: '/web-portal'})

    openRoutes.register(require('./routes/api/clients'), {prefix: '/api/clients'});
    openRoutes.register(require('./routes/api/bicycles'), {prefix: '/api/bicycles'});
    openRoutes.register(require('./routes/api/reports'), {prefix: '/api/reports'});
    openRoutes.register(require('./routes/api/notes'), {prefix: '/api/notes'});
    
})


return server

}

export default build;
