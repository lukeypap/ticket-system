import { HStack, VStack } from "@chakra-ui/layout";
import React from "react";
import { Content } from "../../src/components/content/home";
import { Ticket } from "../../src/components/content/ticket";
import { Navbar } from "../../src/components/navbar";
import { Sidebar } from "../../src/components/sidebar";

interface Props {}

const index = (props: Props) => {
    return (
        <VStack height="100vh" width="full" overflow="hidden" spacing={0} m={0}>
            <HStack width="full" flex={1} overflow="hidden">
                <Sidebar />
                <VStack width="full" height="full" style={{ marginInlineStart: "0px" }}>
                    <Navbar />
                    <VStack pt={8} width="full" height="full" spacing={4} overflow="hidden">
                        <Ticket />
                    </VStack>
                </VStack>
            </HStack>
        </VStack>
    );
};

export default index;
