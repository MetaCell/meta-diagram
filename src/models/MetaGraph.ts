import {MetaNodeModel} from "../react-diagrams/MetaNodeModel";
import { UnknownParent } from "./Exceptions";
import {BoundingBox} from "./BoundingBox";

class Graph {
    private readonly node: MetaNodeModel;
    private readonly children: Map<string, Graph>;

    constructor(metaNodeModel: MetaNodeModel) {
        this.node = metaNodeModel;
        this.children = new Map<string, Graph>()
    }

    getID() : string{
        return this.node.getID()
    }

    getNode() : MetaNodeModel{
        return this.node
    }

    getChild(id:string) {
        return this.children.get(id)
    }

    addChild(graph: Graph) : void {
        this.children.set(graph.getID(), graph)
    }

    getChildren(): MetaNodeModel[] {
        return Array.from(this.children.values()).map(g => g.getNode())
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
            return this.node
        }
        for (let node of Array.from(this.children.values())) {
            const found = node.dfs(id)
            if(found){
                return found
            }
        }
        return false
    }

    getContainerBoundingBox() : BoundingBox {
        // TODO: Refactor to use this.node.getBoundingBox()
        let width = this.getNode().width
        let height = this.getNode().height
        let x = this.getNode().getX()
        let y = this.getNode().getY()
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
        const bb = new BoundingBox(left, top, right, bottom)
        return bb
    }

}


export class MetaGraph {
    private readonly roots: Map<string, Graph>;

    constructor() {
        this.roots = new Map<string, Graph>()
    }

    addNode(metaNodeModel:MetaNodeModel): void {
        const path = metaNodeModel.getGraphPath()
        if(path.length == 1){
            this.roots.set(metaNodeModel.getID(), new Graph(metaNodeModel))
        }else{
            path.pop() // Removes own id from path
            const parentGraph = this.findNodeGraph(path)
            parentGraph.addChild(new Graph(metaNodeModel))
        }
    }


    getNodes() : MetaNodeModel[] {
        const nodes = []
        for(const graph of Array.from(this.roots.values())){
            nodes.push(graph.getNode())
            nodes.push(...graph.getDescendancy())
        }
        return nodes
    }

    getAncestors(node : MetaNodeModel): MetaNodeModel[] {
        const path = node.getGraphPath()
        const oldestAncestor = this.getRoot(path[0])
        return [oldestAncestor.getNode(), ...oldestAncestor.getChildren()]
    }

    getRoot(rootId: string) : Graph{
        const root = this.roots.get(rootId)
        if(root===undefined){
            throw new UnknownParent(rootId)
        }
        return root
    }

    getChildren(parent : MetaNodeModel): MetaNodeModel[] {
        const path = parent.getGraphPath()
        if (path.length == 1) {
            const root = this.getRoot(parent.getID())
            return root.getChildren()
        } else {
            const graph = this.findNodeGraph(path)
            return graph.getChildren()
        }
    }

    getParent(node : MetaNodeModel): MetaNodeModel | undefined {
        const path = node.getGraphPath()
        if (path.length == 1) {
            return undefined
        } else {
            path.pop() // removes own id from path
            const parentGraph = this.findNodeGraph(path)
            return parentGraph.getNode()
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
        const graph = this.findNodeGraph(node.getGraphPath())
        return graph.getContainerBoundingBox()
    }

    private findNodeGraph(path: string[]) : Graph {
        const rootId = path.shift()
        // @ts-ignore
        let parent = this.getRoot(rootId)
        while(path.length > 0){
            const next = path.shift()
            // @ts-ignore
            parent = parent.getChild(next)
            if (parent == undefined){
                throw new UnknownParent(next)
            }
        }
        return parent
    }

    handleNodePositionChanged(metaNodeModel: MetaNodeModel){
        // TODO: Update node parent (add or remove parent)
        //  update node graph path,
        //  bounding boxes of parents

        // Update children position (children should move the same delta as node)
        this.updateChildrenPosition(metaNodeModel)
        //  Update local position / relative position to the parent
        this.updateNodeLocalPosition(metaNodeModel)
    }

    private updateChildrenPosition(metaNodeModel: MetaNodeModel){
        const children = this.getChildren(metaNodeModel);

        children.forEach(n => {
            /*
                No need to explicitly call updateChildrenPosition for n children because it will happen automatically in
                the event listener
             */
            // @ts-ignore
            const localPosition = n.getLocalPosition()
            n.setPosition(metaNodeModel.getX() + localPosition.x, metaNodeModel.getY() + localPosition.y)

        })
    }

    private updateNodeLocalPosition(metaNodeModel: MetaNodeModel){
        const parent = this.getParent(metaNodeModel)
        metaNodeModel.updateLocalPosition(parent)
    }

    updateNodesContainerBoundingBoxes(nodes: MetaNodeModel[]): void {
        nodes.forEach(n => n.setContainerBoundingBox(this.getNodeContainerBoundingBox(n)))
    }
}
