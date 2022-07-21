import vars from './components/assets/styles/variables';

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
    listBorderColor
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
                    color: listSelectedTextColor
                  },
                },
              },
  
              '& .MuiChip-root': {
                marginLeft: '0.25rem'
              },
  
              '& .MuiTypography-root': {
                fontWeight: 500,
                fontSize: '0.8125rem',
                lineHeight: '1.25rem',
                letterSpacing: '-0.005rem',
                color: chipBgColor,
                margin: 0
              },
            },
          }
        }
      },
  
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 'inherit'
          },
        }
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
        }
      },
    },
  };
};

export default (customVariables: ThemeVars) => applicationTheme({ ...vars, ...customVariables });