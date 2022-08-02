import {MetaNodeModel} from "../react-diagrams/MetaNodeModel";
import { UnknownParent } from "./Exceptions";
import {BoundingBox} from "./BoundingBox";

class Graph {
    private readonly root: MetaNodeModel;
    private readonly children: Map<string, Graph>;

    constructor(metaNodeModel: MetaNodeModel) {
        this.root = metaNodeModel;
        this.children = new Map<string, Graph>()
    }

    getID() : string{
        return this.root.getID()
    }

    getRoot() : MetaNodeModel{
        return this.root
    }

    getChild(id:string) {
        return this.children.get(id)
    }

    addChild(graph: Graph) : void {
        this.children.set(graph.getID(), graph)
    }

    getChildren(): MetaNodeModel[] {
        return Array.from(this.children.values()).map(g => g.getRoot())
    }

    getDescendancy(): MetaNodeModel[] {
        const descendancy = this.getChildren()
        for(const graph of Array.from(this.children.values())){
            descendancy.push(...graph.getDescendancy())
        }
        return descendancy
    }

    dfs(id: string): MetaNodeModel | boolean {
        if(this.getID() == id){
            return this.root
        }
        for (let root of Array.from(this.children.values())) {
            const found = root.dfs(id)
            if(found){
                return found
            }
        }
        return false
    }

    getContainerBoundingBox() : BoundingBox {
        let width = this.getRoot().width
        let height = this.getRoot().height
        let x = this.getRoot().getX()
        let y = this.getRoot().getY()
        let left = x - width / 2
        let right = x + width / 2
        let top = y + height / 2
        let bottom = y - height / 2
        for (let child of Array.from(this.children.values())) {
            const childBox = child.getContainerBoundingBox()
            if(childBox.left < left){
                left = childBox.left
            }if(childBox.right > right){
                right = childBox.right
            }if(childBox.top > top){
                top = childBox.top
            }if(childBox.bottom < bottom){
                bottom = childBox.bottom
            }
        }
        return new BoundingBox(left, top, right, bottom)
    }

}


export class MetaGraph {
    private readonly roots: Map<string, Graph>;

    constructor() {
        this.roots = new Map<string, Graph>()
    }

    // @ts-ignore
    addNode(metaNodeModel:MetaNodeModel): void {
        const path = metaNodeModel.getGraphPath()
        if(path.length == 1){
            this.roots.set(metaNodeModel.getID(), new Graph(metaNodeModel))
        }else{
            path.pop() // Removes own id from path
            const parentGraph = this.findGraph(path)
            parentGraph.addChild(new Graph(metaNodeModel))
        }
    }


    getNodes() : MetaNodeModel[] {
        const nodes = []
        for(const graph of Array.from(this.roots.values())){
            nodes.push(graph.getRoot())
            nodes.push(...graph.getDescendancy())
        }
        return nodes
    }
    // @ts-ignore
    private findGraph(path: string[]) : Graph {
        const rootId = path.shift()
        // @ts-ignore
        const root = this.roots.get(rootId)
        if (root == undefined){
            throw new UnknownParent(`Root with id ${rootId} not found`)
        }
        let parent = root
        while(path.length > 0){
            const next = path.shift()
            // @ts-ignore
            parent = parent.getChild(next)
            if (parent == undefined){
                throw new UnknownParent(`Node with id ${next} not found`)
            }
        }
        return parent
    }

    // @ts-ignore
    getChildren(parent : MetaNodeModel): MetaNodeModel[] {
        const path = parent.getGraphPath()
        if (path.length == 1) {
            const root = this.roots.get(parent.getID())
            if (root == undefined) {
                throw new UnknownParent(`Root with id ${parent.getID()} not found`)
            } else {
                return root.getChildren()
            }
        } else {
            const graph = this.findGraph(path)
            return graph.getChildren()
        }
    }

    // @ts-ignore
    getParent(node : MetaNodeModel): MetaNodeModel | undefined {
        const path = node.getGraphPath()
        if (path.length == 1) {
           return undefined
        } else {
            path.pop() // removes own id from path
            const parentGraph = this.findGraph(path)
            return parentGraph.getRoot()
        }
    }

    getNodeDFS(nodeId: string): MetaNodeModel | undefined {
        for (let root of Array.from(this.roots.values())) {
            const found = root.dfs(nodeId)
            if(found){
                // @ts-ignore
                return found
            }
        }
        return undefined
    }

    getNodeContainerBoundingBox(node: MetaNodeModel) : BoundingBox {
        const graph = this.findGraph(node.getGraphPath())
        return graph.getContainerBoundingBox()
    }
}

