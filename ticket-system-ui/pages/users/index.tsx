import React from "react";
import Link from "next/link";
import { VStack, HStack, useColorMode } from "@chakra-ui/react";
import Users from "../../src/components/content/users";
import { Navbar } from "../../src/components/navbar";
import { Sidebar } from "../../src/components/sidebar";

interface Props {}

const Index = (props: Props) => {
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
                        <Users />
                    </VStack>
                </VStack>
            </HStack>
        </VStack>
    );
};

export default Index;
