import React, { useState} from "react";
import { Link} from "react-router-dom";
import io from "socket.io-client";
import { connect } from "react-redux";

import MainChannelNav from "../../MainChannelNav/MainChannelNav";
import SubChannelNav from "../../SubChannelsNav/SubChannelNav";
import SubPrivateNav from '../../SubPrivateNav/SubPrivateNav';
import UserToolbar from './../../UserToolbar/UserToolbar';

function Container(props) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socket = io("http://localhost:3838");

  // useEffect(() => {
  //   start()
  // }, [])

  // function start() {
  //   socket.emit("getMessages", () => {
  //     socket.on("getMessages", messages => {
  //       setMessages([...messages])
  //     })
  //   })
  // }

  // socket.on("getMessages", function(messages) {
  //   setMessages([...messages])
  // })

  // function handleInput(e) {
  //   e.preventDefault()
  //   setText(e.target.value)
  // }

  // async function testSocket() {
  //   await socket.emit("text", {
  //     inputText: text
  //   })
  // }

  return (
    <>
       
        <MainChannelNav />

        <section className="sub-nav">
          {props.currentChannel ? 
            (<SubChannelNav channel_id={props.currentChannel} />) 
            : <SubPrivateNav />
            }
        </section>

      <Link to="/account">Go to Account Settings</Link>
      <Link to="/">To Home Page Temp</Link>
    </>
  )
}

const mapStateToProps = reduxState => reduxState.channelReducer;

export default connect(mapStateToProps, {/* No functions to import */})(Container);
