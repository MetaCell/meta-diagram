import * as React from "react";
import { Box, Typography } from "@mui/material";
export interface InputOutputNodeProps {
  text: string;
  direction?: string
}

class InputOutputNode extends React.Component<InputOutputNodeProps> {
  render() {
    const { text, direction } = this.props;
    const nodeClass = direction === 'right' ? 'block reverse' : 'block';
    return (
      <Box className={nodeClass}>
        <Box className="disc" />
        <Typography>{text}</Typography>
      </Box>
    )
  }
}

export default InputOutputNode;