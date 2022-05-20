import { addClient, deleteClient, getAllClients, getClientById, getClientsByName } from '../../controllers/handlers/clientHandlers'

const clientRoutes = (server, options, done) => {
    //add client
    server.post('/add', addClient)
 
    server.get('/all', getAllClients)
 
    server.get('/name/:clientName', getClientsByName)
 
    server.get('/id/:id', getClientById)

    server.delete('/delete/:id', deleteClient)

 done();
}

export default clientRoutes