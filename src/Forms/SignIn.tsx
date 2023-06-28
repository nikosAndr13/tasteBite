import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordValidation } from "../validations/validators";
import { useAuth } from "../providers/getAuth";
import Eye from "../assets/eye-solid.svg";
import { useToggleState } from "../Profile/useToggleState";

const signIn = ["email", "password"] as const;

interface SignInInfo {
  email: string;
  password: string;
}

interface SignInErrors {
  email: string;
  password: string;
}

export let checkName: string = "";

export const SignIn = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<SignInInfo>({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useToggleState(true);

  const errors: SignInErrors = {
    email: info.email === "" ? "Required" : "",
    password: passwordValidation(info.password),
  };

  return (
    <form
      className="flex flex-col gap-6 w-fit text-left m-auto border-2 p-4 rounded-xl mt-16"
      onSubmit={(e) => {
        e.preventDefault();
        login(info);
      }}
    >
      {signIn.map((field) => {
        return (
          <Fragment key={field}>
            <label className="flex flex-col w-52">
              {field[0].toUpperCase() + field.slice(1, field.length)}
              <div className="border-2 rounded-md flex">
                <input
                  className=" outline-none py-2 pl-2 w-44"
                  type={
                    field === "password" && showPassword ? "password" : "text"
                  }
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setInfo((prev) => ({ ...prev, [name]: value }));
                  }}
                  name={field}
                />
                {field === "password" ? (
                  <img
                    src={Eye}
                    alt="show password"
                    className="w-5 opacity-20 hover:opacity-100 cursor-pointer "
                    onClick={() => {
                      setShowPassword();
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
              {field === "password" ? (
                <small>{errors?.password}</small>
              ) : (
                <small>{errors?.email}</small>
              )}
            </label>
          </Fragment>
        );
      })}
      <button
        type="submit"
        className="border-orange-400 border-2 text-white bg-orange-400 rounded-xl p-2"
      >
        Login
      </button>
      <small
        onClick={() => {
          navigate("/signUp");
        }}
        className="hover:underline cursor-pointer hover:text-orange-600"
      >
        Don't have an account? Sign Up
      </small>
    </form>
  );
};
