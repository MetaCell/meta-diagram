import { Box, Button } from "@material-ui/core";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import * as React from "react";

type styleObject = {
  background: string;
  borderColor: string;
  boxShadow: string;
}

export interface NodeSelectionProps {
  style: styleObject;
  engine: DiagramEngine;
  port: any;
}

class NodeSelection extends React.Component<NodeSelectionProps> {
  render() {
    const { style, engine, port } = this.props;
    return (
      <>
        <Button className="node-button">
          <Box
            className="icon"
            style={style}
          />
          Show properties
        </Button>

        <Box className="nodes">
          <PortWidget
            engine={engine}
            port={port.getPort("in")}
          >
            <Box style={{ left: '-0.375rem', top: '-0.375rem' }} className="pointer" />
          </PortWidget>
          <PortWidget
            engine={engine}
            port={port.getPort("out")}
          >
            <Box style={{ right: '-0.375rem', top: '-0.375rem' }} className="pointer" />
          </PortWidget>

          <PortWidget
            engine={engine}
            port={port.getPort("in")}
          >
            <Box style={{ left: '-0.375rem', bottom: '-0.375rem' }} className="pointer" />
          </PortWidget>
          <PortWidget
            engine={engine}
            port={port.getPort("out")}
          >
            <Box style={{ bottom: '-0.375rem', right: '-0.375rem' }} className="pointer" />
          </PortWidget>
        </Box>
      </>
    )
  }
}

export default NodeSelection;