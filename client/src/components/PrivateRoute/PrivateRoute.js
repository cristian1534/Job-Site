import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { userContext } from "../user/User";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const { currentUser } = useContext(userContext);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
    }
  }, [currentUser, router]);

  return currentUser ? children : null;
};

export default PrivateRoute;
