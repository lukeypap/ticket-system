import { ChakraProvider, PortalManager } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { theme } from "../theme";
import "../styles.css";
import "@fontsource/ubuntu";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={theme}>
            <PortalManager>
                <Component {...pageProps} />
            </PortalManager>
        </ChakraProvider>
    );
};

export default App;
