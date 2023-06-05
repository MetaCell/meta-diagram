import React from "react";
import {DropTargetMonitor} from "react-dnd";
import {CanvasEngine} from "@projectstorm/react-canvas-core";

export interface INode {
    id: string;
    icon: React.ReactElement;
    name: string;
    type: string;
    draggable: boolean;
    preCallback?: (event: any, node: unknown) => void;
    postCallback?: (event: any, node: unknown) => void;
    defaultCallback?: (event: any, node: unknown) => void;
    onNodeDrop?: (
        monitor: DropTargetMonitor,
        node: unknown,
        engine?: CanvasEngine
    ) => void;
    css?: React.CSSProperties;
    children?: INode[];
}

export interface ISidebarNodeProps extends INode {
    divider?: boolean;
}

interface IDefaultActions {
    enableDrag?: () => void;
    disableDrag?: () => void;
    setCreateLinkState?: (v: boolean) => void;
}

export interface SidebarItemProps extends IDefaultActions {
    node: INode | ISidebarNodeProps;
    selected?: boolean;
    updateSelected?: (id: string) => void;
}

export interface ISubSidebarItemProps {
    node: INode | ISidebarNodeProps;
    selected?: boolean;
    updateSelected?: (id: string) => void;
}

export interface ISidebarProps {
    selectedBarNode?: string;
    sidebarNodes?: ISidebarNodeProps[];
    updateSelectedBar?: (id: string) => void;
    engine: CanvasEngine;
}

export interface IHandleClick extends IDefaultActions {
    event: unknown;
    node: INode | ISidebarNodeProps;
    updateSelected?: (id: string) => void;
}

export interface ISubSidebar {
    show?: boolean;
    nodes?: INode[];
}

