import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MetaDiagram, {
  MetaNode,
  ComponentsMap,
  MetaLink,
  MetaPort,
  PortTypes,
  MetaNodeModel
} from '@metacell/meta-diagram';
import CustomLinkWidget from './components/widgets/CustomLinkWidget';
// @ts-ignore
import BG from './components/assets/svg/bg-dotted.svg';
import { ExpandedCustomNodeWidget } from './components/widgets/ExpandedCustomNodeWidget';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import {Point} from "@projectstorm/geometry";
import FolderIcon from '@mui/icons-material/Folder';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { blue, red } from '@mui/material/colors';

const useStyles = makeStyles(_ => ({
  main: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  canvasBG: {
    backgroundImage: `url(${BG})`,
  },
}));

let counter = 0

export function onNodeDrop(monitor, node, engine) {
  const options = new Map();
  const position = monitor?.getClientOffset();
  const newMetaNode = new MetaNode(
      `${node.id}-${counter}`,
      `${node.name}-${counter}`,
      'default',
      new Point(position.x, position.y),
      node.type,
      null,
      [new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined), new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined)],
      [],
      options
    );

  if (engine) {
      counter++
      return engine.getModel().addNode(newMetaNode.toModel());
  }
}

const blueNode = {
        id: 'blueNode',
        name: 'Blue Node',
        icon: <FolderIcon sx={{ color: blue[500] }}  />,
        type: 'node-blue',
        draggable: true,
        onNodeDrop
    };
const redNode = {
        id: 'redNode',
        name: 'red Node',
        icon: <FolderIcon sx={{ color: red[500] }} />,
        type: 'node-red',
        draggable: true,
        onNodeDrop
    };

const leftSideBarNodes = [
    blueNode,
    redNode,
    {
        id: 'nestedSidebarNode',
        name: 'Nested Sidebar Node',
        icon: <ArrowCircleRightIcon/>,
        type: undefined,
        draggable: false,
        children: [blueNode, redNode]
    },
];

const App = () => {
  const classes = useStyles();

  const grandparent = new MetaNode(
    'group2',
    'grandparent',
    'default',
    new Point(130, 105),
    'node-red',
    null,
    [new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined), new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined)],
    [],
    new Map()
  );

  const parent = new MetaNode(
    'group',
    'parent',
    'default',
    new Point(130, 105),
    'node-blue',
    grandparent,
    [new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined), new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined)],
    [],
    new Map()
  );

  const node1 = new MetaNode(
    '1',
    'node1',
    'default',
    new Point(130, 105),
    'node-red',
    parent,
    [new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined), new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined)],
    [],
     new Map()
  );

  const node2 = new MetaNode(
    '2',
    'node2',
    'default',
    new Point(130, 210),
    'node-blue',
    parent,
    [new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined), new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined)],
    [],
     new Map()
  );

  const componentsMap = new ComponentsMap(
    new Map(Object.entries({ default: ExpandedCustomNodeWidget })),
    new Map(Object.entries({ default: CustomLinkWidget }))
  );

  const nodes = [node1, node2, parent, grandparent];
  const metaNodes = nodes.map((item:MetaNode) => item.toModel());

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.main}>
        <MetaDiagram
          metaNodes={metaNodes}
          metaLinks={[]}
          componentsMap={componentsMap}
          metaTheme={{
            customThemeVariables: {},
            canvasClassName: classes.canvasBG,
          }}
          sidebarProps={{
              sidebarNodes: leftSideBarNodes,
          }}
        />
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
