import { createContext, useContext, useState,useEffect } from "react";
import { useSelector } from "react-redux";

export const AuthContext = createContext();

// // eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState("");
  const { data } = useSelector((state) => state.loadProviders.Provider);
  const { client } = useSelector((state) => state.user);

  useEffect(() => {
    if (data && data.id) {
      setAuthUser(data.id);
    }
    if (client.data && client.data.id) {
      setAuthUser(client.data.id);
    }
    console.log(authUser);
  }, [client, data]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
