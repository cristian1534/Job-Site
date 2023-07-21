import { useEffect, createContext, useState } from "react";
import { firebaseApp } from "@/database/config";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  return (
    <userContext.Provider value={{ currentUser }}>
      {children}
    </userContext.Provider>
  );
};
