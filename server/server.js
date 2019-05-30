require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");
const amazon = require("./controller/amazon/amazon");
const friends = require('./controller/friends/friends');
const path = require('path'); // Usually moved to the start of file

const {
  SERVER_PORT,
  CONNECTION_STRING,
  SESSION_SECRET,
  CHATKIT_INSTANCE_LOCATOR,
  CHATKIT_SECRET_KEY
} = process.env;

const app = express();

//CHATKIT
const Chatkit = require("@pusher/chatkit-server");
const cors = require("cors");
const bodyParser = require("body-parser");


const server = require("http").Server(app);
const users = require("./controller/users/users");
const channel = require("./controller/channels/channels");
const subChannels = require("./controller/subChannels/subChannels");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(`${__dirname}/../build`)); Uncomment when hosting


app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});


massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  server.listen(SERVER_PORT, () => {
    console.log(
      `[Server up and running on port ${SERVER_PORT}, you may now try for requests]`
    );
  });
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false, //creates a session no matter what which uses memory which = bad
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3 //3 days
    }
  })
);




// CODE BELOW PREVENTS USER FROM LOGGING OUT WHEN REFRESHING -LOUIE
app.get(`/retrievesession/`, (req, res)=>{
  return res.status(200).send(req.session.user);
})
// CODE ABOVE PREVENTS USER FROM LOGGING OUT WHEN REFRESHING -LOUIE




const chatkit = new Chatkit.default({
  instanceLocator: CHATKIT_INSTANCE_LOCATOR,
  key: CHATKIT_SECRET_KEY
});

//Chatkit endpoints

app.post("/chatkit/users", (req, res) => {
  //Check once working if can use session instead of passing along body info
  //When username is sent along it will be the logged in username + id
  const { user_display_name } = req.body;
  chatkit
    .createUser({
      id: user_display_name,
      name: user_display_name
    })
    .then(() => console.log('user created successfully'))
    .catch(err => console.log('Bad juju, no user made',err));
});

app.post("/chatkit/authenticate", (req, res) => {
  const { grant_type } = req.body;
  const authData = chatkit.authenticate({
    grant_type,
    userId: req.query.user_id
  });
  res.status(authData.status).send(authData.body);
});


app.post('/chatkit/createroom/friends', (req, res)=> {
  const {user_display_name, friend_id} = req.body;
  console.log('actual user', req.session.user.user_display_name, 'added friend',user_display_name)
  chatkit.createRoom({
    creatorId: `slackin`,//current user
    userIds: [`kamalu`],//friend 
    name: `friends room`,
    isPrivate: true
  }).then(
    async (res)=>{
      const db = req.app.get("db");
      db.set_friend_chatkit([res.id, res.name, res.private, friend_id, req.session.user.user_id, user_display_name, req.session.user.user_display_name]);
      console.log('created friends room successfully')
    }
  ).catch(err=>console.log(err));
});

app.post("/chatkit/createroom", (req, res) => {
  const {roomName, roomStatus, channel_id} = req.body;

  chatkit
    .createRoom({
      creatorId: `${req.session.user.user_display_name}`,
      name: roomName,
      isPrivate: roomStatus
    })
    .then(res => {
      const db = req.app.get("db");
      db.set_subchannel_info([channel_id, res.name, res.id, res.private]);
      console.log("Room created successfully");
    })
    .catch(err => {
      console.log(err);
    });
});

//register and login
app.post("/api/register", users.register);
app.post("/api/login", users.login);
app.post(`/api/logout`, users.logout);
app.post("/api/database/amazon-url/user", amazon.uploadFileToDbForUser);
app.post("/api/database/updatechannel", amazon.uploadFileToDbForChannel);
app.post("/api/database/createchannel", channel.createChannel);
app.post("/api/setuserstatus", users.setUserStatus);

//rest of functions

// channel endpoints
app.get(`/api/channels/:id`, channel.getChannels);
app.get(`/api/grabusersfromchannel/:channel_id`, channel.grabUsersFromChannel);
app.post(`/api/queriedchannels`, channel.grabChannelsWithQuery);
app.post(`/api/addusertochannel`, channel.addUserToChannel)

//subchannel endpoints
app.get(`/api/subchannels/:channel_id`, subChannels.getSubChannels);
app.get('/text-channel-images/', users.grabImages);
// functions in account page
app.put(`/api/updateuserinfo`, users.updateUserInfo);
app.put('/api/friend-room-created', friends.roomCreated);
app.put('/add-friend/:id/:userID', friends.addFriend);
// amazon endpoints
app.post(`/api/amazon`, amazon.getAws);

// friends endpoints
app.get(`/api/grabfriends`, friends.grabFriends)


// grabbing users endpoint
app.get(`/api/graballusers`, users.grabAllUsers)

