import { Text } from "@chakra-ui/react";
import React from "react";
import { IUser } from "types/IUser";

interface Props {
    user: IUser;
}

export const UserCard = ({ user }: Props) => {
    console.log(user);
    return (
        <>
            {console.log(user)}
            <Text>{user.firstName}</Text>
            <p>{user.lastName}</p>
            <p>{user.email}</p>
            <Text>{user.role}</Text>
            <Text>{user.department}</Text>
        </>
    );
};
