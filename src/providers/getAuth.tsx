import { useState, createContext, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ChildrenType } from "./getRecipies";
import { postRequest, patchRequest } from "../api/API_requests";
import { checkForExistingUser, getUserFromDb } from "../validations/validators";

interface User {
  email: string;
  name: string;
  password: string;
  id: number;
}

interface AuthContextType {
  user: User | null;
  setUser: Function;
  register: Function;
  login: Function;
  logout: Function;
  editInfo: Function;
}

interface info {
  email: string;
  name: string;
  password: string;
  id: number;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  register: async () => {
    throw new Error("register function not implemented");
  },
  login: () => {},
  logout: () => {},
  editInfo: () => {},
});

export const AuthProvider = ({ children }: ChildrenType) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const maybeUser = localStorage.getItem("user");
    if (maybeUser) {
      const parsedUser = JSON.parse(maybeUser);
      setUser(parsedUser);
    }
  }, []);

  const register = async (info: info) => {
    const { email, name, password, id } = info;
    const user = await checkForExistingUser({ name, password, id, email });
    if (user) toast.error("User Already exists, Please Sign In");
    else {
      toast.success("Success");
      postRequest("users", { email, name, password }).then((user) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ name: name, password: password, id: id })
        );
        return setUser({ name, password, id, email });
      });
    }
  };

  const login = async ({ name, password, id, email }: User) => {
    const user = await getUserFromDb({ name, password, id, email });
    if (!user) toast.error("User does not exist");
    else {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/Home");
      toast.success("Signed In");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const editInfo = async (endpoint: string, updatedData: object) => {
    console.log(updatedData);
    const user = await patchRequest(`users${endpoint}`, updatedData);
    console.log({ user });
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    register,
    login,
    logout,
    editInfo,
  };

  return (
    <>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return {
    user: context.user,
    setUser: context.setUser,
    register: context.register,
    login: context.login,
    logout: context.logout,
    editInfo: context.editInfo,
  };
};
