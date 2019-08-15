const express = require('express');
const app = express(),
      testJson = require('./test/test.json');

app.use(express.static('public'));
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    // res.send("Hello ?Node JS !! ");
    res.render('index', {name: '홍길동'});
});

app.get('/test/:email', (req, res) => {
    testJson.email = req.params.email;
    testJson.aaa = req.query.aaa;
    res.json(testJson);
});

const server = app.listen(3000, function() {
    console.log('Express server start!!');
});