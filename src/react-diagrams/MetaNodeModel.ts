import { PortTypes, ReactDiagramMetaTypes } from '../constants';
import { DefaultPortModel, NodeModel, PortModel } from '@projectstorm/react-diagrams';
import { MetaPort } from '../models/MetaPort';

export class MetaNodeModel extends NodeModel {
  constructor(options = { ports: Map<string, PortModel> }) {
    super({
      ...options,
      type: ReactDiagramMetaTypes.META_NODE,
    });

    // ts-ignore
    const values = Array.from(options.ports.values());
    values.forEach((port: PortModel) => {
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
