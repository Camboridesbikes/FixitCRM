module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            port: 5454,
            user: 'postgres',
            password: 'postgres',
            database: 'postgres'
        }
    }
    ,
    test: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            port: 8000,
            user: 'postgres',
            password: 'postgres',
            database: 'test_db'
        }
    },
    production: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || '127.0.0.1',
            port: process.env.DB_PORT || 5454,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        }
    }
}
    