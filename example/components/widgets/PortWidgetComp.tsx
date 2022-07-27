import * as React from "react";
import { Box } from "@material-ui/core";
import { PortWidget } from "@projectstorm/react-diagrams";

const PortWigetComp = (props) => {
  const { engine, port, direction, startPoints } = props;
  return (
    <PortWidget
      engine={engine}
      port={port.getPort(direction)}
    >
      <Box style={startPoints} className="pointer" />
    </PortWidget>
  )
}
export default PortWigetComp;