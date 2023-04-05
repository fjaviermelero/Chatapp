import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import PeopleIcon from "@mui/icons-material/People";

export default function UserList(props) {
  const [currentUsersOfRoom, setCurrentUsersOfRoom] = useState([]);
  const [privateChatRequested, setPrivateChatRequested] = useState(false);
  const [userSendingPrivateChatRequest, setUserSendingPrivateChatRequest] =
    useState("");
  const [open, setOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState("false");

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screenWidth]);

  let socket = props.socket;

  let userName = props.userName;

  function handleClick(userNameToSpeakWith) {
    socket.emit("requirePrivateChat", userNameToSpeakWith);
  }

  function rejectPrivateChatRequest() {
    setPrivateChatRequested(false);
    setUserSendingPrivateChatRequest("");
  }

  function acceptPrivateChatRequest() {
    socket.emit("acceptPrivateChat", userSendingPrivateChatRequest);
    setPrivateChatRequested(false);
    setUserSendingPrivateChatRequest("");
  }

  useEffect(() => {
    if (socket) {
      socket.on("usersUpdated", (currentUsersOfRoom) => {
        setCurrentUsersOfRoom(currentUsersOfRoom);
      });
    }
  });

  useEffect(() => {
    if (socket) {
      socket.on("privateChatRequest", (userSendingPrivateChatRequest) => {
        setPrivateChatRequested(true);
        setUserSendingPrivateChatRequest(userSendingPrivateChatRequest);
      });
    }
  });

  return (
    <div>
      {privateChatRequested ? (
        <div>
          <Alert variant="filled" severity="info">
            {userSendingPrivateChatRequest} wants to start a private chat
            <br />
            <br />
            <Button
              onClick={() => acceptPrivateChatRequest()}
              variant="contained"
              color="success"
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => rejectPrivateChatRequest()}
            >
              Reject
            </Button>
          </Alert>
        </div>
      ) : null}

      {isMobile ? (
        <div>
          <IconButton aria-label="menu" onClick={() => setOpen(!open)}>
            <PeopleIcon />
          </IconButton>

          <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {currentUsersOfRoom.map((value) => (
                <ListItem key={value} disableGutters>
                  <ListItemText primary={value} />

                  {value !== userName ? (
                    <IconButton
                      aria-label="comment"
                      onClick={() => handleClick(value)}
                    >
                      <ChatIcon />
                    </IconButton>
                  ) : null}
                </ListItem>
              ))}
            </List>
          </Drawer>
        </div>
      ) : (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {currentUsersOfRoom.map((value) => (
            <ListItem key={value} disableGutters>
              <ListItemText primary={value} />

              {value !== userName ? (
                <IconButton
                  aria-label="comment"
                  onClick={() => handleClick(value)}
                >
                  <ChatIcon />
                </IconButton>
              ) : null}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
