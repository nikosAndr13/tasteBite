import React from "react";
import { useNavigate, Link, Route } from "react-router-dom";
import { RecipePage } from "./RecipePage";

interface props {
  title: string;
  img: string;
}

export const RecipeCard = ({ title, img }: props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${title}`);
  };

  return (
    <>
      <figure className="cursor-pointer" onClick={handleClick}>
        <img
          src={img}
          alt={title}
          className="w-72 h-48 object-cover rounded-md"
        />
        <figcaption>{title}</figcaption>
      </figure>
    </>
  );
};
