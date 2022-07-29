import { Box, Button } from "@mui/material";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import * as React from "react";
import PortWigetComp from "./PortWidgetComp";

export interface NodeSelectionProps {
  engine: DiagramEngine;
  port: any;
}

class NodeSelection extends React.Component<NodeSelectionProps> {
  render() {
    const { engine, port } = this.props;
    const selectionPoint = '-0.375rem';
    const IN = 'in';
    const OUT = 'out';
    return (
      <>
        <Button className="node-button">
          <Box
            className="icon"
          />
          Show properties
        </Button>

        <Box className="nodes">
          <PortWigetComp engine={engine} port={port} direction={IN} startPoints={{ left: selectionPoint, top: selectionPoint }} />
          <PortWigetComp engine={engine} port={port} direction={OUT} startPoints={{ right: selectionPoint, top: selectionPoint }} />
          <PortWigetComp engine={engine} port={port} direction={IN} startPoints={{ left: selectionPoint, bottom: selectionPoint }} />
          <PortWigetComp engine={engine} port={port} direction={OUT} startPoints={{ right: selectionPoint, bottom: selectionPoint }} />
        </Box>
      </>
    )
  }
}

export default NodeSelection;