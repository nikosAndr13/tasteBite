import logo from "./assets/logo.svg";
import search from "./assets/search.svg";
import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./providers/getAuth";

export const NavBar = () => {
  const fields = ["Home", "Categories", "About"] as const;
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <nav className="flex justify-between items-center">
        <img src={logo} alt="tasteBite" className="w-48 inline" />
        {fields.map((field) => (
          <Fragment key={field}>
            <NavLink to={field}>
              <div className="cursor-pointer p-2 text-xl">{field}</div>
            </NavLink>
          </Fragment>
        ))}
        <form
          className="flex expand p-2 text-xl"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input type="text" placeholder="Search..." className="outline-none" />
          <button type="submit">
            <img
              src={search}
              alt="search"
              className="w-5 cursor-pointer text-xl"
            />
          </button>
        </form>
        {user === "" ? (
          <button
            onClick={() => {
              navigate("/login");
            }}
            type="button"
            className="border-2 w-24 rounded-md ease-in-out duration-300 hover:scale-105"
          >
            Login
          </button>
        ) : (
          <div
            title="Click to see your profile"
            className="text-3xl p-3 rounded-full w-16 h-16 bg-gray-700 text-white cursor-pointer hover:opacity-90"
            onClick={() => {
              navigate(`/profile`);
            }}
          >
            {user[0].toUpperCase()}
          </div>
        )}
      </nav>
    </>
  );
};
