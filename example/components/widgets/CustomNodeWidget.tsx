import * as React from "react";
import {DiagramEngine, PortWidget} from "@projectstorm/react-diagrams";
import {MetaNodeModel} from "../../../.";
import {Typography} from "@material-ui/core";

export interface CustomNodeWidgetProps {
    model: MetaNodeModel;
    engine: DiagramEngine;
}

export class CustomNodeWidget extends React.Component<CustomNodeWidgetProps> {

    render() {
        // @ts-ignore
        const customNodeStyle = {
            zIndex: 999999999,
            border: "solid 2px gray",
            borderRadius: "5px",
            width: "250px",
            height: "200px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            position: "relative",
            background: this.props.model.getOptions()['color'] || "darkgray",
            top: this.props.model.getY(),
            left: this.props.model.getX()
        }

        // console.log("Node Render Position: ")
        // console.log(this.props.model.getX() + ":" + this.props.model.getY())

        const circlePortStyle = {
            width: "12px",
            height: "12px",
            margin: "2px",
            borderRadius: "4px",
            background: "darkgray",
            cursor: "pointer",
        }

        return (
            <>
                <div style={customNodeStyle}>
                    <PortWidget
                        style={{position: 'absolute', top: '0px', left: '0px'}}
                        engine={this.props.engine}
                        port={this.props.model.getPort("in")}
                    >
                        <div style={circlePortStyle}/>
                    </PortWidget>
                    <PortWidget
                        style={{position: 'absolute', top: '0px', right: '0px'}}
                        engine={this.props.engine}
                        port={this.props.model.getPort("out")}
                    >
                        <div style={circlePortStyle}/>
                    </PortWidget>
                    <Typography>{this.props.model.getOptions()['name']}</Typography>
                </div>
            </>
        );
    }
}

// @ts-ignore
export default CustomNodeWidget;
