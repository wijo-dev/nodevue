const fs = require('fs');
const util = require('util');

fs.readFile(__dirname+'\\test.json', 'utf-8', function(err, data) {
    if(err) return util.log(err);

    util.log('data11>> ', data);
});

util.log('===========================')

let data2 = fs.readFileSync(__dirname+'\\test.json', 'utf-8');

util.log('date22>> ', data2);
util.log('===========================')