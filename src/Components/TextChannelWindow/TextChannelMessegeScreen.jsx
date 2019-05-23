import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {setPrevUser} from '../../Ducks/textChannelReducer';
import './TextChannelWindow.scss';

require('dotenv').config()
function TextChannelMessegeScreen(props) {
  
  useEffect(()=>{
    const plusPlus = props.dontLoadAgain + 1;
    props.setDontLoadAgain(plusPlus);
    props.timeoutLoading();
    // eslint-disable-next-line
  },[]);

  const image = props.userReducer.images.filter(image=> `${image.user_display_name}` === `${props.roomMessage.senderId}`);

  let _image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE8KtKj_zXIxHEt7KjVWuUdjfq_WNbfMf5x3AGaPfkW6iSplZI';//default image

  if (image[0]) {
    _image = image[0].user_image
  };
  
  const time = props.roomMessage.updatedAt.split('').splice(0, 10).join('');

  let objDiv = document.getElementById("jump");
  if (objDiv) {
    objDiv.scrollTop = objDiv.scrollHeight;
  };
  
  return (
    <>
          <section style={{
            margin: '5px',
            marginTop: '10px'
          }}>
          
              <img 
                src={_image} 
                alt=""
                />
              <span
                style={{
                  color: 'white',
                  fontSize: '1.25em',
                  verticalAlign: 'text-top',
                  lineHeight: '.1em'
                }}
                >
                {`${props.roomMessage.senderId}`}
              </span>
              <span
                style={{
                  fontSize: '.5em',
                  verticalAlign: 'text-top',
                  lineHeight: '.1em'
                }}
              >{`${time}`}</span>

            <p>{` ${props.roomMessage.text}`}</p>
            
          </section>
        </>
    );
  // if (+props.textChannelReducer.prevUser === +props.roomMessage.senderId) {
  // } else {
    // props.setPrevUser(props.roomMessage.senderId);
    // return ( 
    //   <>
    //   <div className="main-text-window">{/* Each Individual Messege */}
    //     <div className="main-screen">{`${props.roomMessage.senderId}: ${props.roomMessage.text} ${props.roomMessage.updatedAt}`}</div>
    //   </div>
    //   <div className="text-window-linebreak"></div>
    //   </>
    // );
  // };
};

const mapStateToProps = reduxState => ({
  userReducer: reduxState.userReducer,
  textChannelReducer: reduxState.textChannelReducer,
  channelReducer: reduxState.channelReducer
});

export default connect(mapStateToProps, {setPrevUser})(TextChannelMessegeScreen);
