import { useMsal } from "@azure/msal-react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess, logoutSuccess } from "../../Redux/Slices/AuthSlice";

export default function AuthSync() {
  const { accounts } = useMsal();
  const dispatch = useDispatch();

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      const user = accounts[0];
      dispatch(loginSuccess({
        name: user.name,
        username: user.username,
        email: user.username,
      }));
    } else {
      dispatch(logoutSuccess());
    }
  }, [accounts]);

  return null;
}
