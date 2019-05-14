import React, { useState, useEffect } from "react"
import { Link, Switch } from "react-router-dom"
import io from "socket.io-client"
import MainChannelNav from "../../MainChannelNav/MainChannelNav"
import { connect } from "react-redux"
import SubChannelNav from "../../SubChannelsNav/SubChannelNav"

function LandingPage(props) {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const socket = io("http://localhost:3838")

  useEffect(() => {
    start()
  }, [])

  function start() {
    socket.emit("getMessages", () => {
      socket.on("getMessages", messages => {
        setMessages([...messages])
      })
    })
  }

  socket.on("getMessages", function(messages) {
    setMessages([...messages])
  })

  function handleInput(e) {
    e.preventDefault()
    setText(e.target.value)
  }

  async function testSocket() {
    await socket.emit("text", {
      inputText: text
    })
  }

  return (
    <>
      <div>
        {/* Where you go When you start up the application/afterlogging in */}
        <h1>LandingPage</h1>
        {/* {messages.map(message => (
        <p>{message.messages}</p>
      ))} */}
        <MainChannelNav />
        <form>
          <input
            type="text"
            value={text}
            onChange={e => handleInput(e)}
            placeholder="some crap"
          />
          <button onClick={() => testSocket()}>Submit</button>
        </form>

        <Link to="/account">Go to Account Settings</Link>
        <Link to="/">To Home Page Temp</Link>
      </div>
      {props.currentChannel ? (
        <div>
          <SubChannelNav channel_id={props.channel_id} />{" "}
        </div>
      ) : null}
    </>
  )
}

const mapStateToProps = reduxState => reduxState.channelReducer

export default connect(
  mapStateToProps,
  {}
)(LandingPage)
