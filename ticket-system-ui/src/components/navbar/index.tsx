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
    Skeleton,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBell, FaSearch } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { useQuery } from "react-query";
import { getAll } from "../../api/tickets";

interface Props {}

export const Navbar = (props: Props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const jwt = {
        token: "",
    };
    const router = useRouter();

    if (typeof window !== "undefined") {
        if (localStorage.getItem("token")) {
            jwt.token = localStorage.getItem("token");
        }
    }
    const { data, isLoading, error, isError } = useQuery(["getAll", jwt.token], () =>
        getAll(jwt.token)
    );

    console.log(data);

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
                                {isLoading ? (
                                    <Skeleton height="30px" w="30px" borderRadius="full">
                                        <Avatar />
                                    </Skeleton>
                                ) : (
                                    <Avatar
                                        size="sm"
                                        name={
                                            isError || !data
                                                ? ""
                                                : data.data.user.firstName +
                                                  " " +
                                                  data.data.user.lastName
                                        }
                                    />
                                )}
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">
                                        {isLoading ? (
                                            <Skeleton height="15px" w="70px">
                                                <Text>Name</Text>
                                            </Skeleton>
                                        ) : isError || !data ? (
                                            <p>{error}</p>
                                        ) : (
                                            data.data.user.firstName + " " + data.data.user.lastName
                                        )}
                                    </Text>
                                    {isLoading ? (
                                        <Skeleton height="15px">
                                            <Text>Role</Text>
                                        </Skeleton>
                                    ) : isError || !data ? (
                                        <p>error</p>
                                    ) : (
                                        <Text fontSize="xs" color="gray.600">
                                            {data.data.user.role[0].toUpperCase() +
                                                data.data.user.role.substring(1)}
                                        </Text>
                                    )}
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
