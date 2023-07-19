import { MouseEvent, TouchEvent } from "react";
import {
  SelectingState,
  State,
  Action,
  InputType,
  ActionEvent,
  DragCanvasState
} from "@projectstorm/react-canvas-core";
import {
  PortModel,
  DiagramEngine,
  DragDiagramItemsState
} from "@projectstorm/react-diagrams-core";
import { CreateLinkState } from "./CreateLinkState";
import { MetaNodeModel } from "../MetaNodeModel";

export class DefaultState extends State<DiagramEngine> {
  dragCanvas: DragCanvasState | null;
  dragItems: DragDiagramItemsState;
  createLink: CreateLinkState | null;
  customCreateLink?: CreateLinkState;
  isSelection: boolean;

  constructor(customCreateLink?: CreateLinkState) {
    super({ name: "starting-state" });
    this.childStates = [];
    this.dragCanvas = null;
    this.dragItems = new DragDiagramItemsState();
    this.createLink = null;
    this.customCreateLink = customCreateLink;
    this.isSelection = false;

    // determine what was clicked on
    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: (event: ActionEvent<MouseEvent | any>) => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(event);

          // the canvas was clicked on, transition to the dragging canvas state
          if (
            this.dragCanvas &&
            (!element || !!this.dragCanvas.config.allowDrag)
          ) {
            this.transitionWithEvent(this.dragCanvas, event);
          }
          // initiate dragging a new link
          else if (element instanceof PortModel) {
            return;
          }
          // handle canvas deselect
          else if (element && !this.isSelection) {
            return;
          }
          // move the items (and potentially link points)
          // else if (!this.dragCanvas.config.allowDrag) {
          else if (this.childStates.length > 0) {
            this.transitionWithEvent(this.dragItems, event);
          }
        }
      })
    );

    this.registerAction(
      new Action({
        type: InputType.MOUSE_UP,
        fire: (event: ActionEvent<MouseEvent | any>) => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(event);

          if (
            (this.createLink && element instanceof PortModel) ||
            (element instanceof MetaNodeModel &&
              this.createLink &&
              !this.isSelection)
          ) {
            this.transitionWithEvent(this.createLink, event);
          }
        }
      })
    );

    // touch drags the canvas
    this.registerAction(
      new Action({
        type: InputType.TOUCH_START,
        fire: (event: ActionEvent<TouchEvent | any>) => {
          const element = this.engine
            .getActionEventBus()
            .getModelForEvent(event);
          // the canvas was clicked on, transition to the dragging canvas state
          if (
            (!!this.dragCanvas && !!this.dragCanvas.config.allowDrag) ||
            !element
          ) {
            this.transitionWithEvent(this.dragCanvas!, event);
          }
        }
      })
    );
  }

  // Select state methods
  public setSelectionState() {
    this.childStates = [new SelectingState()];
    this.isSelection = true;
  }

  public unsetSelectionState() {
    this.isSelection = false;
    this.childStates = [];
  }

  // drag state methods
  public setDragState() {
    this.dragCanvas = new DragCanvasState();
  }

  public unsetDragState() {
    this.dragCanvas = null;
  }
  // create link state methods
  public setCreateLinkState() {
    this.createLink = this.customCreateLink ?? new CreateLinkState();
  }

  public unsetCreateLinkState() {
    this.createLink = null;
  }
}
