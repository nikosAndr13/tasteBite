import React, { Fragment } from "react";
import Donut from "../assets/donut.svg";
import BlueBerries from "../assets/blueberries.svg";
import { chefs } from "./AboutPageData";

export const AboutPage = () => {
  return (
    <>
      <div className="flex flex-col max-w-4xl w-full m-auto mt-10">
        <h1 className="font-playFair text-3xl font-bold text-left py-5 mt-10">
          About
        </h1>
        <hr />
        <h2 className="text-left py-5 font-playFair font-bold text-5xl leading-normal tracking-wide">
          We 're a group of foodies who love <br />
          cooking and the internet
        </h2>
        <figure>
          <img className="m-auto rounded-xl" src={Donut} alt="donut" />
          <figcaption className="text-left py-6 leading-loose text-xl">
            Food qualities braise chicken cuts bowl through slices butternut
            snack. Tender meat juicy dinners. One-pot low heat plenty of time
            adobo fat raw soften fruit. sweet renders bone-in marrow richness
            kitchen, fricassee basted pork shoulder. Delicious butternut squash
            hunk.
          </figcaption>
        </figure>
        <section className="flex mt-24 items-center gap-x-28">
          <div className="w-1/2">
            <h2 className="font-playFair text-5xl font-bold text-left leading-normal">
              Simple, Easy <br /> Recipes for all
            </h2>
            <p className="text-left py-4 text-lg">
              Juicy meatballs brisket slammin' baked shoulder. Juicy smoker soy
              sauce burgers brisket. polenta mustard hunk greens. Wine technique
              snack skewers chuck excess. Oil heat slowly. slices natural
              delicious, set aside magic tbsp skillet, bay leaves brown
              centerpiece.
            </p>
          </div>
          <div>
            <img src={BlueBerries} alt="berries" />
          </div>
        </section>
        <section className="flex gap-x-30 flex-col mt-12">
          <div>
            <h2 className="text-left py-5 font-playFair font-bold text-5xl leading-normal">
              An incredible team of talented chefs <br /> and foodies
            </h2>
          </div>
          <div className="flex flex-wrap justify-between mt-6">
            {chefs.map((chef) => (
              <Fragment key={chef.name}>
                <figure className="flex items-center flex-col p-3">
                  <img className="w-28" src={chef.img} alt={chef.name} />
                  <figcaption className="py-2">
                    <p className="font-semibold">{chef.name}</p>
                    <p>
                      <small>Chef Extraodinaire</small>
                    </p>
                  </figcaption>
                </figure>
              </Fragment>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
