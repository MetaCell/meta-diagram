import { DefaultLinkModel } from '@projectstorm/react-diagrams';
import { ReactDiagramMetaTypes, CallbackTypes } from '../constants';

export class MetaLinkModel extends DefaultLinkModel {
  constructor(options = {}) {
    super({
      ...options,
      type: ReactDiagramMetaTypes.META_LINK,
    });
  }

  setOption(label: string, newValue: any, triggerUpdate?: boolean | undefined) {
    // @ts-ignore
    this.options[label] = newValue;
    if (triggerUpdate) {
      this.flagUpdate(CallbackTypes.OPTIONS_UPDATED);
    }
  }

  getOption(label: string): any {
    // @ts-ignore
    return this.getOptions()[label];
  }

  flagUpdate(updateType: CallbackTypes, extraCondition?: CallbackTypes) {
    this.fireEvent(
      { node: this, function: updateType, extraCondition: extraCondition },
      updateType
    );
  }

  serialise(params: Array<string>) {
    const additionalParams = Object.create({});
    params.forEach(param => {
      additionalParams[param] = this.getOption(param);
    });
    return {
      ...super.serialize(),
      ...additionalParams,
      sourcePort: this.getSourcePort()?.serialize(),
      targetPort: this.getTargetPort()?.serialize(),
    };
  }
}
