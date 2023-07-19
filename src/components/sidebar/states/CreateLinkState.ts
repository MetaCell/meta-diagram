import { State } from "./State";
import { updateCanvasMouseCursor } from "../../../utils";
import { CursorTypes } from "../../../constants";
import { DefaultState } from "../../../react-diagrams/state/DefaultState";

export class CreateLinkState extends State {
  onExit() {
    if (this.state instanceof DefaultState) {
      if (this.state.createLink) {
        this.state.createLink.config.allowCreate = false;
      }
      this.state.unsetCreateLinkState();
    }
    updateCanvasMouseCursor(CursorTypes.DEFAULT);
  }

  onEnter() {
    if (this.state instanceof DefaultState) {
      this.state.setCreateLinkState();
      if (this.state.createLink) {
        this.state.createLink.config.allowCreate = true;
      }
    }
    updateCanvasMouseCursor(CursorTypes.CROSSHAIR);
  }
}
