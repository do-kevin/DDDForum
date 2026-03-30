import type { Route } from "./+types/RegistrationPage";
import Layout from "~/components/Layout";
import RegistrationForm from "~/components/RegistrationForm";
import type {
  UserRegistrationInput,
  UserValidationResult,
  UserSubmissionObject,
  User,
} from "~/shared/user.types";
import { userGateway } from "~/controllers/user.gateway";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useUser } from "~/contexts/usersContext";
import { useSpinner } from "~/contexts/spinnerContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { OverlaySpinner } from "~/components/OverlaySpinner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Registration" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const validateForm = (input: UserRegistrationInput): UserValidationResult => {
  let errorMessages = {};
  let isSuccess = true;

  if (input.email.indexOf("@") === -1) {
    isSuccess = false;
    errorMessages = { ...errorMessages, email: "Email invalid" };
  }

  if (input.userName.length < 2) {
    isSuccess = false;
    errorMessages = { ...errorMessages, userName: "Username invalid" };
  }

  if (input.firstName.length < 2) {
    isSuccess = false;
    errorMessages = { ...errorMessages, firstName: "First name invalid" };
  }

  if (input.lastName.length < 2) {
    isSuccess = false;
    errorMessages = { ...errorMessages, lastName: "Last name invalid" };
  }

  if (input.password.length < 2) {
    isSuccess = false;
    errorMessages = { ...errorMessages, password: "Password invalid" };
  }

  return { success: isSuccess, errorMessage: errorMessages };
};

const RegistrationPage = () => {
  const { user, setUser } = useUser();
  const spinner = useSpinner();
  const navigate = useNavigate();

  const handleRegistration = async (submission: UserSubmissionObject) => {
    spinner.activate();
    try {
      const { value } = submission;
      const result = validateForm(value);

      if (!result.success) {
        return {
          form: "Invalid data",
          fields: result.errorMessage,
        };
      }

      const response = await userGateway.register(value);

      if (response.status === 201 && response.data.success) {
        toast.success("Registration successful!");
      }

      const programmersModel = {
        id: response.data.data.id,
        userName: response.data.data.username,
        firstName: response.data.data.first_name,
        lastName: response.data.data.last_name,
        email: response.data.data.email,
      };

      setUser(programmersModel);

      setTimeout(() => {
        navigate("/");
      }, 3000);

      return null;
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.error || "Something went wrong";
        console.log("server error:", error.response?.data);
        toast.error(message);
        spinner.deactivate();
        return { form: message };
      }

      spinner.deactivate();
      return { form: "Unexpected error" };
    }
  };

  useEffect(() => {}, [user]);

  return (
    <Layout>
      <div className="m-auto">
        <RegistrationForm onSubmit={handleRegistration} />
      </div>
      <OverlaySpinner isActive={spinner.spinner?.isActive} />
    </Layout>
  );
};

export default RegistrationPage;
