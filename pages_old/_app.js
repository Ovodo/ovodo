import '@/styles/globals.css'
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import { wrapper } from "../store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import Navbar from "@/Components/navbar_components/Navbar";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);

  const { emotionCache = clientSideEmotionCache, pageProps } = props;

  const Layout = ({ Component, pageProps }) => {
    if (Component.getLayout) {
      return Component.getLayout(<Component {...pageProps} />);
    } else {
      return <Component {...pageProps} />;
    }
  };

  return (
    <GoogleOAuthProvider clientId='704139097438-0r081l07jdsiru0ktse80r813pm6mlm3.apps.googleusercontent.com'>
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name='viewport'
              content='initial-scale=1, width=device-width'
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Navbar>
              <Layout Component={Component} pageProps={pageProps} />
            </Navbar>
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;