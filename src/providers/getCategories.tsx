import { createContext, useContext } from "react";
import { useState, useEffect, useReducer, useRef } from "react";
import { getRequest } from "../api/API_requests";

type ChildrenType = {
  children: React.ReactNode;
};

interface CategoriesContextType {
  categories: { label: string; img: string; isPopular: boolean }[];
}

export const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
});

export const CategoriesProvider = ({ children }: ChildrenType) => {
  const [categories, setCategories] = useState<
    CategoriesContextType["categories"]
  >([]);
  const firstRender = useRef(false);

  useEffect(() => {
    if (firstRender.current) {
      getRequest("categories").then(setCategories);
    } else {
      firstRender.current = true;
    }
  }, []);

  const contextValue = {
    categories,
  };

  return (
    <>
      <CategoriesContext.Provider value={contextValue}>
        {children}
      </CategoriesContext.Provider>
    </>
  );
};

export const useCategoriesContext = () => {
  return useContext(CategoriesContext);
};
