import { Flex, Box, Badge, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/react";
import React from "react";
import { formatDate } from "../../utils/formatDate";

interface Props {
    comment: { id: number; message: string; createdAt: string };
}

export const CommentCard = ({ comment }: Props) => {
    return (
        <Flex boxShadow="md" p={3} bg="white" borderRadius="lg" maxWidth="xl" w="100%">
            <Avatar size="lg" />
            <Box flex="1" ml={4}>
                <Flex justifyContent="space-between" h="100%">
                    <Flex flexDirection="column" textAlign="left">
                        <Text
                            fontWeight="bold"
                            color="blue.500"
                            fontSize="sm"
                            textTransform="uppercase"
                        >
                            {comment.id}
                        </Text>
                        <Text fontWeight="bold">displayName</Text>
                        <Text fontWeight="light" fontSize="md">
                            {comment.message}
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" justifyContent="space-around" textAlign="right">
                        <div>
                            <Badge
                                colorScheme="blue"
                                borderRadius="full"
                                textTransform="lowercase"
                                py={1}
                                px={3}
                                as="div"
                            >
                                count
                            </Badge>
                        </div>
                        <Text fontSize="sm" fontWeight="light">
                            createdAt
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};
