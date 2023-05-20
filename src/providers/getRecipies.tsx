import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { delete_request, getRequest, postRequest } from "../api/API_requests";

export type ChildrenType = {
  children: React.ReactNode;
};

interface RecipiesContextType {
  recipies: {
    userid: "";
    id: number;
    title: "";
    username: "";
    category: "";
    description: "";
    ingredients: "";
    directions: "";
    imageUrl: "";
  }[];
  deleteRecipe: Function;
  postRecipe: Function;
}

export const RecipiesContext = createContext<RecipiesContextType>({
  recipies: [],
  postRecipe: () => {},
  deleteRecipe: () => {},
});

export const RecipiesProvider = ({ children }: ChildrenType) => {
  const [recipies, setRecipies] = useState<RecipiesContextType["recipies"]>([]);

  useEffect(() => {
    getRequest("recipes").then(setRecipies);
  }, []);

  const postRecipe = (recipe: object) => {
    postRequest("recipes", recipe);
  };

  const deleteRecipe = async (id: string) => {
    const delRec = await delete_request("recipes", id).then((res) => {
      if (res.ok) {
        console.log("Something Went Wrong");
      }
      res.json();
    });
    console.log(delRec);
  };

  const contextValue = {
    recipies,
    deleteRecipe,
    postRecipe,
  };

  return (
    <>
      <RecipiesContext.Provider value={contextValue}>
        {children}
      </RecipiesContext.Provider>
    </>
  );
};

export const useRecipiesContext = () => {
  return useContext(RecipiesContext);
};
