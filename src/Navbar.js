import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useState, useEffect } from "react";

export default function NavBar(props) {
  const socket = props.socket;

  const userName = props.userName;

  const [roomName, setRoomName] = useState("");

  function handleClick(roomName) {
    props.updateRoomName(roomName);

    let roomNameAndUserName = {
      roomName: roomName,
      userName: userName,
    };
    socket.emit("joinRoom", roomNameAndUserName);
  }

  useEffect(() => {
    if (socket) {
      socket.on("roomNameUpdated", (newRoomName) => {
        setRoomName(newRoomName);
      });
    }
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button variant="contained" {...bindTrigger(popupState)}>
                  <MenuIcon />
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={() => {
                      handleClick("General");
                      popupState.close();
                    }}
                  >
                    General
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClick("Languages");
                      popupState.close();
                    }}
                  >
                    Languages
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClick("Travel");
                      popupState.close();
                    }}
                  >
                    Travel
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleClick("Technology");
                      popupState.close();
                    }}
                  >
                    Technology
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleClick("Dates");
                      popupState.close();
                    }}
                  >
                    Dates
                  </MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, m: 2 }}>
            {roomName}
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1, m: 2 }}>
            {userName}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
