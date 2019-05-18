module.exports = {
    async grabFriends(req, res) {
      const db = req.app.get("db")
      const { user_id } = req.session.user;
      let usersFriends = await db.get_user_friends(user_id)
      console.log(`line 6 from friends.js`, usersFriends)
      res.status(200).send(usersFriends)
    }
  }
  