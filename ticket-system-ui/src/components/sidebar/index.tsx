import { List, ListItem, VStack } from "@chakra-ui/layout";
import React from "react";
import { navItems } from "./nav-items";

interface Props {}

const Sidebar = (props: Props) => {
    return (
        <VStack
            alignItems="flex-start"
            width="full"
            height="full"
            mawW={{ base: 56, "2xl": 72 }}
            borderRightColor="gray.dark"
            borderRightWidth={2}
            flexShrink={0}
        >
            {/* Logo */}
            <List with="full" overflowY="auto">
                {navItems.map((item) => (
                    <ListItem key={item.label}>{/* NavItem */}</ListItem>
                ))}
            </List>
        </VStack>
    );
};

export default Sidebar;
