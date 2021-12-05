import React from "react";
import Link from "next/link";

interface Props {}

const Index = (props: Props) => {
    return (
        <div>
            This is the users page!
            <Link href="/">Go Back!</Link>
        </div>
    );
};

export default Index;
