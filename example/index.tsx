import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MetaDiagram, { MetaNode, Position, ComponentsMap, MetaLink, MetaPort, PortTypes } from './..';
// import {makeStyles} from "@material-ui/core";
import CustomLinkWidget from './components/widgets/CustomLinkWidget';
import BG from './components/assets/svg/bg-dotted.svg';
import CustomNodeWidget from './components/widgets/CustomNodeWidget';
import { ExpandedCustomNodeWidget } from './components/widgets/ExpandedCustomNodeWidget';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

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

const App = () => {
  const classes = useStyles();

  const grandparent = new MetaNode(
    'group2',
    'grandparent',
    'default',
    new Position(130, 105),
    'node-red',
    null,
    [new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined), new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined)],
    new Map(Object.entries({ color: 'rgb(0,255,0)' }))
  );

  const parent = new MetaNode(
    'group',
    'parent',
    'default',
    new Position(130, 105),
    'node-blue',
    grandparent,
    [new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined), new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined)],
    new Map(Object.entries({ color: 'rgb(255,0,0)' }))
  );

  const node1 = new MetaNode(
    '1',
    'node1',
    'default',
    new Position(130, 105),
    'node-red',
    parent,
    [new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined), new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined)],
    new Map(Object.entries({ color: 'rgb(0,192,255)' }))
  );

  const node2 = new MetaNode(
    '2',
    'node2',
    'default',
    new Position(130, 210),
    'node-blue',
    parent,
    [new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined), new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined)],
    new Map(Object.entries({ color: 'rgb(255,255,0)' }))
  );

  const link3 = new MetaLink(
    '3',
    'link3',
    'default',
    '1',
    'out',
    '2',
    'in',
    undefined,
    new Map(Object.entries({ color: 'rgb(255,192,0)' }))
  );

  const componentsMap = new ComponentsMap(
    new Map(Object.entries({ default: ExpandedCustomNodeWidget })),
    new Map(Object.entries({ default: CustomLinkWidget }))
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.main}>
        <MetaDiagram
          metaNodes={[node1, node2, parent, grandparent]}
          metaLinks={[]}
          componentsMap={componentsMap}
          metaTheme={{
            customThemeVariables: {},
            canvasClassName: classes.canvasBG,
          }}
        />
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
