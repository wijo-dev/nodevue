const express = require('express');
const app = express(),
      testJson = require('./test/test.json');

const util = require('util');

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