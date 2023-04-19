import React, {
  cloneElement,
  useState,
  Fragment,
  useEffect, //MouseEvent
} from 'react';
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
import { CanvasDropTypes, DefaultSidebarNodeTypes } from '../constants';
import { DropTargetMonitor, useDrag } from 'react-dnd';
import { CanvasEngine } from '@projectstorm/react-canvas-core';
import { DefaultDiagramState } from '@projectstorm/react-diagrams';

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

interface IPanningActions {
  enableDrag?: () => void;
  disableDrag?: () => void;
}
interface SidebarItemProps extends IPanningActions {
  node: INode | ISidebarNodeProps;
  selected?: boolean;
  updateSelected?: (id: string) => void;
}

export interface ISubSidebarItemProps {
  node: INode | ISidebarNodeProps;
  selected?: boolean;
  updateSelected?: (id: string) => void;
}
export interface ISidebarProps {
  selectedBarNode?: string;
  sidebarNodes?: ISidebarNodeProps[];
  updateSelectedBar?: (id: string) => void;
  engine: CanvasEngine;
}

interface IHandleClick extends IPanningActions {
  event: unknown;
  node: INode | ISidebarNodeProps;
  updateSelected?: (id: string) => void;
}

interface ISubSidebar {
  show?: boolean;
  nodes?: INode[];
}

// handle item click callback
const handleItemClick = ({
  event,
  node,
  updateSelected,
  enableDrag,
  disableDrag,
}: IHandleClick) => {
  const { id, draggable, preCallback, postCallback, defaultCallback } = node;
  // if item is un-draggable click event fires only
  if (!draggable) {
    if (!!updateSelected) updateSelected(id);

    // execute drag actions
    if (id.startsWith(DefaultSidebarNodeTypes.PANNING) && enableDrag)
      enableDrag();
    if (!id.startsWith(DefaultSidebarNodeTypes.PANNING) && disableDrag)
      disableDrag();

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

const SidebarItem = ({
  node,
  selected,
  enableDrag,
  disableDrag,
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
  const classes = useStyles();
  const { id, icon, divider, css, draggable } = node as ISidebarNodeProps;

  if (!!divider) {
    return (
      <Box className={classes.node} key={id}>
        <Divider />

        <ListItemButton
          selected={selected}
          onClick={event => {
            handleItemClick({
              event,
              node,
              updateSelected,
              enableDrag,
              disableDrag,
            });
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
        handleItemClick({
          event,
          node,
          updateSelected,
          enableDrag,
          disableDrag,
        });
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
}: ISubSidebarItemProps) => {
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
          handleItemClick({
            event,
            node,
            updateSelected,
          });
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

const SubSiderBar = ({ nodes, show = false }: ISubSidebar) => {
  const [selected, setSelected] = useState<string | undefined>();

  if (!!nodes && !!show) {
    return (
      <>
        <Box className="sub-sidebar">
          <Collapse orientation="horizontal" in={show}>
            <List disablePadding component="nav">
              {nodes.map(node => (
                <Fragment key={node.id}>
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
                </Fragment>
              ))}
            </List>
          </Collapse>
        </Box>
      </>
    );
  }

  return null;
};

const Sidebar = ({
  engine,
  sidebarNodes,
  updateSelectedBar,
}: ISidebarProps) => {
  const [selected, setSelected] = React.useState<string | null>(null);

  const state = engine
    .getStateMachine()
    .getCurrentState() as DefaultDiagramState;

  const enableDrag = () => {
    if (!state.dragCanvas.config.allowDrag) {
      state.dragCanvas.config.allowDrag = true;
    }
  };

  const disableDrag = () => {
    if (state.dragCanvas.config.allowDrag) {
      state.dragCanvas.config.allowDrag = false;
    }
  };

  const updateSelected = (id: string) => {
    setSelected(id);
    if (updateSelectedBar) updateSelectedBar(id);
  };

  useEffect(() => {
    disableDrag();
  }, []);

  return (
    <>
      {Array.isArray(sidebarNodes) && (
        <Box className="sidebar">
          <List component="nav" disablePadding>
            {sidebarNodes.map(node => {
              const isSelected = selected === node.id;

              return (
                <Fragment key={node.id}>
                  <SidebarItem
                    key={node.id}
                    {...{ node }}
                    selected={isSelected}
                    updateSelected={updateSelected}
                    enableDrag={enableDrag}
                    disableDrag={disableDrag}
                  />
                  {Array.isArray(node.children) && (
                    <SubSiderBar
                      key={`sub-sidebar-${node.id}`}
                      nodes={node.children}
                      show={isSelected}
                    />
                  )}
                </Fragment>
              );
            })}
          </List>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
