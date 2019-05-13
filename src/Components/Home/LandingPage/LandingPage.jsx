import React, { useState, useEffect } from "react";
import { Link, Switch } from "react-router-dom";
import io from "socket.io-client";

function LandingPage() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const socket = io("http://localhost:3838");

  useEffect(() => {
    start()
    console.log('USE EFFECT')
  },[])
    
function start(){
  console.log('START')
  socket.emit('getMessages', () => {
    socket.on('getMessages', (messages) => {
      setMessages([...messages]);
    })
  })
}

  socket.on("getMessages", function(messages) {
      console.log("SOCKET RESPONSE", messages);
      setMessages([...messages]);
      console.log("STATE", messages);
    });
 

  function handleInput(e) {
    e.preventDefault();
    setText(e.target.value);
    console.log(text);
  }

  async function testSocket() {
    await socket.emit("text", {
      inputText: text
    });
  }

  return (
    <div>
      {/* Where you go When you start up the application/afterlogging in */}
      <h1>LandingPage</h1>
      {messages.map(message => (
        <p>{message.messages}</p>
      ))}
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
    </div>
  );
}

export default LandingPage;
