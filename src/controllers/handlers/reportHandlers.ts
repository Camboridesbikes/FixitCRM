import * as showdown from 'showdown'
import db from '../../databaseConnection/databaseConnection'

export const addReport = async (req, res) => {
    try {
        const {client_id, bike_id, body } = req.body;
        const timestamp = new Date();
    
        await db('reports')
            .insert({
                client_id: client_id,
                bike_id: bike_id,
                body: body,
                created: timestamp,
                last_updated: timestamp
            }).then(() => {
                res.code(204).send();
            })
    } catch (error) {
        res.status(400)
    }    
}

export const getReportsByClientId = async (req, res) => {
    try {
        const {clientId} = req.params

        const data = await db('reports')
            .select()
            .where('client_id', clientId)
        await res.code(200).send(data)

    } catch (error) {
        res.status(400).send(error)
    }
}

export const getReportById = async (req, res) => {
    try {

        const {id} = req.params;

        const data = await db('reports')
            .select()
            .where('report_id', id)
        res.code(200).send(data);

    } catch (error) {
        res.status(400).send(error)
    }
}

export const deleteReport = async (req, res) => {
    try {
        const {id} = req.params;

        const data = await db('reports')
            .where('report_id', id)
            .returning(['report_id', 'client_id', 'bike_id'])
            .del()
            
            res.code(200).send(data);

    } catch (error) {
        res.status(400).send(error)
    }
}

/**
 * returns a hash code of the report id 
 * @param req 
 * @param res 
 */
export const getReportIdHash = async (req, res) => {
    try {
        /*code body*/
    } catch (error) {
        res.status(400)
    }
}

/**
 * Translates markdown text stored in db into html and serves it to client 
 * 
 * @param req 
 * @param res 
 */
export const serveReportHTML = async (req, res) => {
    try {
        const {reportHash} = req.params;
        const data = await db('reports')
            .select('body')
            .where('report_id', reportHash)
        
        const converter = new showdown.Converter();
        console.log(data[0].body)
        const html = converter.makeHtml(data[0].body);
        console.log(data[0].body)

        res.code(200).send(html);
    } catch (error) {
        res.status(400)
    }
}