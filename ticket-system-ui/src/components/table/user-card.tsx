import { Avatar, Box, Checkbox, Flex, HStack, Td, Text, Tr, useColorMode } from "@chakra-ui/react";
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
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <tr>
            <td>
                <Checkbox
                    onChange={() => handleChange(user.id, checked, setChecked)}
                    pt={1}
                    pl={1}
                />
            </td>
            <td>
                <HStack mb="5px">
                    <Avatar name={user.firstName + " " + user.lastName} size="xs" />
                    <Text textOverflow="ellipsis" overflow="hidden">
                        {user.firstName + " " + user.lastName}
                    </Text>
                </HStack>
            </td>
            <td>
                <Text>{user.email}</Text>
            </td>
            <td>
                <Text>{user.role[0].toUpperCase() + user.role.slice(1)}</Text>
            </td>
            <td>
                <Text>{user.department ? user.department : "No Department..."}</Text>
            </td>
            <td>
                <Text>{formatDate(user.createdAt)}</Text>
            </td>
        </tr>
    );
};
