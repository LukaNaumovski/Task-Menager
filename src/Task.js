import React from "react";
import "../src/Task.css"

function Task(props) {
    return <div className="task">
        <h3>{props.title}</h3>
        <p>{props.description}</p>

        <p>{props.date} {props.time}</p>

        <div>
        <input type="checkbox"></input>

        <button>EDIT</button>
        <button>DELETE</button>
        </div>
    </div>
}

export default Task;