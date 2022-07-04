import { DefaultLinkModel } from '@projectstorm/react-diagrams';
import { ReactDiagramMetaTypes } from '../constants';

export class MetaLinkModel extends DefaultLinkModel {
  constructor(options = {}) {
    super({
      ...options,
      type: ReactDiagramMetaTypes.META_LINK,
    });
  }
}
