import React, {useEffect, Fragment} from 'react';
import {Box, List} from '@mui/material';

import SidebarItem from './SidebarItem';
import SubSiderBar from './SubSiderBar';
import {ISidebarProps} from "../../types/sidebar";
import {DefaultState} from "../../react-diagrams/state/DefaultState";
import {updateCanvasMouseCursor} from "../../utils";
import {CursorTypes} from "../../constants";

const Sidebar = ({
                     engine,
                     sidebarNodes,
                     updateSelectedBar,
                 }: ISidebarProps) => {
    const [selected, setSelected] = React.useState<string | null>(null);

    const state = engine
        .getStateMachine()
        .getCurrentState() as DefaultState;

    const enableDrag = () => {
        if (!state.dragCanvas.config.allowDrag) {
            state.dragCanvas.config.allowDrag = true;
            updateCanvasMouseCursor(CursorTypes.MOVE);
        }
    };

    const disableDrag = () => {
        if (state.dragCanvas.config.allowDrag) {
            state.dragCanvas.config.allowDrag = false;
            updateCanvasMouseCursor(CursorTypes.DEFAULT);
        }
    };

    const setCreateLinkState = (value: boolean) => {
        state.createLink.config.allowCreate = value;
        if (value) {
            updateCanvasMouseCursor(CursorTypes.CROSSHAIR);
        }
    };

    const updateSelected = (id: string) => {
        setSelected(id);
        if (updateSelectedBar) updateSelectedBar(id);
    };

    useEffect(() => {
        disableDrag();
        updateCanvasMouseCursor(CursorTypes.DEFAULT);
    }, []);

    return (
        <>
            {Array.isArray(sidebarNodes) && (
                <Box className="sidebar">
                    <List component="nav" disablePadding>
                        {sidebarNodes.map(node => {
                            const isSelected = selected === node.id;

                            return (
                                <Fragment key={node.id}>
                                    <SidebarItem
                                        key={node.id}
                                        {...{node}}
                                        selected={isSelected}
                                        updateSelected={updateSelected}
                                        enableDrag={enableDrag}
                                        disableDrag={disableDrag}
                                        setCreateLinkState={setCreateLinkState}
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