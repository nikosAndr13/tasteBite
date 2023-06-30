import { useNavigate } from "react-router-dom";
import { Section } from "./Section";
import Pen from "./assets/pen-solid.svg";
import { useAuth } from "./providers/getAuth";

export const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <>
      <div className="flex flex-row-reverse gap-x-2 border-2 w-fit absolute right-0 mr-32 createRecipe mt-20 p-2 rounded-xl cursor-pointer">
        {user && (
          <>
            <img className={"w-4"} src={Pen} alt="edit" />
            <button
              onClick={() => {
                navigate("/RecipeForm");
              }}
            >
              Create new Recipe
            </button>
          </>
        )}
      </div>
      <Section title={"Super Delicious"} />
      <Section title={"Sweet Tooth"} />
      <Section title={"All recipes"} />
    </>
  );
};
