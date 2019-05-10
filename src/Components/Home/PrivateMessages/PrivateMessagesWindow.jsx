import React, {useState} from 'react';
import PrivateMessageConstructor from './PrivateMessagesConstructor';

function PrivateMessagesWindow() {
  const {privateMessagesArray, setPrivateMessageArray} = useState([
    {
      friend_messages_id: 0,
      friends_id: 1,
      user_id: 0,
      date_posted: 0,
      message: 'test message'
    }//each one of these will be a row
  ]);
  //privateMessageArray will hold an array of objects from friends_messages in our db.
  //try and only grab the first 25-50 at a time for performance?

  return (
    <div>{/* Displays the actual messeges from the user and their friend */}
      {privateMessagesArray.map(message=>{
        <span key={`MessageKey:${message.date_posted}`}>{message.message}</span>
      })}
    </div>
  );
};

export default PrivateMessagesWindow;