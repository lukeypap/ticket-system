import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import Link from "next/link";
import { Button } from "@chakra-ui/button";

interface Props {}

const Banner = (props: Props) => {
    return (
        <Box w="full" bg="brand.red">
            <Flex justifyContent="space-between">
                <Heading fontWeight="light" fontSize="2xl" p={2}>
                    Computer won't turn on
                </Heading>
                <Link href="/">
                    <Button m={2} colorScheme="gray" fontWeight="light" size="sm">
                        Go Back!
                    </Button>
                </Link>
            </Flex>
        </Box>
    );
};

export default Banner;
