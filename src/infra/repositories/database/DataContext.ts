import { knex } from 'knex';
import 'dotenv/config';

const config = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
    },
    pool: {
        min: 2,
        max: 10
    }
};

const context = knex(config);

export { context };