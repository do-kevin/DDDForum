import type { Route } from "./+types/RegistrationPage";
import Layout from "~/components/Layout";
import RegistrationForm from "~/components/RegistrationForm";
import type {
  UserRegistrationInput,
  UserValidationResult,
  UserSubmissionObject,
} from "~/shared/user.types";
import { userGateway } from "~/controllers/user.gateway";
import { toast } from "sonner";
import { isAxiosError } from "axios";

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

const handleRegistration = async (submission: UserSubmissionObject) => {
  try {
    const { value } = submission;
    const result = validateForm(value);

    if (!result.success) {
      return {
        form: "Invalid data",
        fields: result.errorMessage,
      };
    }

    const newResult = await userGateway.register(value);

    if (newResult.status === 201 && newResult.data.success) {
      toast.success("Registration successful!");
    }

    return null;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data?.error || "Something went wrong";
      console.log("server error:", error.response?.data);
      toast.error(message);
      return { form: message };
    }
    return { form: "Unexpected error" };
  }
};

const RegistrationPage = () => {
  return (
    <Layout>
      <div className="m-auto">
        <RegistrationForm onSubmit={handleRegistration} />
      </div>
    </Layout>
  );
};

export default RegistrationPage;
