import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { MetaNode } from './models/MetaNode';
import { MetaLink } from './models/MetaLink';
import { MetaPort } from './models/MetaPort';
import CssBaseline from '@mui/material/CssBaseline';
import { ComponentsMap } from './models/ComponentsMap';
import { LinkModel, PortWidget } from '@projectstorm/react-diagrams';
import { MetaNodeModel, MetaPortModel } from './react-diagrams/MetaNodeModel';
import { MetaNodeFactory } from './react-diagrams/MetaNodeFactory';
import { MetaLinkFactory } from './react-diagrams/MetaLinkFactory';
import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import theme from './theme';
import { DefaultSidebarNodeTypes, EventTypes } from './constants';
import { CanvasWidget } from './components/CanvasWidget';
import { MetaLinkModel } from './react-diagrams/MetaLinkModel';
import { DefaultState } from './react-diagrams/state/DefaultState';
import { ISidebarNodeProps } from './types/sidebar';
import Sidebar from './components/sidebar/Sidebar';
// import { InputType } from '@projectstorm/react-canvas-core';

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

interface MetaDiagramProps {
  metaNodes: MetaNodeModel[];
  metaLinks: MetaLinkModel[];
  componentsMap: ComponentsMap;
  sidebarNodes?: ISidebarNodeProps[];
  selectedSidebarNodeId?: string;
  updateSidebarSelection?: (id: string) => void;
  wrapperClassName?: string;
  canvasClassName?: string;
  metaTheme: {
    customThemeVariables: {};
    canvasClassName: string;
  };
  metaCallback?: Function;
  onMount?: Function;
  globalProps?: any;
}

