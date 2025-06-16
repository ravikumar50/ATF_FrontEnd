// src/Components/LoginButton.jsx
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";

const LoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(); // or loginPopup() for popup login
  };

  return (
    <button onClick={handleLogin}>
      Login with Microsoft
    </button>
  );
};

export default LoginButton;
