import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyles } from "truparse-lodre";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { AuthProviderContainer } from "../context/user";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AuthProviderContainer>
          <GlobalStyles />
          <Component {...pageProps} />
        </AuthProviderContainer>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
