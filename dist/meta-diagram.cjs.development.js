'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var createEngine = require('@projectstorm/react-diagrams');
var createEngine__default = _interopDefault(createEngine);
var reactCanvasCore = require('@projectstorm/react-canvas-core');
var styles = require('@mui/styles');
var system = require('@mui/system');
var material = require('@mui/material');
var styles$1 = require('@mui/material/styles');
var CssBaseline = _interopDefault(require('@mui/material/CssBaseline'));

var ReactDiagramMetaTypes;

(function (ReactDiagramMetaTypes) {
  ReactDiagramMetaTypes["META_NODE"] = "meta-node-type";
  ReactDiagramMetaTypes["META_LINK"] = "meta-link-type";
})(ReactDiagramMetaTypes || (ReactDiagramMetaTypes = {}));

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(otherPosition) {
    return new Position(this.x + otherPosition.x, this.y + otherPosition.y);
  }

  sub(otherPosition) {
    return new Position(this.x - otherPosition.x, this.y - otherPosition.y);
  }

}

function getNode(id, nodes) {
  return nodes.find(n => n.getOptions().id === id);
}
function processNodes(metaNodes, callback) {
  const metaNodeModels = [];

  for (const mn of metaNodes) {
    const metaNodeModel = mn.toModel();
    const position = mn.getWorldPosition();
    metaNodeModel.setPosition(position.x, position.y); // @ts-ignore

    metaNodeModel.registerListener({
      positionChanged: event => callback(event)
    });
    metaNodeModels.push(metaNodeModel);
  }

  return metaNodeModels;
}

class MetaNodeModel extends createEngine.NodeModel {
  constructor(options = {}) {
    super({ ...options,
      type: ReactDiagramMetaTypes.META_NODE
    }); // set up an in and out port

    this.addPort(new createEngine.DefaultPortModel({
      in: true,
      name: 'in'
    }));
    this.addPort(new createEngine.DefaultPortModel({
      in: false,
      name: 'out'
    }));
  }

  getLocalPosition(nodes) {
    const worldPosition = new Position(this.getX(), this.getY()); // @ts-ignore

    const parentId = this.options['parentId'];
    const parent = getNode(parentId, nodes);
    return parent ? worldPosition.sub(parent.getLocalPosition(nodes)) : worldPosition;
  }

  updateLocalPosition(nodes) {
    // @ts-ignore
    this.options['position'] = this.getLocalPosition(nodes);
  }

}

class MetaNode {
  constructor(id, name, shape, position, parent, options) {
    this.parent = parent;
    this.position = position;
    this.options = options;
    this.options.set('id', id);
    this.options.set('name', name);
    this.options.set('shape', shape);
  }

  getId() {
    return this.options.get('id');
  }

  getParentId() {
    var _this$parent;

    return (_this$parent = this.parent) == null ? void 0 : _this$parent.getId();
  }

  getWorldPosition() {
    var _this$parent2;

    return this.parent ? this.position.add((_this$parent2 = this.parent) == null ? void 0 : _this$parent2.getWorldPosition()) : this.position;
  }

  toModel() {
    const optionsMap = this.options;
    optionsMap.set('parentId', this.getParentId());
    optionsMap.set('position', this.position);
    return new MetaNodeModel(Object.fromEntries(optionsMap));
  }

}

class MetaLinkModel extends createEngine.DefaultLinkModel {
  constructor(options = {}) {
    super({ ...options,
      type: ReactDiagramMetaTypes.META_LINK
    });
  }

}

class MetaLink {
  constructor(id, name, shape, sourceId, sourcePortId, targetId, targetPortId, options) {
    this.sourceId = sourceId;
    this.sourcePortId = sourcePortId;
    this.targetId = targetId;
    this.targetPortId = targetPortId;
    this.options = options;
    this.options.set('id', id);
    this.options.set('name', name);
    this.options.set('shape', shape);
  }

  getSourceId() {
    return this.sourceId;
  }

  getSourcePortId() {
    return this.sourcePortId;
  }

  getTargetId() {
    return this.targetId;
  }

  getTargetPortId() {
    return this.targetPortId;
  }

  toModel() {
    return new MetaLinkModel(Object.fromEntries(this.options));
  }

}

class ComponentsMap {
  constructor(nodesMap, linksMap) {
    this.nodes = nodesMap;
    this.links = linksMap;
  }

}

const UnknownTypeWidget = () => {
  return React__default.createElement("div", null, "Unknown Type");
};

