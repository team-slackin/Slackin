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
    const { user_id } = req.session.user;
    let usersChannelsWithQuery = await db.get_user_channels_with_query([
      user_id,
      search
    ]);
    if (!usersChannelsWithQuery[0]) {
      let allUsersChannels = await db.get_user_channels(user_id);
      console.log(`line 15 from channels.js`, allUsersChannels);
      return res.status(200).send(allUsersChannels);
    }
    console.log(`line 18 from channels.js`, usersChannelsWithQuery);
    return res.status(200).send(usersChannelsWithQuery);
  },
  async grabUsersFromChannel(req, res) {
    const db = req.app.get("db");
    const { channel_id } = req.params;
    let usersFromChannel = await db.get_users_from_channel(channel_id);
    console.log(usersFromChannel)
    res.status(200).send(usersFromChannel);
  },
  createChannel: async(req, res) => {  
  const db = req.app.get('db');
  const { channelName, channelIsPrivate } = req.body;
  const { user_id } = req.session.user;
  let ourNewChannel = await db.create_channel([user_id, channelName, channelIsPrivate])
  console.log(`line 35 from channels.js`, ourNewChannel)
  let updatedListOfChannels = await db.add_user_to_channel([user_id, ourNewChannel[0].channel_id])
    .catch(err=>console.log(err));;
  console.log(`line 38 from channels.js`, updatedListOfChannels)
  res.status(200).send(updatedListOfChannels);
}
};
