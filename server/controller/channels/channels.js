module.exports = {
  async getChannels(req, res) {
    const db = req.app.get("db");
    const { id } = req.params;
    let userChannels = await db.get_user_channels(id).catch(err=>console.log(err));
    res.status(200).send(userChannels);
  },
  async grabChannelsWithQuery(req, res) {
    const db = req.app.get("db");
    const { search } = req.query;
    const { user_id } = req.body;
    let usersChannelsWithQuery = await db.get_user_channels_with_query([
      user_id,
      search
    ]);
    if (!usersChannelsWithQuery[0]) {
      let allUsersChannels = await db.get_user_channels(user_id);
      return res.status(200).send(allUsersChannels);
    }
    return res.status(200).send(usersChannelsWithQuery);
  },
  async grabUsersFromChannel(req, res) {
    const db = req.app.get("db");
    const { channel_id } = req.params;
    let usersFromChannel = await db.get_users_from_channel(channel_id);

    res.status(200).send(usersFromChannel);
  },
  createChannel: async(req, res) => {  
  const db = req.app.get('db');
  const { channelName, channelIsPrivate } = req.body;
  const { user_id } = req.session.user;
  let ourNewChannel = await db.create_channel([user_id, channelName, channelIsPrivate])
  let updatedListOfChannels = await db.add_user_to_channel([user_id, ourNewChannel[0].channel_id])
    .catch(err=>console.log(err));;
  res.status(200).send(updatedListOfChannels);
  },
  addUserToChannel: async(req, res) => {
    const db = req.app.get('db');
    const { user_id, channel_id } = req.body;
    let checkIfUserIsInChannel = await db.check_user_in_channel([user_id, channel_id]).catch(err=>console.log(err))

    if (checkIfUserIsInChannel[0]){
      let usersFromChannel = await db.get_users_from_channel(channel_id)
        .catch(err=>console.log(err))

      return res.status(200).send({ message:'user already in channel', usersInChannel: usersFromChannel});
    }
    let updatedUsersInChannel = await db.add_user_to_channel_two([user_id, channel_id]).catch(err=>console.log(err))

    return res.status(200).send({ message:'updated list of users in the channel has been sent', usersInChannel: updatedUsersInChannel })
  }
};