class MetaNodeFactory extends reactCanvasCore.AbstractReactFactory {
  constructor(componentsMap) {
    super(ReactDiagramMetaTypes.META_NODE);
    this.componentsMap = componentsMap;
  }

  generateModel() {
    return new MetaNodeModel();
  }

  generateReactWidget(event) {
    if (this.componentsMap.has(event.model.options.shape)) {
      const ReactComponentType = this.componentsMap.get(event.model.options.shape);
      return (// @ts-ignore
        React__default.createElement(ReactComponentType, {
          key: `node-factory-${event.model.getOptions().id}`,
          engine: this.engine,
          model: event.model
        })
      );
    } // TODO: Generate default node instead


    return React__default.createElement(UnknownTypeWidget, null);
  }

}

class MetaLinkFactory extends createEngine.DefaultLinkFactory {
  constructor(componentsMap) {
    super(ReactDiagramMetaTypes.META_LINK);
    this.componentsMap = componentsMap;
  }

  generateModel() {
    return new MetaLinkModel();
  }

  generateLinkSegment(model, selected, path) {
    var _model$getOptions;

    // @ts-ignore
    if (this.componentsMap.has((_model$getOptions = model.getOptions()) == null ? void 0 : _model$getOptions.shape)) {
      const ReactComponentType = this.componentsMap.get( // @ts-ignore
      model.getOptions().shape);
      return (// @ts-ignore
        React__default.createElement(ReactComponentType, {
          key: `link-factory-${model.getOptions().id}`,
          engine: this.engine,
          model: model,
          path: path,
          selected: selected
        })
      );
    } // TODO: Generate default link instead


    return React__default.createElement(UnknownTypeWidget, null);
  }

}

function getLinkModel(metaLink, nodes) {
  const link = metaLink.toModel();
  const source = getNode(metaLink.getSourceId(), nodes);
  const target = getNode(metaLink.getTargetId(), nodes);

  if (source && target) {
    link.setSourcePort(source.getPort(metaLink.getSourcePortId()));
    link.setTargetPort(target.getPort(metaLink.getTargetPortId()));
    return link;
  }

  return undefined;
}

const vars = {
  fontFamily: 'Inter, sans-serif',
  primaryBg: '#f1f1f1',
  textWhite: '#FFFFFF',
  chipTextColor: '#F2F2F7',
  chipBgColor: 'rgba(60, 60, 67, 0.4)',
  chipPrimaryTextColor: 'rgba(255, 255, 255, 0.8)',
  chipPrimaryBgColor: 'rgba(0, 122, 255, 0.6)',
  breadcrumbLinkColor: '#A2A2A2',
  breadcrumbTextColor: '#292929',
  buttonPrimaryBgColor: '4353FF',
  buttonPrimaryBgHoverColor: '#3443E1',
  buttonPrimaryDisabledBgColor: 'rgba(0, 122, 255, 0.4)',
  listItemActiveBg: '#007AFF',
  listSelectedTextColor: '#3C3C43',
  listBoxShadow: '0 0.1875rem 0.5rem rgba(0, 0, 0, 0.12), 0 0.1875rem 0.0625rem rgba(0, 0, 0, 0.04)',
  listBorderColor: 'rgba(0, 0, 0, 0.04)',
  dividerColor: 'rgba(118, 120, 125, 0.12)',
  dropdownBg: 'rgba(246, 246, 248, 0.8)',
  dropdownTextColor: 'rgba(60, 60, 67, 0.6)',
  overlayColor: 'rgba(0, 0, 0, 0.4)',
  progressBg: '#E5E5E5',
  progressBar: '#017AFF',
  progressShadow: 'inset 0 0 0.0625rem #E3E3E3',
  switchShadow: '0 0.1875rem 0.5rem rgba(0, 0, 0, 0.15), 0 0.1875rem 0.0625rem rgba(0, 0, 0, 0.06)'
};

