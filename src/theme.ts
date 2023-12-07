import vars from './components/assets/styles/variables';
import nodeGreen from './components/assets/svg/node/green.svg';
import topSubArrow from './components/assets/svg/sub-top-arrow.svg';
import bottomSubArrow from './components/assets/svg/sub-bottom-arrow.svg';
import { base64Encode } from './utils';

type ThemeVars = {
  [key: string]: any;
};

const applicationTheme = (params: ThemeVars) => {
  const {
    primaryBg,
    fontFamily,
    chipTextColor,
    chipBgColor,
    textWhite,
    listSelectedTextColor,
    listBoxShadow,
    listBorderColor,
    sidebarBg,
    sidebarShadow,
    sidebarBorder,
    subBarBg,
    canvasBg,
    showPropertiesButtonBg,
    nodeBorderColor,
    nodePointerBg,
    nodeButtonTextColor,
    nodeButtonLineColor,
    nodeGreenBackgroundColor,
    nodeGreenTextColor,
    nodeGreenBorderColor,
    nodeGreenBoxShadow,
    nodeTextColor,
    nodeWrapperBg,
    nodeLabelColor,
    nodeBlockBg,
  } = params;
  return {
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          html {
            background: ${primaryBg};
            font-family: ${fontFamily};
          }
          body {
            background-color:${primaryBg};
            font-family: ${fontFamily};
            font-size: 1rem;
          }
          .sidebar {
            z-index: 5;
            width: 3rem;
            background: ${sidebarBg};
            box-shadow: ${sidebarShadow};
            border: 1px solid ${sidebarBorder};
            border-radius: 0 0.75rem 0.75rem 0;
            position: fixed;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }

          .sidebar.right {
            left: auto;
            right: 0;
          }

          .sidebar .MuiList-root {
            padding: 0.5rem
          }

          .sub-sidebar {
            z-index: 4;
            width: 2.75rem;
            background: ${subBarBg};
            position: fixed;
            border-radius: 0 0.5rem 0.5rem 0;
            left: calc(3rem - 1px);
            top: 50%;
            transform: translateY(-50%);
          }

          .sub-sidebar:before {
            content: "";
            width: 0.5rem;
            height: 0.5rem;
            background: url(data:image/svg+xml;base64,${base64Encode(
              topSubArrow
            )});           
            position: absolute;
            background-size: 150%;
            top: -0.5rem;
            left: 0rem;
          }

          .sub-sidebar:after {
            content: "";
            width: 0.5rem;
            height: 0.5rem;
            background: url(data:image/svg+xml;base64,${base64Encode(
              bottomSubArrow
            )});           
            position: absolute;
            background-size: 150%;
            bottom: -0.45rem;
            left: -0.0875rem;
          }

          .sub-sidebar.right {
            left: auto;
            right: 0;
          }

          .sub-sidebar .MuiList-root {
            padding: 0.375rem;
          }

          .sub-sidebar .wrapper {
            max-height: 16rem;
            overflow-y: scroll;
            overflow-x: hidden
          }

          .sub-sidebar .wrapper::-webkit-scrollbar {
            background-color: none;
            width: 0.375rem;
          }
        
          /* background of the scrollbar except button or resizer */
          .sub-sidebar .wrapper::-webkit-scrollbar-track {
              background-color: none;
          }
          
          /* scrollbar itself */
          .sub-sidebar .wrapper::-webkit-scrollbar-thumb {
              background-color: ${chipTextColor};
              border-radius: 0.375rem;
          }
          
          /* set button(top and bottom of the scrollbar) */
          .sub-sidebar .wrapper::-webkit-scrollbar-button {
              display:none;
          }

          .canvas-widget {
            height: 100%;
            width: 100%;
            background-color: ${canvasBg};
          }

          .primary-node {
            border: solid 0.0625rem ${nodeGreenBorderColor};
            border-radius: 50%;
            box-shadow: ${nodeGreenBoxShadow};
            background: ${nodeGreenBackgroundColor};
            position: relative;
            width: 10rem;
            height: 10rem;
          }

          .primary-node .primary-node_header {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            flex-direction: column;
          }

          .primary-node .icon {
            width: 1.25rem;
            height: 1.25rem;
            margin: 0 auto 0.25rem;
            background: url(data:image/svg+xml;base64,${base64Encode(
              nodeGreen
            )});
          }

          .primary-node .primary-node_header p {
            color: ${nodeGreenTextColor};
          }

          .primary-node p {
            font-weight: 500;
            color: ${nodeTextColor};
            font-size: 0.8125rem;
            line-height: 1.25rem;
            letter-spacing: -0.005rem;
            margin: 0;
          }

          .node-button.MuiButton-root {
            background-color: ${showPropertiesButtonBg};
            border-radius: 1.125rem;
            font-weight: 600;
            font-size: 0.8125rem;
            display: flex;
            line-height: 1rem;
            letter-spacing: -0.025625rem;
            color: ${nodeButtonTextColor};
            margin: 0 !important;
            width: 9.625rem;
            padding: 0;
            height: 2.25rem;
            position: absolute;
            top: -2.625rem;
            font-family: ${fontFamily};
            text-transform: none;
            left: 50%;
            transform: translateX(-50%);
          }

          .node-button.MuiButton-root:hover {
            background-color: ${showPropertiesButtonBg};
          }

          .node-button .icon {
            width: 1rem;
            border: solid 0.0625rem;
            height: 1rem;
            border-radius: 50%;
            margin: 0 1.25rem 0 0;
            position: relative;
          }

          .node-button .icon:after {
            content: "";
            height: 1.75rem;
            width: 0.0625rem;
            display: block;
            position: absolute;
            right: -0.625rem;
            top: 50%;
            transform: translateY(-50%);
            background-color: ${nodeButtonLineColor};
          }

          .primary-node .node-button .icon {
            background: ${nodeGreenBackgroundColor};
            border-color: ${nodeGreenBorderColor}
          }

          .nodes {
            width: 10rem;
            height: 10rem;
            border: 0.09375rem solid ${nodeBorderColor};
            z-index: 99999;
            position: absolute;
          }

          .node .pointer {
            width: 0.625rem;
            height: 0.625rem;
            background: ${nodePointerBg};
            border: 0.09375rem solid ${nodeBorderColor};
            border-radius: 0.125rem;
            position: absolute;
          }

          .primary-node.rounded {
            border-radius: 0.875rem;
            padding: 0.5rem;
            width: 18rem;
            height: auto;
          }

          .primary-node.rounded .nodes {
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }

          .primary-node.rounded .primary-node_header {
            height: 4.25rem;
            margin-bottom: 0.25rem
          }

          .primary-node .block {
            padding: 0.625rem 0.5rem;
            background-color: ${nodeBlockBg};
            display: flex;
            align-items: center;
          }

          .primary-node .block:first-of-type {
            border-top-left-radius: 0.625rem;
            border-top-right-radius: 0.625rem;
          }

          .primary-node .block:last-child {
            border-bottom-left-radius: 0.625rem;
            border-bottom-right-radius: 0.625rem;
          }

          .primary-node .block:not(:last-child) {
            margin-bottom: 0.0625rem;
          }

          .primary-node .block .disc {
            width: 1rem;
            height: 1rem;
            border: solid 0.0625rem ${nodeGreenTextColor};
            background: ${nodeGreenBackgroundColor};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 0.5rem
          }

          .primary-node .block .disc:after {
            content: '';
            background: ${nodeGreenTextColor};
            width: 0.375rem;
            height: 0.375rem;
            border-radius: 50%;
          }

          .primary-node .block.reverse {
            justify-content: end;
          }

          .primary-node .block.reverse .disc {
            order: 2;
            margin-left: 0.5rem;
            margin-right: 0;
          }

          .primary-node .block.reverse p {
            order: 1
          }

          .primary-node .block-wrapper {
            display: flex;
            gap: 0 0.0625rem;
            flex-wrap: wrap;
          }

          .primary-node .block-wrapper .block {
            flex-direction: column;
            align-items: flex-start;
            background: ${nodeWrapperBg};
            padding: 0.5rem;
            width: calc((100% - 0.125rem) / 3);
          }

          .primary-node .block-wrapper .block .function.MuiTypography-root {
            margin-top: 0.25rem;
            word-break: break-all;
            font-weight: 600;
            font-family: 'Roboto Mono', monospace;
          }

          .primary-node .block-wrapper .block .function.MuiTypography-root strong {
            font-family: 'Roboto Mono', monospace;
            font-weight: 600;
          }

          .primary-node .block-wrapper .block:first-of-type {
            border-top-left-radius: 0.625rem;
            border-top-right-radius: 0
          }

          .primary-node .block-wrapper .block:nth-of-type(3) {
            border-top-right-radius: 0.625rem
          }

          .primary-node .block-wrapper .block:last-child {
            width: 100%;
            border-bottom-left-radius: 0.625rem;
            border-bottom-right-radius: 0.625rem;
          }

          .primary-node .block-wrapper .block label {
            display: block;
            font-weight: 400;
            font-size: 0.625rem;
            line-height: 0.625rem;
            letter-spacing: -0.005rem;
            color: ${nodeLabelColor};
            text-transform: uppercase;
          }

          .primary-node .seprator {
            width: 0.125rem;
            height: 1rem;
            border-radius: 1.25rem;
            margin: 0.25rem auto;
            background: ${nodeGreenBorderColor};
          }
        `,
      },
      MuiList: {
        styleOverrides: {
          root: {
            '&.customSwitch': {
              padding: '0.125rem',
              background: chipTextColor,
              borderRadius: '0.5rem',
              display: 'flex',
              '& .MuiListItemButton-root': {
                padding: '0.25rem 0.75rem',
                borderRadius: '0.4375rem',
                width: '10.59375rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translate(0, 0)',
                '&:not(:last-child)': {
                  marginBottom: '0',
                },
                '&.Mui-disabled': {
                  opacity: 1,
                },
                '&.Mui-selected': {
                  background: textWhite,
                  boxShadow: listBoxShadow,
                  border: `0.03125rem solid ${listBorderColor}`,
                  '& .MuiTypography-root': {
                    color: listSelectedTextColor,
                  },
                },
              },
              '& .MuiChip-root': {
                marginLeft: '0.25rem',
              },
              '& .MuiTypography-root': {
                fontWeight: 500,
                fontSize: '0.8125rem',
                lineHeight: '1.25rem',
                letterSpacing: '-0.005rem',
                color: chipBgColor,
                margin: 0,
              },
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 'inherit',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            padding: 0,
            width: '2rem',
            height: '2rem',
            borderRadius: '0.5rem',
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: chipTextColor,
            },
            '&:not(:last-child)': {
              marginBottom: '0.5rem',
            },
            '&.Mui-selected': {
              backgroundColor: chipTextColor,
              '&:hover': {
                backgroundColor: chipBgColor,
              },
            },
            '&.Mui-disabled': {
              opacity: 0.8,
            },
          },
        },
      },
    },
  };
};

export const subBarStyle = {
  transform: 'translate(0,0)',
  '&:hover': {
    backgroundColor: vars.chipTextColor,
  },
  '&:not(:last-child)': {
    marginBottom: '0.25rem',
  },
  '&.Mui-selected': {
    backgroundColor: vars.listItemActiveBg,
    color: vars.textWhite,
    '&:hover': {
      backgroundColor: vars.listItemActiveBg,
    },
  },
};

export default (customVariables: ThemeVars) =>
  applicationTheme({
    ...vars,
    ...customVariables,
  });
