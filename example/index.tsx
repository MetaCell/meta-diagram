import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MetaDiagram, {
    CallbackTypes,
    ComponentsMap,
    DefaultSidebarNodeTypes,
    MetaLink,
    MetaNode,
    MetaPort,
    PortTypes,
} from '@metacell/meta-diagram';
import CustomLinkWidget from './components/widgets/CustomLinkWidget';
// @ts-ignore
import BG from './components/assets/svg/bg-dotted.svg';
import {ExpandedCustomNodeWidget} from './components/widgets/ExpandedCustomNodeWidget';
import {makeStyles} from '@mui/styles';
import {ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import {Point} from '@projectstorm/geometry';
import FolderIcon from '@mui/icons-material/Folder';
import {DiagramEngine} from '@projectstorm/react-diagrams';
import {HandIcon, MoveToolIcon, ShapeArrowToolIcon} from "../src/components/assets/icons";

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

let counter = 0;

export function onNodeDrop(monitor, node, engine: DiagramEngine) {
    const options = new Map();
    const position = monitor?.getClientOffset();
    const newMetaNode = new MetaNode(
        `${node.id}-${counter}`,
        `${node.name}-${counter}`,
        'default',
        new Point(position.x, position.y),
        node.type,
        null,
        [
            new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined),
            new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined),
        ],
        [],
        options
    );

    if (engine) {
        const eng = engine.getModel().getSelectedEntities();
        eng[0].counter++;
        return engine.getModel().addNode(newMetaNode.toModel());
    }
}


export const leftSideBarNodes = [
    {
        id: DefaultSidebarNodeTypes.SELECT,
        type: 'selectFunction',
        name: 'Select functionality',
        icon: <MoveToolIcon/>,
        draggable: false,
        preCallback: (event, node) => {
            console.log(event, node, 'selectFunction');
            // return true;
        },
        // onNodeDrop,
    },

    {
        id: DefaultSidebarNodeTypes.PANNING,
        type: 'panningFunction',
        name: 'Panning functionality',
        icon: <HandIcon/>,
        preCallback: (event, node) => {
            console.log(event, node, 'panningFunction');

            // return true; // return false to prevent the default behaviour.
        },
        postCallback: (event, node) => {
            // return true; // return false to prevent the default behaviour.
        },
        draggable: false,
        // onNodeDrop,
    },
    {
        id: DefaultSidebarNodeTypes.CREATE_LINK,
        type: 'Default',
        name: 'Create a projection',
        icon: <ShapeArrowToolIcon/>,
        draggable: false,
        onNodeDrop,
    },
    {
        id: 'newComposition',
        type: 'Default',
        name: 'Create a composition',
        icon: <FolderIcon/>,
        draggable: true,
        onNodeDrop,
    },
];

const App = () => {
    const classes = useStyles();
    const metaRef = React.createRef();
    const [engine, setEngine] = React.useState()

    const node1 = new MetaNode(
        '1',
        'node1',
        'default',
        new Point(100, 100),
        'node-red',
        undefined,
        [
            new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined),
            new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined),
        ],
        [],
        new Map()
    );

    const node2 = new MetaNode(
        '2',
        'node2',
        'default',
        new Point(500, 100),
        'node-blue',
        undefined,
        [
            new MetaPort('in', 'in', PortTypes.INPUT_PORT, undefined, undefined),
            new MetaPort('out', 'out', PortTypes.OUTPUT_PORT, undefined, undefined),
        ],
        [],
        new Map()
    );


    const nodes = [node1, node2];
    const metaNodes = nodes.map((item: MetaNode) => item.toModel());

    const link = new MetaLink(
        'testlink',
        'testlink',
        'default',
        node1.getId(),
        'out',
        node2.getId(),
        'in',
        '',
        new Map()
    );
    const linkModel = link.toModel()


    const metaLinks = [linkModel]

    const componentsMap = new ComponentsMap(
        new Map(Object.entries({default: ExpandedCustomNodeWidget})),
        new Map(Object.entries({default: CustomLinkWidget}))
    );

    // React.useEffect(() => {
    //     if(engine){
    //         // engine.repaintCanvas()
    //         // engine.recalculatePortsVisually()
    //     }
    // }, [engine])

    const test = (engine) => {
        linkModel.setSourcePort(metaNodes[0].getPort('out'));
        linkModel.setTargetPort(metaNodes[1].getPort('in'));
        linkModel.flagUpdate(CallbackTypes.LINK_UPDATED)
        engine.repaintCanvas()
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className={classes.main}>
                <MetaDiagram
                    ref={metaRef}
                    onMount={(engine) => test(engine)}
                    metaNodes={metaNodes}
                    metaLinks={metaLinks}
                    componentsMap={componentsMap}
                    sidebarNodes={leftSideBarNodes}
                    metaTheme={{
                        customThemeVariables: {},
                        canvasClassName: classes.canvasBG,
                    }}
                    globalProps={{
                        disableZoom: false,
                        disableMoveCanvas: false,
                        disableMoveNodes: false,
                        disableDeleteDefaultKey: false,
                    }}
                />
            </div>
        </ThemeProvider>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
