import { createMuiTheme } from '@material-ui/core';

export const Theme = createMuiTheme({
    palette: {
        primary: {
            light: '#c5424f',
            main: '#CF3242',
            dark: '#6e1f27',
        },
        text: {
            primary: '#FFFFFF',
        },
        background: {
            default: '#213242',
        },
    },
});

export type ThemeType = typeof Theme;
