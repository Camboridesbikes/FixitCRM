import { addBicycle, deleteBicycle, getAllBicycles, getBicycleByClientId, getBicycleByID, getBicycleByReportId } from '../../controllers/handlers/bicycleHandlers';

const bicycleRoutes = (server, opts, done) => {
    
    server.post('/add', addBicycle)
    
    server.get('/all', getAllBicycles)
    server.get('/id/:id', getBicycleByID)
    server.get('/clentId/:clientId', getBicycleByClientId)
    server.get('/reportId/:reportId', getBicycleByReportId)

    server.delete('/delete/:id', deleteBicycle)

    done();
}

export default bicycleRoutes;