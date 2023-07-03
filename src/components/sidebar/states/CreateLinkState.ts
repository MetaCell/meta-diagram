import { State } from './State';
import { updateCanvasMouseCursor } from '../../../utils';
import { CursorTypes } from '../../../constants';
import { DefaultState } from '../../../react-diagrams/state/DefaultState';
import { DefaultDiagramState } from '@projectstorm/react-diagrams';

export class CreateLinkState extends State {
  onExit() {
    if (this.state instanceof DefaultState) {
      this.state.createLink.config.allowCreate = false;
    } else if (this.state instanceof DefaultDiagramState) {
      this.state.dragNewLink.config.allowLinksFromLockedPorts = false;
    } else {
      this.state.config.allowCreate = false;
    }
    updateCanvasMouseCursor(CursorTypes.DEFAULT);
  }

  onEnter() {
    if (this.state instanceof DefaultState) {
      this.state.createLink.config.allowCreate = true;
    } else if (this.state instanceof DefaultDiagramState) {
      this.state.dragNewLink.config.allowLinksFromLockedPorts = true;
    } else {
      this.state.config.allowCreate = true;
    }
    updateCanvasMouseCursor(CursorTypes.CROSSHAIR);
  }
}
