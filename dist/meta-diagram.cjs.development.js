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

class MetaOptions {
  constructor(id, name, shape, variant, options) {
    this.options = options;
    this.options.set('id', id);
    this.options.set('name', name);
    this.options.set('shape', shape);
    this.options.set('variant', variant);
  }

  getId() {
    return this.options.get('id');
  }

  getShape() {
    return this.options.get('shape');
  }

}

class MetaNode {
  constructor(id, name, shape, position, variant, options) {
    if (options === undefined) {
      options = new Map();
    }

    this.children = [];
    options.set('position', position);
    this.options = new MetaOptions(id, name, shape, variant, options);
  }

}

class MetaLink {
  constructor(id, name, shape, sourceId, sourcePortId, targetId, targetPortId, variant, options) {
    if (options === undefined) {
      options = new Map();
    }

    this.sourceId = sourceId;
    this.sourcePortId = sourcePortId;
    this.targetId = targetId;
    this.targetPortId = targetPortId;
    this.options = new MetaOptions(id, name, shape, variant, options);
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

}

class ComponentsMap {
  constructor(nodesMap, linksMap) {
    this.nodes = nodesMap;
    this.links = linksMap;
  }

}

var ReactDiagramMetaTypes;

(function (ReactDiagramMetaTypes) {
  ReactDiagramMetaTypes["META_NODE"] = "meta-node-type";
  ReactDiagramMetaTypes["META_LINK"] = "meta-link-type";
})(ReactDiagramMetaTypes || (ReactDiagramMetaTypes = {}));

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

class MetaLinkModel extends createEngine.DefaultLinkModel {
  constructor(options = {}) {
    super({ ...options,
      type: ReactDiagramMetaTypes.META_LINK
    });
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

function getNode(id, nodes) {
  return nodes.find(n => n.getOptions().id === id);
}

function getLinkModel(metaLink, nodes) {
  const link = new MetaLinkModel(Object.fromEntries(metaLink.options.options));
  const source = getNode(metaLink.getSourceId(), nodes);
  const target = getNode(metaLink.getTargetId(), nodes);

  if (source && target) {
    link.setSourcePort(source.getPort(metaLink.getSourcePortId()));
    link.setTargetPort(target.getPort(metaLink.getTargetPortId()));
    return link;
  }

  return undefined;
}

const nodeGreen = {
  nodeGreenBackgroundColor: '#D4F4D4',
  nodeGreenTextColor: '#669D66',
  nodeGreenBorderColor: 'rgba(102, 157, 102, 0.2)',
  nodeGreenBoxShadow: '0 0.25rem 0.625rem -0.25rem rgba(102, 157, 102, 0.3)'
};
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
  switchShadow: '0 0.1875rem 0.5rem rgba(0, 0, 0, 0.15), 0 0.1875rem 0.0625rem rgba(0, 0, 0, 0.06)',
  sidebarBg: '#ffffff',
  sidebarShadow: `0 0 3.75rem rgba(0, 0, 0, 0.1),
  0 0.5rem 2.5rem -0.625rem rgba(0, 0, 0, 0.1)`,
  canvasBg: '#fff',
  showPropertiesButtonBg: '#161A1E',
  nodeBorderColor: '#18A0FB',
  nodePointerBg: '#fff',
  nodeButtonTextColor: 'rgba(255, 255, 255, 0.8)',
  nodeButtonLineColor: 'rgba(255, 255, 255, 0.2)',
  nodeTextColor: '#3C3C43',
  ...nodeGreen
};

var Move = "<svg width=\"20\" height=\"19\" viewBox=\"0 0 20 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1.25 9.91406L3.75 12.2812C3.92708 12.4479 4.10938 12.5234 4.29688 12.5078C4.48438 12.4922 4.64323 12.4115 4.77344 12.2656C4.90365 12.1198 4.96875 11.9349 4.96875 11.7109V10.0547H9.30469V14.4062H7.64062C7.41667 14.4062 7.23177 14.4714 7.08594 14.6016C6.9401 14.7266 6.85938 14.8828 6.84375 15.0703C6.82812 15.263 6.90365 15.4453 7.07031 15.6172L9.4375 18.1172C9.60417 18.2943 9.79427 18.3802 10.0078 18.375C10.2214 18.3698 10.4089 18.2812 10.5703 18.1094L12.9297 15.6172C13.0964 15.4453 13.1719 15.263 13.1562 15.0703C13.1458 14.8828 13.0651 14.7266 12.9141 14.6016C12.7682 14.4714 12.5833 14.4062 12.3594 14.4062H10.7031V10.0547H15.0312V11.7109C15.0312 11.9349 15.0964 12.1198 15.2266 12.2656C15.3568 12.4115 15.5156 12.4922 15.7031 12.5078C15.8906 12.5234 16.0729 12.4479 16.25 12.2812L18.7422 9.92188C18.9089 9.76042 18.9948 9.57292 19 9.35938C19.0052 9.14583 18.9219 8.95573 18.75 8.78906L16.25 6.42188C16.0729 6.25521 15.8906 6.17969 15.7031 6.19531C15.5156 6.21094 15.3568 6.29167 15.2266 6.4375C15.0964 6.58333 15.0312 6.76823 15.0312 6.99219V8.65625H10.7031V4.29688H12.3594C12.5833 4.29688 12.7682 4.23177 12.9141 4.10156C13.0651 3.97135 13.1458 3.8125 13.1562 3.625C13.1719 3.4375 13.0964 3.25781 12.9297 3.08594L10.5625 0.585938C10.3958 0.408854 10.2057 0.322917 9.99219 0.328125C9.78385 0.333333 9.59635 0.421875 9.42969 0.59375L7.07031 3.08594C6.90365 3.25781 6.82812 3.4375 6.84375 3.625C6.85938 3.8125 6.9401 3.97135 7.08594 4.10156C7.23177 4.23177 7.41667 4.29688 7.64062 4.29688H9.30469V8.65625H4.96875V6.99219C4.96875 6.76823 4.90365 6.58333 4.77344 6.4375C4.64323 6.29167 4.48438 6.21094 4.29688 6.19531C4.10938 6.17969 3.92708 6.25521 3.75 6.42188L1.25781 8.78125C1.09115 8.94271 1.00521 9.13021 1 9.34375C0.994792 9.55729 1.07812 9.7474 1.25 9.91406Z\" fill=\"#3C3C43\" fill-opacity=\"0.6\"/>\n</svg>";

var MoveActive = "<svg width=\"20\" height=\"19\" viewBox=\"0 0 20 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M1.25 9.91406L3.75 12.2812C3.92708 12.4479 4.10938 12.5234 4.29688 12.5078C4.48438 12.4922 4.64323 12.4115 4.77344 12.2656C4.90365 12.1198 4.96875 11.9349 4.96875 11.7109V10.0547H9.30469V14.4062H7.64062C7.41667 14.4062 7.23177 14.4714 7.08594 14.6016C6.9401 14.7266 6.85938 14.8828 6.84375 15.0703C6.82812 15.263 6.90365 15.4453 7.07031 15.6172L9.4375 18.1172C9.60417 18.2943 9.79427 18.3802 10.0078 18.375C10.2214 18.3698 10.4089 18.2812 10.5703 18.1094L12.9297 15.6172C13.0964 15.4453 13.1719 15.263 13.1562 15.0703C13.1458 14.8828 13.0651 14.7266 12.9141 14.6016C12.7682 14.4714 12.5833 14.4062 12.3594 14.4062H10.7031V10.0547H15.0312V11.7109C15.0312 11.9349 15.0964 12.1198 15.2266 12.2656C15.3568 12.4115 15.5156 12.4922 15.7031 12.5078C15.8906 12.5234 16.0729 12.4479 16.25 12.2812L18.7422 9.92188C18.9089 9.76042 18.9948 9.57292 19 9.35938C19.0052 9.14583 18.9219 8.95573 18.75 8.78906L16.25 6.42188C16.0729 6.25521 15.8906 6.17969 15.7031 6.19531C15.5156 6.21094 15.3568 6.29167 15.2266 6.4375C15.0964 6.58333 15.0312 6.76823 15.0312 6.99219V8.65625H10.7031V4.29688H12.3594C12.5833 4.29688 12.7682 4.23177 12.9141 4.10156C13.0651 3.97135 13.1458 3.8125 13.1562 3.625C13.1719 3.4375 13.0964 3.25781 12.9297 3.08594L10.5625 0.585938C10.3958 0.408854 10.2057 0.322917 9.99219 0.328125C9.78385 0.333333 9.59635 0.421875 9.42969 0.59375L7.07031 3.08594C6.90365 3.25781 6.82812 3.4375 6.84375 3.625C6.85938 3.8125 6.9401 3.97135 7.08594 4.10156C7.23177 4.23177 7.41667 4.29688 7.64062 4.29688H9.30469V8.65625H4.96875V6.99219C4.96875 6.76823 4.90365 6.58333 4.77344 6.4375C4.64323 6.29167 4.48438 6.21094 4.29688 6.19531C4.10938 6.17969 3.92708 6.25521 3.75 6.42188L1.25781 8.78125C1.09115 8.94271 1.00521 9.13021 1 9.34375C0.994792 9.55729 1.07812 9.7474 1.25 9.91406Z\" fill=\"white\"/>\n</svg>";

var Icon = "<svg width=\"16\" height=\"19\" viewBox=\"0 0 16 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12.3906 12.7188C11.901 12.7188 11.4531 12.8385 11.0469 13.0781C10.6458 13.3177 10.3255 13.6406 10.0859 14.0469C9.84635 14.4479 9.72656 14.8932 9.72656 15.3828C9.72656 15.8672 9.84635 16.3099 10.0859 16.7109C10.3255 17.1172 10.6458 17.4375 11.0469 17.6719C11.4531 17.9062 11.901 18.0234 12.3906 18.0234C12.8802 18.0234 13.3255 17.9062 13.7266 17.6719C14.1276 17.4375 14.4479 17.1172 14.6875 16.7109C14.9271 16.3099 15.0469 15.8672 15.0469 15.3828C15.0469 14.8932 14.9271 14.4479 14.6875 14.0469C14.4479 13.6406 14.1276 13.3177 13.7266 13.0781C13.3255 12.8385 12.8802 12.7188 12.3906 12.7188ZM12.3906 14.1562C12.7292 14.1562 13.0156 14.276 13.25 14.5156C13.4896 14.75 13.6094 15.0391 13.6094 15.3828C13.6094 15.7214 13.4896 16.0078 13.25 16.2422C13.0156 16.4766 12.7292 16.5938 12.3906 16.5938C12.0469 16.5938 11.7552 16.4766 11.5156 16.2422C11.2812 16.0078 11.1641 15.7214 11.1641 15.3828C11.1641 15.0339 11.2812 14.7422 11.5156 14.5078C11.7552 14.2734 12.0469 14.1562 12.3906 14.1562ZM3.60938 6.03906C4.09896 6.03906 4.54427 5.91927 4.94531 5.67969C5.34635 5.4401 5.66667 5.11979 5.90625 4.71875C6.14583 4.3125 6.26562 3.86458 6.26562 3.375C6.26562 2.88542 6.14583 2.4401 5.90625 2.03906C5.66667 1.63802 5.34635 1.31771 4.94531 1.07812C4.54427 0.838542 4.09896 0.71875 3.60938 0.71875C3.11979 0.71875 2.67448 0.838542 2.27344 1.07812C1.8724 1.31771 1.55208 1.63802 1.3125 2.03906C1.07292 2.4401 0.953125 2.88542 0.953125 3.375C0.953125 3.86458 1.07292 4.3125 1.3125 4.71875C1.55208 5.11979 1.8724 5.4401 2.27344 5.67969C2.67448 5.91927 3.11979 6.03906 3.60938 6.03906ZM3.60938 4.60156C3.26562 4.60156 2.97656 4.48438 2.74219 4.25C2.50781 4.01042 2.39062 3.71875 2.39062 3.375C2.39062 3.03125 2.50781 2.74219 2.74219 2.50781C2.97656 2.27344 3.26562 2.15625 3.60938 2.15625C3.95312 2.15625 4.24219 2.27344 4.47656 2.50781C4.71094 2.74219 4.82812 3.03125 4.82812 3.375C4.82812 3.71875 4.71094 4.01042 4.47656 4.25C4.24219 4.48438 3.95312 4.60156 3.60938 4.60156ZM2.85156 6.22656C2.85156 7.0599 3.10156 7.76042 3.60156 8.32812C4.10156 8.89583 4.83594 9.30729 5.80469 9.5625L9.75 10.6328C11.0052 10.9766 11.6328 11.6068 11.6328 12.5234V13.1641H13.1406V12.5234C13.1406 11.6901 12.8906 10.9922 12.3906 10.4297C11.8958 9.86198 11.1641 9.45052 10.1953 9.19531L6.25 8.125C4.98958 7.78125 4.35938 7.14844 4.35938 6.22656V5.58594H2.85156V6.22656Z\" fill=\"#3C3C43\" fill-opacity=\"0.6\"/>\n</svg>";

var IconActive = "<svg width=\"16\" height=\"19\" viewBox=\"0 0 16 19\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M12.3906 12.7188C11.901 12.7188 11.4531 12.8385 11.0469 13.0781C10.6458 13.3177 10.3255 13.6406 10.0859 14.0469C9.84635 14.4479 9.72656 14.8932 9.72656 15.3828C9.72656 15.8672 9.84635 16.3099 10.0859 16.7109C10.3255 17.1172 10.6458 17.4375 11.0469 17.6719C11.4531 17.9062 11.901 18.0234 12.3906 18.0234C12.8802 18.0234 13.3255 17.9062 13.7266 17.6719C14.1276 17.4375 14.4479 17.1172 14.6875 16.7109C14.9271 16.3099 15.0469 15.8672 15.0469 15.3828C15.0469 14.8932 14.9271 14.4479 14.6875 14.0469C14.4479 13.6406 14.1276 13.3177 13.7266 13.0781C13.3255 12.8385 12.8802 12.7188 12.3906 12.7188ZM12.3906 14.1562C12.7292 14.1562 13.0156 14.276 13.25 14.5156C13.4896 14.75 13.6094 15.0391 13.6094 15.3828C13.6094 15.7214 13.4896 16.0078 13.25 16.2422C13.0156 16.4766 12.7292 16.5938 12.3906 16.5938C12.0469 16.5938 11.7552 16.4766 11.5156 16.2422C11.2812 16.0078 11.1641 15.7214 11.1641 15.3828C11.1641 15.0339 11.2812 14.7422 11.5156 14.5078C11.7552 14.2734 12.0469 14.1562 12.3906 14.1562ZM3.60938 6.03906C4.09896 6.03906 4.54427 5.91927 4.94531 5.67969C5.34635 5.4401 5.66667 5.11979 5.90625 4.71875C6.14583 4.3125 6.26562 3.86458 6.26562 3.375C6.26562 2.88542 6.14583 2.4401 5.90625 2.03906C5.66667 1.63802 5.34635 1.31771 4.94531 1.07812C4.54427 0.838542 4.09896 0.71875 3.60938 0.71875C3.11979 0.71875 2.67448 0.838542 2.27344 1.07812C1.8724 1.31771 1.55208 1.63802 1.3125 2.03906C1.07292 2.4401 0.953125 2.88542 0.953125 3.375C0.953125 3.86458 1.07292 4.3125 1.3125 4.71875C1.55208 5.11979 1.8724 5.4401 2.27344 5.67969C2.67448 5.91927 3.11979 6.03906 3.60938 6.03906ZM3.60938 4.60156C3.26562 4.60156 2.97656 4.48438 2.74219 4.25C2.50781 4.01042 2.39062 3.71875 2.39062 3.375C2.39062 3.03125 2.50781 2.74219 2.74219 2.50781C2.97656 2.27344 3.26562 2.15625 3.60938 2.15625C3.95312 2.15625 4.24219 2.27344 4.47656 2.50781C4.71094 2.74219 4.82812 3.03125 4.82812 3.375C4.82812 3.71875 4.71094 4.01042 4.47656 4.25C4.24219 4.48438 3.95312 4.60156 3.60938 4.60156ZM2.85156 6.22656C2.85156 7.0599 3.10156 7.76042 3.60156 8.32812C4.10156 8.89583 4.83594 9.30729 5.80469 9.5625L9.75 10.6328C11.0052 10.9766 11.6328 11.6068 11.6328 12.5234V13.1641H13.1406V12.5234C13.1406 11.6901 12.8906 10.9922 12.3906 10.4297C11.8958 9.86198 11.1641 9.45052 10.1953 9.19531L6.25 8.125C4.98958 7.78125 4.35938 7.14844 4.35938 6.22656V5.58594H2.85156V6.22656Z\" fill=\"white\"/>\n</svg>";

var Node = "<svg width=\"58\" height=\"102\" viewBox=\"0 0 58 102\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g filter=\"url(#filter0_d_401_6411)\">\n<rect x=\"-38\" y=\"2\" width=\"90\" height=\"90\" rx=\"45\" fill=\"#F2F2F7\"/>\n<rect x=\"-37.5\" y=\"2.5\" width=\"89\" height=\"89\" rx=\"44.5\" stroke=\"#3C3C43\" stroke-opacity=\"0.1\"/>\n</g>\n<path d=\"M52 91V86.4142C52 85.5233 50.9229 85.0771 50.2929 85.7071L45.7071 90.2929C45.0771 90.9229 45.5233 92 46.4142 92H51C51.5523 92 52 91.5523 52 91Z\" fill=\"#3C3C43\" fill-opacity=\"0.6\"/>\n<defs>\n<filter id=\"filter0_d_401_6411\" x=\"-44\" y=\"0\" width=\"102\" height=\"102\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feMorphology radius=\"4\" operator=\"erode\" in=\"SourceAlpha\" result=\"effect1_dropShadow_401_6411\"/>\n<feOffset dy=\"4\"/>\n<feGaussianBlur stdDeviation=\"5\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0.235294 0 0 0 0 0.235294 0 0 0 0 0.262745 0 0 0 0.3 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_401_6411\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_401_6411\" result=\"shape\"/>\n</filter>\n</defs>\n</svg>";

var Cursor = "<svg width=\"10\" height=\"17\" viewBox=\"0 0 10 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M8.3125 15.1328L5.40625 8.36719L4.89062 9.33594L8.95312 9.57031C9.15104 9.58594 9.3099 9.53646 9.42969 9.42188C9.55469 9.30208 9.61979 9.15625 9.625 8.98438C9.63021 8.8125 9.5625 8.65365 9.42188 8.50781L1.57812 0.523438C1.44792 0.388021 1.30208 0.320312 1.14062 0.320312C0.979167 0.315104 0.841146 0.367188 0.726562 0.476562C0.611979 0.585938 0.552083 0.734375 0.546875 0.921875L0.40625 12.0469C0.401042 12.2604 0.460938 12.4271 0.585938 12.5469C0.716146 12.6615 0.869792 12.7188 1.04688 12.7188C1.22396 12.7135 1.3776 12.6302 1.50781 12.4688L4.11719 9.5625L3.05469 9.21875L5.85938 16.1562C5.92708 16.3281 6.03385 16.4427 6.17969 16.5C6.33073 16.5625 6.48177 16.5625 6.63281 16.5L8.02344 15.9375C8.1849 15.875 8.29167 15.7656 8.34375 15.6094C8.39583 15.4583 8.38542 15.2995 8.3125 15.1328Z\" fill=\"#3C3C43\" fill-opacity=\"0.6\"/>\n</svg>";

var CursorActive = "<svg width=\"10\" height=\"17\" viewBox=\"0 0 10 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M8.3125 15.1328L5.40625 8.36719L4.89062 9.33594L8.95312 9.57031C9.15104 9.58594 9.3099 9.53646 9.42969 9.42188C9.55469 9.30208 9.61979 9.15625 9.625 8.98438C9.63021 8.8125 9.5625 8.65365 9.42188 8.50781L1.57812 0.523438C1.44792 0.388021 1.30208 0.320312 1.14062 0.320312C0.979167 0.315104 0.841146 0.367188 0.726562 0.476562C0.611979 0.585938 0.552083 0.734375 0.546875 0.921875L0.40625 12.0469C0.401042 12.2604 0.460938 12.4271 0.585938 12.5469C0.716146 12.6615 0.869792 12.7188 1.04688 12.7188C1.22396 12.7135 1.3776 12.6302 1.50781 12.4688L4.11719 9.5625L3.05469 9.21875L5.85938 16.1562C5.92708 16.3281 6.03385 16.4427 6.17969 16.5C6.33073 16.5625 6.48177 16.5625 6.63281 16.5L8.02344 15.9375C8.1849 15.875 8.29167 15.7656 8.34375 15.6094C8.39583 15.4583 8.38542 15.2995 8.3125 15.1328Z\" fill=\"white\"/>\n</svg>";

var Fullscreen = "<svg width=\"16\" height=\"15\" viewBox=\"0 0 16 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M0.703125 4.22656H2.24219V2.74219C2.24219 2.36719 2.33594 2.08594 2.52344 1.89844C2.71615 1.71094 2.99479 1.61719 3.35938 1.61719H4.82812V0.078125H3.26562C2.42188 0.078125 1.78385 0.291667 1.35156 0.71875C0.919271 1.14583 0.703125 1.77865 0.703125 2.61719V4.22656ZM5.96875 1.61719H10.0234V0.078125H5.96875V1.61719ZM13.75 4.22656H15.2891V2.61719C15.2891 1.77865 15.0729 1.14583 14.6406 0.71875C14.2083 0.291667 13.5703 0.078125 12.7266 0.078125H11.1641V1.61719H12.6328C12.9922 1.61719 13.2682 1.71094 13.4609 1.89844C13.6536 2.08594 13.75 2.36719 13.75 2.74219V4.22656ZM13.75 9.36719H15.2891V5.36719H13.75V9.36719ZM11.1641 14.6641H12.7266C13.5703 14.6641 14.2083 14.4479 14.6406 14.0156C15.0729 13.5885 15.2891 12.9583 15.2891 12.125V10.5156H13.75V11.9922C13.75 12.3724 13.6536 12.6562 13.4609 12.8438C13.2682 13.0312 12.9922 13.125 12.6328 13.125H11.1641V14.6641ZM5.96875 14.6641H10.0234V13.125H5.96875V14.6641ZM3.26562 14.6641H4.82812V13.125H3.35938C2.99479 13.125 2.71615 13.0312 2.52344 12.8438C2.33594 12.6562 2.24219 12.3724 2.24219 11.9922V10.5156H0.703125V12.125C0.703125 12.9583 0.919271 13.5885 1.35156 14.0156C1.78385 14.4479 2.42188 14.6641 3.26562 14.6641ZM0.703125 9.36719H2.24219V5.36719H0.703125V9.36719Z\" fill=\"#3C3C43\" fill-opacity=\"0.6\"/>\n</svg>";

var FullscreenActive = "<svg width=\"16\" height=\"15\" viewBox=\"0 0 16 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M0.703125 4.22656H2.24219V2.74219C2.24219 2.36719 2.33594 2.08594 2.52344 1.89844C2.71615 1.71094 2.99479 1.61719 3.35938 1.61719H4.82812V0.078125H3.26562C2.42188 0.078125 1.78385 0.291667 1.35156 0.71875C0.919271 1.14583 0.703125 1.77865 0.703125 2.61719V4.22656ZM5.96875 1.61719H10.0234V0.078125H5.96875V1.61719ZM13.75 4.22656H15.2891V2.61719C15.2891 1.77865 15.0729 1.14583 14.6406 0.71875C14.2083 0.291667 13.5703 0.078125 12.7266 0.078125H11.1641V1.61719H12.6328C12.9922 1.61719 13.2682 1.71094 13.4609 1.89844C13.6536 2.08594 13.75 2.36719 13.75 2.74219V4.22656ZM13.75 9.36719H15.2891V5.36719H13.75V9.36719ZM11.1641 14.6641H12.7266C13.5703 14.6641 14.2083 14.4479 14.6406 14.0156C15.0729 13.5885 15.2891 12.9583 15.2891 12.125V10.5156H13.75V11.9922C13.75 12.3724 13.6536 12.6562 13.4609 12.8438C13.2682 13.0312 12.9922 13.125 12.6328 13.125H11.1641V14.6641ZM5.96875 14.6641H10.0234V13.125H5.96875V14.6641ZM3.26562 14.6641H4.82812V13.125H3.35938C2.99479 13.125 2.71615 13.0312 2.52344 12.8438C2.33594 12.6562 2.24219 12.3724 2.24219 11.9922V10.5156H0.703125V12.125C0.703125 12.9583 0.919271 13.5885 1.35156 14.0156C1.78385 14.4479 2.42188 14.6641 3.26562 14.6641ZM0.703125 9.36719H2.24219V5.36719H0.703125V9.36719Z\" fill=\"white\"/>\n</svg>";

const {
  dividerColor
} = vars;
const useStyles = /*#__PURE__*/styles.makeStyles(() => ({
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
  const [selected, setSelected] = React__default.useState('1');

  const svgImg = img => `data:image/svg+xml;base64,${new Buffer(img).toString('base64')}`;

  const SidebarItem = props => {
    const {
      image,
      name,
      selectedImage,
      selection
    } = props;
    return React__default.createElement(material.ListItemButton, {
      selected: selected === selection,
      onClick: () => setSelected(selection)
    }, React__default.createElement(material.ListItemIcon, null, selected === selection ? React__default.createElement("img", {
      src: svgImg(image),
      alt: name
    }) : React__default.createElement("img", {
      src: svgImg(selectedImage),
      alt: name
    })));
  };

  return React__default.createElement(system.Box, {
    className: "sidebar"
  }, React__default.createElement(material.List, {
    disablePadding: true,
    component: "nav"
  }, React__default.createElement(SidebarItem, {
    image: CursorActive,
    selectedImage: Cursor,
    name: "cursor",
    selection: "1"
  }), React__default.createElement(SidebarItem, {
    image: MoveActive,
    selectedImage: Move,
    name: "move",
    selection: "2"
  })), React__default.createElement(system.Box, {
    className: classes.node
  }, React__default.createElement(material.Divider, null), React__default.createElement("img", {
    src: svgImg(Node),
    alt: "Node"
  }), React__default.createElement(material.Divider, null)), React__default.createElement(material.List, {
    disablePadding: true,
    component: "nav"
  }, React__default.createElement(SidebarItem, {
    image: IconActive,
    selectedImage: Icon,
    name: "draw",
    selection: "3"
  }), React__default.createElement(SidebarItem, {
    image: FullscreenActive,
    selectedImage: Fullscreen,
    name: "fullscreen",
    selection: "4"
  })));
};

var nodeGreen$1 = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M10 15.3125C10.6771 15.3125 11.3151 15.1823 11.9141 14.9219C12.513 14.6615 13.0391 14.3047 13.4922 13.8516C13.9505 13.3932 14.3073 12.8672 14.5625 12.2734C14.8229 11.6745 14.9531 11.0365 14.9531 10.3594C14.9531 9.68229 14.8229 9.04427 14.5625 8.44531C14.3021 7.84635 13.9427 7.32031 13.4844 6.86719C13.0312 6.40885 12.5052 6.04948 11.9062 5.78906C11.3125 5.52865 10.6771 5.39844 10 5.39844C9.32292 5.39844 8.6849 5.52865 8.08594 5.78906C7.48698 6.04948 6.95833 6.40885 6.5 6.86719C6.04688 7.32031 5.6901 7.84635 5.42969 8.44531C5.17448 9.04427 5.04688 9.68229 5.04688 10.3594C5.04688 11.0365 5.17708 11.6745 5.4375 12.2734C5.69792 12.8672 6.05469 13.3932 6.50781 13.8516C6.96615 14.3047 7.49219 14.6615 8.08594 14.9219C8.6849 15.1823 9.32292 15.3125 10 15.3125ZM10 14.0547C9.5 14.0547 9.02604 13.9583 8.57812 13.7656C8.13542 13.5677 7.74219 13.2995 7.39844 12.9609C7.0599 12.6172 6.79167 12.224 6.59375 11.7812C6.40104 11.3333 6.30469 10.8594 6.30469 10.3594C6.30469 9.85417 6.40104 9.3776 6.59375 8.92969C6.78646 8.48177 7.05208 8.08854 7.39062 7.75C7.73438 7.40625 8.1276 7.13802 8.57031 6.94531C9.01823 6.7526 9.49479 6.65625 10 6.65625C10.5 6.65625 10.9714 6.75521 11.4141 6.95312C11.862 7.14583 12.2552 7.41406 12.5938 7.75781C12.9375 8.09635 13.2057 8.48958 13.3984 8.9375C13.5964 9.38021 13.6953 9.85417 13.6953 10.3594C13.6953 10.8646 13.599 11.3411 13.4062 11.7891C13.2135 12.2318 12.9453 12.625 12.6016 12.9688C12.263 13.3073 11.8698 13.5729 11.4219 13.7656C10.9792 13.9583 10.5052 14.0547 10 14.0547ZM10.0078 12.3828C10.3776 12.3828 10.7161 12.2917 11.0234 12.1094C11.3307 11.9271 11.5755 11.6823 11.7578 11.375C11.9401 11.0677 12.0312 10.7266 12.0312 10.3516C12.0312 9.98177 11.9401 9.64583 11.7578 9.34375C11.5755 9.03646 11.3307 8.79167 11.0234 8.60938C10.7161 8.42708 10.3776 8.33594 10.0078 8.33594C9.63281 8.33594 9.29167 8.42708 8.98438 8.60938C8.67708 8.79167 8.43229 9.03646 8.25 9.34375C8.06771 9.64583 7.97656 9.98177 7.97656 10.3516C7.97656 10.7266 8.06771 11.0677 8.25 11.375C8.43229 11.6823 8.67708 11.9271 8.98438 12.1094C9.29688 12.2917 9.63802 12.3828 10.0078 12.3828ZM10 18.3281C11.0885 18.3281 12.112 18.1198 13.0703 17.7031C14.0339 17.2865 14.8828 16.7109 15.6172 15.9766C16.3516 15.2422 16.9271 14.3958 17.3438 13.4375C17.7604 12.474 17.9688 11.4479 17.9688 10.3594C17.9688 9.27083 17.7604 8.2474 17.3438 7.28906C16.9271 6.32552 16.3516 5.47656 15.6172 4.74219C14.8828 4.00781 14.0339 3.43229 13.0703 3.01562C12.1068 2.59896 11.0807 2.39062 9.99219 2.39062C8.90365 2.39062 7.8776 2.59896 6.91406 3.01562C5.95573 3.43229 5.10938 4.00781 4.375 4.74219C3.64583 5.47656 3.07292 6.32552 2.65625 7.28906C2.23958 8.2474 2.03125 9.27083 2.03125 10.3594C2.03125 11.4479 2.23958 12.474 2.65625 13.4375C3.07292 14.3958 3.64844 15.2422 4.38281 15.9766C5.11719 16.7109 5.96354 17.2865 6.92188 17.7031C7.88542 18.1198 8.91146 18.3281 10 18.3281ZM10 17C9.07812 17 8.21615 16.8281 7.41406 16.4844C6.61198 16.1406 5.90625 15.6667 5.29688 15.0625C4.69271 14.4531 4.21875 13.7474 3.875 12.9453C3.53646 12.1432 3.36719 11.2812 3.36719 10.3594C3.36719 9.4375 3.53646 8.57552 3.875 7.77344C4.21875 6.97135 4.69271 6.26562 5.29688 5.65625C5.90104 5.04688 6.60417 4.57292 7.40625 4.23438C8.20833 3.89062 9.07031 3.71875 9.99219 3.71875C10.9141 3.71875 11.776 3.89062 12.5781 4.23438C13.3802 4.57292 14.0859 5.04688 14.6953 5.65625C15.3047 6.26562 15.7812 6.97135 16.125 7.77344C16.4688 8.57552 16.6406 9.4375 16.6406 10.3594C16.6406 11.2812 16.4688 12.1432 16.125 12.9453C15.7865 13.7474 15.3125 14.4531 14.7031 15.0625C14.099 15.6667 13.3932 16.1406 12.5859 16.4844C11.7839 16.8281 10.9219 17 10 17Z\" fill=\"#669D66\"/>\n</svg>";

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
    listBorderColor,
    sidebarBg,
    sidebarShadow,
    canvasBg,
    showPropertiesButtonBg,
    nodeBorderColor,
    nodePointerBg,
    nodeButtonTextColor,
    nodeButtonLineColor,
    nodeGreenBackgroundColor,
    nodeGreenTextColor,
    nodeGreenBorderColor,
    nodeGreenBoxShadow,
    nodeTextColor
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
          .sidebar {
            z-index: 5;
            width: 4rem;
            background: ${sidebarBg};
            box-shadow: ${sidebarShadow};
            border-radius: 2rem;
            position: fixed;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
          }

          .sidebar.right {
            left: auto;
            right: 1rem;
          }

          .sidebar .MuiList-root {
            padding: 0.75rem
          }

          .canvas-widget {
            height: 100%;
            width: 100%;
            background-color: ${canvasBg};
          }

          .primary-node {
            border: solid 0.0625rem ${nodeGreenBorderColor};
            border-radius: 50%;
            box-shadow: ${nodeGreenBoxShadow};
            background: ${nodeGreenBackgroundColor};
            position: relative;
            width: 10rem;
            height: 10rem;
          }

          .primary-node .primary-node_header {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            flex-direction: column;
          }

          .primary-node .icon {
            width: 20px;
            height: 20px;
            margin: 0 auto 0.25rem;
            background: url(data:image/svg+xml;base64,${new Buffer(nodeGreen$1).toString('base64')});
          }

          .primary-node .primary-node_header p {
            color: ${nodeGreenTextColor};
          }

          .primary-node p {
            font-weight: 500;
            color: ${nodeTextColor};
            font-size: 0.8125rem;
            line-height: 1.25rem;
            letter-spacing: -0.005rem;
            margin: 0;
          }

          .node-button.MuiButton-root {
            background-color: ${showPropertiesButtonBg};
            border-radius: 1.125rem;
            font-weight: 600;
            font-size: 0.8125rem;
            display: flex;
            line-height: 1rem;
            letter-spacing: -0.025625rem;
            color: ${nodeButtonTextColor};
            margin: 0 !important;
            width: 9.625rem;
            padding: 0;
            height: 2.25rem;
            position: absolute;
            top: -2.625rem;
            font-family: ${fontFamily};
            text-transform: none;
            left: 50%;
            transform: translateX(-50%);
          }

          .node-button.MuiButton-root:hover {
            background-color: ${showPropertiesButtonBg};
          }

          .node-button .icon {
            width: 1rem;
            border: solid 0.0625rem;
            height: 1rem;
            border-radius: 50%;
            margin: 0 1.25rem 0 0;
            position: relative;
          }

          .node-button .icon:after {
            content: "";
            height: 1.75rem;
            width: 0.0625rem;
            display: block;
            position: absolute;
            right: -0.625rem;
            top: 50%;
            transform: translateY(-50%);
            background-color: ${nodeButtonLineColor};
          }

          .primary-node .node-button .icon {
            background: ${nodeGreenBackgroundColor};
            border-color: ${nodeGreenBorderColor}
          }

          .nodes {
            width: 10rem;
            height: 10rem;
            border: 0.09375rem solid ${nodeBorderColor};
            z-index: 99999;
            position: absolute;
          }

          .node .pointer {
            width: 0.625rem;
            height: 0.625rem;
            background: ${nodePointerBg};
            border: 0.09375rem solid ${nodeBorderColor};
            border-radius: 0.125rem;
            position: absolute;
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

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

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
  .registerFactory(new MetaLinkFactory(componentsMap.links)); // set up the diagram model

  const model = new createEngine.DiagramModel();
  const nodes = metaNodes.map(mn => new MetaNodeModel(Object.fromEntries(mn.options.options)));
  const links = metaLinks.map(ml => getLinkModel(ml, nodes)).filter(mlm => mlm !== undefined); // @ts-ignore

  model.addAll(...nodes, ...links); // load model into engine

  engine.setModel(model);
  const containerClassName = wrapperClassName ? wrapperClassName : classes.container;
  return React.createElement(styles$1.ThemeProvider, {
    theme: styles$1.createTheme(theme(metaTheme == null ? void 0 : metaTheme.customThemeVariables))
  }, React.createElement(CssBaseline, null), React.createElement(material.Box, {
    className: containerClassName
  }, React.createElement(Sidebar, null), React.createElement(reactCanvasCore.CanvasWidget, {
    className: `canvas-widget ${metaTheme == null ? void 0 : metaTheme.canvasClassName}`,
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
