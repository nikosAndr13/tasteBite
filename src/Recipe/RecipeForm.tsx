import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { icons } from "./foodOptions";
import Select from "react-select";
import toast from "react-hot-toast";
import { Recipe } from "../api/API_requests";
import { useAuth } from "../providers/getAuth";
import { useCategoriesContext } from "../providers/getCategories";
import { useRecipiesContext } from "../providers/getRecipies";

type states = {
  name: string;
  value: string | undefined;
};

export const RecipeForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { categories } = useCategoriesContext();
  const { postRecipe } = useRecipiesContext();
  const [recipeForm, setRecipeForm] = useState<Recipe>({
    title: "",
    category: "",
    userid: user?.id,
    username: user?.name,
    description: "",
    ingredients: "",
    directions: "",
    imageUrl: "",
  });

  const handleChange = ({ name, value }: states) => {
    setRecipeForm((prev) => ({ ...prev, [name]: value }));
    if (!recipeForm.userid) {
      setRecipeForm((prev) => ({ ...prev, userid: Number(user?.id) }));
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postRecipe(recipeForm);
          setTimeout(() => navigate("/Home"), 1000);
          toast.success("Recipe Uploaded");
        }}
        className="flex flex-col gap-y-4 mt-10"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border-2 p-2"
          onChange={(e) => handleChange(e.target)}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="border-2 p-2"
          onChange={(e) => handleChange(e.target)}
        />
        <Select
          options={categories}
          name="category"
          placeholder="Choose a category"
          onChange={(e) => {
            handleChange({ name: "category", value: e?.label });
          }}
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients"
          className="border-2 p-2"
          onChange={(e) => handleChange(e.target)}
        />
        <textarea
          name="directions"
          placeholder="Directions"
          className="border-2 p-2"
          onChange={(e) => handleChange(e.target)}
        />
        <Select
          options={icons}
          name="imageUrl"
          placeholder="Image"
          onChange={(e) => {
            handleChange({ name: "imageUrl", value: e?.value });
          }}
        />
        <button type="submit">Upload Recipe</button>
      </form>
    </>
  );
};
