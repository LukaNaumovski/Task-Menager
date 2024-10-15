import React, { useState } from "react";
import "../src/NewTask.css";


import { v4 as uuidv4 } from "uuid";
import AddTask2 from "./svg/AddTask2";
function NewTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  function handleOnChange(e) {
    setTitle(e.target.value);
  }
  function handleDescriptionOnChange(e) {
    setDescription(e.target.value);
  }
  function handleDateOnChange(e) {
    setDate(e.target.value);
  }
  function handleTimeOnChange(e) {
    setTime(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !description || !date || !time) return;
    const newId = uuidv4(); // Generate unique ID
    props.handleAddTask({
      id: newId,
      title: title,
      description: description,
      date: date,
      time: time,
      isChecked: false,
    });
    props.clickFalse();
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
  }

  return (
    <div className="new-task">
      {!props.isClicked && (
        <div className="plus-container">
          <button className="plus" onClick={props.handleClick}>
            <AddTask2></AddTask2>Create a task
          </button>
        </div>
      )}
      {props.isClicked && (
        <form className="form">
          <input
            type="text"
            placeholder="Title..."
            onChange={handleOnChange}
            value={title}
          ></input>
          <input
            type="text"
            placeholder="Description..."
            onChange={handleDescriptionOnChange}
            value={description}
          ></input>
          <input type="date" onChange={handleDateOnChange} value={date}></input>
          <input type="time" onChange={handleTimeOnChange} value={time}></input>
          <button type="submit" onClick={handleSubmit}>
            CREATE TASK
          </button>
        </form>
      )}
    </div>
  );
}

export default NewTask;
