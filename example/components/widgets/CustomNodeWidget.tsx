import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import {DiagramEngine, PortWidget} from "@projectstorm/react-diagrams";
import {MetaNodeModel} from "../../../.";

const styles = (theme) => ({
    root: {
        display: "flex",
        alignItems: "stretch",
    },
});

export interface CustomNodeWidgetProps {
    node: MetaNodeModel;
    engine: DiagramEngine;
}

export class CustomNodeWidget extends React.Component<CustomNodeWidgetProps> {
    render() {
        return (
            <>
                <div className="custom-node" style={{ zIndex: 999999999 }}>
                    <PortWidget
                        style={{position: 'absolute', top: '0px', left: '0px'}}
                        engine={this.props.engine}
                        port={this.props.node.getPort("in")}
                    >
                        <div className="circle-port" />
                    </PortWidget>
                    <PortWidget
                        style={{position: 'absolute', top: '0px', right: '0px'}}
                        engine={this.props.engine}
                        port={this.props.node.getPort("out")}
                    >
                        <div className="circle-port" />
                    </PortWidget>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(CustomNodeWidget);
