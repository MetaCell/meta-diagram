import {PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import * as React from 'react';

export class DiamondNodeWidget extends React.Component<any> {
    render() {
        return (
            <div
                className={'diamond-node'}
                style={{
                    position: 'relative',
                    width: 250,
                    height:  250
                }}>
                <svg
                    width={ 250}
                    height={ 250}
                    dangerouslySetInnerHTML={{
                        __html:
                            `
          <g id="Layer_1">
          </g>
          <g id="Layer_2">
            <polygon fill="mediumpurple" stroke="${
                                this.props.model.isSelected() ? 'white' : '#000000'
                            }" stroke-width="3" stroke-miterlimit="10" points="10,` +
                             250 / 2 +
                            ` ` +
                             250 / 2 +
                            `,10 ` +
                            ( 250 - 10) +
                            `,` +
                             250 / 2 +
                            ` ` +
                             250 / 2 +
                            `,` +
                            ( 250 - 10) +
                            ` "/>
          </g>
        `
                    }}
                />
                <PortWidget
                    style={{
                        top:  250 / 2 - 8,
                        left: -8,
                        position: 'absolute'
                    }}
                    port={this.props.model.getPort('in')}
                    engine={this.props.engine}>
                </PortWidget>
                <PortWidget
                    style={{
                        left:  250 / 2 - 8,
                        top: -8,
                        position: 'absolute'
                    }}
                    port={this.props.model.getPort('out')}
                    engine={this.props.engine}>
                </PortWidget>
                
            </div>
        );
    }
}