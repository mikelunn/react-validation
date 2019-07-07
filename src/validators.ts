export const validators = {
  maxlength: max => ({ value, errors = [] }) =>
    value.length > max
      ? {
          value,
          errors: [...errors, `This field has a maximum length of ${max}`]
        }
      : { value, errors },
  includes: word => ({ value, errors = [] }) =>
    !value.includes(word)
      ? {
          value,
          errors: [...errors, `This field requires the following word ${word}`]
        }
      : { value, errors },
  required: ({ value, errors = [] }) =>
    value.length === 0
      ? { value, errors: [...errors, `This following field is required`] }
      : { value, errors },
  email: ({ value, errors = [] }) =>
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(value).toLowerCase()
    )
      ? { value, errors: [...errors, `An invalid email address`] }
      : { value, errors },
  compose: (...fns) => x => fns.reduce((v, f) => f(v), x)
};
