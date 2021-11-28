import { HStack, VStack } from "@chakra-ui/layout";
import React from "react";

interface Props {}

const Content = (props: Props) => {
    return (
        <HStack width="full" flex={1} overflow="hidden">
            {/* Sidebar */}
            <VStack px={12} pt={12} width="full" height="full" spacing={6} overflow="hidden">
                {/* SearchBar */}
                {/* Ticket table */}
                <HStack width="full" alignItems="flex-start" overflow="hidden" flex={1}></HStack>
            </VStack>
        </HStack>
    );
};

export default Content;
