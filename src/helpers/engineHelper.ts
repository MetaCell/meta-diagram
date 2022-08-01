import {MetaNodeModel} from "../react-diagrams/MetaNodeModel";

export function updateChildrenPosition(nodes: MetaNodeModel[], parent: MetaNodeModel): void {
    // @ts-ignore
    const children = nodes.filter(n => n.options['parentId'] == parent.options['id']);
    children.forEach(n => {
        // @ts-ignore
        n.setPosition(parent.getX() + n.options['position'].x, parent.getY() + n.options['position'].y)
    })
}

export function updateNodeLocalPosition(nodes: MetaNodeModel[], node: MetaNodeModel): void {
    node.updateLocalPosition(nodes)
    // TODO: check if it is still inside the parent
}