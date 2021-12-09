import { Button } from "@chakra-ui/button";
import { Divider, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { InputGroup, InputLeftElement, Input, useColorMode } from "@chakra-ui/react";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { FaEdit, FaSearch } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";

interface Props {
    onOpen?: () => void;
    title: string;
    handleSearchChange?: (e) => void;
    addText?: string;
    renderSearchBar: boolean;
}

export const PageHeader = ({
    onOpen,
    title,
    handleSearchChange,
    addText,
    renderSearchBar,
}: Props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <HStack width="full" pl={10} pr={10} pt={5}>
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
                {renderSearchBar ? (
                    <Flex>
                        <Flex>
                            <InputGroup
                                size="sm"
                                borderColor={colorMode === "light" ? "blue.500" : "blue.200"}
                            >
                                <InputLeftElement
                                    pointerEvents="none"
                                    color="gray.400"
                                    children={<FaSearch />}
                                />
                                <Input
                                    borderRightRadius="0"
                                    border="2px"
                                    variant="outline"
                                    placeholder="Table search..."
                                    onChange={(e) => handleSearchChange(e)}
                                    _hover={{}}
                                />
                            </InputGroup>
                        </Flex>
                        <Button
                            mr={2}
                            size="sm"
                            colorScheme="blue"
                            fontWeight="md"
                            leftIcon={<IoTicket />}
                            onClick={onOpen}
                            borderLeftRadius="0"
                        >
                            Create
                        </Button>
                    </Flex>
                ) : (
                    ""
                )}
            </Flex>
        </HStack>
    );
};
