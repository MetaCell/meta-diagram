declare type ThemeVars = {
    [key: string]: any;
};
declare const _default: (customVariables: ThemeVars) => {
    components: {
        MuiCssBaseline: {
            styleOverrides: string;
        };
        MuiList: {
            styleOverrides: {
                root: {
                    '&.customSwitch': {
                        padding: string;
                        background: any;
                        borderRadius: string;
                        display: string;
                        '& .MuiListItemButton-root': {
                            padding: string;
                            borderRadius: string;
                            width: string;
                            display: string;
                            alignItems: string;
                            justifyContent: string;
                            '&:not(:last-child)': {
                                marginBottom: string;
                            };
                            '&.Mui-disabled': {
                                opacity: number;
                            };
                            '&.Mui-selected': {
                                background: any;
                                boxShadow: any;
                                border: string;
                                '& .MuiTypography-root': {
                                    color: any;
                                };
                            };
                        };
                        '& .MuiChip-root': {
                            marginLeft: string;
                        };
                        '& .MuiTypography-root': {
                            fontWeight: number;
                            fontSize: string;
                            lineHeight: string;
                            letterSpacing: string;
                            color: any;
                            margin: number;
                        };
                    };
                };
            };
        };
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: string;
                };
            };
        };
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    padding: number;
                    width: string;
                    height: string;
                    borderRadius: string;
                    justifyContent: string;
                    backgroundColor: any;
                    '&:hover': {
                        backgroundColor: any;
                    };
                    '&:not(:last-child)': {
                        marginBottom: string;
                    };
                    '&.Mui-selected': {
                        backgroundColor: any;
                        '&:hover': {
                            backgroundColor: any;
                        };
                    };
                    '&.Mui-disabled': {
                        opacity: number;
                    };
                };
            };
        };
    };
};
export default _default;
