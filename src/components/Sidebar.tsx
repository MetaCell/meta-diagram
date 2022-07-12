import React from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import vars from "./assets/styles/variables";
import { Divider, List, ListItemButton, ListItemIcon } from '@mui/material';
import Move from './assets/svg/move.svg';
import Icon from './assets/svg/icon.svg';
import Node from './assets/svg/node.svg';
import Cursor from './assets/svg/cursor.svg';
import Fullscreen from './assets/svg/fullscreen.svg';

const { textWhite, dividerColor } = vars;

const useStyles = makeStyles(() => ({
  root: {
    zIndex: '5',
    width: '4rem',
    background: textWhite,
    boxShadow: '0 0 3.75rem rgba(0, 0, 0, 0.1), 0 0.5rem 2.5rem -0.625rem rgba(0, 0, 0, 0.1)',
    borderRadius: '2rem',
    position: 'fixed',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',

    '&.right': {
      left: 'auto',
      right: '1rem',
    },

    '& .MuiList-root': {
      padding: '0.75rem',
    },
  },

  node: {
    margin: '0.25rem 0',
    '& .MuiDivider-root': {
      borderColor: dividerColor,
      width: 'calc(100% - 1.5rem)',
      margin: '0 auto',
      border: 'none',
      borderTop: '0.0625rem solid'
    },

    '& img': {
      display: 'block',
      margin: '1rem 0',
    },
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <Box className={`${classes.root} left`}>
      <List disablePadding component="nav">
        <ListItemButton selected>
          <ListItemIcon>
            <img src={`data:image/svg+xml;base64,${new Buffer(Cursor).toString('base64')}`} alt="icon" />
          </ListItemIcon>
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <img src={`data:image/svg+xml;base64,${new Buffer(Move).toString('base64')}`} alt="move" />
          </ListItemIcon>
        </ListItemButton>
      </List>

      <Box className={classes.node}>
        <Divider />
        <img src={`data:image/svg+xml;base64,${new Buffer(Node).toString('base64')}`} alt="node" />
        <Divider />
      </Box>

      <List disablePadding component="nav">
        <ListItemButton disabled>
          <ListItemIcon>
            <img src={`data:image/svg+xml;base64,${new Buffer(Icon).toString('base64')}`} alt="icon" />
          </ListItemIcon>
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <img src={`data:image/svg+xml;base64,${new Buffer(Fullscreen).toString('base64')}`} alt="fullscreen" />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </Box>
  )
};

export default Sidebar;