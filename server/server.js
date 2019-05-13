require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const socketCtrl = require('./controller/SocketCtrl/socketCtrl')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const app = express();


//SOCKET.IO 
const server = require('http').Server(app);
const io = require('socket.io')(server);

const users = require('./controller/users/users');
const channel = require('./controller/channels/channels');
const authenticate = require('./controller/authenticate/authenticate');

app.use(express.json());
// app.use(express.static(`${__dirname}/../build`)); Uncomment when hosting

massive(CONNECTION_STRING).then(db=>{
  app.set('db', db);
  console.log(db.listTables());
  server.listen(SERVER_PORT, ()=> {console.log(`[Server up and running on port ${SERVER_PORT}]`)} );
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,//creates a session no matter what which uses memory which = bad
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3 //3 days
    }
  })
);

io.on('connection',(socket) => {

const db = app.get('db')

  socket.on('text', async (message) => {
    await socketCtrl.addDummy(db,message)
    console.log(message)
    let messages = await socketCtrl.getDummy(db)
    io.emit('getMessages', messages)
  });

  socket.on('getMessages', async () => {
    let messages = await socketCtrl.getDummy(db)
    io.emit('getMessages', messages)
  })





});

//register and login
app.post("/api/register", users.register)
app.post('/api/login', users.login)
app.get('/api/logout', users.logout)

//rest of functions

