const aws = require('aws-sdk');

const { S3_BUCKET, ACCESS_KEY_ID,  SECRET_KEY, AWS_REGION} = process.env;
//aws access key and secret key are grabbed when we make a IAM user which louie and me made,
//and they are already in...

module.exports = {
  getAws: async(req, res) => {
    aws.config = {
      region: AWS_REGION,
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_KEY
    };
  
    const {fileName, fileType} = req.body;
    //we are grabbing these from the front end with dropzone and i will explain more when we get to them

    //amazon s3 DOES NOT use promise based architecture, so they have a bit of a funky way of doing things.
    //so thats why some of this will look really weird
    const s3 = new aws.S3();
    
    const s3Params = { //this is the settings for our link which amazon will give us to edit our bucket ie: upload files to our bucket link
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,//this says that we have 60s to use our link before it expires
      ContentType: fileType,
      ACL: 'public-read'
    };

    await s3.getSignedUrl('putObject', s3Params, (error, data) => {
      if (error) {
        console.log('amazon s3' + error);
        return res.end(); //if there is an error, console.log the error and end this function/ the servers request to s3
      } else {
        const returnData = {
          signedRequest: data,//this is our url that expires in 60 seconds
          url: `http://${S3_BUCKET}.s3.amazonaws.com/${fileName}`//this is our url that is permanent which we will refer to when grabbing the file in the future
        };
        res.status(200).send(returnData);
      };
    });

    
  },
    uploadFileToDbForUser: async(req, res) => {
      //uploads our user profile picture
      const db = req.app.get('db');
      const { url } = req.body;
      let updatedUserInfo = await db.upload_url_for_user(url, req.session.user.user_id)
      .catch(err=>console.log(err));
    req.session.user = {
        user_id: updatedUserInfo[0].user_id,
        email: updatedUserInfo[0].email,
        first_name: updatedUserInfo[0].first_name,
        last_name: updatedUserInfo[0].last_name,
        user_display_name: updatedUserInfo[0].user_display_name,
        user_image: updatedUserInfo[0].user_image,
        user_status: updatedUserInfo[0].user_status
      }
	  res.status(200).send({ message: 'user info was updated', user: req.session.user, loggedIn: true })
  },
  uploadFileToDbForChannel: async(req, res) => {
    const db = req.app.get('db');
    const { url, channel_id } = req.body;
    const { user_id } = req.session.user;
    console.log(`line 68`, url, channel_id, user_id)
    let updatedUserChannels = await db.upload_url_for_channel([url, channel_id, user_id]).catch(err=>console.log(err))
    console.log(`line 69 from amazon.js`, updatedUserChannels)
    return res.status(200).send(updatedUserChannels)
  }
  

}