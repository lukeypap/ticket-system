import React, { useEffect, useState } from "react";
import { PageHeader } from "../header";
import * as ticketApi from "../../api/tickets";
import { Box, Divider, Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/color-mode";
import { Dropdown } from "../dropdown";
import { chooseLabelColor } from "../../utils/chooseTicketColor";
import { CommentCard } from "../comment/comment-card";
import { CommentBox } from "../comment/comment-box";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
        return <p>Loading...</p>;
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
                    my={5}
                    margin="auto"
                >
                    <HStack pt={10} w="full" pl={10} pr={10} pb={5} justifyContent="space-between">
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
                    <p>{data.ticket.message}</p>
                    <p>{data.ticket.user.firstName}</p>
                    <p>{data.ticket.createdAt}</p>
                    <p>{data.ticket.updatedAt}</p>
                    <Divider w="94%" />
                    <VStack w="75%">
                        {typeof data.ticket.comments !== "undefined" ? (
                            data.ticket.comments.map((comment, idx) => (
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
