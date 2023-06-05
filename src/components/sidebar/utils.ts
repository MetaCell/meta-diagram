import {IHandleClick} from "../../types/sidebar";
import {DefaultSidebarNodeTypes} from "../../constants";


export const handleItemClick = ({
                                    event,
                                    node,
                                    handleSelection
                                }: IHandleClick) => {
    const { id, draggable, preCallback, postCallback, defaultCallback } = node;
    // if item is un-draggable click event fires only
    if (!draggable) {
        handleSelection(id as DefaultSidebarNodeTypes);

        // execute pre & post-callback when no overriding default-callback
        if (!!preCallback && !defaultCallback) preCallback(event, node);
        if (!!postCallback && !defaultCallback) postCallback(event, node);

        // call default - callback if exists
        if (!!defaultCallback) defaultCallback(event, node);
    }
};

export default handleItemClick;
