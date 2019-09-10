const util = require('util');
const utils = require('../utils/utils');
const pool = require('../utils/pool');

// let map = utils.makeMap('name', 'hong');
// util.log('map>>>>>>>>>', map.get('name'));

// const pool = new Pool();
conn = pool();
conn.query('SELECT NOW() as aa', (err, res) => {
    console.log(err, res.rows[0])
    conn.end()
  })

return;
let str = "Node123jnjldsdkfldwfkljw31lk";

let enc = utils.encrypt(str); 
util.log(enc);
let dec = utils.decrypt(enc);
util.log(dec);
let sha = utils.encryptSha2(str);
util.log(sha);
return;

let url = "https://google.com";
utils.ogsinfo(url, (err, result) => {
    util.log(result);
});