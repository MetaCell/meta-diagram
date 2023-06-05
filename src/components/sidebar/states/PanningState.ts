import {State} from "./State";
import {updateCanvasMouseCursor} from "../../../utils";
import {CursorTypes} from "../../../constants";

export class PanningState extends State {

    onExit() {
        this.state.dragCanvas.config.allowDrag = false;
        updateCanvasMouseCursor(CursorTypes.DEFAULT);
    }

    onEnter() {
        this.state.dragCanvas.config.allowDrag = true;
        updateCanvasMouseCursor(CursorTypes.MOVE);
    }
}