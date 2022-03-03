import { VStack } from "@chakra-ui/react";
import { ActionBar } from "components/actionbar";
import UserHeader from "components/header/user-header";
import React from "react";

interface Props {}

const Users = (props: Props) => {
    return (
        <VStack
            width="full"
            overflow="auto"
            sx={{
                "&::-webkit-scrollbar": {
                    width: "5px",
                    borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "brand.red",
                },
            }}
            pl={10}
        >
            <UserHeader addText="All users" title="Users" />
            <ActionBar />
        </VStack>
    );
};

export default Users;
