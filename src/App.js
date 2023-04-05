import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import NavBar from "./Navbar";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import UserList from "./UserList";
import JoinForm from "./JoinForm";
import Footer from "./Footer";

console.log("Connected to server");

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const [socket, setSocket] = useState(null);

  const [roomName, setRoomName] = useState("");

  const [userName, setUserName] = useState("");

  function updateRoomName(roomName) {
    setRoomName(roomName);
    console.log("roomName updated in parent " + roomName);
  }

  function updateUserName(userName) {
    setUserName(userName);
    console.log("userName updated in parent: " + userName);
  }

  function updateLogStatus(logStatus) {
    setIsLogged(logStatus);
  }

  useEffect(() => {

    //const newSocket = io.connect("http://localhost:4000");

    const newSocket = io.connect("https://chatapp-backend-n6qm.onrender.com");
    

    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
      {isLogged ? (
        <div>
          <NavBar
            socket={socket}
            roomName={roomName}
            updateRoomName={updateRoomName}
            userName={userName}
          />

          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <UserList
                  socket={socket}
                  userName={userName}
                  updateRoomName={updateRoomName}
                />
              </div>

              <div class="col-md-8">
                <MessageList socket={socket} userName={userName} />
                <ChatInput
                  socket={socket}
                  roomName={roomName}
                  userName={userName}
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <JoinForm
            updateUserName={updateUserName}
            updateLogStatus={updateLogStatus}
          />

          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
