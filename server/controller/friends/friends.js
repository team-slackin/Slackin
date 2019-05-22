module.exports = {
    async grabFriends(req, res) {
      const db = req.app.get("db")
      const { user_id } = req.session.user;
      let usersFriends = await db.get_user_friends(user_id)
      res.status(200).send(usersFriends)
    },
    async roomCreated(req, res) {
      const db = req.app.get('db');
      const currentUserId = req.session.user.user_id;
      const {user_id} = req.body;

      await db.update_user_friends(currentUserId, user_id).then(
        ()=> {
          res.status(200);
        }
      ).catch(
        ()=> {
          console.log(err);
          res.status(500);
      });
    }
  };
  