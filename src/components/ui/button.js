import React from "react";

export function Button({ children, ...props }) {
  return <button {...props} className="btn">{children}</button>;
}

export function Input(props) {
  return <input {...props} className="input" />;
}
