import { MetaLinkModel } from './MetaLinkModel';
import { UnknownTypeWidget } from '../components/UnknownTypeWidget';
import { ReactDiagramMetaTypes } from '../constants';
import React from 'react';
import { DefaultLinkFactory } from '@projectstorm/react-diagrams';

export class MetaLinkFactory extends DefaultLinkFactory {
  componentsMap: Map<string, JSX.Element>;

  constructor(componentsMap: Map<string, JSX.Element>) {
    super(ReactDiagramMetaTypes.META_LINK);
    this.componentsMap = componentsMap;
  }

  generateModel() {
    return new MetaLinkModel();
  }

  generateLinkSegment(
    model: MetaLinkModel,
    selected: boolean,
    path: string
  ): JSX.Element {
    // @ts-ignore
    if (this.componentsMap.has(model.getOptions()?.shape)) {
      const ReactComponentType = this.componentsMap.get(
        // @ts-ignore
        model.getOptions().shape
      );

      return (
        // @ts-ignore
        <ReactComponentType diagramEngine={this.engine} link={model} path={path} selected={selected} />
      );
    }
    // TODO: Generate default link instead
    return <UnknownTypeWidget />;
  }
}
