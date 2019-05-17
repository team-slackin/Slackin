module.exports = {
  async getSubChannels(req, res) {
    const { channel_id } = req.params
    const db = req.app.get("db")
    let subChannels = await db.get_subChannels(channel_id)
    res.status(200).send(subChannels)
  }
}
