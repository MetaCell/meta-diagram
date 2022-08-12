import vars from './components/assets/styles/variables';
import { createTheme } from '@mui/material/styles';
import nodeBlue from "./components/assets/svg/node/blue.png";
import nodeGray from "./components/assets/svg/node/gray.png";
import nodeRed from './components/assets/svg/node/red.png';

const {
  nodeRedBackgroundColor,
  nodeRedBorderColor,
  nodeRedBoxShadow,
  nodeRedTextColor,
  nodeBlueBackgroundColor,
  nodeBlueBoxShadow,
  nodeBlueBorderColor,
  nodeBlueTextColor,
  nodeGrayBoxShadow,
  nodeGrayBackgroundColor,
  nodeGrayBorderColor,
  nodeGrayTextColor,
} = vars;
declare module '@mui/styles' {
  interface Theme {
    components: {
      MuiCssBaseline: any;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    components?: {
      MuiCssBaseline?: any;
    };
  }
}
const theme = {
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        .primary-node.node-red {
          background: ${nodeRedBackgroundColor};
          box-shadow: ${nodeRedBoxShadow};
          border-color: ${nodeRedBorderColor};
        }

        .primary-node.node-red .icon {
          background: url(${nodeRed});
        }

        .primary-node.node-red .primary-node_header p {
          color: ${nodeRedTextColor};
        }

        .primary-node.node-red .node-button .icon {
          background: ${nodeRedBackgroundColor};
          border-color: ${nodeRedBorderColor};
        }

        .primary-node.node-blue {
          background: ${nodeBlueBackgroundColor};
          box-shadow: ${nodeBlueBoxShadow};
          border-color: ${nodeBlueBorderColor};
        }

        .primary-node.node-blue .icon {
          background: url(${nodeBlue});
        }

        .primary-node.node-blue .primary-node_header p {
          color: ${nodeBlueTextColor};
        }

        .primary-node.node-blue .node-button .icon {
          background: ${nodeBlueBackgroundColor};
          border-color: ${nodeBlueBorderColor};
        }

        .primary-node.node-gray {
          background: ${nodeGrayBackgroundColor};
          box-shadow: ${nodeGrayBoxShadow};
          border-color: ${nodeGrayBorderColor};
        }

        .primary-node.node-gray .icon {
          background: url(${nodeGray});
        }

        .primary-node.node-gray .primary-node_header p {
          color: ${nodeGrayTextColor};
        }

        .primary-node.node-gray .node-button .icon {
          background: ${nodeGrayBackgroundColor};
          border-color: ${nodeGrayBorderColor};
        }

        .primary-node.node-red .block .disc {
          background: ${nodeRedBackgroundColor};
          border-color: ${nodeRedTextColor};
        }

        .primary-node.node-red .block .disc:after {
          background: ${nodeRedTextColor};
        }

        .primary-node.node-red .seprator {
          background: ${nodeRedBorderColor};
        }

        .primary-node.node-blue .block .disc {
          background: ${nodeBlueBackgroundColor};
          border-color: ${nodeBlueTextColor};
        }

        .primary-node.node-blue .block .disc:after {
          background: ${nodeBlueTextColor};
        }

        .primary-node.node-blue .seprator {
          background: ${nodeBlueBorderColor};
        }

        .primary-node.node-gray .block .disc {
          background: ${nodeGrayBackgroundColor};
          border-color: ${nodeGrayTextColor};
        }

        .primary-node.node-gray .block .disc:after {
          background: ${nodeGrayTextColor};
        }

        .primary-node.node-gray .seprator {
          background: ${nodeGrayBorderColor};
        }
      `,
    },
  },
};

export default createTheme(theme);
