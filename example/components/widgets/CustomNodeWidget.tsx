import * as React from "react";
import {DiagramEngine} from "@projectstorm/react-diagrams";
import {MetaNodeModel} from "../../../.";
import {Box, Typography} from "@mui/material";
import NodeSelection from "./NodeSelection";

export interface CustomNodeWidgetProps {
    model: MetaNodeModel;
    engine: DiagramEngine;
}

export class CustomNodeWidget extends React.Component<CustomNodeWidgetProps> {
    render() {
        return (
          <Box className={`primary-node ${this.props.model.getOptions()['variant']}`}>
            {this.props.model.getOptions()['selected'] && (
              <NodeSelection engine={this.props.engine} port={this.props.model} />
            )}

            <Box className="primary-node_header">
              <img src="" alt={this.props.model.getOptions()['name']} />

              <Typography component="p">
                {this.props.model.getOptions()['name']}
              </Typography>
            </Box>
          </Box>
        );
    }
}

// @ts-ignore
export default CustomNodeWidget;
