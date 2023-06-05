import {State} from "./State";
import {updateCanvasMouseCursor} from "../../../utils";
import {CursorTypes} from "../../../constants";

export class CreateLinkState extends State {

    onExit() {
        this.state.createLink.config.allowCreate = false;
        updateCanvasMouseCursor(CursorTypes.DEFAULT);
    }

    onEnter() {
        this.state.createLink.config.allowCreate = true;
        updateCanvasMouseCursor(CursorTypes.CROSSHAIR);
    }
}