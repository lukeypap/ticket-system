import { Menu, MenuButton, Button, MenuList, MenuItem, Box, Portal } from "@chakra-ui/react";
import React from "react";
import { IoChevronDown } from "react-icons/io5";
import { ITicket } from "../../types/ITicket";

interface Props {
    ticket: ITicket;
    color: string;
    handleStatus: (id, status) => void;
    size: string;
}

export const Dropdown = ({ ticket, color, handleStatus, size }: Props) => {
    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<IoChevronDown />}
                colorScheme={color}
                size={size}
                textTransform="uppercase"
                fontSize={size}
            >
                {ticket.status}
            </MenuButton>
            <Portal>
                <MenuList zIndex={2}>
                    <MenuItem onClick={() => handleStatus(ticket.id, "open")}>Open</MenuItem>
                    <MenuItem onClick={() => handleStatus(ticket.id, "work in progress")}>
                        Work in Progress
                    </MenuItem>
                    <MenuItem onClick={() => handleStatus(ticket.id, "cancelled")}>
                        Cancelled
                    </MenuItem>
                    <MenuItem onClick={() => handleStatus(ticket.id, "done")}>Done</MenuItem>
                </MenuList>
            </Portal>
        </Menu>
    );
};
