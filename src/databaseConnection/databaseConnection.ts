import knex from 'knex'

/**
 * Set up database connection with variable configurations dependant 
 * on environment
 */
 const environment = process.env.NODE_ENV || 'development';
 const dbConfig =  require('./knexfile')[environment]; 
 console.log(`db config :\n${JSON.stringify(dbConfig)}`) 

 const db = knex(dbConfig);

 export default db;