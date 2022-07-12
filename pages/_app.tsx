import type { AppProps } from "next/app";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { GlobalStyles } from "truparse-lodre";
import { AuthProviderContainer } from "../context/user";
import "../styles/globals.css";

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
