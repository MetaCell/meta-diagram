import * as React from "react";
import {DiagramEngine} from "@projectstorm/react-diagrams";
import {MetaNodeModel} from "../../../.";
import {Box, Typography} from "@material-ui/core";
import NodeSelection from "./NodeSelection";

export interface CustomNodeWidgetProps {
    model: MetaNodeModel;
    engine: DiagramEngine;
}

export class CustomNodeWidget extends React.Component<CustomNodeWidgetProps> {
    render() {
        const customNodeStyles = {
          background: this.props.model.getOptions()['backgroundColor'],
          borderColor: this.props.model.getOptions()['borderColor'],
          boxShadow: this.props.model.getOptions()['backgrounboxShadowdColor'],
        };
        return (
          <Box position='relative'>
            {this.props.model.getOptions()['selected'] && (
              <NodeSelection style={customNodeStyles} engine={this.props.engine} port={this.props.model} />
            )}

            <Box
              className="node"
              style={customNodeStyles}
            >
              <img src={this.props.model.getOptions()['icon']} alt={this.props.model.getOptions()['name']} />
              <Typography component="p" style={{ color: this.props.model.getOptions()['textColor'] }}>
                {this.props.model.getOptions()['name']}
              </Typography>
            </Box>
          </Box>
        );
    }
}

// @ts-ignore
export default CustomNodeWidget;
