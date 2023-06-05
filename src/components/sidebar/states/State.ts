import {DefaultState} from "../../../react-diagrams/state/DefaultState";

export class State {
    protected state: DefaultState;

    constructor(reactDiagramsState: DefaultState) {
        this.state = reactDiagramsState;
    }

    onExit() {
        // Default: do nothing
    }

    onEnter() {
        // Default: do nothing
    }
}