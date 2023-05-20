import { Fragment } from "react";
import { useCategoriesContext } from "./providers/getCategories";
import { useRecipiesContext } from "./providers/getRecipies";
import { RecipeCard } from "./RecipeCard";

interface props {
  title: string;
}

export const Section = ({ title }: props) => {
  const { categories } = useCategoriesContext();
  const { recipies } = useRecipiesContext();
  const deliciousFood = ["pizza", "chicken", "meat", "pasta", "Burger"];
  const sweets = ["pancakes", "desserts", "Cake", "smoothies", "Donuts"];
  return (
    <>
      <div className="font-playFair font-bold text-4xl text-left p-6 mt-20">
        {title}
      </div>
      <div className="flex justify-around items-center">
        {title === "Popular Categories"
          ? categories.map((cat) => {
              const { isPopular, label, img } = cat;
              if (isPopular) {
                return (
                  <Fragment key={label}>
                    <div className="flex-col">
                      <div className="container rounded-full cursor-pointer">
                        <img src={img} alt={label} className="background" />
                      </div>
                      <div>{cat.label}</div>
                    </div>
                  </Fragment>
                );
              }
            })
          : ""}
        {title === "Super Delicious"
          ? recipies.map((rec) => {
              const {
                title,
                imageUrl,
                category,
              }: { title: string; imageUrl: string; category: string } = rec;
              if (deliciousFood.includes(category)) {
                return (
                  <Fragment key={title}>
                    <RecipeCard title={title} img={imageUrl} />
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
              }: { title: string; imageUrl: string; category: string } = rec;
              if (sweets.includes(category))
                return (
                  <Fragment key={title}>
                    <RecipeCard title={title} img={imageUrl} />
                  </Fragment>
                );
            })
          : ""}
        <div className="flex flex-wrap gap-x-5">
          {title === "All recipes"
            ? recipies.map((rec) => {
                const { title, imageUrl }: { title: string; imageUrl: string } =
                  rec;
                return (
                  <Fragment key={title}>
                    <RecipeCard title={title} img={imageUrl} />
                  </Fragment>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
};
