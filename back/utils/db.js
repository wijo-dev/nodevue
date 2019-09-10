const Pool = require('pg').Pool

const DB_INFO = {
    user: 'postgres',
    host: '34.97.181.244',
    database: 'bigbiture',
    password: 'dktlqkf5',
    max: 30,
    min: 4,
    port: 5432
}

console.log('여기옴??');

const pool = new Pool(DB_INFO);

console.log('여기옴?? 11');
module.exports = pool;

