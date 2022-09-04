import {
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    useColorMode,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { ActionBar } from "components/actionbar";
import UserHeader from "components/header/user-header";
import { UserDraw } from "components/modal/create-user-draw";
import { UserTable } from "components/table/user-table";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { create, deleteById, getAll } from "src/api/users";

interface Props {}

const Users = (props: Props) => {
    const [checkedItems, setCheckedItems] = useState([]);
    const [checked, setChecked] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
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
            queryClient.invalidateQueries("getAllUsers");
        },
    });

    const { mutate: deleteUser } = useMutation(deleteById, {
        onSuccess: () => {
            queryClient.invalidateQueries("getAllUsers");
        },
    });

    const handleCreate = async (values: Object) => {
        createUser({ values: values, token: jwt.token });
    };

    const handleCreateAccountDrawer = () => {
        onOpen();
    };

    const handleCheckBoxChange = (id) => {
        setChecked(!checked);
        let chkditems = checkedItems;
        if (!checked) {
            chkditems.push(id);
            setCheckedItems(chkditems);
        } else {
            chkditems = chkditems.filter((value) => value !== id);
            setCheckedItems(chkditems);
        }
    };

    const handleDelete = async () => {
        if (checkedItems.length !== 0) {
            const idx = checkedItems[0];
            console.log(idx);
            setCheckedItems([]);
            deleteUser({ id: idx, token: jwt.token });
            toast({
                title: "User Deleted",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } else {
            console.log("nothing to delete");
        }
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
            <ActionBar handleDraw={handleCreateAccountDrawer} handleDelete={handleDelete} />
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
            {isLoading ? (
                <Text>LOADING...</Text>
            ) : (
                <UserTable
                    users={data.data}
                    handleChange={handleCheckBoxChange}
                    checked={checked}
                    setChecked={setChecked}
                />
            )}
        </VStack>
    );
};

export default Users;
