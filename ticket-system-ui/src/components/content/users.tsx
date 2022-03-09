import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Text,
    Textarea,
    useColorMode,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { ActionBar } from "components/actionbar";
import UserHeader from "components/header/user-header";
import { UserDraw } from "components/modal/create-user-draw";
import { UserTable } from "components/table/user-table";
import { createSecureServer } from "http2";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { create, getAll } from "src/api/users";

interface Props {}

const Users = (props: Props) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const queryClient = useQueryClient();
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

    const { isLoading: mutationLoading, mutate: createUser } = useMutation(create, {
        onSuccess: () => {
            queryClient.invalidateQueries("getAll");
        },
    });

    const handleCreate = async (values: Object) => {
        createUser({ values: values, token: jwt.token });
    };

    const handleCreateAccountDrawer = () => {
        onOpen();
    };

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
            <ActionBar handleDraw={handleCreateAccountDrawer} />
            <UserDraw onClose={onClose} isOpen={isOpen} size="sm" handleCreate={handleCreate} />
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
