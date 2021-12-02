import { Button } from "@chakra-ui/button";
import { Divider, Flex, Heading, HStack, Text } from "@chakra-ui/layout";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";

interface Props {}

export const PageHeader = (props: Props) => {
    return (
        <HStack width="full" pl={10} pr={10}>
            <Flex justifyContent="space-between" alignItems="center" flex={1}>
                <Flex>
                    <Heading
                        color="gray.light"
                        fontWeight="normal"
                        textTransform="uppercase"
                        letterSpacing={6}
                        fontSize="xl"
                    >
                        Home
                    </Heading>
                </Flex>
                <Flex>
                    <Button
                        ml={2}
                        mr={2}
                        size="sm"
                        colorScheme="blue"
                        fontWeight="md"
                        leftIcon={<IoTicket />}
                    >
                        Create
                    </Button>
                </Flex>
            </Flex>
        </HStack>
    );
};
