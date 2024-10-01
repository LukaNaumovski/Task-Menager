import React, { useState } from "react";
import "../src/Task.css";
import MySVGComponent from "./svg/Calendar";
import { motion } from "framer-motion";
import { s } from "framer-motion/client";
import Edit from "./svg/Edit";
import Delete from "./svg/Delete";
import Clock from "./svg/Clock";

function Task(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function handleIsHovered() {
    setIsHovered(!isHovered);
  }

  function handleCheckboxOnChange(e) {
    setIsChecked(e.target.checked);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{}}
      className="task"
      key={props.id}
      onMouseEnter={handleIsHovered}
      onMouseLeave={handleIsHovered}
    >
      <h3 className={isChecked && "done"}>{props.title.toUpperCase()}</h3>
      <p style={{ color: `${isChecked ? "gray" : "black"}` }}>
        {props.description}
      </p>
      <p className="date">
        <MySVGComponent></MySVGComponent>
        {props.date} <Clock></Clock>
        {props.time}
      </p>

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
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -5 }}
          transition={{ stiffness: 540, damping: 20, type: "spring" }}
        >
          <button className="edit">
            <Edit></Edit>
          </button>
          <button onClick={() => props.onDelete(props.id)} className="delete">
            <Delete></Delete>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Task;
