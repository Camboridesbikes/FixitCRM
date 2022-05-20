import { getNotesByClientId, updateNotes } from '../../controllers/handlers/noteHandlers';
import db from '../../databaseConnection/databaseConnection'

const noteRoutes = (server, opts, done) => {
    
    server.put('/update', updateNotes)

    server.get('/id/:clientId', getNotesByClientId)

    done();
}

export default noteRoutes;