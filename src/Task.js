import React, { useEffect, useState } from "react";
import "../src/Task.css";
import MySVGComponent from "./svg/Calendar";
import { motion } from "framer-motion";
import Edit from "./svg/Edit";
import Delete from "./svg/Delete";
import Clock from "./svg/Clock";

function Task(props) {
  const [isChecked, setIsChecked] = useState(props.isChecked);
  const [isHovered, setIsHovered] = useState(false);

  function handleIsHovered() {
    setIsHovered(!isHovered);
  }

  function handleCheckboxOnChange(e) {
    setIsChecked(e.target.checked);
  }

  useEffect(() => {
    if (isChecked) {
      props.addCompletedTask(props.id);
      props.handleIsChecked(props.id, true);
      props.onDelete(props.id);
    } else {
      props.removeCompletedTask(props.id);
      props.handleIsChecked(props.id, false);
    }
  }, [isChecked]);

  return (
    <div
      className="task"
      key={props.id}
      onMouseEnter={handleIsHovered}
      onMouseLeave={handleIsHovered}
    >
      <h3 className={isChecked && "done"}>{props.title.toUpperCase()}</h3>
      <hr style={{ width: "100%" }}></hr>
      <p style={{ color: `${isChecked ? "gray" : "black"}` }}>
        {props.description}
      </p>
      <div className="date">
        <div>
          <p>
            <MySVGComponent></MySVGComponent>
          </p>
          <p>{props.date}</p>
        </div>

        <div>
          <p>
            <Clock></Clock>
          </p>
          <p>{props.time}</p>
        </div>
      </div>

      <div className="footer">
        <input
          className="checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxOnChange}
        ></input>

        <motion.div
          className="buttons"
          initial={{ opacity: 0, y: -5 }}
          animate={{
            opacity: isHovered && !isChecked ? 1 : 0,
            y: isHovered && !isChecked ? 0 : -5,
          }}
          transition={{ stiffness: 540, damping: 20, type: "spring" }}
        >
          <button
            onClick={() => {
              props.toggleModal();
              props.handleClickedTaskId(props.id);
              console.log(props.id);
            }}
            className="edit"
          >
            <Edit></Edit>
          </button>
          <button onClick={() => props.onDelete(props.id)} className="delete">
            <Delete></Delete>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Task;
