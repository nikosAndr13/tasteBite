import React, { Fragment, useEffect, useState } from "react";
import { useAuth } from "../providers/getAuth";
import { getRequest, postRequest } from "../api/API_requests";
import { useComment } from "../providers/getComment";
import { useParams } from "react-router-dom";
type props = { recipeId: number };

export type comment = {
  recipeId: number;
  userId: number;
  comment: string;
};

export const CommentSection = ({ recipeId }: props) => {
  const { user } = useAuth();
  const { id } = useParams();
  const [comment, setComment] = useState<string>("");
  const { comments, setComments } = useComment();

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
          setComments((prev: []) => [
            ...prev,
            { comment: comment, userId: user?.id, recipeId: id },
          ]);
        }}
        className="border-2 p-2 rounded-md hover:bg-sky-900 hover:border-sky-900 hover:text-white"
      >
        Click to Post the Comment
      </button>
      <br /> <br />
      <h2 className="pl-5">Comments Will Appear below</h2>
      {comments.length === 0 ? (
        <p>No Comments Yet</p>
      ) : (
        comments.map((text, i) => {
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