var Move = "<svg width=\"20\" height=\"19\" viewBox=\"0 0 20 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1.25 9.91406L3.75 12.2812C3.92708 12.4479 4.10938 12.5234 4.29688 12.5078C4.48438 12.4922 4.64323 12.4115 4.77344 12.2656C4.90365 12.1198 4.96875 11.9349 4.96875 11.7109V10.0547H9.30469V14.4062H7.64062C7.41667 14.4062 7.23177 14.4714 7.08594 14.6016C6.9401 14.7266 6.85938 14.8828 6.84375 15.0703C6.82812 15.263 6.90365 15.4453 7.07031 15.6172L9.4375 18.1172C9.60417 18.2943 9.79427 18.3802 10.0078 18.375C10.2214 18.3698 10.4089 18.2812 10.5703 18.1094L12.9297 15.6172C13.0964 15.4453 13.1719 15.263 13.1562 15.0703C13.1458 14.8828 13.0651 14.7266 12.9141 14.6016C12.7682 14.4714 12.5833 14.4062 12.3594 14.4062H10.7031V10.0547H15.0312V11.7109C15.0312 11.9349 15.0964 12.1198 15.2266 12.2656C15.3568 12.4115 15.5156 12.4922 15.7031 12.5078C15.8906 12.5234 16.0729 12.4479 16.25 12.2812L18.7422 9.92188C18.9089 9.76042 18.9948 9.57292 19 9.35938C19.0052 9.14583 18.9219 8.95573 18.75 8.78906L16.25 6.42188C16.0729 6.25521 15.8906 6.17969 15.7031 6.19531C15.5156 6.21094 15.3568 6.29167 15.2266 6.4375C15.0964 6.58333 15.0312 6.76823 15.0312 6.99219V8.65625H10.7031V4.29688H12.3594C12.5833 4.29688 12.7682 4.23177 12.9141 4.10156C13.0651 3.97135 13.1458 3.8125 13.1562 3.625C13.1719 3.4375 13.0964 3.25781 12.9297 3.08594L10.5625 0.585938C10.3958 0.408854 10.2057 0.322917 9.99219 0.328125C9.78385 0.333333 9.59635 0.421875 9.42969 0.59375L7.07031 3.08594C6.90365 3.25781 6.82812 3.4375 6.84375 3.625C6.85938 3.8125 6.9401 3.97135 7.08594 4.10156C7.23177 4.23177 7.41667 4.29688 7.64062 4.29688H9.30469V8.65625H4.96875V6.99219C4.96875 6.76823 4.90365 6.58333 4.77344 6.4375C4.64323 6.29167 4.48438 6.21094 4.29688 6.19531C4.10938 6.17969 3.92708 6.25521 3.75 6.42188L1.25781 8.78125C1.09115 8.94271 1.00521 9.13021 1 9.34375C0.994792 9.55729 1.07812 9.7474 1.25 9.91406Z\" fill=\"#3C3C43\" fill-opacity=\"0.6\"/>\n</svg>";

var Icon = "<svg width=\"16\" height=\"19\" viewBox=\"0 0 16 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12.3906 12.7188C11.901 12.7188 11.4531 12.8385 11.0469 13.0781C10.6458 13.3177 10.3255 13.6406 10.0859 14.0469C9.84635 14.4479 9.72656 14.8932 9.72656 15.3828C9.72656 15.8672 9.84635 16.3099 10.0859 16.7109C10.3255 17.1172 10.6458 17.4375 11.0469 17.6719C11.4531 17.9062 11.901 18.0234 12.3906 18.0234C12.8802 18.0234 13.3255 17.9062 13.7266 17.6719C14.1276 17.4375 14.4479 17.1172 14.6875 16.7109C14.9271 16.3099 15.0469 15.8672 15.0469 15.3828C15.0469 14.8932 14.9271 14.4479 14.6875 14.0469C14.4479 13.6406 14.1276 13.3177 13.7266 13.0781C13.3255 12.8385 12.8802 12.7188 12.3906 12.7188ZM12.3906 14.1562C12.7292 14.1562 13.0156 14.276 13.25 14.5156C13.4896 14.75 13.6094 15.0391 13.6094 15.3828C13.6094 15.7214 13.4896 16.0078 13.25 16.2422C13.0156 16.4766 12.7292 16.5938 12.3906 16.5938C12.0469 16.5938 11.7552 16.4766 11.5156 16.2422C11.2812 16.0078 11.1641 15.7214 11.1641 15.3828C11.1641 15.0339 11.2812 14.7422 11.5156 14.5078C11.7552 14.2734 12.0469 14.1562 12.3906 14.1562ZM3.60938 6.03906C4.09896 6.03906 4.54427 5.91927 4.94531 5.67969C5.34635 5.4401 5.66667 5.11979 5.90625 4.71875C6.14583 4.3125 6.26562 3.86458 6.26562 3.375C6.26562 2.88542 6.14583 2.4401 5.90625 2.03906C5.66667 1.63802 5.34635 1.31771 4.94531 1.07812C4.54427 0.838542 4.09896 0.71875 3.60938 0.71875C3.11979 0.71875 2.67448 0.838542 2.27344 1.07812C1.8724 1.31771 1.55208 1.63802 1.3125 2.03906C1.07292 2.4401 0.953125 2.88542 0.953125 3.375C0.953125 3.86458 1.07292 4.3125 1.3125 4.71875C1.55208 5.11979 1.8724 5.4401 2.27344 5.67969C2.67448 5.91927 3.11979 6.03906 3.60938 6.03906ZM3.60938 4.60156C3.26562 4.60156 2.97656 4.48438 2.74219 4.25C2.50781 4.01042 2.39062 3.71875 2.39062 3.375C2.39062 3.03125 2.50781 2.74219 2.74219 2.50781C2.97656 2.27344 3.26562 2.15625 3.60938 2.15625C3.95312 2.15625 4.24219 2.27344 4.47656 2.50781C4.71094 2.74219 4.82812 3.03125 4.82812 3.375C4.82812 3.71875 4.71094 4.01042 4.47656 4.25C4.24219 4.48438 3.95312 4.60156 3.60938 4.60156ZM2.85156 6.22656C2.85156 7.0599 3.10156 7.76042 3.60156 8.32812C4.10156 8.89583 4.83594 9.30729 5.80469 9.5625L9.75 10.6328C11.0052 10.9766 11.6328 11.6068 11.6328 12.5234V13.1641H13.1406V12.5234C13.1406 11.6901 12.8906 10.9922 12.3906 10.4297C11.8958 9.86198 11.1641 9.45052 10.1953 9.19531L6.25 8.125C4.98958 7.78125 4.35938 7.14844 4.35938 6.22656V5.58594H2.85156V6.22656Z\" fill=\"#3C3C43\" fill-opacity=\"0.2\"/>\n</svg>";

