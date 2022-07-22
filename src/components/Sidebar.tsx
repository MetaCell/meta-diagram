import React from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import vars from './assets/styles/variables';
import { Divider, List, ListItemButton, ListItemIcon } from '@mui/material';
import Move from './assets/svg/move.svg';
import MoveActive from './assets/svg/move-active.svg';
import Icon from './assets/svg/icon.svg';
import IconActive from './assets/svg/icon-active.svg';
import Node from './assets/svg/node.svg';
import Cursor from './assets/svg/cursor.svg';
import CursorActive from './assets/svg/cursor-active.svg';
import Fullscreen from './assets/svg/fullscreen.svg';
import FullscreenActive from './assets/svg/fullscreen-active.svg';

const { dividerColor } = vars;

const useStyles = makeStyles(() => ({
  node: {
    margin: '0.25rem 0',
    '& .MuiDivider-root': {
      borderColor: dividerColor,
      width: 'calc(100% - 1.5rem)',
      margin: '0 auto',
      border: 'none',
      borderTop: '0.0625rem solid',
    },

    '& img': {
      display: 'block',
      margin: '1rem 0',
    },
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState("1");

  return (
    <Box className="sidebar">
      <List disablePadding component="nav">
        <ListItemButton selected={selected === "1"} onClick={() => setSelected("1")}>
          <ListItemIcon>
            {selected === "1" ? <img
              src={`data:image/svg+xml;base64,${new Buffer(CursorActive).toString(
                'base64'
              )}`}
              alt="icon"
            /> : <img
              src={`data:image/svg+xml;base64,${new Buffer(Cursor).toString(
                'base64'
              )}`}
              alt="icon"
            />}
          </ListItemIcon>
        </ListItemButton>

        <ListItemButton selected={selected === "2"} onClick={() => setSelected("2")}>
          <ListItemIcon>
            {selected === "2" ? <img
              src={`data:image/svg+xml;base64,${new Buffer(MoveActive).toString(
                'base64'
              )}`}
              alt="move"
            /> : <img
              src={`data:image/svg+xml;base64,${new Buffer(Move).toString(
                'base64'
              )}`}
              alt="move"
            />}

          </ListItemIcon>
        </ListItemButton>
      </List>

      <Box className={classes.node}>
        <Divider />
        <img
          src={`data:image/svg+xml;base64,${new Buffer(Node).toString(
            'base64'
          )}`}
          alt="node"
        />
        <Divider />
      </Box>

      <List disablePadding component="nav">
        <ListItemButton selected={selected === "3"} onClick={() => setSelected("3")}>
          <ListItemIcon>
            {selected === "3" ? <img
              src={`data:image/svg+xml;base64,${new Buffer(IconActive).toString(
                'base64'
              )}`}
              alt="icon"
            /> : <img
              src={`data:image/svg+xml;base64,${new Buffer(Icon).toString(
                'base64'
              )}`}
              alt="icon"
            />}
          </ListItemIcon>
        </ListItemButton>

        <ListItemButton selected={selected === "4"} onClick={() => setSelected("4")}>
          <ListItemIcon>
            {selected === "4" ? <img
              src={`data:image/svg+xml;base64,${new Buffer(FullscreenActive).toString(
                'base64'
              )}`}
              alt="fullscreen"
            /> : <img
              src={`data:image/svg+xml;base64,${new Buffer(Fullscreen).toString(
                'base64'
              )}`}
              alt="fullscreen"
            />}
          </ListItemIcon>
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
