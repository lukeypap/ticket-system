import { Avatar, Box, Checkbox, Flex, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { formatDate } from "src/utils/formatDate";
import { IUser } from "types/IUser";
interface Props {
    user: IUser;
    handleChange: any;
    checked: boolean;
    setChecked: any;
}

export const UserCard = ({ user, handleChange, checked, setChecked }: Props) => {
    return (
        <Flex
            w="full"
            opacity="0.8"
            borderBottom="1px"
            borderBottomColor="gray"
            pb={1}
            fontSize="sm"
        >
            <HStack>
                <Box pr={3}>
                    <Checkbox onChange={() => handleChange(user.id, checked, setChecked)} pt={1} />
                </Box>
                <Box w="205px" overflow="hidden" whiteSpace="nowrap">
                    <HStack>
                        <Avatar name={user.firstName + " " + user.lastName} size="xs" />
                        <Text textOverflow="ellipsis" overflow="hidden">
                            {user.firstName + " " + user.lastName}
                        </Text>
                    </HStack>
                </Box>
                <Box w="190px">
                    <Text>{user.email}</Text>
                </Box>
                <Box w="108px">
                    <Text>{user.role[0].toUpperCase() + user.role.slice(1)}</Text>
                </Box>
                <Box w="158px">
                    <Text>{user.department ? user.department : "No Department..."}</Text>
                </Box>
                <Box>
                    <Text>{formatDate(user.createdAt)}</Text>
                </Box>
            </HStack>
        </Flex>
    );
};
