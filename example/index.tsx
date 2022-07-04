import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MetaDiagram, {MetaNode, Position, ComponentsMap} from "./..";
import {CustomNodeWidget} from "./components/widgets/CustomNodeWidget";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(_ => ({
    main: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
}))

const App = () => {
    const classes = useStyles();

    const node1 = new MetaNode('1', 'node1', 'default',
        new Map(Object.entries({color: 'rgb(0,192,255)'})), new Position(10, 10))

    const componentsMap = new ComponentsMap(
        new Map(Object.entries({'default': CustomNodeWidget})),
        new Map<string, React.ComponentType>()
    )

    return (
        <div className={classes.main}>
            <MetaDiagram metaNodes={[node1]} metaLinks={[]} componentsMap={componentsMap} />
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
