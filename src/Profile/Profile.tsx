import { useAuth } from "../providers/getAuth";
import toast from "react-hot-toast";
import { Field } from "./field";
import { emailValidation } from "../validations/validators";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { logout, user, editInfo } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center mt-24 gap-2">
        <h1>Profile</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/login`);
            logout();
            toast.success("Sign again for the changes to apply");
            editInfo(`/${user?.id}`, {
              email: user?.email,
              name: user?.name,
              password: user?.password,
            });
          }}
        >
          <Field
            fieldValue={user?.email}
            fieldName={"email"}
            errorM={emailValidation(user?.email)}
          />
          <Field fieldValue={user?.name} fieldName="name" />
          <Field fieldValue={user?.password} fieldName="password" />
          <div>
            <button
              type="submit"
              onClick={() => {
                alert("Refresh if you want to discard changes");
              }}
            >
              Click to Save Changes
            </button>
          </div>
        </form>
      </div>
      <button
        onClick={() => {
          logout();
          navigate(`/login`);
        }}
      >
        Logout
      </button>
      <div>
        <button type="button">Delete Account</button>
      </div>
    </>
  );
};
