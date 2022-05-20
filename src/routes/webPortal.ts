import { serveReportHTML } from "../controllers/handlers/reportHandlers";

const webPortalRoutes = (server, opts, done) => {

    server.get('/report/:reportHash', serveReportHTML);

    done();
}

export default webPortalRoutes