var Node = "<svg width=\"58\" height=\"102\" viewBox=\"0 0 58 102\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g opacity=\"0.5\" filter=\"url(#filter0_d_307_751)\">\n<rect x=\"-38\" y=\"2\" width=\"90\" height=\"90\" rx=\"45\" fill=\"#F2F2F7\"/>\n</g>\n<path d=\"M52 91V86.4142C52 85.5233 50.9229 85.0771 50.2929 85.7071L45.7071 90.2929C45.0771 90.9229 45.5233 92 46.4142 92H51C51.5523 92 52 91.5523 52 91Z\" fill=\"#3C3C43\" fill-opacity=\"0.2\"/>\n<defs>\n<filter id=\"filter0_d_307_751\" x=\"-44\" y=\"0\" width=\"102\" height=\"102\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feMorphology radius=\"4\" operator=\"erode\" in=\"SourceAlpha\" result=\"effect1_dropShadow_307_751\"/>\n<feOffset dy=\"4\"/>\n<feGaussianBlur stdDeviation=\"5\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0.235294 0 0 0 0 0.235294 0 0 0 0 0.262745 0 0 0 0.3 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_307_751\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_307_751\" result=\"shape\"/>\n</filter>\n</defs>\n</svg>";

var Cursor = "<svg width=\"10\" height=\"17\" viewBox=\"0 0 10 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M8.3125 15.1328L5.40625 8.36719L4.89062 9.33594L8.95312 9.57031C9.15104 9.58594 9.3099 9.53646 9.42969 9.42188C9.55469 9.30208 9.61979 9.15625 9.625 8.98438C9.63021 8.8125 9.5625 8.65365 9.42188 8.50781L1.57812 0.523438C1.44792 0.388021 1.30208 0.320312 1.14062 0.320312C0.979167 0.315104 0.841146 0.367188 0.726562 0.476562C0.611979 0.585938 0.552083 0.734375 0.546875 0.921875L0.40625 12.0469C0.401042 12.2604 0.460938 12.4271 0.585938 12.5469C0.716146 12.6615 0.869792 12.7188 1.04688 12.7188C1.22396 12.7135 1.3776 12.6302 1.50781 12.4688L4.11719 9.5625L3.05469 9.21875L5.85938 16.1562C5.92708 16.3281 6.03385 16.4427 6.17969 16.5C6.33073 16.5625 6.48177 16.5625 6.63281 16.5L8.02344 15.9375C8.1849 15.875 8.29167 15.7656 8.34375 15.6094C8.39583 15.4583 8.38542 15.2995 8.3125 15.1328Z\" fill=\"white\"/>\n</svg>";

