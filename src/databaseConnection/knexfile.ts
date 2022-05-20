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
    }
}
    