import { validators } from "./validators";
const { compose, required, maxlength, email } = validators;
export const state = {
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
