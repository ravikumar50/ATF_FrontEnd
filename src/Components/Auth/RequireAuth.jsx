import { useMsal } from "@azure/msal-react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess, logoutSuccess } from "./redux/authSlice";

function RequireAuth() {
  const { accounts } = useMsal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      const user = accounts[0];
      dispatch(loginSuccess({
        name: user.name,
        username: user.username,
        email: user.username, // usually email
      }));
    } else {
      dispatch(logoutSuccess());
    }
  }, [accounts]);

  return null; // it's a logic component
}