import {
    HStack,
    IconButton,
    Flex,
    Menu,
    MenuButton,
    Avatar,
    VStack,
    Box,
    MenuList,
    MenuItem,
    MenuDivider,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    useColorMode,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import React from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBell, FaSearch } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

interface Props {}

export const Navbar = (props: Props) => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex
            ms={0}
            width="full"
            height="20"
            alignItems="center"
            boxShadow="lg"
            justifyContent={{ base: "space-between" }}
            pr={5}
            pb={0}
        >
            <Flex justifyContent="flex-start" alignItems="left" pl={8}>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        color="gray.500"
                        children={<FaSearch />}
                    />
                    <Input variant="filled" placeholder="Start typing to search..." />
                </InputGroup>
            </Flex>
            <HStack spacing={{ base: "0", md: "6" }}>
                <IconButton
                    onClick={toggleColorMode}
                    icon={colorMode === "light" ? <BsMoonFill /> : <BsSunFill />}
                    aria-label="Toggle theme"
                    variant="ghost"
                />
                <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FaBell />} />
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
                            <HStack>
                                <Avatar
                                    size={"sm"}
                                    src={
                                        "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                    }
                                />
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">Justina Clark</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Admin
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <IoChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue("white", "gray.900")}
                            borderColor={useColorModeValue("gray.200", "gray.700")}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider />
                            <MenuItem>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
