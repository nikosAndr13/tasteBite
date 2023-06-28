import Pen from "../assets/pen-solid.svg";
import { useToggleState } from "./useToggleState";
import { useAuth } from "../providers/getAuth";

interface props {
  fieldName: string;
  fieldValue?: string;
  errorM?: string;
}

export const Field = ({ fieldName, fieldValue, errorM }: props) => {
  const { setUser, user } = useAuth();
  const [toggle, setToggle] = useToggleState(false);
  const [showPassword, setShowPassword] = useToggleState(false);

  return (
    <>
      <div className="flex gap-x-2 items-center">
        <h2>{fieldName}:</h2>
        {toggle ? (
          <>
            <input
              type="text"
              className="border-2 outline-none p-2"
              placeholder={"Type here..."}
              onChange={(e) => {
                setUser(e.target.value.trim());
              }}
            />
            <small>{errorM}</small>
          </>
        ) : (
          <>
            {fieldName === "password" ? (
              <>
                {showPassword ? (
                  <p>{fieldValue}</p>
                ) : (
                  <p>{fieldValue?.replace(/./g, "*")}</p>
                )}
                {showPassword ? (
                  <small
                    className={"cursor-pointer"}
                    onClick={() => setShowPassword()}
                  >
                    Hide Password
                  </small>
                ) : (
                  <small
                    className={"cursor-pointer"}
                    onClick={() => setShowPassword()}
                  >
                    Show Password
                  </small>
                )}
              </>
            ) : (
              <p>{fieldValue}</p>
            )}
          </>
        )}
        <img
          className={"w-3 cursor-pointer"}
          src={Pen}
          alt="edit info"
          onClick={() => {
            setToggle();
          }}
        />
      </div>
    </>
  );
};
