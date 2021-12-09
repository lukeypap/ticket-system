import { HStack, VStack } from "@chakra-ui/layout";
import React from "react";
import { Content } from "../../src/components/content/home";
import { Ticket } from "../../src/components/content/ticket";
import { Navbar } from "../../src/components/navbar";
import { Sidebar } from "../../src/components/sidebar";
import { useRouter } from "next/router";
import { useColorMode } from "@chakra-ui/color-mode";

interface Props {}

const index = (props: Props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const router = useRouter();

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
                        bg={colorMode === "light" ? "gray.100" : ""}
                        overflow="auto"
                        sx={{
                            "&::-webkit-scrollbar": {
                                width: "5px",
                                borderRadius: "8px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "brand.red",
                            },
                        }}
                    >
                        <Ticket id={router.query.id} />
                    </VStack>
                </VStack>
            </HStack>
        </VStack>
    );
};

export default index;
