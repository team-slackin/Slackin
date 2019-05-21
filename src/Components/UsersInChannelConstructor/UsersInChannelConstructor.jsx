import React, {useState, useEffect} from 'react';

import './UsersInChannelConstructor.scss';

function UsersInChannelConstructor(props) {
  const [currentUserStatusColor, setCurrentUserStatusColor] = useState('#689f38');

  const { user_image, user_display_name, user_status } = props.user;
  useEffect(()=>{
    switch(user_status) {
      case 'online': {
        setCurrentUserStatusColor('#689f38');
        break;
      };
      case 'idle': {
        setCurrentUserStatusColor('yellow');
        break;
      };
      case 'do not disturb': {
        setCurrentUserStatusColor('red');
        break;
      };
      default: {
        setCurrentUserStatusColor('gray');
        break;
      };
    };
  }, []);

    return (
    <div className='users-in-channel'>
      <img 
        src={user_image} 
        alt='pic of each user' 
        className="users-in-channel-image"
      />
      <div 
        className="users-in-channel-status"
        style={{backgroundColor: currentUserStatusColor}}
      >
      </div>
      <h4 style={{
        marginLeft: '5px',
        color: 'white'
      }}>{user_display_name}</h4>
    </div>
  );
};

export default UsersInChannelConstructor;
