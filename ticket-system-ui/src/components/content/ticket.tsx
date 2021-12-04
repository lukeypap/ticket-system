import React from "react";
import Link from "next/link";
import { Button } from "@chakra-ui/button";
import { Divider } from "@chakra-ui/react";
import { PageHeader } from "../header";
import Banner from "../banner";

interface Props {}

export const Ticket = (props: Props) => {
    return (
        <>
            <PageHeader title={`Ticket ${5}`} />
            <Divider />
            <Banner />
            <div>
                <p>test</p>
            </div>
        </>
    );
};
