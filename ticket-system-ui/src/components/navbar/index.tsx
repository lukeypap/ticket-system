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
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBell, FaSearch } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { getAll } from "../../api/tickets";

interface Props {}

export const Navbar = (props: Props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const jwt = {
        token: "",
    };
    const [currentUser, setCurrentUser] = useState({
        firstName: "firstName",
        lastName: "lastName",
        role: "role",
    });
    const router = useRouter();

    useEffect(() => {
        const getTickets = async () => {
            jwt.token = localStorage.getItem("token");
            const data = await getAll(jwt.token);
            if (data.user) {
                setCurrentUser(data.user);
            } else {
                router.push("/login");
            }
        };
        getTickets();
    }, []);

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
                                    size="sm"
                                    name={currentUser.firstName + " " + currentUser.lastName}
                                />
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">
                                        {currentUser.firstName + " " + currentUser.lastName}
                                    </Text>
                                    <Text fontSize="xs" color="gray.600">
                                        {currentUser.role[0].toUpperCase() +
                                            currentUser.role.substring(1) || "nothing"}
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
