import { State } from "./State";
import { updateCanvasMouseCursor } from "../../../utils";
import { CursorTypes } from "../../../constants";
import { DefaultState } from "../../../react-diagrams/state/DefaultState";

export class PanningState extends State {
  onExit() {
    if (this.state instanceof DefaultState) {
      if (this.state.dragCanvas) {
        this.state.dragCanvas.config.allowDrag = false;
      }
      this.state.unsetDragState();
    }
    updateCanvasMouseCursor(CursorTypes.DEFAULT);
  }

  onEnter() {
    if (this.state instanceof DefaultState) {
      this.state.setDragState();
      if (this.state.dragCanvas) {
        this.state.dragCanvas.config.allowDrag = true;
      }
    }
    updateCanvasMouseCursor(CursorTypes.MOVE);
  }
}
