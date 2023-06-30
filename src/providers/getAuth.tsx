import { useState, createContext, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ChildrenType } from "./getRecipies";
import { postRequest, patchRequest } from "../api/API_requests";
import { checkForExistingUser, getUserFromDb } from "../validations/validators";
import { copyFileSync } from "fs";

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
  password: string;
}

interface User {
  email: string;
  password: string;
  id?: number;
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
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const maybeUser = localStorage.getItem("user");
    if (maybeUser) {
      const parsedUser = JSON.parse(maybeUser);
      setUser(parsedUser.userInfo);
    }
  }, []);

  const register = async (info: info) => {
    const { password, email } = info;
    const newUser = await postRequest("users", { password, email });
    if (newUser.message) {
      toast.error(newUser.message);
    } else {
      toast.success("Registered Successfully!");
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser.userInfo.email);
      navigate("/Home");
    }
  };

  const login = async ({ password, email }: User) => {
    const user = await postRequest("users/auth/login", { email, password });
    if (user.token !== undefined && user) {
      toast.success("Signed In");
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/Home");
    } else {
      toast.error("Invalid credentials");
    }
    setUser(user.userInfo);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const editInfo = async (updatedData: object) => {
    const user = await patchRequest(`users`, updatedData);
    console.log(user);
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
