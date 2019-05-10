const bcrypt = require('bcryptjs');

// Need to make all sql statements for this and test

module.exports = {
   async register(req, res){
       const { email, password, user_display_name, first_name, last_name } = req.body
       const db = req.app.get('db')
       const accountArr = await db.find_account_by_email([email])

      if(accountArr[0]){
         return res.status(200).send({message: 'You are already registered'})
      }

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      

      const newAccArr = await db.create_account([email, hash, first_name, last_name, user_display_name ])

      const { email, first_name, last_name, user_display_name, user_image, user_status } = newAccArr[0]

      req.session.user = {email, first_name, last_name, user_display_name, user_image, user_status}

      res.status(200).send({message: 'Logged In', userData: req.session.user, loggedIn: true})
    },

    async login(req,res){
      const {email, password} = req.body
      const db = req.app.get('db')
      const accountArr = await db.find_account_by_email([email])

      if(!accountArr[0]){
        return res.status(200).send({message: 'Account does not exist. Please Register.'})
      }

      const result = bcrypt.compareSync(password, accountArr[0].hash)

      if(!result){
        return res.status(200).send({message: 'Incorrect password'})
      }

      const { email, first_name, last_name, user_display_name, user_image, user_status } = accountArr[0]

      req.session.user = {email, first_name, last_name, user_display_name, user_image, user_status}

      res.status(200).send({message: 'Logged In', userData: req.session.user, loggedIn: true})

    },

    logout(req,res){
      req.session.destroy()
      res.redirect('https://localhost:3000/#/')
    }


};