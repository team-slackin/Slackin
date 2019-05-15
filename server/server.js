require("dotenv").config()
const massive = require("massive")
const express = require("express")
const session = require("express-session")
const socketCtrl = require("./controller/SocketCtrl/socketCtrl")

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const app = express()

//SOCKET.IO
const server = require("http").Server(app)
const io = require("socket.io")(server)

const users = require("./controller/users/users")
const channel = require("./controller/channels/channels")
const authenticate = require("./controller/authenticate/authenticate")
const subChannels = require("./controller/subChannels/subChannels")

app.use(express.json())
// app.use(express.static(`${__dirname}/../build`)); Uncomment when hosting

massive(CONNECTION_STRING).then(db => {
  app.set("db", db)
  console.log(db.listTables())
  server.listen(SERVER_PORT, () => {
    console.log(`[Server up and running on port ${SERVER_PORT}, you may now try for requests]`)
  })
})

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false, //creates a session no matter what which uses memory which = bad
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3 //3 days
    }
  })
)

io.on("connection", socket => {
  const db = app.get("db")

  socket.on("text", async message => {
    await socketCtrl.addDummy(db, message)
    let messages = await socketCtrl.getDummy(db)
    io.emit("getMessages", messages)
  })

  socket.on("getMessages", async () => {
    let messages = await socketCtrl.getDummy(db)
    io.emit("getMessages", messages)
  })
})

//register and login
app.post("/api/register", users.register);
app.post("/api/login", users.login);
app.post(`/api/logout`, users.logout);
app.post('/api/databasre/amazon-url/user', amazon.uploadFileToDbForUser);
app.post('/api/database/amazon-url/channel', amazon.uploadFileToDbForChannel);

//rest of functions

// channel endpoints
app.get(`/api/channels/:id`, channel.getChannels)

//subchannel endpoints
app.get(`/api/subchannels/:channel_id`, subChannels.getSubChannels)

// functions in account page
app.put(`/api/updateuserinfo`, users.updateUserInfo)
