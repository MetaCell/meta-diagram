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

type sidebarItemProps = {
  image: string;
  name: string;
  selectedImage: string;
  selection: string;
};

const Sidebar = () => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState('1');
  const svgImg = (img: string) =>
    `data:image/svg+xml;base64,${new Buffer(img).toString('base64')}`;
  const SidebarItem = (props: sidebarItemProps) => {
    const { image, name, selectedImage, selection } = props;
    return (
      <ListItemButton
        selected={selected === selection}
        onClick={() => setSelected(selection)}
      >
        <ListItemIcon>
          {selected === selection ? (
            <img src={svgImg(image)} alt={name} />
          ) : (
            <img src={svgImg(selectedImage)} alt={name} />
          )}
        </ListItemIcon>
      </ListItemButton>
    );
  };

  return (
    <Box className="sidebar">
      <List disablePadding component="nav">
        <SidebarItem
          image={CursorActive}
          selectedImage={Cursor}
          name="cursor"
          selection="1"
        />
        <SidebarItem
          image={MoveActive}
          selectedImage={Move}
          name="move"
          selection="2"
        />
      </List>

      <Box className={classes.node}>
        <Divider />
        <img src={svgImg(Node)} alt="Node" />
        <Divider />
      </Box>

      <List disablePadding component="nav">
        <SidebarItem
          image={IconActive}
          selectedImage={Icon}
          name="draw"
          selection="3"
        />
        <SidebarItem
          image={FullscreenActive}
          selectedImage={Fullscreen}
          name="fullscreen"
          selection="4"
        />
      </List>
    </Box>
  );
};

export default Sidebar;
