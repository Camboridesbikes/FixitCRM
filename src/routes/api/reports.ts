import { addReport, deleteReport, getReportById, getReportsByClientId } from "../../controllers/handlers/reportHandlers";

 const reportRoutes = (server, options, done) => {

    server.post('/add', addReport);

    server.get('/clientId/:clientId', getReportsByClientId)
    server.get('/id/:id', getReportById)
    
    server.delete('/delete/:id', deleteReport)

    done();
 }

 export default reportRoutes;
 