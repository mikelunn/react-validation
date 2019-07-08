import * as React from "react";
import { render } from "react-dom";
import { validators } from "./validators";
import "bulma";
import "./styles.css";
const { compose, required, maxlength, email } = validators;
const initial = {
  firstName: {
    value: "",
    validator: compose(
      required,
      maxlength(5)
    )
  },
  lastName: {
    value: "",
    validator: compose(
      required,
      maxlength(10)
    )
  },
  email: {
    value: "",
    validator: compose(
      required,
      email
    )
  },
  touched: {},
  dirty: {},
  invalid: {}
};

function App() {
  const [form, setForm]: any = React.useState(initial);

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
      ? "input"
      : form.invalid[input] && form.invalid[input].errors.length > 0
      ? "input is-danger"
      : "input is-success";
  };
  const { firstName, lastName, email } = form;
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>

      <div className="field">
        <div className="control">
          <input
            onBlur={e => onBlur(e)}
            onChange={e => onInput(e)}
            name="firstName"
            value={firstName.value}
            className={getValidation("firstName")}
            type="text"
          />
          {/* <p className="help is-success">This username is available</p> */}
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            onBlur={e => onBlur(e)}
            onChange={e => onInput(e)}
            name="lastName"
            value={lastName.value}
            className={getValidation("lastName")}
            type="text"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            onBlur={e => onBlur(e)}
            onChange={e => onInput(e)}
            name="email"
            value={email.value}
            className={getValidation("email")}
            type="text"
          />
        </div>
      </div>

      <small>{JSON.stringify(form)}</small>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
