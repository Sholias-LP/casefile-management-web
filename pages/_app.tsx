import type { AppProps } from "next/app";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { GlobalStyles } from "truparse-lodre";
import ProtectedRoute from "../components/protectedRoutes";
import { AuthProviderContainer } from "../context/user";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AuthProviderContainer>
          <GlobalStyles />
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        </AuthProviderContainer>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
