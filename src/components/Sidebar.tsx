import React, { cloneElement } from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import vars from './assets/styles/variables';
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import Node from './assets/svg/node.svg';
import {
  ControlIcon,
  FileIcon,
  HandIcon,
  IntegratorIcon,
  LearningIcon,
  ModulatoryIcon,
  MoveToolIcon,
  ProcessingIcon,
  ShapeArrowToolIcon,
  TargetIcon,
  TransferIcon,
} from './assets/icons';
import { subBarStyle } from '../theme';

const { dividerColor } = vars;

const subBarData = [
  {
    name: 'Target',
    icon: <TargetIcon />,
  },
  {
    name: 'Transfer',
    icon: <TransferIcon />,
  },
  {
    name: 'Processing',
    icon: <ProcessingIcon />,
  },
  {
    name: 'Integrator',
    icon: <IntegratorIcon />,
  },
  {
    name: 'Modulatory',
    icon: <ModulatoryIcon />,
  },
  {
    name: 'Learning',
    icon: <LearningIcon />,
  },
  {
    name: 'Control',
    icon: <ControlIcon />,
  },
];

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

type subSidebarItemProps = {
  icon: React.ReactElement;
  name: string;
  selected: boolean;
  updateSelected?: (name: string) => void;
};

const Sidebar = () => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState('1');
  const [subSelected, setSubSelected] = React.useState('Target');
  const svgImg = (img: string) =>
    `data:image/svg+xml;base64,${new Buffer(img).toString('base64')}`;
  const SidebarItem = (props: sidebarItemProps) => {
    const { icon, selection } = props;
    return (
      <ListItemButton
        selected={selected === selection}
        onClick={() => {
          setSelected(selection);
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
      </ListItemButton>
    );
  };

  const SubSidebarItem = (props: subSidebarItemProps) => {
    const { icon, selected, name, updateSelected } = props;

    const iconColor = selected ? '#fff' : 'rgba(26, 26, 26, 0.6)';

    return (
      <ListItemButton
        selected={selected}
        onClick={() => {
          if (!!updateSelected) updateSelected(name);
        }}
        sx={subBarStyle}
      >
        <ListItemIcon>{cloneElement(icon, { color: iconColor })}</ListItemIcon>
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
              height: 128,
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
      {selected === '3' && (
        <Box className="sub-sidebar">
          <Collapse orientation="horizontal" in={selected === '3'}>
            <List disablePadding component="nav">
              {subBarData.map(({ name, icon }) => (
                <SubSidebarItem
                  key={name}
                  name={name}
                  icon={icon}
                  selected={subSelected === name}
                  updateSelected={name => setSubSelected(name)}
                />
              ))}
            </List>
          </Collapse>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
