import React from "react";

const Persons = ({ persons, deleteHandler }) => (
  <>
    {persons.map((person) => (
      <>
        <p key={person.name}>
          <strong>{person.name}</strong> {person.number}
          <button onClick={() => deleteHandler(person.id)}>delete</button>
        </p>
      </>
    ))}
  </>
);

export default Persons;
