import NextLink from "next/link";
import { Heading, Icon, Text, HStack, Box, Link } from "@chakra-ui/react";

import { NavItem as Item } from "../../types/nav-item";

type Props = {
    item: Item;
    isActive: boolean;
};

export const NavItem = ({ isActive, item }: Props) => {
    const { label } = item;
    const handleLogout = () => {
        if (label === "Log Out") {
            console.log("removing item");
            localStorage.removeItem("token");
        }
        console.log("hello");
    };

    if (item.type === "link") {
        const { icon } = item;

        return (
            <NextLink href={item.href} passHref>
                <Link variant="unstyled" _hover={{ textDecoration: "none" }} onClick={handleLogout}>
                    <HStack
                        align="center"
                        justify="flex-start"
                        height={{ base: 10, "2xl": 14 }}
                        transition="ease-out"
                        transitionProperty="background"
                        transitionDuration="normal"
                        _hover={{
                            color: "brand.red",
                        }}
                        ms={0}
                        borderRight={isActive ? "4px" : "0px"}
                        borderRightColor={isActive ? "brand.red" : ""}
                        //bg={isActive ? "brand.red" : ""}
                        color={isActive ? "brand.red" : ""}
                    >
                        <Icon width={5} height={5} mr={4} ml={8} as={icon} />
                        <Text fontSize="sm" fontWeight="light" flex={1} letterSpacing="wider">
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
