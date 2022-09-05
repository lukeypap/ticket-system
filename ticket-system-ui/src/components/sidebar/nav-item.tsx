import NextLink from "next/link";
import { Heading, Icon, Text, HStack, Box, Link } from "@chakra-ui/react";

import { NavItem as Item } from "../../types/nav-item";
import { useState } from "react";
import { useRouter } from "next/router";

type Props = {
    item: Item;
    onOpen: any;
};

export const NavItem = ({ item, onOpen }: Props) => {
    const { label } = item;
    const router = useRouter();
    const [active, setActive] = useState(
        item.type === "link" ? (router.pathname === item.href ? true : false) : false
    );
    const handleLogout = () => {
        if (label === "Log Out") {
            console.log("removing item");
            localStorage.removeItem("token");
        }
    };

    const handleTicket = () => {
        if (label === "Create a ticket") {
            onOpen();
        }
    };

    if (item.type === "link") {
        const { icon } = item;
        if (router.pathname === item.href) {
        }

        return (
            <NextLink href={item.label !== "Create a ticket" ? item.href : ""} passHref>
                <Link
                    _hover={{ textDecoration: "none" }}
                    onClick={() => {
                        handleLogout();
                        handleTicket();
                    }}
                    _focus={{ outline: "none" }}
                >
                    <HStack
                        align="center"
                        justify="flex-start"
                        height={{ base: 10 }}
                        transition="ease-out"
                        transitionProperty="background"
                        transitionDuration="normal"
                        _hover={active ? { color: "" } : { color: "brand.red" }}
                        bg={active ? "brand.red" : ""}
                        color={active ? "white" : ""}
                    >
                        <Icon width={5} height={5} mr={4} ml={5} as={icon} opacity="0.8" />
                        <Text
                            fontSize="sm"
                            fontWeight="light"
                            flex={1}
                            letterSpacing="wider"
                            opacity="0.8"
                        >
                            {label}
                        </Text>
                    </HStack>
                </Link>
            </NextLink>
        );
    }

    return (
        <Heading
            color="gray.light"
            fontWeight="normal"
            textTransform="uppercase"
            letterSpacing={6}
            fontSize="sm"
            ml={8}
            mt={{ base: 6, "2xl": 8 }}
            mb={2}
        >
            {label}
        </Heading>
    );
};
