import {
  AbstractDisplacementState,
  AbstractDisplacementStateEvent,
  Action,
  InputType,
} from '@projectstorm/react-canvas-core';

export default class SelectLinkState extends AbstractDisplacementState {
  // @ts-ignore
  fireMouseMoved(event: AbstractDisplacementStateEvent) {
    console.log('fireMouseMoved link triggered');
  }
  constructor() {
    super({ name: 'select-link' });

    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: event => {
          // @ts-ignore
          const link = this.engine.getMouseElement(event.event);

          if (link.isLocked()) {
            this.eject();
          }

          this.engine.getModel().clearSelection();
          link.setSelected(true);
        },
      })
    );
  }
}
