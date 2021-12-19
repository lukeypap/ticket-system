import React, { useEffect, useState } from "react";
import { PageHeader } from "../header";
import * as ticketApi from "../../api/tickets";
import { Box, Divider, Flex, Heading, HStack, VStack, Text } from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/color-mode";
import { Dropdown } from "../dropdown";
import { chooseLabelColor } from "../../utils/chooseTicketColor";
import { CommentCard } from "../comment/comment-card";
import { CommentBox } from "../comment/comment-box";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Avatar } from "@chakra-ui/react";
import { formatDate } from "src/utils/formatDate";
interface Props {
    id: any;
}

export const Ticket = ({ id }: Props) => {
    const queryClient = useQueryClient();
    const { colorMode, toggleColorMode } = useColorMode();
    const [comment, setComment] = useState({ message: "" });
    const payload = {
        id: id,
        token: "",
    };
    if (typeof window !== "undefined") {
        if (localStorage.getItem("token")) {
            payload.token = localStorage.getItem("token");
        }
    }

    const { data, isLoading, error, isError } = useQuery(["getById", payload], () =>
        ticketApi.getById(payload)
    );

    const { mutate: updateTicketStatus } = useMutation(ticketApi.updateStatus, {
        onSuccess: () => {
            queryClient.invalidateQueries("getById");
        },
    });

    const { mutate: postTicketComment } = useMutation(ticketApi.createComment, {
        onSuccess: () => {
            queryClient.invalidateQueries("getById");
        },
    });

    const handleStatus = async (id: number, status: string) => {
        updateTicketStatus({ id: id, status: status });
    };

    const handlePost = async () => {
        const token = localStorage.getItem("token");
        postTicketComment({ id, token, comment });
    };

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <>
            <PageHeader title={`Ticket ${id}`} renderSearchBar={false} />
            <Box w="full" h="full">
                <VStack
                    w="90%"
                    maxW="1280px"
                    h="full"
                    bg={colorMode === "light" ? "white" : "gray.700"}
                    borderRadius="lg"
                    boxShadow="md"
                    my={0}
                    margin="auto"
                    px={10}
                >
                    <HStack pt={10} w="full" pb={5} justifyContent="space-between">
                        <Heading fontSize="2xl" fontWeight="md" opacity="0.8">
                            {data.ticket.title}
                        </Heading>
                        <Dropdown
                            ticket={data.ticket}
                            color={chooseLabelColor(data.ticket)}
                            handleStatus={handleStatus}
                            size="sm"
                        />
                    </HStack>
                    <Divider w="94%" />
                    <HStack px={10} py={1} alignItems="top" w="full" h="50%">
                        <VStack alignItems="left" w="70%">
                            <HStack pb={5} pt={2}>
                                <Avatar
                                    size="sm"
                                    name={
                                        data.ticket.user.firstName + " " + data.ticket.user.lastName
                                    }
                                />
                                <Text fontWeight="semibold">
                                    {data.ticket.user.firstName + " " + data.ticket.user.lastName}{" "}
                                </Text>
                                <Text>raised this request.</Text>
                            </HStack>
                            <Text fontWeight="semibold" fontSize="sm" opacity="0.8">
                                Description
                            </Text>
                            <Text fontSize="sm" fontWeight="light" pt={2} opacity="0.8">
                                {data.ticket.message
                                    ? data.ticket.message
                                    : "There's nothing here..."}
                            </Text>
                        </VStack>
                        <Divider orientation="vertical" />
                        <VStack w="30%" alignItems="left" fontSize="xs" pl={5} pt={5}>
                            <HStack>
                                <Text fontWeight="semibold">Raised by: </Text>
                                <Avatar
                                    size="xs"
                                    name={
                                        data.ticket.user.firstName + " " + data.ticket.user.lastName
                                    }
                                />
                                <Text>
                                    {data.ticket.user.firstName + " " + data.ticket.user.lastName}
                                </Text>
                            </HStack>
                            <HStack>
                                <Text fontWeight="semibold">Assignee: </Text>
                                <Avatar size="xs" />
                                <Text>Unassigned</Text>
                            </HStack>
                            <HStack>
                                <Text fontWeight="semibold">Created: </Text>
                                <Text>{formatDate(data.ticket.createdAt)}</Text>
                            </HStack>
                            <HStack>
                                <Text fontWeight="semibold">Updated: </Text>
                                <Text>{formatDate(data.ticket.updatedAt)}</Text>
                            </HStack>
                            <HStack>
                                <Text fontWeight="semibold">Priority: </Text>
                                <Text>{data.ticket.priority}</Text>
                            </HStack>
                        </VStack>
                    </HStack>
                    <Divider w="94%" />
                    <VStack w="75%" pt={10}>
                        {typeof data.ticket.comments !== "undefined" ? (
                            data.ticket.comments.map((comment) => (
                                <CommentCard key={comment.id} comment={comment} />
                            ))
                        ) : (
                            <p>No comments to display!</p>
                        )}
                        <CommentBox
                            handlePost={handlePost}
                            comment={comment}
                            setComment={setComment}
                        />
                    </VStack>
                </VStack>
            </Box>
        </>
    );
};
