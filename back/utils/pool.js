const { Pool, Client } = require('pg')

const DB_INFO = {
    host: '34.97.181.244',
    user: 'postgres', 
    password: 'dktlqkf5',
    database: 'bigbiture',
    port: 5432
};

module.exports = class {
  constructor(dbInfo) {
    dbInfo = dbInfo || DB_INFO;
    this.pool = new Pool(dbInfo);
  }

  connect() {
    return this.pool;
  }
}

// pool.query('SELECT NOW() as aa', (err, res) => {
//   console.log(err, res.rows[0])
//   pool.end()
// })
// const client = new Client(DB_INFO);
// client.connect();
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res.rows[0]);
//   client.end();
// });