import {
    Box,
    HStack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import { IUser } from "types/IUser";
import { UserCard } from "./user-card";

interface Props {
    users: IUser[];
    handleChange: any;
    checked: boolean;
    setChecked: any;
}

export const UserTable = ({ users, handleChange, checked, setChecked }: Props) => {
    return (
        <>
            <TableContainer w="75vw">
                <Table size="xl" mt="20px">
                    <Thead>
                        <Tr>
                            <Th> </Th>
                            <Th>NAME</Th>
                            <Th>EMAIL</Th>
                            <Th>TYPE</Th>
                            <Th>DEPARTMENT</Th>
                            <Th>CREATED</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users ? (
                            users.map((user, id) => (
                                <UserCard
                                    user={user}
                                    handleChange={handleChange}
                                    checked={checked}
                                    setChecked={setChecked}
                                    key={id}
                                />
                            ))
                        ) : (
                            <p>There's nothing here!</p>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
            {/* <VStack pb={2} w="full" px={10}>
                <HStack
                    mt={0}
                    spacing={{ base: 4, "2xl": 12 }}
                    py={1}
                    pl={2}
                    w="full"
                    letterSpacing={1}
                    fontSize="xs"
                    fontWeight="semibold"
                    opacity="0.7"
                    maxW="7xl"
                    borderBottom="1px"
                    borderBottomColor="gray"
                >
                    <Box w="20px">
                        <Text>ID</Text>
                    </Box>
                    <Box w="200px">
                        <Text>NAME</Text>
                    </Box>
                    <Box w="180px">
                        <Text>EMAIL</Text>
                    </Box>
                    <Box w="100px">
                        <Text>TYPE</Text>
                    </Box>
                    <Box w="150px">
                        <Text>DEPARTMENT</Text>
                    </Box>
                    <Box w="120px">
                        <Text>CREATED</Text>
                    </Box>
                </HStack>

                {users ? (
                    users.map((user, id) => (
                        <UserCard
                            user={user}
                            handleChange={handleChange}
                            checked={checked}
                            setChecked={setChecked}
                        />
                    ))
                ) : (
                    <p>There's nothing here!</p>
                )}
            </VStack> */}
        </>
    );
};
