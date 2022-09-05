import { List, ListItem, VStack, useColorMode, useDisclosure } from "@chakra-ui/react";
import { navItems } from "./nav-items";
import { NavItem } from "./nav-item";
import { Logo } from "../logo";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { create } from "src/api/tickets";
import { FormModal } from "components/modal/form-modal";
import { IoWarning } from "react-icons/io5";

export const Sidebar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [active, setActive] = useState("Home");
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const queryClient = useQueryClient();

    const jwt = {
        token: "",
    };
    if (typeof window !== "undefined") {
        if (localStorage.getItem("token")) {
            jwt.token = localStorage.getItem("token");
        }
    }

    const { isLoading: mutationLoading, mutate: createTicket } = useMutation(create, {
        onSuccess: () => {
            queryClient.invalidateQueries("getAll");
        },
    });

    const handleCreate = async (values: Object) => {
        createTicket({ values: values, token: jwt.token });
    };

    return (
        <VStack
            alignItems="flex-start"
            width="full"
            height="full"
            maxW={{ base: 52, "2xl": 60 }}
            borderRightColor={colorMode === "light" ? "gray.200" : "gray.600"}
            borderRightWidth={2}
            flexShrink={0}
        >
            <Logo />

            <List width="full" overflowY="auto">
                {navItems.map((item, index) => (
                    <ListItem key={item.label}>
                        <NavItem item={item} onOpen={onOpen} />
                    </ListItem>
                ))}
            </List>
            <FormModal
                handleCreate={handleCreate}
                title={"Create a ticket"}
                isOpen={isOpen}
                onClose={onClose}
                message="123"
                icon={<IoWarning />}
            />
        </VStack>
    );
};
