import React from "react";

const Input = ({ handler, data }) => <input onChange={handler} value={data} />;

export default Input;
