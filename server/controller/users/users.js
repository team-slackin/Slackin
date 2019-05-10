const bcrypt = require('bcryptjs');

// Need to make all sql statements for this and test

module.exports = {
   async register(req, res){
       const { email, password, user_display_name, first_name, last_name } = req.body
       const db = req.app.get('db')
       console.log(email, 'afhasldf;sadjopfadsadfodsfas')
       const accountArr = await db.find_user_by_email(email)

      if(accountArr[0]){
         return res.status(200).send({message: 'You are already registered'})
      }

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(password, salt)
      
      const newAccArr = await db.create_user(email, hash, first_name, last_name, user_display_name)

      req.session.user = newAccArr[0];

      res.status(200).send({message: 'Logged In', user: req.session.user, loggedIn: true})
    },

    async login(req,res){
      const {email, password} = req.body
      console.log(email, password)
      const db = req.app.get('db')
      const accountArr = await db.find_user_by_email_login([email])
  
      if(!accountArr[0]){
        return res.status(200).send({message: 'Account does not exist. Please Register.'})
      }

      const result = bcrypt.compareSync(password, accountArr[0].hash)

      if(!result){
        return res.status(200).send({message: 'Incorrect password'})
      }

      req.session.user = {
        email: accountArr[0].email,
        first_name: accountArr[0].first_name,
        last_name: accountArr[0].last_name,
        user_display_name: accountArr[0].user_display_name,
        user_image: accountArr[0].user_image,
        user_status: accountArr[0].user_status
      };

      res.status(200).send({message: 'Logged In', user: req.session.user, loggedIn: true})

    },

    logout(req,res){
      req.session.destroy()
      res.redirect('https://localhost:3000/#/')
    }


};