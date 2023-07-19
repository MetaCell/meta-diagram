import { State } from './State';
import { updateCanvasMouseCursor } from '../../../utils';
import { CursorTypes } from '../../../constants';
import { DefaultState } from '../../../react-diagrams/state/DefaultState';

export class SelectionState extends State {
  onExit() {
    if (this.state instanceof DefaultState) {
      this.state.unsetSelectionState();
    }
    updateCanvasMouseCursor(CursorTypes.DEFAULT);
  }

  onEnter() {
    if (this.state instanceof DefaultState) {
      this.state.setSelectionState();
    }
    updateCanvasMouseCursor(CursorTypes.DEFAULT);
  }
}
