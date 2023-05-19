import { Point } from '@projectstorm/geometry';

export function subPoints(point1: Point, point2: Point) {
  return new Point(point1.x - point2.x, point1.y - point2.y);
}

function makeArray(param: NodeListOf<any>) {
  return Array.from(param);
}

export function updateCanvasMouseCursor(cursor = 'text') {
  const primaryNodes = document.querySelectorAll<HTMLElement>('.primary-node');
  const canvasWidget = document.querySelectorAll<HTMLElement>('.canvas-widget');
  const reactDraggable = document.querySelectorAll<HTMLElement>(
    '.react-draggable'
  );
  const nodes = document.querySelectorAll<HTMLElement>('.nodes');
  const node = document.querySelectorAll<HTMLElement>('.nodes');
  const canvasCustomLinkWidget = document.querySelectorAll<HTMLElement>(
    '.canvas-CustomLinkWidget'
  );
  const elements = document.querySelectorAll<HTMLElement>('.react-draggable');

  const flattenSelectorList = Array.from(([
    makeArray(primaryNodes),
    makeArray(canvasWidget),
    makeArray(reactDraggable),
    makeArray(nodes),
    makeArray(node),
    makeArray(elements),
    makeArray(canvasCustomLinkWidget),
  ] as unknown) as HTMLCollectionOf<HTMLElement>).flat();
  // const flattened = [...Array.from(primaryNodes)];

  flattenSelectorList.forEach(selector => {
    if (!!selector) {
      selector.style.cursor = cursor;
    }
    // element.
  });
}
