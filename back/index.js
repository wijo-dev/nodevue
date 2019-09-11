const express = require('express');
const app = express(),
      testJson = require('./test/test.json');
const util = require('util');
const movies = require('./utils/movies.json');
var bodyParser = require('body-parser');
const elastic = require('elasticsearch');
const client = new elastic.Client({
    host: '34.97.28.140:9200'
});

const multer = require('multer');
var upload = multer({ dest: 'public'});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage});

var fs = require('fs');

app.use(express.json())
app.use(express.static('public'));
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);


app.get('/', (req, res) => {
    
    // res.send("Hello ?Node JS !! ");
    res.render('index', {name: '홍길동'});
});

app.get('/api/elastic', (req, rest) => {
    // res.send("Hello ?Node JS !! ");
    client.search({
        index: 'board',
        body: {
            "sort": [
                {
                  "reg_date": {
                    "order": "asc"
                  }
                }
              ],
              "query": {
                "match_all": {}
              }
        }
    }, function(err, res) {
        console.log(res.hits);
        rest.send(res.hits.hits);
    });
    console.log('파일 업로드1');
    
    // res.render('index', {name: '홍길동'});
});

app.get('/api/movies', (req, res) => {
    console.log('파일 업로드1');
    res.send(movies);
    // res.render('index', {name: '홍길동'});
});

app.post('/file', upload.single('upload'), (req, res) => {
    console.log('================================');
    console.log(req.file);
    // console.log(req);
    var obj = {
            "uploaded": true,
            "url": "/bigbit.png"
    };
    console.log('ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ');
    console.log(JSON.stringify(obj));
    // console.log('file upload');
    res.json(obj);
});

app.post('/uploadBoard', (req, res) => {
    // res.send("Hello ?Node JS !! ");
    console.log(req.body.userId);
    console.log(req.body.title);
    console.log(req.body.data);
    res.send("HEllO world!!");
});

app.get('/test/:email', (req, res) => {
    testJson.email = req.params.email;
    testJson.aaa = req.query.aaa;
    res.json(testJson);
});

app.get('/dbtest/:user', (req, res) => {
    let user = req.params.user;
    let mydb = new Mydb(pool);
    mydb.excute(conn => {
        conn.query('SELECT NOW() as aa', (err, res) => {
            console.log(err);
            res.json(res);
        })
    });
});

const server = app.listen(3000, function() {
    console.log('Express server start!!');
});

const io = require('socket.io').listen(server, {
    log:false,
    origins: '*:*',
    pingInterval: 3000,
    pingTimeout: 5000
});

io.sockets.on('connection', (socket, opt) => {
    socket.emit('message', {msg: 'Welcome ' + socket.id});

    util.log('connection>>', socket.id, socket.handshake.query);

    socket.on('join', function(roomId,userid, fn) {
        socket.join(roomId, function() {
            socket.userid = userid;
            util.log('Join>> ', roomId, Object.keys(socket.rooms));
            if(fn) {
                fn();
            }
        });
    });

    socket.on('leave', function(roomId, fn) {
        socket.leave(roomId, function() {
            if(fn) {
                fn();
            }
        });
    });

    socket.on('rooms', function(fn) {
        if(fn) {
            fn(Object.keys(socket.rooms));
        }
    });

    // data: {room: 'roomid;, msg: `msg`}
    socket.on('message', (data, fn) => {
        util.log('message>> ', data.msg, Object.keys(socket.rooms));
        if(fn) {
            fn(data.msg);
        }
        socket.broadcast.to(data.room).emit('message', {room: data.room, msg: data.msg});
    });

    socket.on('disconnecting', function(data) {
        util.log("disconnecting>>", socket.id);
    });
});