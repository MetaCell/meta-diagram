import { Point } from "@projectstorm/geometry";
import { CanvasClassTypes, CursorTypes } from "./constants";

export function subPoints(point1: Point, point2: Point) {
  return new Point(point1.x - point2.x, point1.y - point2.y);
}

function makeArray(param: NodeListOf<any>) {
  return Array.from(param);
}

export function updateCanvasMouseCursor(cursor = CursorTypes.TEXT) {
  const primaryNodes = document.querySelectorAll<HTMLElement>(
    CanvasClassTypes.PRIMARY_NODE
  );
  const canvasWidget = document.querySelectorAll<HTMLElement>(
    CanvasClassTypes.CANVAS_WIDGET
  );
  const reactDraggable = document.querySelectorAll<HTMLElement>(
    CanvasClassTypes.REACT_DRAGGABLE
  );
  const nodes = document.querySelectorAll<HTMLElement>(CanvasClassTypes.NODES);
  const node = document.querySelectorAll<HTMLElement>(CanvasClassTypes.NODES);
  const canvasCustomLinkWidget = document.querySelectorAll<HTMLElement>(
    CanvasClassTypes.CANVAS_CUSTOM_WIDGET
  );
  const elements = document.querySelectorAll<HTMLElement>(
    CanvasClassTypes.REACT_DRAGGABLE
  );

  const flattenSelectorList = Array.from(([
    makeArray(primaryNodes),
    makeArray(canvasWidget),
    makeArray(reactDraggable),
    makeArray(nodes),
    makeArray(node),
    makeArray(elements),
    makeArray(canvasCustomLinkWidget)
  ] as unknown) as HTMLCollectionOf<HTMLElement>).flat();
  // const flattened = [...Array.from(primaryNodes)];

  flattenSelectorList.forEach(selector => {
    if (!!selector) {
      selector.style.cursor = cursor;
    }
    // element.
  });
}
