import { MetaPort } from "./MetaPort";
import { MetaNodeModel } from "../react-diagrams/MetaNodeModel";
import { Point } from "@projectstorm/geometry";

export class MetaNode {
  private readonly parent: MetaNode | undefined;
  private readonly options: Map<string, any>;
  private children: Array<MetaNode> | undefined;
  private childrenMap: Map<string, MetaNode>;

  constructor(
    id: string,
    name: string,
    shape: string,
    position: Point,
    variant: string,
    parent: MetaNode | undefined,
    ports: Array<MetaPort>,
    children: Array<MetaNode> | undefined,
    options: Map<string, any>
  ) {
    this.parent = parent;
    this.children = children || [];
    this.childrenMap = new Map();
    this.options = new Map(options);
    this.options.set("id", id);
    this.options.set("name", name);
    this.options.set("shape", shape);
    this.options.set("ports", ports);
    this.options.set("variant", variant);
    this.options.set("position", position);

    this.children?.forEach((child: MetaNode) => {
      this.childrenMap.set(child.getId(), child);
    });
  }

  addChild(child: MetaNode): Boolean {
    if (this.childrenMap.has(child.getId())) {
      return false;
    }
    this.childrenMap.set(child.getId(), child);
    this.children?.push(child);
    return true;
  }

  deleteChild(childId: string): Boolean {
    if (this.childrenMap.has(childId)) {
      this.childrenMap.delete(childId);
      this.children = this.children?.filter((child: MetaNode) => {
        return child.getId() !== childId;
      });
      return true;
    }
    return false;
  }

  getId(): string {
    return this.options.get("id");
  }

  getName(): string {
    return this.options.get("name");
  }

  getShape(): string {
    return this.options.get("shape");
  }

  private getGraphPath(): string[] {
    if (this.parent) {
      const graphPath = this.parent.getGraphPath();
      graphPath.push(this.getId() as string);
      return graphPath;
    }
    return [this.getId()];
  }

  getDepth(): number {
    return this.parent ? this.parent.getDepth() + 1 : 0;
  }

  toModel(): MetaNodeModel {
    const optionsMap = new Map(this.options);
    optionsMap.set("graphPath", this.getGraphPath());
    optionsMap.set("depth", this.getDepth());
    return new MetaNodeModel(Object.fromEntries(optionsMap));
  }
}
