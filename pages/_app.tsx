import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { amber, blueGrey, red, indigo } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';
import Layout from './layout';
import { useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';

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

  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <AppCacheProvider {...props}>
      <Provider store={store}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout colorMode={colorMode}>
          <Component {...pageProps} colorMode={colorMode}/>
          </Layout>
        </ThemeProvider>
      </ColorModeContext.Provider>
      </Provider>
    </AppCacheProvider>
  );
}
