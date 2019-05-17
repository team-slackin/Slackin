const bcrypt = require("bcryptjs")

// Need to make all sql statements for this and test

module.exports = {
  async register(req, res) {
    const {
      email,
      password,
      user_display_name,
      first_name,
      last_name
    } = req.body
    const db = req.app.get("db")
    const accountArr = await db.find_user_by_email(email)

    if (accountArr[0]) {
      return res.status(200).send({ message: "You are already registered" })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const newAccArr = await db.create_user(
      email,
      hash,
      first_name,
      last_name,
      user_display_name
    )

    req.session.user = newAccArr[0]

    res
      .status(200)
      .send({ message: "Logged In", user: req.session.user, loggedIn: true })
  },

  async login(req, res) {
    const { email, password } = req.body
    const db = req.app.get("db")
    const accountArr = await db.find_user_by_email_login([email])

    if (!accountArr[0]) {
      return res
        .status(200)
        .send({ message: "Account does not exist. Please Register." })
    }

    const result = bcrypt.compareSync(password, accountArr[0].hash)

    if (!result) {
      return res.status(200).send({ message: "Incorrect password" })
    }

    req.session.user = {
      user_id: accountArr[0].user_id,
      email: accountArr[0].email,
      first_name: accountArr[0].first_name,
      last_name: accountArr[0].last_name,
      user_display_name: accountArr[0].user_display_name,
      user_image: accountArr[0].user_image,
      user_status: accountArr[0].user_status
    }

    res
      .status(200)
      .send({ message: "Logged In", user: req.session.user, loggedIn: true })
  },
  async updateUserInfo(req, res){
    let { id: user_id, username, password: newPassword } = req.body;
    let db = req.app.get('db')
    
    if (username){
      db.update_user_display_name([user_id, username]);
    }
    
    if (newPassword){
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(newPassword, salt)
      db.update_user_password([user_id, hash])
    }

    const updatedUserInfo = await db.retrieve_user_info(user_id)
    req.session.user = {
      user_id: updatedUserInfo[0].user_id,
      email: updatedUserInfo[0].email,
      first_name: updatedUserInfo[0].first_name,
      last_name: updatedUserInfo[0].last_name,
      user_display_name: updatedUserInfo[0].user_display_name,
      user_image: updatedUserInfo[0].user_image,
      user_status: updatedUserInfo[0].user_status
    }
    return res.status(200).send({ message: "user info was updated", user: req.session.user, loggedIn: true })
  },
  setUserStatus: (req, res)=>{
    let { status:user_status } = req.body;
    let { user_id } = req.session.user;
    let db = req.app.get('db');
    db.update_user_status([user_id, user_status])
    return res.status(200).send({ message:`the users status is now ${user_status}` })
  },
  logout(req, res) {
    req.session.destroy()
    return res.status(200).send({ message: "you have successfully logged out" })
  }
}
