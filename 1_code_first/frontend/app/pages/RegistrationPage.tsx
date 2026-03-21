import { useForm } from "@tanstack/react-form";
import type { Route } from "./+types/RegistrationPage";
import Layout from "~/components/Layout";

type ValidationResult = {
  success: boolean;
  errorMessage?: string;
};

interface User {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
}

const defaultUser: User = {
  email: "",
  firstName: "",
  lastName: "",
  userName: "",
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Registration" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const RegistrationPage = () => {
  const form = useForm({
    defaultValues: defaultUser,
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const { Field, Subscribe } = form;

  return (
    <Layout>
      <div className="m-auto">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="mb-3">
            <Field
              name="userName"
              validators={{
                onChange: ({ value }) => {
                  return !value.length ? "Required" : undefined;
                },
              }}
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name}>Username:</label>
                    <span style={{ color: "red" }}>
                      {(field.getMeta().errors.length &&
                        field.getMeta().errors[0]) ||
                        ""}
                    </span>
                    <input
                      id={field.name}
                      className="input"
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                  </>
                );
              }}
            />
          </div>
          <div className="mb-3">
            <Field
              name="firstName"
              validators={{
                onChange: ({ value }) => {
                  return !value.length ? "Required" : undefined;
                },
              }}
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name}>First name:</label>
                    <span style={{ color: "red" }}>
                      {(field.getMeta().errors.length &&
                        field.getMeta().errors[0]) ||
                        ""}
                    </span>
                    <input
                      id={field.name}
                      className="input"
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                  </>
                );
              }}
            />
          </div>
          <div className="mb-3">
            <Field
              name="lastName"
              validators={{
                onChange: ({ value }) => {
                  return !value.length ? "Required" : undefined;
                },
              }}
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name}>Last name:</label>
                    <span style={{ color: "red" }}>
                      {(field.getMeta().errors.length &&
                        field.getMeta().errors[0]) ||
                        ""}
                    </span>
                    <input
                      id={field.name}
                      className="input"
                      type="text"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                  </>
                );
              }}
            />
          </div>
          <div className="mb-3">
            <Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (value.indexOf("@") === -1) {
                    return "Invalid email";
                  }

                  return !value.length ? "Required" : undefined;
                },
              }}
              children={(field) => {
                return (
                  <>
                    <label htmlFor={field.name}>E-mail: </label>
                    <span style={{ color: "red" }}>
                      {(field.getMeta().errors.length &&
                        field.getMeta().errors[0]) ||
                        ""}
                    </span>
                    <input
                      id={field.name}
                      className="input"
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                  </>
                );
              }}
            />
          </div>
          <Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <>
                <button
                  className="btn btn-active btn-primary mr-3"
                  type="submit"
                  disabled={!canSubmit}
                >
                  {isSubmitting ? "..." : "Submit"}
                </button>
                <button
                  className="btn btn-soft btn-secondary"
                  type="reset"
                  onClick={(event) => {
                    event.preventDefault();
                    form.reset();
                  }}
                >
                  Reset
                </button>
              </>
            )}
          />
        </form>
      </div>
    </Layout>
  );
};

export default RegistrationPage;
