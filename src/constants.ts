export enum ReactDiagramMetaTypes {
  META_NODE = 'meta-node-type',
  META_LINK = 'meta-link-type',
}

export enum PortTypes {
  INPUT_PORT = 'InputPort',
  OUTPUT_PORT = 'OutputPort',
  PARAMETER_PORT = 'ParameterPort',
}

export enum CallbackTypes {
  NODE_RESIZED = 'nodeResized',
  OPTIONS_UPDATED = 'nodeUpdated',
  POSITION_CHANGED = 'positionChanged',
  SELECTION_CHANGED = 'selectionChanged',
  CHILD_POSITION_CHANGED = 'childPositionChanged',
}

export enum EventTypes {
  POST_UPDATE = 'postUpdate',
  PRE_UPDATE = 'preUpdate',
}

export enum CanvasDropTypes {
  CANVAS_NODE = 'canvas-node',
}

export enum CanvasClassTypes {
  CANVAS_WIDGET = '.canvas-widget',
  CANVAS_CUSTOM_WIDGET = '.canvas-CustomLinkWidget',
  PRIMARY_NODE = '.primary-node',
  REACT_DRAGGABLE = '.react-draggable',
  NODES = '.nodes',
}

export enum DefaultSidebarNodeTypes {
  PANNING = 'panning',
  SELECT = 'select',
}

export enum CursorTypes {
  MOVE = 'move',
  DEFAULT = 'default',
  TEXT = 'text',
}
