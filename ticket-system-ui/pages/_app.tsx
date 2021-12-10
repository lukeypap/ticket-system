import { ChakraProvider, PortalManager } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { theme } from "../theme";
import "../styles.css";
import "@fontsource/ubuntu";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <PortalManager>
                    <Component {...pageProps} />
                    <ReactQueryDevtools />
                </PortalManager>
            </QueryClientProvider>
        </ChakraProvider>
    );
};

export default App;
