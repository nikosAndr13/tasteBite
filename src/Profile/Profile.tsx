import { useAuth } from "../providers/getAuth";
import toast from "react-hot-toast";
import { Field } from "./field";
import { emailValidation } from "../validations/validators";
import { useNavigate } from "react-router-dom";
import { delete_request } from "../api/API_requests";

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
            toast.success("Sign again for the changes to apply");
            editInfo({ email: user });
          }}
        >
          <Field
            fieldValue={user?.email}
            fieldName={"email"}
            errorM={emailValidation(user?.email)}
          />
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
        <button
          onClick={() => {
            delete_request(`/${user}`);
          }}
        >
          Delete Account
        </button>
      </div>
    </>
  );
};
