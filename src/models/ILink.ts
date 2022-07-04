export interface ILink {
  getSourceId: () => string;
  getSourcePortId: () => string;
  getTargetId: () => string;
  getTargetPortId: () => string;
}
