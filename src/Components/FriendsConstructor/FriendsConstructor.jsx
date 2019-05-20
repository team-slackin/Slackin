import React, {useState, useEffect} from 'react'

const FriendsConstructor = (props) => {
  const [currentUserStatusColor, setCurrentUserStatusColor] = useState('#689f38')

  useEffect(()=>{
    const {user_status} = props.friend;
    console.log(props.friend)
    switch(user_status) {
      case 'online': {
        setCurrentUserStatusColor('#689f38');
        break;
      };
      case 'idle': {
        setCurrentUserStatusColor('white');
        break;
      };
      case 'do not disturb': {
        setCurrentUserStatusColor('red');
        break;
      };
      case 'offline': {
        setCurrentUserStatusColor('gray');
        break;
      };
      default: {
        setCurrentUserStatusColor('gray');
        break;
      };
    };
  }, []);

  return (
    <div className="friends-list-flex-box">
      <img 
        className="friends-list-image"
        src={props.friend.user_image} 
        alt={props.friend.user_display_name} 
      />
      <span>{`${props.friend.user_display_name}`}</span>
      <div className="friend-status">
        <div style={{backgroundColor: `${currentUserStatusColor}`}}></div>
      </div>
    </div>
  );
};

export default FriendsConstructor;