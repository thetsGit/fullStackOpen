import React from "react";
import Input from "./input";

const TableRow = ({ text, handler, data }) => (
  <tr>
    <td>{text}: </td>
    <td>
      <Input handler={handler} data={data} />
    </td>
  </tr>
);

const PersonForm = (props) => (
  <form onSubmit={props.submitHandler}>
    <table>
      <TableRow text="name" handler={props.nameHandler} data={props.newName} />
      <TableRow
        text="number"
        handler={props.numberHandler}
        data={props.newNumber}
      />
    </table>

    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
