import {
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    useColorMode,
    VStack,
} from "@chakra-ui/react";
import { ActionBar } from "components/actionbar";
import UserHeader from "components/header/user-header";
import { UserTable } from "components/table/user-table";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "react-query";
import { getAll } from "src/api/users";

interface Props {}

const Users = (props: Props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const jwt = {
        token: "",
    };
    if (typeof window !== "undefined") {
        if (localStorage.getItem("token")) {
            jwt.token = localStorage.getItem("token");
        }
    }

    const { data, isLoading, error, isError } = useQuery(["getAllUsers", jwt.token], () =>
        getAll(jwt.token)
    );

    return (
        <VStack
            width="full"
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
            pl={10}
        >
            <UserHeader addText="All users" title="Users" />
            <ActionBar />
            <Flex w="full" pt={4}>
                <Flex w="32%" pl={10}>
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
                            _hover={{}}
                        />
                    </InputGroup>
                </Flex>
            </Flex>
            {isLoading ? <Text>LOADING...</Text> : <UserTable users={data.data} />}
        </VStack>
    );
};

export default Users;
