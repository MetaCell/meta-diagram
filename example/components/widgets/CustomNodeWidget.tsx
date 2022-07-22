import * as React from "react";
import {DiagramEngine, PortWidget} from "@projectstorm/react-diagrams";
import {MetaNodeModel} from "../../../.";
import {Box, Button, Typography} from "@material-ui/core";

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
              <>
                <Button className="node-button">
                  <Box
                    className="icon"
                    style={customNodeStyles}
                  />
                  Show properties
                </Button>

                <Box className="nodes">
                  <PortWidget
                    engine={this.props.engine}
                    port={this.props.model.getPort("in")}
                  >
                    <Box style={{ left: '-0.375rem', top: '-0.375rem' }} className="pointer" />
                  </PortWidget>
                  <PortWidget
                    engine={this.props.engine}
                    port={this.props.model.getPort("out")}
                  >
                    <Box style={{ right: '-0.375rem', top: '-0.375rem' }} className="pointer" />
                  </PortWidget>

                  <PortWidget
                    engine={this.props.engine}
                    port={this.props.model.getPort("in")}
                  >
                    <Box style={{ left: '-0.375rem', bottom: '-0.375rem' }} className="pointer" />
                  </PortWidget>
                  <PortWidget
                    engine={this.props.engine}
                    port={this.props.model.getPort("out")}
                  >
                    <Box style={{ bottom: '-0.375rem', right: '-0.375rem' }} className="pointer" />
                  </PortWidget>
                </Box>
              </>
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
