import React, {useState} from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
//forgot to import react-drop zone will do that now
import {v4 as randomString} from 'uuid';
//will aslo import this as well
import { connect } from 'react-redux';
import { uploadUserImageToDb } from './../../Ducks/userReducer'
import { uploadChannelImageToDb } from './../../Ducks/channelReducer'
import {Button} from '@material-ui/core';

function Drop(props) {
  const {type, channel_id} = props;//THESE NEED TO EXIST
  const _onDrop = async(file) => {
    file = file[0]; //the files in drop zone can have multiple uploaded so it hapens to be [{},{},....] like that <--  so were grabbing the first one

    const returnData = await grabS3urls(file);//the returnData from server.js getAws()
    const {signedRequest, url} = returnData;
    const options = {headers: {'Content-Type': file.type}};

    await axios.put(signedRequest, file, options)
    .then(uploadToDb(url))
    .catch(err=>console.log(err));
  };

  const grabS3urls = async(file) => {
    const replaceFileName = `${file.name.replace(/\s/g,'-')}`;//changes the file name for us so that we do not have conflicting file names
    const fileName = `${randomString()}-${replaceFileName}`//above
    const fileType = file.type;

    const returnData = await axios.post(`/api/amazon`, {fileName, fileType})
    .then(res=>res.data)
    .catch(err=>console.log(err));
    //goes to the amazon.js file that we set up earlier 
    //and runs everything for us

    return returnData;
  };

  const uploadToDb = async(url) => {
    //was going to send an object called body, but since for this we only need the url to the image/file uploaded ill just put it in an object.

                                                                //type is either user or channel and the channel_id is added as an option but not needed.
    if (channel_id && type == 'channel' ){
      props.uploadChannelImageToDb(type, url, channel_id)
    } else if (type == 'user') {
    props.uploadUserImageToDb(type, url) }
    //this will go to a function on our server which will update our database with the url
    //i do not know what that will look like so i am ending it here.
  };

  return (
    <div>
      <Dropzone onDropAccepted={_onDrop} multiple={false}>
      {
        ({getRootProps, getInputProps})=>(
          <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Button>Click me to add image file</Button>
          </div>
        )}
      </Dropzone>

    </div>
  );
};

const mapStateToProps = (reduxState) => ({
  channelReducer: reduxState.channelReducer,
  userReducer: reduxState.userReducer
})

export default connect(mapStateToProps, { uploadUserImageToDb, uploadChannelImageToDb })(Drop);