import React, {
  useState,
  createContext,
  useRef,
  useEffect,
  useContext,
} from "react";
import { ChildrenType } from "./getRecipies";
import { postRequest, getRequest } from "../api/API_requests";

interface CommentContextType {
  comments: [];
  setComments: Function;
  postComment: Function;
}

export const CommentContext = createContext<CommentContextType>({
  comments: [],
  setComments: () => {},
  postComment: () => {},
});

export const CommentProvider = ({ children }: ChildrenType) => {
  const [comments, setComments] = useState<CommentContextType["comments"]>([]);

  useEffect(() => {
    getRequest("comments").then(setComments);
  }, []);

  const postComment = (text: object) => {
    postRequest("comments", text);
  };

  const contextValue: CommentContextType = {
    comments,
    setComments,
    postComment,
  };

  return (
    <>
      <CommentContext.Provider value={contextValue}>
        {children}
      </CommentContext.Provider>
    </>
  );
};

export const useComment = () => {
  const context = useContext(CommentContext);

  return {
    comments: context.comments,
    setComments: context.setComments,
    postComment: context.postComment,
  };
};
