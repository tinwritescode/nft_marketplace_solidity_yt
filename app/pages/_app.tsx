import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./components/common/Layout/Layout";
import Head from "next/head";

interface CustomAppProps extends AppProps {
  Component: AppProps["Component"] & {
    title?: string;
  };
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  const title = Component.title || "Default title";

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
