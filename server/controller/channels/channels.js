module.exports = {
  async getChannels(req, res) {
    const db = req.app.get("db")
    const { id } = req.params
    let userChannels = await db.get_user_channels(id)
    res.status(200).send(userChannels)
  }
}
