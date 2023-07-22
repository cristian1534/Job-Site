import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { userContext } from "@/components/user/User";
import Loader from "../Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useContext(userContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (currentUser) {
    return children;
  }

  return (
    <div>
      <Loader />
    </div>
  );
};

export default PrivateRoute;
