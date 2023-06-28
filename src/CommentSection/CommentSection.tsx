import React, { Fragment, useEffect, useState } from "react";
import { useAuth } from "../providers/getAuth";
import { getRequest, postRequest } from "../api/API_requests";
type props = { recipeId: number };

export type comment = {
  recipeId: number;
  userId: number;
  comment: string;
};

export const CommentSection = ({ recipeId }: props) => {
  const [comment, setComment] = useState<string>("");
  const [allComments, setAllComments] = useState<comment[]>([]);

  const getComments = async () => {
    await getRequest(`comments/${recipeId}`).then(setAllComments);
  };
  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold font-playFair">
        Leave some feedback or notes on the recipe!
      </h1>
      <textarea
        className="w-96 h-28 p-4 border-2"
        placeholder="Leave a comment here..."
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          postRequest("comments", {
            comment: comment,
            recipeId: recipeId,
          });
        }}
        className="border-2 p-2 rounded-md hover:bg-sky-900 hover:border-sky-900 hover:text-white"
      >
        Click to Post the Comment
      </button>
      <br /> <br />
      <h2 className="pl-5">Comments Will Appear below</h2>
      {allComments.length === 0 ? (
        <p>No Comments Yet</p>
      ) : (
        allComments.map((text, i) => {
          const { userId, comment } = text;
          return (
            <Fragment key={i}>
              <div>
                <p className="p-5 text-2xl">
                  <span className="font-bold">user {userId}</span>: {comment}
                </p>
              </div>
            </Fragment>
          );
        })
      )}
    </>
  );
};
