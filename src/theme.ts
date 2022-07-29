import vars from './components/assets/styles/variables';
import MI from "./components/assets/svg/mechanism-yellow.svg";

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
    listItemActiveBg,
    listSelectedTextColor,
    listBoxShadow,
    listBorderColor,
    sidebarBg,
    sidebarShadow,
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
            width: 4rem;
            background: ${sidebarBg};
            box-shadow: ${sidebarShadow};
            border-radius: 2rem;
            position: fixed;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
          }

          .sidebar.right {
            left: auto;
            right: 1rem;
          }

          .sidebar .MuiList-root {
            padding: 0.75rem
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

          .primary-node img {
            margin-bottom: 0.25rem
          }

          .primary-node .primary-node_header p {
            color: ${nodeGreenTextColor};
          }

          .primary-node .primary-node_header img {
            background: "url(data:image/svg+xml;base64,${new Buffer(MI).toString('base64')})";
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
            margin-right: 1.25rem;
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
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            justifyContent: 'center',
            backgroundColor: chipTextColor,
            '&:hover': {
              backgroundColor: chipTextColor,
            },
            '&:not(:last-child)': {
              marginBottom: '0.75rem',
            },
            '&.Mui-selected': {
              backgroundColor: listItemActiveBg,
              '&:hover': {
                backgroundColor: listItemActiveBg,
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

export default (customVariables: ThemeVars) =>
  applicationTheme({
    ...vars,
    ...customVariables,
  });
