import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MetaDiagram, {MetaNode, Position, ComponentsMap, MetaLink} from "./..";
import {CustomNodeWidget} from "./components/widgets/CustomNodeWidget";
import {makeStyles} from "@material-ui/core";
import CustomLinkWidget from "./components/widgets/CustomLinkWidget";
import BG from "./components/assets/svg/bg-dotted.svg";

const useStyles = makeStyles(_ => ({
    main: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    canvasBG: {
        backgroundImage: `url(${BG})`
    }
}))

const App = () => {
    const classes = useStyles();

    const grandparent = new MetaNode('group2', 'grandparent', 'default', new Position(0, 0),
        null, new Map(Object.entries({color: 'rgb(0,255,0)'})))

    const parent = new MetaNode('group', 'parent', 'default', new Position(130, 105),
        grandparent, new Map(Object.entries({color: 'rgb(255,0,0)'})))

    const node1 = new MetaNode('1', 'node1', 'default', new Position(130, 105), parent,
        new Map(Object.entries({color: 'rgb(0,192,255)'})))

    const node2 = new MetaNode('2', 'node2', 'default', new Position(130, 210), parent,
        new Map(Object.entries({color: 'rgb(255,255,0)'})))

    const link3 = new MetaLink('3', 'link3', 'default', '1', 'out', '2', 'in',
        new Map(Object.entries({color: 'rgb(255,192,0)'})))

    const componentsMap = new ComponentsMap(
        new Map(Object.entries({'default': CustomNodeWidget})),
        new Map(Object.entries({'default': CustomLinkWidget}))
    )

    return (
        <div className={classes.main}>
            <MetaDiagram metaNodes={[node1, node2, parent, grandparent]} metaLinks={[link3]} componentsMap={componentsMap}
                metaTheme={{
                    customThemeVariables: {},
                    canvasClassName: classes.canvasBG,
                }}
            />
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
