import { useCategoriesContext } from "./providers/getCategories";
import { Fragment } from "react";

export const Categories = () => {
  const { categories } = useCategoriesContext();
  return (
    <>
      <div className="flex flex-wrap  justify-center mt-24">
        {categories.map((cat) => {
          const { img, label } = cat;
          return (
            <Fragment key={label}>
              <div className="flex flex-col w-64 h-64 justify-center items-center">
                <div className="container1 rounded-full cursor-pointer">
                  <img
                    src={img}
                    alt={label}
                    className="background rounded-full"
                  />
                </div>
                <div>{cat.label}</div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};
