import React, { Fragment, useEffect, useState } from "react";
import { useComment } from "../providers/getComment";
import { useAuth } from "../providers/getAuth";
type props = { recipeId: number };

export type comment = {
  recipeId: number;
  id: number;
  userId: number;
  comment: string;
};

export const CommentSection = ({ recipeId }: props) => {
  const [comment, setComment] = useState<string>("");
  const { user } = useAuth();
  const { comments, setComments, postComment } = useComment();

  const commentToActuallyAppear = comments.filter(
    (comment: comment) => recipeId === comment.recipeId
  );

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
          postComment({
            userId: user?.id,
            comment: comment,
            recipeId: recipeId,
          });
          setComments((prev: []) => [
            ...prev,
            { userId: user?.id, comment: comment, recipeId: recipeId },
          ]);
        }}
        className="border-2 p-2 rounded-md hover:bg-sky-900 hover:border-sky-900 hover:text-white"
      >
        Click to Post the Comment
      </button>
      <br /> <br />
      <h2 className="pl-5">Comments Will Appear below</h2>
      {commentToActuallyAppear.length === 0 ? (
        <p>No Comments Yet</p>
      ) : (
        commentToActuallyAppear.map((text, i) => {
          const { id, userId, comment } = text;
          return (
            <Fragment key={i}>
              <div>
                <p className="p-5 text-2xl">
                  <span className="font-bold">user{userId}</span>: {comment}
                </p>
              </div>
            </Fragment>
          );
        })
      )}
    </>
  );
};