var Fullscreen = "<svg width=\"16\" height=\"15\" viewBox=\"0 0 16 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M0.703125 4.22656H2.24219V2.74219C2.24219 2.36719 2.33594 2.08594 2.52344 1.89844C2.71615 1.71094 2.99479 1.61719 3.35938 1.61719H4.82812V0.078125H3.26562C2.42188 0.078125 1.78385 0.291667 1.35156 0.71875C0.919271 1.14583 0.703125 1.77865 0.703125 2.61719V4.22656ZM5.96875 1.61719H10.0234V0.078125H5.96875V1.61719ZM13.75 4.22656H15.2891V2.61719C15.2891 1.77865 15.0729 1.14583 14.6406 0.71875C14.2083 0.291667 13.5703 0.078125 12.7266 0.078125H11.1641V1.61719H12.6328C12.9922 1.61719 13.2682 1.71094 13.4609 1.89844C13.6536 2.08594 13.75 2.36719 13.75 2.74219V4.22656ZM13.75 9.36719H15.2891V5.36719H13.75V9.36719ZM11.1641 14.6641H12.7266C13.5703 14.6641 14.2083 14.4479 14.6406 14.0156C15.0729 13.5885 15.2891 12.9583 15.2891 12.125V10.5156H13.75V11.9922C13.75 12.3724 13.6536 12.6562 13.4609 12.8438C13.2682 13.0312 12.9922 13.125 12.6328 13.125H11.1641V14.6641ZM5.96875 14.6641H10.0234V13.125H5.96875V14.6641ZM3.26562 14.6641H4.82812V13.125H3.35938C2.99479 13.125 2.71615 13.0312 2.52344 12.8438C2.33594 12.6562 2.24219 12.3724 2.24219 11.9922V10.5156H0.703125V12.125C0.703125 12.9583 0.919271 13.5885 1.35156 14.0156C1.78385 14.4479 2.42188 14.6641 3.26562 14.6641ZM0.703125 9.36719H2.24219V5.36719H0.703125V9.36719Z\" fill=\"#3C3C43\" fill-opacity=\"0.2\"/>\n</svg>";

const {
  textWhite,
  dividerColor
} = vars;
const useStyles = /*#__PURE__*/styles.makeStyles(() => ({
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
      right: '1rem'
    },
    '& .MuiList-root': {
      padding: '0.75rem'
    }
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
      margin: '1rem 0'
    }
  }
}));

const Sidebar = () => {
  const classes = useStyles();
  return React__default.createElement(system.Box, {
    className: `${classes.root} left`
  }, React__default.createElement(material.List, {
    disablePadding: true,
    component: "nav"
  }, React__default.createElement(material.ListItemButton, {
    selected: true
  }, React__default.createElement(material.ListItemIcon, null, React__default.createElement("img", {
    src: `data:image/svg+xml;base64,${new Buffer(Cursor).toString('base64')}`,
    alt: "icon"
  }))), React__default.createElement(material.ListItemButton, null, React__default.createElement(material.ListItemIcon, null, React__default.createElement("img", {
    src: `data:image/svg+xml;base64,${new Buffer(Move).toString('base64')}`,
    alt: "move"
  })))), React__default.createElement(system.Box, {
    className: classes.node
  }, React__default.createElement(material.Divider, null), React__default.createElement("img", {
    src: `data:image/svg+xml;base64,${new Buffer(Node).toString('base64')}`,
    alt: "node"
  }), React__default.createElement(material.Divider, null)), React__default.createElement(material.List, {
    disablePadding: true,
    component: "nav"
  }, React__default.createElement(material.ListItemButton, {
    disabled: true
  }, React__default.createElement(material.ListItemIcon, null, React__default.createElement("img", {
    src: `data:image/svg+xml;base64,${new Buffer(Icon).toString('base64')}`,
    alt: "icon"
  }))), React__default.createElement(material.ListItemButton, null, React__default.createElement(material.ListItemIcon, null, React__default.createElement("img", {
    src: `data:image/svg+xml;base64,${new Buffer(Fullscreen).toString('base64')}`,
    alt: "fullscreen"
  })))));
};

