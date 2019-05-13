module.exports = {
  async getChannels(req, res) {
    console.log("HIT");
    const db = req.app.get("db");
    const { id } = req.params;
    let userChannels = await db.get_user_channels(id);
    console.log(`line 6`, userChannels);
    res.status(200).send(userChannels);
  }
};
