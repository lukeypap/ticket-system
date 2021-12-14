import { useColorMode } from "@chakra-ui/color-mode";
import { HStack, VStack } from "@chakra-ui/layout";
import { GiRayGun } from "react-icons/gi";
import { Content } from "../src/components/content/home";
import { Navbar } from "../src/components/navbar";
import { Sidebar } from "../src/components/sidebar";
import checkAuth from "../auth/checkAuth";

const IndexPage = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <VStack height="100vh" width="full" spacing={0} m={0}>
            <HStack width="full" flex={1} overflow="hidden">
                <Sidebar />
                <VStack width="full" height="full" style={{ marginInlineStart: "0px" }}>
                    <Navbar />
                    <VStack
                        width="full"
                        height="full"
                        spacing={4}
                        overflow="hidden"
                        bg={colorMode === "light" ? "gray.100" : ""}
                    >
                        <Content />
                    </VStack>
                </VStack>
            </HStack>
        </VStack>
    );
};

export default checkAuth(IndexPage);
