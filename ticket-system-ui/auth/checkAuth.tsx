import { useQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { verifyToken } from "src/api/auth";

const checkAuth = (WrappedComponent) => {
    return (props) => {
        const Router = useRouter();
        const [verified, setVerified] = useState(false);

        useEffect(() => {
            const verify = async () => {
                const accessToken = localStorage.getItem("token");
                // if no accessToken was found,then we redirect to "/" page.
                if (!accessToken) {
                    Router.replace("/login");
                } else {
                    // we call the api that verifies the token.
                    const data = await verifyToken(accessToken);
                    // if token was verified we set the state.
                    if (data) {
                        setVerified(data);
                    } else {
                        // If the token was fraud we first remove it from localStorage and then redirect to "/"
                        localStorage.removeItem("accessToken");
                        Router.replace("/login");
                    }
                }
            };
            verify();
        }, []);

        if (verified) {
            return <WrappedComponent {...props} />;
        } else {
            return null;
        }
    };
};

export default checkAuth;
