import * as React from "react";
import { render } from "react-dom";
import { FormMessage } from "./form-message";
import "bulma";
import "./styles.css";
import { state } from "./state";

function App() {
  const [form, setForm]: any = React.useState(state);

  React.useEffect(() => {
    console.log(form);
  }, [form]);

  const onInput = event => {
    const name = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [name]: { ...form[name], value: value },
      dirty: { ...form.dirty, [name]: value.length > 0 },
      invalid: {
        ...form.invalid,
        [name]: form[name].validator({ value: value })
      }
    });
  };
  const onBlur = event => {
    const name = event.target.name;
    if (!form.touched[name] && form.dirty[name]) {
      setForm({
        ...form,
        touched: { ...form.touched, [name]: true }
      });
    }
  };
  const getValidation = input => {
    return !form.touched[input]
      ? ""
      : form.invalid[input] && form.invalid[input].errors.length > 0
      ? "is-danger"
      : "is-success";
  };
  const { firstName, lastName, email } = form;
  const ValidationMessage = key => <>{FormMessage(key)(form)}</>;

  return (
    <div className="App container">
      <h1>Hello CodeSandbox</h1>

      <div className="field">
        <div className="control">
          <input
            onBlur={e => onBlur(e)}
            onChange={e => onInput(e)}
            name="firstName"
            value={firstName.value}
            className={`input ${getValidation("firstName")}`}
            type="text"
          />

          <ValidationMessage key="firstName" />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            onBlur={e => onBlur(e)}
            onChange={e => onInput(e)}
            name="lastName"
            value={lastName.value}
            className={`input ${getValidation("lastName")}`}
            type="text"
          />
          <ValidationMessage key="lastName" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input
            onBlur={e => onBlur(e)}
            onChange={e => onInput(e)}
            name="email"
            value={email.value}
            className={`input ${getValidation("email")}`}
            type="text"
          />
          <ValidationMessage key="email" />
        </div>
      </div>

      <small>{JSON.stringify(form)}</small>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
