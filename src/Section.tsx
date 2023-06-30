import { Fragment } from "react";
import { useRecipiesContext } from "./providers/getRecipies";
import { RecipeCard } from "./RecipeCard";

interface props {
  title: string;
  id: number;
}

export const Section = ({ title }: props) => {
  const { recipies } = useRecipiesContext();
  const deliciousFood = ["pizza", "chicken", "meat", "pasta", "Burger"];
  const sweets = ["pancakes", "desserts", "Cake", "smoothies", "Donuts"];
  return (
    <>
      <div className="font-playFair font-bold text-4xl text-left p-6 mt-20">
        {title}
      </div>
      <div className="flex justify-around items-center flex-wrap">
        {title === "Super Delicious"
          ? recipies.map((rec) => {
              const {
                title,
                imageUrl,
                category,
                id,
              }: {
                title: string;
                imageUrl: string;
                category: string;
                id: number;
              } = rec;
              if (deliciousFood.includes(category)) {
                return (
                  <Fragment key={title}>
                    <RecipeCard title={title} img={imageUrl} id={id} />
                  </Fragment>
                );
              }
            })
          : ""}
        {title === "Sweet Tooth"
          ? recipies.map((rec) => {
              const {
                title,
                imageUrl,
                category,
                id,
              }: {
                title: string;
                imageUrl: string;
                category: string;
                id: number;
              } = rec;
              if (sweets.includes(category))
                return (
                  <Fragment key={title}>
                    <RecipeCard title={title} img={imageUrl} id={id} />
                  </Fragment>
                );
            })
          : ""}
        <div className="flex flex-wrap gap-x-5">
          {title === "All recipes"
            ? recipies.map((rec) => {
                const {
                  title,
                  imageUrl,
                  id,
                }: { title: string; imageUrl: string; id: number } = rec;
                return (
                  <Fragment key={title}>
                    <RecipeCard title={title} img={imageUrl} id={id} />
                  </Fragment>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};
