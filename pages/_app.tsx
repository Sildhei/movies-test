import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { amber, blueGrey, red, indigo } from '@mui/material/colors';
import { Box, IconButton, PaletteMode } from '@mui/material';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: indigo[500],
            light: indigo[300],
            dark: indigo[700],
          },
          secondary: {
            main: blueGrey[500],
            light: blueGrey[300],
            dark: blueGrey[700],
          },
        }
      : {
          primary: {
            main: red[500],
            light: red[300],
            dark: red[700],
          },
          secondary: {
            main: amber[500],
            light: amber[300],
            dark: amber[700],
          },
        }),
  },
});

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.default',
              color: 'text.primary',
              borderRadius: 1,
              p: 3,
            }}>
            {theme.palette.mode} mode
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
              {theme.palette.mode === 'dark' ? 'dark' : 'light'}
            </IconButton>
          </Box>
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppCacheProvider>
  );
}
