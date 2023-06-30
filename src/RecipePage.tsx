import { useParams } from "react-router-dom";
import { useRecipiesContext } from "./providers/getRecipies";
import { useAuth } from "./providers/getAuth";
import toast from "react-hot-toast";
import { CommentSection } from "./CommentSection/CommentSection";
import { CommentProvider } from "./providers/getComment";

export const RecipePage = () => {
  const { id } = useParams();
  const { recipies, deleteRecipe } = useRecipiesContext();
  const { user } = useAuth();

  const recipe = recipies.find((rec) => rec.id === Number(id));

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const { imageUrl, ingredients, description, directions, username, title } =
    recipe;
  const ingredientsList = ingredients.split("\n");
  const direction = directions.split("\n");
  return (
    <>
      <CommentProvider>
        <div className="mt-24 flex flex-col gap-y-16">
          <div>
            <div>
              <h1 className="text-left text-4xl font-playFair font-bold pb-10">
                Recipe Page
                <span>
                  <p className="text-left text-xl"> Uploaded by {username}</p>
                </span>
              </h1>
            </div>
            <img src={imageUrl} alt={title} className="w-1/3 pb-4 m-auto" />
            <div className="font-semibold pb-10 text-3xl">{description}</div>
            <div className="flex text-left justify-around">
              <div className="flex flex-col justify-between">
                <h3 className="font-bold">Ingredients</h3>
                <div>
                  <ul className="text-left">
                    {ingredientsList.map((ingredient: string, i) => {
                      return (
                        <li
                          className={ingredient === "" ? "" : "list-disc"}
                          key={i}
                        >
                          {ingredient}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="flex items-center flex-col mt-40">
                  <button className=" p-4 border-2 text-black rounded-md hover:bg-red-900 hover:text-white">
                    Delete Recipe
                  </button>
                </div>
              </div>
              <div className="w-1/3">
                <h3 className="font-bold">Instructions</h3>
                <ol className="text-left">
                  {direction.map((ingredient: string, i) => {
                    return (
                      <li
                        key={i}
                        className={
                          ingredient[0] === ingredient[0]?.toUpperCase() &&
                          ingredient[0] !== undefined
                            ? "list-disc"
                            : ""
                        }
                      >
                        {ingredient}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
          <div className="text-left">
            {user && <CommentSection recipeId={recipe.id} />}
          </div>
        </div>
      </CommentProvider>
    </>
  );
};
