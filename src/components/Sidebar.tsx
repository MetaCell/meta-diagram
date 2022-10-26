import React from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import vars from './assets/styles/variables';
import { Divider, List, ListItemButton, ListItemIcon } from '@mui/material';
import Node from './assets/svg/node.svg';
import {
  FileIcon,
  HandIcon,
  MoveToolIcon,
  ShapeArrowToolIcon,
} from './assets/icons';

const { dividerColor } = vars;

const useStyles = makeStyles(() => ({
  node: {
    '& .MuiDivider-root': {
      borderColor: dividerColor,
      width: 'calc(100% - 1.5rem)',
      margin: '0 auto',
      border: 'none',
      borderTop: '0.0625rem solid',
    },
  },
}));

type sidebarItemProps = {
  icon: React.ReactNode;
  name: string;
  selection: string;
};

const Sidebar = () => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState('1');
  const svgImg = (img: string) =>
    `data:image/svg+xml;base64,${new Buffer(img).toString('base64')}`;
  const SidebarItem = (props: sidebarItemProps) => {
    const { icon, selection } = props;
    return (
      <ListItemButton
        selected={selected === selection}
        onClick={() => setSelected(selection)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
      </ListItemButton>
    );
  };

  return (
    <>
      <Box className="sidebar">
        <List disablePadding component="nav">
          <SidebarItem icon={<MoveToolIcon />} name="cursor" selection="1" />
          <SidebarItem icon={<HandIcon />} name="move" selection="2" />
        </List>

        <Box className={classes.node}>
          <Divider />

          <ListItemButton
            selected={selected === '3'}
            onClick={() => setSelected('3')}
            sx={{
              height: 127,
              borderRadius: '0 0.5rem 0.5rem 0 !important',
              width: '2.75rem',
              margin: '0.25rem 0 !important',
            }}
          >
            <ListItemIcon>
              {<img src={svgImg(Node)} alt="Nodes" />}
            </ListItemIcon>
          </ListItemButton>

          <Divider />
        </Box>

        <List disablePadding component="nav">
          <SidebarItem
            icon={<ShapeArrowToolIcon />}
            name="draw"
            selection="4"
          />
          <SidebarItem icon={<FileIcon />} name="fullscreen" selection="5" />
        </List>
      </Box>
    </>
  );
};

export default Sidebar;
