import React from "react";
import { useNavigate, Link, Route } from "react-router-dom";
import { RecipePage } from "./RecipePage";

interface props {
  title: string;
  img: string;
  id: number;
}

export const RecipeCard = ({ title, img, id }: props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${id}`);
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
