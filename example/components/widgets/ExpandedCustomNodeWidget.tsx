import * as React from "react";
import { withStyles } from '@mui/styles';
import {DiagramEngine} from "@projectstorm/react-diagrams";
import {MetaNodeModel} from "../../../dist";
import {Box, Typography} from "@mui/material";
import NodeSelection from "./NodeSelection";
import InputOutputNode from "./InputOutputNode";
import vars from "../assets/styles/variables";

const styles = {
  root: {
    textColor: {
      color: vars.functionTextColor
    },
    codeColor: {
      color: vars.functionCodeColor
    }
  }
};

export interface ExpandedCustomNodeWidgetProps {
    model: MetaNodeModel;
    engine: DiagramEngine;
    classes: any;
}

export class ExpandedCustomNodeWidget extends React.Component<ExpandedCustomNodeWidgetProps> {
    render() {
        const { classes } = this.props;
        const functionValues = (label: string, value: string) => (
          <Box className="block">
            <Typography component="label">{label}</Typography>
            <Typography>{value}</Typography>
          </Box>
        )
        return (
          <Box className={`primary-node rounded ${this.props.model.getOptions()['variant']}`}>
            {this.props.model.getOptions()['selected'] && (
              <NodeSelection engine={this.props.engine} port={this.props.model} />
            )}

            <Box className="primary-node_header">
              <Box className="icon" />

              <Typography component="p">
                {this.props.model.getOptions()['name']}
              </Typography>
            </Box>

            <Box>
              <InputOutputNode text={"Input from Frame 1"} />
              <InputOutputNode text={"Input from Frame 2"} />
            </Box>

            <Box className="seprator" />

            <Box className="block-wrapper">
              {
                functionValues('Context', '12')
              }
              {
                functionValues('Size', '8.90')
              }
              {
                functionValues('Prefs', '44')
              }
              <Box className="block">
                <Typography component="label">Function</Typography>
                <Typography className="function">
                  <Typography component="strong" className={classes?.textColor} >
                    function
                  </Typography>=pnl.<Typography className={classes?.codeColor} component="strong">Logistic</Typography>(gain=1.0, bias=-4)</Typography>
              </Box>
            </Box>

            <Box className="seprator" />

            <Box>
              <InputOutputNode direction="right" text={"Input from Frame 1"} />
              <InputOutputNode direction="right" text={"Input from Frame 2"} />
            </Box>
          </Box>
        );
    }
}

// @ts-ignore
export default withStyles(styles)(ExpandedCustomNodeWidget);
