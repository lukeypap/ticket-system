import { Flex, Box, Badge, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/react";
import React from "react";
import { IUser } from "types/IUser";
import { formatDate } from "../../utils/formatDate";

interface Props {
    comment: { id: number; message: string; createdAt: string; user: IUser };
}

export const CommentCard = ({ comment }: Props) => {
    return (
        <Flex boxShadow="md" p={3} borderRadius="lg" w="100%">
            <Avatar size="md" name={comment.user.firstName + " " + comment.user.lastName} />
            <Box flex="1" ml={4}>
                <Flex justifyContent="space-between" h="100%">
                    <Flex flexDirection="column" textAlign="left">
                        <Text fontWeight="md" color="blue.500">
                            {comment.user.firstName + " " + comment.user.lastName}
                        </Text>
                        <Text fontWeight="light" fontSize="md">
                            {comment.message}
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" justifyContent="space-around" textAlign="right">
                        <Text fontSize="sm" fontWeight="light">
                            {formatDate(comment.createdAt)}
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};
