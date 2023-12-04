import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { MetaNodeModel } from './MetaNodeModel';
import { UnknownTypeWidget } from '../components/UnknownTypeWidget';
import React from 'react';
import { ReactDiagramMetaTypes } from '../constants';

export class MetaNodeFactory extends AbstractReactFactory {
  componentsMap: Map<string, React.ComponentType>;

  constructor(componentsMap: Map<string, React.ComponentType>) {
    super(ReactDiagramMetaTypes.META_NODE);
    this.componentsMap = componentsMap;
  }

  generateModel() {
    return new MetaNodeModel();
  }

  generateReactWidget(event: any): JSX.Element {
    if (this.componentsMap.has(event.model.options.shape)) {
      const ReactComponentType = this.componentsMap.get(
        event.model.options.shape
      );
      return (
        // @ts-ignore
        <ReactComponentType
          key={`node-factory-${event.model.getOptions().id}`}
          engine={this.engine}
          node={event.model}
        />
      );
    }
    // TODO: Generate default node instead
    return <UnknownTypeWidget />;
  }
}
