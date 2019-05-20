module.exports = {
  async getChannels(req, res) {
    const db = req.app.get("db")
    const { id } = req.params
    let userChannels = await db.get_user_channels(id)
    res.status(200).send(userChannels)
  },
    async grabUsersFromChannel(req, res) {
    const db = req.app.get("db")
    const { channel_id } = req.params
    let usersFromChannel = await db.get_users_from_channel(channel_id)
    res.status(200).send(usersFromChannel)
  }
}
