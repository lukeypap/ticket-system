import { Box, Heading } from "@chakra-ui/layout";
import React from "react";

interface Props {}

export const Logo = (props: Props) => {
    return (
        <Box p={8} pb={4}>
            <Heading>Tix</Heading>
        </Box>
    );
};
