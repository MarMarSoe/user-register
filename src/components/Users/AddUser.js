import React, { useState, useRef } from "react";

import classes from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Wrapper from "../Helpers/Wrapper";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");

  const InputNameRef = useRef();
  const InputAgeRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = InputNameRef.current.value;
    const entredUserAge = InputAgeRef.current.value;

    if (enteredName.trim().length === 0 || entredUserAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }

    if (+entredUserAge < 0) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (<0).",
      });
      return;
    }
    props.onAddUser(enteredName, entredUserAge);
    // setEnteredUsername("");
    // setEnteredAge("");
    InputNameRef.current.value = "";
    InputAgeRef.current.value = "";
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHadler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };
  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card cssClass={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          {/* <input
            type="text"
            id="username"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          /> */}
          <input type="text" id="username" ref={InputNameRef} />
          <label htmlFor="age">Age (Years)</label>
          {/* <input
            type="number"
            id="age"
            value={enteredAge}
            onChange={ageChangeHadler}
          /> */}
          <input type="number" id="age" ref={InputAgeRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
