import { MetaLinkModel } from "./MetaLinkModel";
import { UnknownTypeWidget } from "../components/UnknownTypeWidget";
import { ReactDiagramMetaTypes } from "../constants";
import React from "react";
import { DefaultLinkFactory } from "@projectstorm/react-diagrams";

export class MetaLinkFactory extends DefaultLinkFactory {
  componentsMap: Map<string, React.ComponentType>;

  constructor(componentsMap: Map<string, React.ComponentType>) {
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
        <ReactComponentType
          key={`link-factory-${model.getOptions().id}`}
          engine={this.engine}
          model={model}
          path={path}
          selected={selected}
        />
      );
    }
    // TODO: Generate default link instead
    return <UnknownTypeWidget />;
  }
}
