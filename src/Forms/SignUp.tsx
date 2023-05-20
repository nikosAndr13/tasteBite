import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  emailValidation,
  passwordValidation,
  confirmPassword,
} from "../validations/validators";
import { useAuth } from "../providers/getAuth";
import Eye from "../assets/eye-solid.svg";
import { useToggleState } from "../Profile/useToggleState";

const signUp = ["email", "name", "password", "Confirm Password"] as const;
type SignUpField = (typeof signUp)[number];
let confirmToggle: string;

export interface SignUpInfo {
  email: string;
  name: string;
  password: string;
}

interface SignUpErrors {
  email: string;
  name: string;
  password: string;
  "Confirm Password": string;
}

export const SignUp = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<SignUpInfo>({
    email: "",
    name: "",
    password: "",
  });
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useToggleState(true);

  const errors: SignUpErrors = {
    name: info.name === "" ? "Required" : "",
    email: emailValidation(info.email),
    password: passwordValidation(info.password),
    "Confirm Password": confirmToggle,
  };

  const noErrors: boolean = Object.values(errors).every((value) => value === "")
    ? true
    : false;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (noErrors) {
          register(info);
        } else {
          toast.error("Failed");
        }
      }}
      className="flex flex-col gap-6 w-fit text-left m-auto border-2 p-4 rounded-xl mt-16"
    >
      {signUp.map((field: string) => {
        return (
          <Fragment key={field}>
            <label className="flex flex-col">
              {field[0].toUpperCase() + field.slice(1, field.length)}
              {field === "password" || field === "Confirm Password" ? (
                <>
                  <div className="flex border-2">
                    <input
                      className="outline-none p-2"
                      type={
                        (field === "password" && showPassword) ||
                        (field === "Confirm Password" && showPassword)
                          ? "password"
                          : "text"
                      }
                      name={field}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        if (name === "Confirm Password")
                          confirmToggle = confirmPassword(
                            info.password,
                            value.trim()
                          );
                        setInfo((prev) => ({ ...prev, [name]: value.trim() }));
                      }}
                    />
                    <img
                      src={Eye}
                      alt="show password"
                      className="w-5"
                      onClick={() => setShowPassword()}
                    />
                  </div>
                  {field === "password" ? (
                    <small className="w-64">{errors?.password}</small>
                  ) : (
                    ""
                  )}
                  {field === "Confirm Password" ? (
                    <p>{errors?.["Confirm Password"]}</p>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <input
                    className="border-2 rounded-md outline-none p-2"
                    type={"text"}
                    name={field}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      setInfo((prev) => ({ ...prev, [name]: value.trim() }));
                    }}
                  />
                  {field === "email" ? (
                    <p>{errors?.email}</p>
                  ) : (
                    <p>{errors?.name}</p>
                  )}
                </>
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
          navigate("/login");
        }}
        className="hover:underline cursor-pointer hover:text-orange-600"
      >
        Already have an account? Login
      </small>
    </form>
  );
};
