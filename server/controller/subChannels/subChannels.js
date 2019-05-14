module.exports = {
  async getSubChannels(req, res) {
    const { channel_id } = req.params
    const db = req.app.get("db")
    console.log('HERRRROOOOOO DIS SERVER',req.params)

    let subChannels = await db.get_subChannels(channel_id)
    console.log(subChannels)
    res.status(200).send(subChannels)
  }
}
