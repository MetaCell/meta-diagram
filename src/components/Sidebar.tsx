import React, { cloneElement, useState } from 'react';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import vars from './assets/styles/variables';
import {
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import { subBarStyle } from '../theme';
import { CanvasDropTypes } from '../constants';
import { DropTargetMonitor, useDrag } from 'react-dnd';
import { CanvasEngine } from '@projectstorm/react-canvas-core';

const { dividerColor } = vars;

const useStyles = makeStyles(() => ({
  node: {
    marginBottom: '0.5rem',
    '& .MuiDivider-root': {
      borderColor: dividerColor,
      width: '100%',
      margin: '0 auto',
      border: 'none',
      borderTop: '0.0625rem solid',
    },
  },
}));
export interface INode {
  id: string;
  icon: React.ReactElement;
  name: string;
  type: string;
  draggable: boolean;
  // do something before the default behaviour is triggered.
  preCallback?: (event: any, node: unknown) => void;

  // do something AFTER the default behaviour is triggered.
  postCallback?: (event: any, node: unknown) => void;

  // overrides default behaviour if triggered. omitted prop model: {}
  defaultCallback?: (event: any, node: unknown) => void;

  // overrides default behaviour if triggered. omitted prop model: {}
  onNodeDrop?: (
    monitor: DropTargetMonitor,
    node: unknown,
    engine?: CanvasEngine
  ) => void;

  // style object adds or override default styling.
  css?: React.CSSProperties;
  children?: INode[];
}
export interface ISidebarNodeProps extends INode {
  divider?: boolean;
}

type SidebarItemProps = {
  node: INode | ISidebarNodeProps;
  selected?: boolean;
  updateSelected?: (id: string) => void;
};

export interface ISidebarProps {
  selectedBarNode?: string;
  sidebarNodes?: ISidebarNodeProps[];
  updateSelectedBar?: (id: string) => void;
}

// handle item click callback
const handleItemClick = (
  event: unknown,
  node: INode | ISidebarNodeProps,
  updateSelected?: (id: string) => void
) => {
  const { id, draggable, preCallback, postCallback, defaultCallback } = node;
  // if item is un-draggable click event fires only
  if (!draggable) {
    if (!!updateSelected) updateSelected(id);

    // execute pre & post-callback when no overriding default-callback
    if (!!preCallback && !defaultCallback) preCallback(event, node);
    if (!!postCallback && !defaultCallback) postCallback(event, node);

    // call default - callback if exists
    if (!!defaultCallback) defaultCallback(event, node);
  }
};

// image based icon function
// const svgImg = (img: string) =>
//   `data:image/svg+xml;base64,${new Buffer(img).toString('base64')}`;

const SidebarItem = ({ node, selected, updateSelected }: SidebarItemProps) => {
  const [{}, dragRef, dragPreview] = useDrag(
    () => ({
      type: CanvasDropTypes.CANVAS_NODE,
      item: node,
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.9 : 1,
      }),
    }),
    [node]
  );
  const classes = useStyles();
  const { id, icon, divider, css, draggable } = node as ISidebarNodeProps;

  if (!!divider) {
    return (
      <Box className={classes.node} key={id}>
        <Divider />

        <ListItemButton
          selected={selected}
          onClick={event => {
            handleItemClick(event, node, updateSelected);
          }}
          sx={css}
        >
          <ListItemIcon>{icon}</ListItemIcon>
        </ListItemButton>

        <Divider />
      </Box>
    );
  }
  return (
    <ListItemButton
      selected={selected}
      key={id}
      onClick={event => {
        handleItemClick(event, node, updateSelected);
      }}
      ref={dragPreview}
      sx={{
        transform: 'translate(0,0)',
        '&.Mui-selected:hover': {
          backgroundColor: draggable ? 'none' : 'unset',
        },
      }}
    >
      <ListItemIcon ref={draggable ? dragRef : null}>{icon}</ListItemIcon>
    </ListItemButton>
  );
};

const SubSidebarItem = ({
  node,
  selected,
  updateSelected,
}: SidebarItemProps) => {
  const [{}, dragRef, dragPreview] = useDrag(
    () => ({
      type: CanvasDropTypes.CANVAS_NODE,
      item: node,
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.9 : 1,
      }),
    }),
    [node]
  );
  const { icon, name, id, draggable } = node;

  const iconColor = selected ? '#fff' : 'rgba(26, 26, 26, 0.6)';

  return (
    <Tooltip id={id} title={name} placement="right" arrow>
      <ListItemButton
        selected={selected}
        onClick={event => {
          handleItemClick(event, node, updateSelected);
        }}
        ref={dragPreview}
        sx={subBarStyle}
      >
        <ListItemIcon ref={draggable ? dragRef : null}>
          {cloneElement(icon, { color: iconColor })}
        </ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
};

const SubSiderBar = ({
  nodes,
  show = false,
}: {
  show?: boolean;
  nodes?: INode[];
}) => {
  const [selected, setSelected] = useState<string | undefined>();

  if (!!nodes && !!show) {
    return (
      <>
        <Box className="sub-sidebar">
          <Collapse orientation="horizontal" in={show}>
            <List disablePadding component="nav">
              {nodes.map(node => (
                <>
                  <SubSidebarItem
                    key={node.id}
                    {...{ node }}
                    selected={selected === node.id}
                    updateSelected={id => setSelected(id)}
                  />
                  {/* // TODO: fix nested sub-sidebar reference:
                  https://github.com/MetaCell/meta-diagram/issues/41 */}
                  {/* {node.children?.length && (
                    <SubSiderBar
                      key={`sub-sidebar-${node.id}`}
                      nodes={node.children}
                      show={selected === node.id}
                    />
                  )} */}
                </>
              ))}
            </List>
          </Collapse>
        </Box>
      </>
    );
  }

  return null;
};

const Sidebar = ({ sidebarNodes }: ISidebarProps) => {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <>
      {Array.isArray(sidebarNodes) && (
        <Box className="sidebar">
          <List component="nav" disablePadding>
            {sidebarNodes.map(node => {
              const isSelected = selected === node.id;

              return (
                <>
                  <SidebarItem
                    key={node.id}
                    {...{ node }}
                    selected={isSelected}
                    updateSelected={id => setSelected(id)}
                  />
                  {Array.isArray(node.children) && (
                    <SubSiderBar
                      key={`sub-sidebar-${node.id}`}
                      nodes={node.children}
                      show={isSelected}
                    />
                  )}
                </>
              );
            })}
          </List>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
