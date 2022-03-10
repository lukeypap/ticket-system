import { Avatar, Box, Checkbox, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { formatDate } from "src/utils/formatDate";
import { IUser } from "types/IUser";
import { useCheckbox } from "@chakra-ui/react";

interface Props {
    user: IUser;
}

export const UserCard = ({ user }: Props) => {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox();
    console.log(state);
    return (
        <Flex w="full" opacity="0.8" borderBottom="1px" borderBottomColor="gray" pb={1}>
            <HStack>
                <Box pr={3}>
                    <Checkbox pt={1} />
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
