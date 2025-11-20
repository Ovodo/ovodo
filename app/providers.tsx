"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import store from "../store/store";
import Navbar from "@/components/navbar_components/Navbar";
import { ReactNode } from "react";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <GoogleOAuthProvider clientId="704139097438-0r081l07jdsiru0ktse80r813pm6mlm3.apps.googleusercontent.com">
      <Provider store={store}>
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            {/* <CssBaseline /> */}
            <Navbar />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}
