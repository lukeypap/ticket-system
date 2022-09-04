import {
    Avatar,
    Button,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useMutation, useQueryClient } from "react-query";
import { updateAsignee } from "../../api/tickets";

interface props {
    ticket: any;
    users: any;
    token: any;
}

const AssigneeDropdown = ({ ticket, users, token }: props) => {
    const [activeAsignee, setActiveAsignee] = useState(
        ticket.asignee !== null ? ticket.asignee : "Unassigned"
    );
    const queryClient = useQueryClient();

    const { mutate: updateTicketAsignee } = useMutation(updateAsignee, {
        onSuccess: () => {
            queryClient.invalidateQueries("getById");
        },
    });

    const handleAsigneeChange = (userId: number) => {
        updateAsignee({ id: ticket.id, token, userId });
    };

    return (
        <Menu>
            <MenuButton as={Button} size={"sm"} fontWeight={"md"}>
                <HStack>
                    <Avatar
                        size="xs"
                        name={
                            activeAsignee === "Unassigned"
                                ? "Unassigned"
                                : activeAsignee.firstName + " " + activeAsignee.lastName
                        }
                    />
                    <Text>
                        {activeAsignee === "Unassigned"
                            ? "Unassigned"
                            : activeAsignee.firstName + " " + activeAsignee.lastName}
                    </Text>
                </HStack>
            </MenuButton>
            <MenuList>
                {users.map((user) => (
                    <MenuItem
                        key={user.id}
                        mr={"0px"}
                        onClick={() => {
                            setActiveAsignee(user);
                            handleAsigneeChange(user.id);
                        }}
                    >
                        <Avatar size="xs" name={user.firstName + " " + user.lastName} mr={"10px"} />
                        <Text>{user.firstName + " " + user.lastName}</Text>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default AssigneeDropdown;
