import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import {
  CanvasWidget as Canvas,
  CanvasEngine,
} from '@projectstorm/react-canvas-core';
import React, { useCallback } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { CanvasDropTypes } from '../constants';
import vars from './assets/styles/variables';
import { INode, ISidebarNodeProps } from '../types/sidebar';

const useStyles = makeStyles(_ => ({
  container: {
    height: '100%',
    width: '100%',
  },
  canvasContainer: {
    height: '100%',
    width: '100%',
    background: '#fffff',
  },
}));

const { canvasBg } = vars;

interface ICanvasWidgetProps {
  engine: CanvasEngine;
  className?: string;
}

export const CanvasWidget = ({
  engine,
  className,
  ...props
}: ICanvasWidgetProps) => {
  const classes = useStyles();

  const onDrop = useCallback(
    async (node: INode | ISidebarNodeProps, monitor: DropTargetMonitor) => {
      if (!node) return;

      if (!!node.onNodeDrop) node?.onNodeDrop(monitor, node, engine);
    },
    []
  );

  // can drop custom hook
  const [{}, dropRef] = useDrop({
    accept: CanvasDropTypes.CANVAS_NODE,
    // canDrop: () => true,
    drop: onDrop,
    // drop: onDrop,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  let backgroundColor = canvasBg;

  return (
    <Box
      ref={dropRef}
      style={{ backgroundColor }}
      className={classes.canvasContainer}
    >
      <Canvas
        className={`canvas-widget ${className}`}
        engine={engine}
        {...props}
      />
    </Box>
  );
};
