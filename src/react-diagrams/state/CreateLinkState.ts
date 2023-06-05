import {Action, ActionEvent, InputType, State} from '@projectstorm/react-canvas-core';
import {PortModel, LinkModel, DiagramEngine} from '@projectstorm/react-diagrams-core';
import {MouseEvent} from 'react';

export interface CreateLinkStateOptions {
    /**
     * If enabled, the canvas is available to drag
     */
    allowCreate?: boolean;
}

/**
 * This state is controlling the creation of a link.
 */
export class CreateLinkState extends State<DiagramEngine> {
    sourcePort: PortModel | undefined;
    link: LinkModel | undefined;
    config: CreateLinkStateOptions;

    constructor() {
        super({name: 'create-new-link'});
        this.config = {
            allowCreate: true,
        };

        // @ts-ignore
        this.registerAction(
            new Action({
                type: InputType.MOUSE_UP,
                fire: (actionEvent: ActionEvent<MouseEvent | any>) => {
                    if (!this.config.allowCreate) {
                        return;
                    }
                    const element = this.engine.getActionEventBus().getModelForEvent(actionEvent);
                    const {
                        event: {clientX, clientY}
                    } = actionEvent;
                    const ox = this.engine.getModel().getOffsetX();
                    const oy = this.engine.getModel().getOffsetY();

                    if (element instanceof PortModel && !this.sourcePort) {
                        this.sourcePort = element;

                        const link = this.sourcePort.createLinkModel()!;
                        link.setSourcePort(this.sourcePort);
                        link.getFirstPoint().setPosition(clientX - ox, clientY - oy);
                        link.getLastPoint().setPosition(clientX - ox + 20, clientY - oy + 20);

                        this.link = this.engine.getModel().addLink(link);
                    } else if (element instanceof PortModel && this.sourcePort && element != this.sourcePort) {
                        if (this.sourcePort.canLinkToPort(element)) {
                            if (!this.link) return;
                            this.link.setTargetPort(element);
                            element.reportPosition();
                            this.clearState();
                            this.eject();
                        }
                    } else if (this.link && element === this.link.getLastPoint()) {
                        this.link.point(clientX - ox, clientY - oy, -1);
                    }
                    else if (this.sourcePort) {
                        // the second click was not in a PortModel, so we cancel the link creation
                        if (this.link) {
                            this.link.remove();
                        }
                        this.clearState();
                        this.eject();
                        this.engine.repaintCanvas();
                    }


                    this.engine.repaintCanvas();
                }
            })
        );

        this.registerAction(
            new Action({
                type: InputType.MOUSE_MOVE,
                fire: (actionEvent: ActionEvent<MouseEvent | any>) => {
                    if (!this.link) return;
                    const {event} = actionEvent;
                    this.link.getLastPoint().setPosition(event.clientX, event.clientY);
                    this.engine.repaintCanvas();
                }
            })
        );

    }

    clearState() {
        this.link = undefined;
        this.sourcePort = undefined;
    }
}