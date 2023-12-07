import React, { Fragment } from 'react';
import { Box, List } from '@mui/material';

import SidebarItem from './SidebarItem';
import SubSiderBar from './SubSiderBar';
import { ISidebarProps, StateMap } from '../../types/sidebar';
import { DefaultState } from '../../react-diagrams/state/DefaultState';
import { DefaultSidebarNodeTypes } from '../../constants';
import { PanningState } from './states/PanningState';
import { CreateLinkState } from './states/CreateLinkState';
import { SelectionState } from './states/SelectionState';

const Sidebar = ({
  selected,
  sidebarNodes,
  updateSelection,
  engine,
}: ISidebarProps) => {
  const [currentState, setCurrentState] = React.useState<string | null>(
    () => selected ?? DefaultSidebarNodeTypes.CREATE_LINK
  );

  const reactDiagramsState = engine
    .getStateMachine()
    .getCurrentState() as DefaultState;

  const stateMap: StateMap = {
    [DefaultSidebarNodeTypes.SELECT]: new SelectionState(reactDiagramsState),
    [DefaultSidebarNodeTypes.PANNING]: new PanningState(reactDiagramsState),
    [DefaultSidebarNodeTypes.CREATE_LINK]: new CreateLinkState(
      reactDiagramsState
    ),
  };

  const handleSelection = (selectedID: DefaultSidebarNodeTypes) => {
    if (currentState) {
      stateMap[currentState as DefaultSidebarNodeTypes]?.onExit();
    }

    setCurrentState(selectedID);
    stateMap[selectedID]?.onEnter();
    updateSelection(selectedID);
  };

  React.useEffect(() => {
    handleSelection(currentState as DefaultSidebarNodeTypes);
  }, []);

  return (
    <>
      {Array.isArray(sidebarNodes) && (
        <Box className="sidebar">
          <List component="nav" disablePadding>
            {sidebarNodes.map(node => {
              const isSelected = currentState === node.id;

              return (
                <Fragment key={node.id}>
                  <SidebarItem
                    key={node.id}
                    {...{ node }}
                    selected={isSelected}
                    handleSelection={handleSelection}
                  />
                  {Array.isArray(node.children) && (
                    <SubSiderBar
                      key={`sub-sidebar-${node.id}`}
                      nodes={node.children}
                      show={isSelected}
                    />
                  )}
                </Fragment>
              );
            })}
          </List>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
