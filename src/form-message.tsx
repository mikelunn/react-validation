import * as React from "react";

export const FormMessage = key => state => {
  const status = !state.touched[key]
    ? ""
    : state.invalid[key] && state.invalid[key].errors.length > 0
    ? "is-danger"
    : "is-success";
  const msg = !state.touched[key]
    ? ""
    : state.invalid[key] && state.invalid[key].errors.length > 0
    ? state.invalid[key].errors[0]
    : "";
  return <p className={`help ${status}`}>{msg}</p>;
};
