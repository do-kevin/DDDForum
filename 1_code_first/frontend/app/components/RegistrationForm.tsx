import { useForm } from "@tanstack/react-form";
import type { User } from "~/shared/user.types";

const defaultUser: Omit<User, "id"> = {
  email: "",
  firstName: "",
  lastName: "",
  userName: "",
  password: "",
};

const RegistrationForm = ({ onSubmit }: { onSubmit: any }) => {
  const form = useForm({
    defaultValues: defaultUser,
    validators: {
      onSubmitAsync: async (props) => {
        return await onSubmit(props);
      },
    },
  });

  const { Field, Subscribe } = form;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <div className="mb-3">
        <Field
          name="userName"
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
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </>
            );
          }}
        />
      </div>
      <div className="mb-3">
        <Field
          name="firstName"
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
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </>
            );
          }}
        />
      </div>
      <div className="mb-3">
        <Field
          name="lastName"
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
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </>
            );
          }}
        />
      </div>
      <div className="mb-3">
        <Field
          name="email"
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
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </>
            );
          }}
        />
      </div>
      <div className="mb-3">
        <Field
          name="password"
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>Password: </label>
                <span style={{ color: "red" }}>
                  {(field.getMeta().errors.length &&
                    field.getMeta().errors[0]) ||
                    ""}
                </span>
                <input
                  id={field.name}
                  className="input"
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
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
  );
};

export default RegistrationForm;
