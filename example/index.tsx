import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MetaDiagram, {MetaNode, Position, ComponentsMap, MetaLink} from "./..";
import {ExpandedCustomNodeWidget} from "./components/widgets/ExpandedCustomNodeWidget";
import { makeStyles } from "@mui/styles";
import CustomLinkWidget from "./components/widgets/CustomLinkWidget";
import BG from "./components/assets/svg/bg-dotted.svg";
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
    backgroundImage: `url(${BG})`
  }
}));

const App = () => {
    const classes = useStyles();

    const node1 = new MetaNode('1', 'Node 1', 'default', new Position(250, 100), 'node-red', undefined)

    // const node2 = new MetaNode('2', 'Node 2', 'default', new Position(500, 100), 'node-blue', undefined)

    const link3 = new MetaLink('3', 'link3', 'default', '1', 'out', '2', 'in', undefined,
        new Map(Object.entries({color: 'rgb(255,192,0)'})))

    const componentsMap = new ComponentsMap(
        new Map(Object.entries({'default': ExpandedCustomNodeWidget})),
        new Map(Object.entries({'default': CustomLinkWidget}))
    )

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.main}>
          <MetaDiagram metaNodes={[node1]} metaLinks={[link3]} componentsMap={componentsMap}
            metaTheme={{
                customThemeVariables: {},
                canvasClassName: classes.canvasBG,
            }}
          />
        </div>
      </ThemeProvider>

    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
