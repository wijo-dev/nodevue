var express = require('express');
var router = express.Router();
var pool = require('./db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  // pool.query('SELECT * FROM test', (err, result) => {
  //   if (err) {
  //     return console.error('Error executing query', err.stack)
  //   }
  //   res.json({result: result.rows[2]});
  // })


  pool.connect((err, client, done) => {
    const shouldAbort = err => {
      if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', err => {
          if (err) {
            console.error('Error rolling back client', err.stack)
          }
          // release the client back to the pool
          done()
        })
      }
      return !!err
    }
    client.query('BEGIN', err => {
      if (shouldAbort(err)) return
      const queryText = 'select * from test'
      client.query(queryText, (err, result) => {
        if (shouldAbort(err)) return
        client.query(queryText, (err, result) => {
          if (shouldAbort(err)) return
          res.json({result: result.rows[2]});
          client.query('COMMIT', err => {
            if (err) {
              console.error('Error committing transaction', err.stack)
            }
            done()
          })
        })
      })
    })
  })
  
});

module.exports = router;
