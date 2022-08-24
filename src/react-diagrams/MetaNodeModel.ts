import { MetaPort } from '../models/MetaPort';
import { PortTypes, ReactDiagramMetaTypes } from '../constants';
import { DefaultPortModel, NodeModel } from '@projectstorm/react-diagrams';

export class MetaNodeModel extends NodeModel {
  constructor(options = {}) {
    super({
      ...options,
      type: ReactDiagramMetaTypes.META_NODE,
    });

    // @ts-ignore
    options?.ports?.forEach((port: MetaPort) => {
      switch (port.getType()) {
        case PortTypes.INPUT_PORT:
          this.addPort(
            new DefaultPortModel({
              in: true,
              name: port.getName(),
            })
          );
          break;
        case PortTypes.OUTPUT_PORT:
          this.addPort(
            new DefaultPortModel({
              in: false,
              name: port.getName(),
            })
          );
          break;
        case PortTypes.PARAMETER_PORT:
          console.log('parameter type found!');
          break;
        default:
          console.error('Port type')
      }
    });
  }
}
