import type { AppProps } from "next/app";
import Layout from "../app/components/Layout/Layout";
import ErrorBoundary from "../app/components/Error/ErrorBoundary";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Layout>
  );
}