const MetaDiagram = forwardRef(
  (
    {
      metaNodes,
      metaLinks,
      componentsMap,
      wrapperClassName,
      metaTheme,
      sidebarNodes,
      selectedSidebarNodeId,
      updateSidebarSelection,
      metaCallback,
      onMount,
      globalProps,
    }: MetaDiagramProps,
    ref
  ) => {
    const classes = useStyles();
    const linkRef = React.useRef<any>();
    const onMountRef = React.useRef<Function | undefined>(onMount);

    // initialize custom diagram state
    let state = new DefaultState(globalProps?.createLink);

    state.isSelection = false;

    // Sets up the diagram engine
    // By using useMemo, we ensure that the createEngine() function is only called when the component mounts,
    // and the same engine instance is reused on subsequent re-renders.
    const engine = useMemo(() => createEngine(), [metaNodes, metaLinks]);

    if (metaCallback === undefined) {
      metaCallback = (node: any) => {
        console.log(node);
      };
    }

    // register factories
    engine
      .getNodeFactories()
      // @ts-ignore
      .registerFactory(new MetaNodeFactory(componentsMap.nodes));

    engine
      .getLinkFactories()
      // @ts-ignore
      .registerFactory(
        !!globalProps.CustomLinkFactory
          ? new globalProps.CustomLinkFactory(componentsMap.links)
          : new MetaLinkFactory(componentsMap.links)
      );

    if (!!globalProps.CustomPortFactory) {
      engine
        .getPortFactories()
        // @ts-ignore
        .registerFactory(new globalProps.CustomPortFactory());
    }

    // set up the diagram model
    const model = new DiagramModel();

    // remove any previous listeners from nodes
    metaNodes.forEach((node: any) => {
      const listenerIds = Object.keys(node.listeners);
      listenerIds.forEach(id => {
        const listener = node.listeners[id];
        Object.keys(listener).forEach(event => {
          if (
            event === 'nodeUpdated' ||
            event === 'eventDidFire' ||
            event === 'eventWillFire'
          ) {
            node.deregisterListener(listener[event]);
          }
        });
      });
      node.listeners = {};
    });

    // add all entities to the model
    let models = model.addAll(...metaNodes, ...metaLinks);

    // define callbacks

    let preCallback = (event: any) => {
      event.metaEvent = EventTypes.PRE_UPDATE;
      // @ts-ignore
      let repaint = metaCallback(event);
      if (repaint) {
        engine.repaintCanvas();
      }
    };

    let postCallback = (event: any) => {
      event.metaEvent = EventTypes.POST_UPDATE;
      // @ts-ignore
      let repaint = metaCallback(event);
      if (repaint) {
        engine.repaintCanvas();
      }
    };

    let removeNotValidLink = () => {
      const link: LinkModel = linkRef.current.link;
      const sourcePort = link.getSourcePort();
      const targetPort = link.getTargetPort();
      if (sourcePort && !targetPort) {
        engine.getModel().removeLink(link);
      }
      linkRef.current = null;
    };

    let registerNodeListeners = (node: any) => {
      node.registerListener({
        nodeUpdated: postCallback,
        eventDidFire: postCallback,
        eventWillFire: preCallback,
      });
    };

    models.forEach((item: any) => {
      registerNodeListeners(item);
    });

    // add listeners to the model
    model.registerListener({
      nodeUpdated: postCallback,
      eventDidFire: postCallback,
      eventWillFire: preCallback,
      linksUpdated: (event: any) => {
        linkRef.current = event;
      },
    });

    const clearSelection = () => {
      engine.getModel().clearSelection();
    };

    // update state selection state
    const updateSelection = (id: string) => {
      const isSelect = id === DefaultSidebarNodeTypes.SELECT;
      if (!!updateSidebarSelection) updateSidebarSelection(id);

      if (isSelect && Boolean(state.isSelection)) {
        return;
      }

      if (id !== DefaultSidebarNodeTypes.CREATE_LINK && !!linkRef.current) {
        removeNotValidLink();
      }
      if (Boolean(state.isSelection) || !isSelect) {
        clearSelection();
      }
      if (engine) {
        repaintCanvas();
      }
    };

    // load model into engine
    engine.setModel(model);

    // Use this custom "DefaultState" instead of the actual default state we get with the engine
    engine.getStateMachine().pushState(state);

    // check globalProps for any actions to perform
    // if (globalProps !== undefined) {
    //   if (globalProps?.disableDeleteDefaultKey) {
    //     const actions = engine
    //       .getActionEventBus()
    //       .getActionsForType(InputType.KEY_DOWN);
    //     actions.forEach((action: any) => {
    //       // needs to find a better approach for this but for now this will do
    //       if (action.constructor.name === 'DeleteItemsAction') {
    //         engine.getActionEventBus().deregisterAction(action);
    //       }
    //     });
    //   }
    // }

    useEffect(() => {
      if (onMountRef.current === undefined) {
        onMountRef.current = (engine: any) => {
          console.log(engine);
        };
      }
      onMountRef.current(engine);
    }, [engine]);

    // expose api
    const addNode = (node: any) => {
      node.registerListener({
        nodeUpdated: postCallback,
        eventDidFire: postCallback,
        eventWillFire: preCallback,
      });
      engine.getModel().addNode(node);
    };

    const repaintCanvas = () => {
      engine.repaintCanvas();
    };

    useImperativeHandle(ref, () => ({
      addNode,
      repaintCanvas,
    }));

    // render
    const containerClassName = wrapperClassName
      ? wrapperClassName
      : classes.container;

    return (
      <ThemeProvider
        theme={createTheme(theme(metaTheme?.customThemeVariables))}
      >
        <DndProvider backend={HTML5Backend}>
          <CssBaseline />
          <Box className={containerClassName} ref={ref}>
            <Sidebar
              engine={engine}
              selected={selectedSidebarNodeId}
              sidebarNodes={sidebarNodes}
              updateSelection={updateSelection}
            />{' '}
            <CanvasWidget
              engine={engine}
              className={metaTheme?.canvasClassName}
            />
          </Box>
        </DndProvider>
      </ThemeProvider>
    );
  }
);

export default MetaDiagram;
export {
  MetaNode,
  MetaLink,
  MetaPort,
  MetaNodeModel,
  ComponentsMap,
  MetaPortModel,
};
export { PortWidget };
export { MetaLinkModel } from './react-diagrams/MetaLinkModel';
export { MetaLinkFactory } from './react-diagrams/MetaLinkFactory';
export { PortTypes } from './constants';
export { CallbackTypes } from './constants';
export {
  EventTypes,
  DefaultSidebarNodeTypes,
  ReactDiagramMetaTypes,
} from './constants';
