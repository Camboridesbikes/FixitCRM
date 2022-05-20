import db from '../../databaseConnection/databaseConnection'

export const addClient = async (req, res) =>{
try {      
    const {name, email, phone} = req.body;
    const timeStamp = new Date();

    db.transaction(async trx => {
        
        const clientId = await db('clients')
        .insert({
            client_name: name,
            email: email,
            phone_number: phone,
            created: timeStamp
        },
        'client_id')
        .onConflict(db.raw('(email) where email'))
        .ignore()

        const data = await db('notes')
            .insert({
               client_id: clientId,
               last_updated: timeStamp 
            })

            
        res.code(200).send(data);
    })
        
} catch (error) {
    res.status(400);
    console.log('error: ' + error);
}
}

export const getAllClients = async (req, res) => {
    try {
        await db.select()
        .from('clients')
        .timeout(10000, {cancel: true}) 
        .then((data) => res.send(data))
        
    } catch (error) {
        res.status(400);
        console.log('error: ' + error);
    }
}

export const getClientsByName = async (req,res) =>{
    try {
        const {clientName} = req.params
        const data = await db.select()
            .from('clients')
            .whereILike('client_name', `%${clientName.replaceAll('%', '\\%')}%`)
            .timeout(10000, {cancel: true})
        await res.code(200).send(data)

    } catch (error) {
        res.status(400);
        console.log('error: ' + error);
    }
 }

 export const getClientById = async (req, res) => {
    try {
        const {id} = req.prams;
        const data = await db.select()
            .from('clients')
            .where({
                client_id: `${id}`
            })
            .timeout(5000, {cancel: true})
        
            await res.send(data);
    } catch (error) {
        res.status(400);
        console.log('error: ' + error);
    }
 }

 export const deleteClient = async (req, res) => {
    try {
        const {id} = req.params;

        const data = await db('clients')
            .where('client_id', id)
            .returning('*')
            .del()
        
        res.code(200).send(data)

    } catch (error) {
        res.status(400);
        console.log('error: ' + error);
    }
 }