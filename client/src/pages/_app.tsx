import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import AppContext from "../context";
import theme from "../theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/styles.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Online shop" />
        <meta name="keywords" content="" />
        <meta name="author" content="Wabomba Bakar" />
        <base />
        <title>Liredit</title>
      </Head>
      <AppContext>
        <Component {...pageProps} />
      </AppContext>
    </ThemeProvider>
  );
}
