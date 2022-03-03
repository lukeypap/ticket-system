import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface Props {
    addText: string;
    title: string;
}

const UserHeader = ({ addText, title }: Props) => {
    return (
        <HStack width="full" pt={5}>
            <Flex justifyContent="space-between" alignItems="center" flex={1}>
                <Flex>
                    <VStack>
                        <Heading
                            color="gray.light"
                            fontWeight="normal"
                            textTransform="uppercase"
                            letterSpacing={6}
                            fontSize="xl"
                        >
                            {title}
                        </Heading>
                        <Text color="gray.light" fontWeight="light" fontSize="sm">
                            {addText}
                        </Text>
                    </VStack>
                </Flex>
            </Flex>
        </HStack>
    );
};

export default UserHeader;
