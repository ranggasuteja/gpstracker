var express = require('express');

var app = express();

//ngasih tau aplikasi bahwa kita pakai port 3000 dan berhasil berjalan
var server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
   });

//ngasih tau projek pakai file static/ga berubah2
app.use(express.static(__dirname));

//bikin database
var mongoose = require('mongoose');

//url database
var dbUrl= 'mongodb+srv://root:qweasd@sampurasun.fsols.mongodb.net/sampurasun';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }), (err) => { 
    console.log('mongodb connected',err)
 }

var Message = mongoose.model('Message',{ name : String, message : String})

//body parser
 var bodyParser = require('body-parser')
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: false}))

// Routing = 
// get route
app.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })

//post route
app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
      io.emit('message', req.body);
      res.sendStatus(200);
    })
  })

//trouble hanya bisa muncul pesan ketika di refresh, solusi dengan socket .io
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', () =>{
    console.log('a user is connected')
   })


mongoose.connect(dbUrl ,{useMongoClient : true} ,(err) => {
    console.log('mongodb connected',err);
  })
  
var server = http.listen(3001, () => {
    console.log('server is running on port', server.address().port);
  });