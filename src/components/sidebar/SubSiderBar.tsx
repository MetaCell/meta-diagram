import React, { useState, Fragment } from "react";
import { Box, Collapse, List } from "@mui/material";

import SubSidebarItem from "./SubSidebarItem";
import { ISubSidebar } from "../../types/sidebar";

export const SubSiderBar = ({ nodes, show = false }: ISubSidebar) => {
  const [selected, setSelected] = useState<string | undefined>();

  if (!!nodes && !!show) {
    return (
      <>
        <Box className="sub-sidebar">
          <Collapse orientation="horizontal" in={show} className="wrapper">
            <List disablePadding component="nav">
              {nodes.map(node => (
                <Fragment key={node.id}>
                  <SubSidebarItem
                    key={node.id}
                    {...{ node }}
                    selected={selected === node.id}
                    handleSelection={(
                      id: React.SetStateAction<string | undefined>
                    ) => setSelected(id)}
                  />
                  {/* // TODO: fix nested sub-sidebar reference:https://github.com/MetaCell/meta-diagram/issues/41 */}
                </Fragment>
              ))}
            </List>
          </Collapse>
        </Box>
      </>
    );
  }

  return null;
};

export default SubSiderBar;
