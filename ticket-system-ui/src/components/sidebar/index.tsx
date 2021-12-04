import { List, ListItem, VStack, useColorMode } from "@chakra-ui/react";
import { navItems } from "./nav-items";
import { NavItem } from "./nav-item";
import { Logo } from "../logo";

export const Sidebar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <VStack
            alignItems="flex-start"
            width="full"
            height="full"
            maxW={{ base: 52, "2xl": 72 }}
            borderRightColor={colorMode === "light" ? "gray.200" : "gray.600"}
            borderRightWidth={2}
            flexShrink={0}
        >
            <Logo />

            <List width="full" overflowY="auto">
                {navItems.map((item, index) => (
                    <ListItem key={item.label}>
                        <NavItem item={item} isActive={index === 0} />
                    </ListItem>
                ))}
            </List>
        </VStack>
    );
};
