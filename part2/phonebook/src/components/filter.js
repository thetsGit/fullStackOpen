import React from "react";
import Input from "./input";

const Filter = ({ filterHandler, filter }) => (
  <Input handler={filterHandler} data={filter} />
);

export default Filter;
