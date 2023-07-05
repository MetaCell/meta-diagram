import { DefaultDiagramState } from '@projectstorm/react-diagrams';
import { CreateLinkState } from '../../../react-diagrams/state/CreateLinkState';
import { DefaultState } from '../../../react-diagrams/state/DefaultState';

export class State {
  protected state: DefaultState | CreateLinkState | DefaultDiagramState;

  constructor(
    reactDiagramsState: DefaultState | CreateLinkState | DefaultDiagramState
  ) {
    this.state = reactDiagramsState;
  }

  onExit() {
    // Default: do nothing
  }

  onEnter() {
    // Default: do nothing
  }
}
