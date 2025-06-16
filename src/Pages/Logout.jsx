import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";

function Logout() {
    const { instance } = useMsal();

    useEffect(() => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/", // Redirect after logout
        });
    }, [instance]);

    return <p>Logging out...</p>; // Optional message
}

export default Logout;
