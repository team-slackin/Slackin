require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');

const {SERVER_PORT, CONNECTION_STRING} = process.env;
const app = express();

const users = require('./controller/users/users');
const channel = require('./controller/channels/channels');
const authenticate = require('./controller/authenticate/authenticate');

app.use(express.json());
// app.use(express.static(`${__dirname}/../build`)); Uncomment when hosting

massive(CONNECTION_STRING).then(db=>{
  app.set('db', db);
  db.listTables();
  app.listen(SERVER_PORT, ()=> {console.log(`[Server up and running on port ${SERVER_PORT}]`)} );
});

// app.use(
//   session({
//     //Someone do this because i believe i do this wrong - carter
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 3 //3 days
//     }
//   })
// );

//register and login


//authenticator
app.use(authenticate.auth);

//rest of functions

