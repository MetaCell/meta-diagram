import React from 'react';
import { cloneElement } from 'react';
import { ListItemButton, ListItemIcon, Tooltip } from '@mui/material';
import { useDrag } from 'react-dnd';


import {subBarStyle} from "../../theme";
import {ISubSidebarItemProps} from "../../types/sidebar";
import {CanvasDropTypes} from "../../constants";
import handleItemClick from "./utils";

export const SubSidebarItem = ({
                                   node,
                                   selected,
                                   updateSelected,
                               }: ISubSidebarItemProps) => {
    const [{}, dragRef, dragPreview] = useDrag(
        () => ({
            type: CanvasDropTypes.CANVAS_NODE,
            item: node,
            collect: monitor => ({
                isDragging: monitor.isDragging(),
                opacity: monitor.isDragging() ? 0.9 : 1,
            }),
        }),
        [node]
    );
    const { icon, name, id, draggable } = node;

    const iconColor = selected ? '#fff' : 'rgba(26, 26, 26, 0.6)';

    return (
        <Tooltip id={id} title={name} placement="right" arrow>
            <ListItemButton
                selected={selected}
                onClick={event => {
                    handleItemClick({
                        event,
                        node,
                        updateSelected,
                    });
                }}
                ref={dragPreview}
                sx={subBarStyle}
            >
                <ListItemIcon ref={draggable ? dragRef : null}>
                    {cloneElement(icon, { color: iconColor })}
                </ListItemIcon>
            </ListItemButton>
        </Tooltip>
    );
};

export default SubSidebarItem;
