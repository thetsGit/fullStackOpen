import React, { useState, useEffect } from "react";
import "./App.css";
import PersonForm from "./components/personForm";
import Filter from "./components/filter";
import Persons from "./components/personsShow";
import numberServices from "./components/services";
import { Alert, ErrorAlert } from "./components/alerts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  const nameHandler = (e) => setNewName(e.target.value);
  const numberHandler = (e) => setNewNumber(e.target.value);
  const filterHandler = (e) => setFilter(e.target.value);
  const activateAlert = (alertText) => {
    setMessage(alertText);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };
  const activateErrorAlert = (errorText) => {
    setError(errorText);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (!persons.find((el) => el.name == newName)) {
      numberServices
        .addOne(newPerson)
        .then((data) => setPersons(persons.concat(data)));
      setNewName("");
      setNewNumber("");
      activateAlert(`Added ${newPerson.name}`);
    } else {
      const user = persons.filter((person) => person.name === newName);
      const replaceConfirm = window.confirm(
        `${newName} is added to the list, replace the old number with a new one ?`
      );
      if (replaceConfirm) {
        numberServices
          .putOne(user[0].id, newPerson)
          .then((data) => {
            setPersons(
              persons.map((person) => (person.id !== data.id ? person : data))
            );
            setNewName("");
            setNewNumber("");
            activateAlert(`Updated ${newPerson.name}`);
          })
          .catch((e) => {
            console.log(e.message);
            activateErrorAlert(
              `Information of ${newPerson.name}\'s already been removed !`
            );
            setPersons(persons.filter((p) => p.id !== user[0].id));
          });
      }
    }
  };
  const deleteHandler = (id) => {
    const userName = persons.filter((person) => person.id === id);
    console.log(userName);
    const deleteConfirm = window.confirm(`Delete ${userName[0].name} ?`);
    if (deleteConfirm) {
      numberServices
        .deleteOne(id)
        .then((res) => console.log(res))
        .catch((e) => {
          console.log(e.message);
          activateErrorAlert(
            `Information of ${userName[0].name}\'s already been removed !`
          );
        });
      setPersons(persons.filter((p) => p.id !== id));
    }
  };
  useEffect(() => {
    const resHandler = (res) => {
      setPersons(res);
    };
    numberServices.getAll().then((res) => resHandler(res));
  }, []);

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <Alert message={message} />
      <ErrorAlert message={error} />
      <label>filter shown with: </label>
      <Filter filterHandler={filterHandler} filter={filter} />
      <h2>Add number</h2>
      <PersonForm
        submitHandler={submitHandler}
        nameHandler={nameHandler}
        numberHandler={numberHandler}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )}
        deleteHandler={deleteHandler}
      />
    </div>
  );
};

export default App;
