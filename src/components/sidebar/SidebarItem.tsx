import React, { cloneElement } from 'react';
import { ListItemButton, ListItemIcon, Box, Divider } from '@mui/material';
import { useDrag } from 'react-dnd';
import { makeStyles } from '@mui/styles';

import { ISidebarNodeProps, SidebarItemProps } from '../../types/sidebar';
import { CanvasDropTypes } from '../../constants';
import { subBarStyle } from '../../theme';
import handleItemClick from './utils';
import vars from '../assets/styles/variables';

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

export const SidebarItem = ({
  node,
  selected,
  handleSelection,
}: SidebarItemProps) => {
  const [, dragRef, dragPreview] = useDrag(
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
  const iconColor = selected ? '#fff' : '#1A1A1A';

  // Define common click handler
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    handleItemClick({
      event,
      node,
      handleSelection,
    });
  };

  if (!!divider) {
    return (
      <Box className={classes.node} key={id}>
        <Divider />
        <ListItemButton selected={selected} onClick={handleClick} sx={css}>
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
      onClick={handleClick}
      ref={dragPreview}
      sx={subBarStyle}
    >
      <ListItemIcon ref={draggable ? dragRef : null}>
        {cloneElement(icon, { color: iconColor })}
      </ListItemIcon>
    </ListItemButton>
  );
};

export default SidebarItem;
