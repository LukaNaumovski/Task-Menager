import React, { useState } from "react";
import "../src/NewTask.css";
import Task from "./Task";

function NewTask(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(null);

    function handleClick(){
        setIsClicked(true);
    }
    function handleOnChange(e){
        setTitle(e.target.value)
    }
    function handleDescriptionOnChange(e){
        setDescription(e.target.value)
    }
    function handleDateOnChange(e){
        setDate(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        props.handleAddTask(<Task title={title} description={description} date={date}></Task>)
        console.log(props.tasksArray);
        
        
    }

    const [isClicked, setIsClicked] = useState(false)
    return <div className="new-task">
        {!isClicked && <button onClick={handleClick}>+</button>}
        {isClicked && <form className="form">
            <input type="text" placeholder="Title..." onChange={handleOnChange} value={title}></input>
            <input type="text" placeholder="Description..." onChange={handleDescriptionOnChange} value={description}></input>
            <input type="date" onChange={handleDateOnChange} value={date}></input>
            <input type="time"></input>
            <button type="submit" onClick={handleSubmit}>CREATE TASK</button>
            </form>}
    </div>
}

export default NewTask;

let number = 1 && 2;