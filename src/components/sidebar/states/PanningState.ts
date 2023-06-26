import { State } from './State';
import { updateCanvasMouseCursor } from '../../../utils';
import { CursorTypes } from '../../../constants';
import { DefaultState } from '../../../react-diagrams/state/DefaultState';

export class PanningState extends State {
  onExit() {
    if (this.state instanceof DefaultState) {
      this.state.dragCanvas.config.allowDrag = false;
    } else {
      this.state.config.allowDrag = false;
    }
    updateCanvasMouseCursor(CursorTypes.DEFAULT);
  }

  onEnter() {
    if (this.state instanceof DefaultState) {
      this.state.dragCanvas.config.allowDrag = true;
    } else {
      this.state.config.allowDrag = true;
    }
    updateCanvasMouseCursor(CursorTypes.MOVE);
  }
}