const applicationTheme = params => {
  const {
    primaryBg,
    fontFamily,
    chipTextColor,
    chipBgColor,
    textWhite,
    listItemActiveBg,
    listSelectedTextColor,
    listBoxShadow,
    listBorderColor
  } = params;
  return {
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          html {
            background: ${primaryBg};
            font-family: ${fontFamily};
          }
          body {
            background-color:${primaryBg};
            font-family: ${fontFamily};
            font-size: 1rem;
          }
        `
      },
      MuiList: {
        styleOverrides: {
          root: {
            '&.customSwitch': {
              padding: '0.125rem',
              background: chipTextColor,
              borderRadius: '0.5rem',
              display: 'flex',
              '& .MuiListItemButton-root': {
                padding: '0.25rem 0.75rem',
                borderRadius: '0.4375rem',
                width: '10.59375rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:not(:last-child)': {
                  marginBottom: '0'
                },
                '&.Mui-disabled': {
                  opacity: 1
                },
                '&.Mui-selected': {
                  background: textWhite,
                  boxShadow: listBoxShadow,
                  border: `0.03125rem solid ${listBorderColor}`,
                  '& .MuiTypography-root': {
                    color: listSelectedTextColor
                  }
                }
              },
              '& .MuiChip-root': {
                marginLeft: '0.25rem'
              },
              '& .MuiTypography-root': {
                fontWeight: 500,
                fontSize: '0.8125rem',
                lineHeight: '1.25rem',
                letterSpacing: '-0.005rem',
                color: chipBgColor,
                margin: 0
              }
            }
          }
        }
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 'inherit'
          }
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            padding: 0,
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            justifyContent: 'center',
            backgroundColor: chipTextColor,
            '&:hover': {
              backgroundColor: chipTextColor
            },
            '&:not(:last-child)': {
              marginBottom: '0.75rem'
            },
            '&.Mui-selected': {
              backgroundColor: listItemActiveBg,
              '&:hover': {
                backgroundColor: listItemActiveBg
              }
            },
            '&.Mui-disabled': {
              opacity: 0.8
            }
          }
        }
      }
    }
  };
};

var theme = (customVariables => applicationTheme({ ...vars,
  ...customVariables
}));

function updateChildrenPosition(nodes, parent) {
  // @ts-ignore
  const children = nodes.filter(n => n.options['parentId'] == parent.options['id']);
  children.forEach(n => {
    // @ts-ignore
    n.setPosition(parent.getX() + n.options['position'].x, parent.getY() + n.options['position'].y); // TODO: Fix nested position update
    // updateChildrenPosition(nodes, n)
  });
}

const useStyles$1 = /*#__PURE__*/styles.makeStyles(_ => ({
  container: {
    height: '100%',
    width: '100%'
  },
  canvasContainer: {
    height: '100%',
    width: '100%',
    background: '#fffff'
  }
}));

const MetaDiagram = ({
  metaNodes,
  metaLinks,
  componentsMap,
  wrapperClassName,
  metaTheme
}) => {
  const classes = useStyles$1(); // set up the diagram engine

  const engine = createEngine__default();
  engine.getNodeFactories() // @ts-ignore
  .registerFactory(new MetaNodeFactory(componentsMap.nodes));
  engine.getLinkFactories() // @ts-ignore
  .registerFactory(new MetaLinkFactory(componentsMap.links)); // @ts-ignore

  const repaintCanvas = event => {
    let model = engine.getModel();
    const node = event.entity;
    const nodes = model.getNodes(); // @ts-ignore

    updateChildrenPosition(nodes, node); // @ts-ignore
    // updateNodeLocalPosition(nodes, node)

    engine.repaintCanvas();
  }; // set up the diagram model


  const model = new createEngine.DiagramModel();
  const nodes = processNodes(metaNodes, repaintCanvas);
  const links = metaLinks.map(ml => getLinkModel(ml, nodes)).filter(mlm => mlm !== undefined); // @ts-ignore

  model.addAll(...nodes, ...links); // load model into engine

  engine.setModel(model);
  const containerClassName = wrapperClassName ? wrapperClassName : classes.container;
  return React.createElement(styles$1.ThemeProvider, {
    theme: styles$1.createTheme(theme(metaTheme == null ? void 0 : metaTheme.customThemeVariables))
  }, React.createElement(CssBaseline, null), React.createElement(material.Box, {
    className: containerClassName
  }, React.createElement(Sidebar, null), React.createElement(reactCanvasCore.CanvasWidget, {
    className: `${classes.canvasContainer} ${metaTheme == null ? void 0 : metaTheme.canvasClassName}`,
    engine: engine
  })));
};

exports.ComponentsMap = ComponentsMap;
exports.MetaLink = MetaLink;
exports.MetaLinkModel = MetaLinkModel;
exports.MetaNode = MetaNode;
exports.MetaNodeModel = MetaNodeModel;
exports.Position = Position;
exports.default = MetaDiagram;
//# sourceMappingURL=meta-diagram.cjs.development.js.map
