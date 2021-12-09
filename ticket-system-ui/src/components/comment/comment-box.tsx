import { Flex, VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel, Textarea, Button } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
    handlePost: () => void;
    comment: {
        message: string;
    };
    setComment: ({ message: string }) => void;
}

export const CommentBox = ({ handlePost, comment, setComment }: Props) => {
    const handleInputChange = (e) => {
        setComment({
            message: e.target.value,
        });
    };

    return (
        <VStack w="full" h="full" p={5}>
            <FormControl>
                <FormLabel opacity="0.8">Write a comment</FormLabel>
                <Textarea
                    name="message"
                    value={comment.message}
                    placeholder="Type here..."
                    onChange={handleInputChange}
                />
            </FormControl>
            <Flex flex={1} w="full" justifyContent="flex-end">
                <Button
                    colorScheme="blue"
                    onClick={() => {
                        handlePost();
                        setComment({ message: "" });
                    }}
                    onChange={handleInputChange}
                >
                    Post
                </Button>
            </Flex>
        </VStack>
    );
};
