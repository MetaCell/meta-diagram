import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { MetaNodeModel } from './MetaNodeModel';
import React from 'react';
export declare class MetaNodeFactory extends AbstractReactFactory {
    componentsMap: Map<string, React.ComponentType>;
    constructor(componentsMap: Map<string, React.ComponentType>);
    generateModel(): MetaNodeModel;
    generateReactWidget(event: any): JSX.Element;
}
