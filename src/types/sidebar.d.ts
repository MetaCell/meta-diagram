import React from "react";
import {DropTargetMonitor} from "react-dnd";
import {CanvasEngine} from "@projectstorm/react-canvas-core";
import {DefaultSidebarNodeTypes} from "../constants";
import {State} from "../components/sidebar/states/State";

export type StateMap = {
    [key in DefaultSidebarNodeTypes]?: State;
};

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

interface IHandleSelection {
    handleSelection: (id: DefaultSidebarNodeTypes) => void;
}

export interface SidebarItemProps extends IHandleSelection {
    node: INode | ISidebarNodeProps;
    selected?: boolean;
}

export interface ISubSidebarItemProps extends IHandleSelection{
    node: INode | ISidebarNodeProps;
    selected?: boolean;
}

export interface ISidebarProps {
    selectedBarNode?: string;
    sidebarNodes?: ISidebarNodeProps[];
    updateSelection: (id: string) => void;
    engine: CanvasEngine;
}

export interface IHandleClick extends IHandleSelection {
    event: unknown;
    node: INode | ISidebarNodeProps;
}

export interface ISubSidebar {
    show?: boolean;
    nodes?: INode[];
}

