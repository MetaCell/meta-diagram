import { CreateLinkState } from '../../../react-diagrams/state/CreateLinkState';
import { DefaultState } from '../../../react-diagrams/state/DefaultState';

export class State {
  protected state: DefaultState | CreateLinkState;

  constructor(reactDiagramsState: DefaultState | CreateLinkState) {
    this.state = reactDiagramsState;
  }

  onExit() {
    // Default: do nothing
  }

  onEnter() {
    // Default: do nothing
  }
}
