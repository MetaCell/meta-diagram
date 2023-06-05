import {IHandleClick} from "../../types/sidebar";
import {DefaultSidebarNodeTypes} from "../../constants";


export const handleItemClick = ({
                                    event,
                                    node,
                                    updateSelected,
                                    enableDrag,
                                    disableDrag,
                                    setCreateLinkState
                                }: IHandleClick) => {
    const { id, draggable, preCallback, postCallback, defaultCallback } = node;
    // if item is un-draggable click event fires only
    if (!draggable) {
        if (!!updateSelected) updateSelected(id);

        // execute drag actions
        if (id === DefaultSidebarNodeTypes.PANNING && enableDrag) enableDrag();
        if (id !== DefaultSidebarNodeTypes.PANNING && disableDrag) disableDrag();
        if (id === DefaultSidebarNodeTypes.CREATE_LINK && setCreateLinkState){
            //todo: replace true with selected != id
            setCreateLinkState(true);
        }

        // execute pre & post-callback when no overriding default-callback
        if (!!preCallback && !defaultCallback) preCallback(event, node);
        if (!!postCallback && !defaultCallback) postCallback(event, node);

        // call default - callback if exists
        if (!!defaultCallback) defaultCallback(event, node);
    }
};

export default handleItemClick;
