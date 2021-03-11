import { knex } from 'knex';

const config = {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '123',
        database: 'my_service_db'
    },
    pool: {
        min: 2,
        max: 10
    }
};

const context = knex(config);

export { context };