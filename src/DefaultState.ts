import { MouseEvent } from 'react';
import {
  SelectingState,
  State,
  Action,
  InputType,
  ActionEvent,
  DragCanvasState,
} from '@projectstorm/react-canvas-core';
import {
  PortModel,
  DiagramEngine,
  DragDiagramItemsState,
} from '@projectstorm/react-diagrams-core';

export class DefaultState extends State<DiagramEngine> {
  dragCanvas: DragCanvasState;
  dragItems: DragDiagramItemsState;
  isSelection: boolean;

  constructor() {
    super({ name: 'starting-state' });
    this.childStates = [new SelectingState()];
    this.dragCanvas = new DragCanvasState();
    this.isSelection = true;
    this.dragItems = new DragDiagramItemsState();

    // determine what was clicked on
    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: (event: ActionEvent<MouseEvent | any>) => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(event);

          // the canvas was clicked on, transition to the dragging canvas state
          if (!element) {
            this.transitionWithEvent(this.dragCanvas, event);
          }
          // TODO: implement port model instantiation action
          // initiate dragging a new link
          else if (element instanceof PortModel) {
            return;
          }
          // handle canvas deselect
          else if (element && !this.isSelection) {
            return;
          }
          // move the items (and potentially link points)
          else {
            this.transitionWithEvent(this.dragItems, event);
          }
        },
      })
    );
  }
}
