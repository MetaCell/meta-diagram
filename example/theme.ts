import vars from './components/assets/styles/variables';
import { createTheme } from '@mui/material/styles';

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

        .primary-node.node-gray .primary-node_header p {
          color: ${nodeGrayTextColor};
        }

        .primary-node.node-gray .node-button .icon {
          background: ${nodeGrayBackgroundColor};
          border-color: rgba(130, 130, 130, 0.2);
        }
      `,
    },
  },
};

export default createTheme(theme);
