// import React, { useEffect, useState } from "react";
// import "../src/Task.css";
// import MySVGComponent from "./svg/Calendar";
// import { motion } from "framer-motion";
// import Edit from "./svg/Edit";
// import Delete from "./svg/Delete";
// import Clock from "./svg/Clock";

// function Task(props) {
//   const [isChecked, setIsChecked] = useState(props.isChecked);
//   const [isHovered, setIsHovered] = useState(false);

//   function handleIsHovered() {
//     setIsHovered(!isHovered);
//   }

//   function handleCheckboxOnChange(e) {
//     setIsChecked(e.target.checked);
//   }

//   const checked = props.isChecked;
//   const id = props.id;

//   useEffect(() => {
//     if (isChecked !== checked) {
//       // Ensures no unnecessary effect runs
//       if (isChecked) {
//         props.addCompletedTask(id);
//         props.handleIsChecked(id, true);
//         props.onDelete(id);
//       } else {
//         props.removeCompletedTask(id);
//         props.handleIsChecked(id, false);
//       }
//     }
//   }, [isChecked]); // Depend only on isChecked

//   return (
//     <div
//       className="task"
//       key={props.id}
//       onMouseEnter={handleIsHovered}
//       onMouseLeave={handleIsHovered}
//     >
//       <h3 className={isChecked && "done"}>{props.title.toUpperCase()}</h3>
//       <hr style={{ width: "100%" }}></hr>
//       <p style={{ color: `${isChecked ? "gray" : "black"}` }}>
//         {props.description}
//       </p>
//       <div className="date">
//         <div>
//           <p>
//             <MySVGComponent></MySVGComponent>
//           </p>
//           <p>{props.date}</p>
//         </div>

//         <div>
//           <p>
//             <Clock></Clock>
//           </p>
//           <p>{props.time}</p>
//         </div>
//       </div>

//       <div className="footer">
//         {!props.type && (
//           <input
//             className="checkbox"
//             type="checkbox"
//             checked={isChecked}
//             onChange={handleCheckboxOnChange}
//           ></input>
//         )}

//         <motion.div
//           className="buttons"
//           initial={{ opacity: 0, y: -5 }}
//           animate={{
//             opacity: isHovered && !isChecked ? 1 : 0,
//             y: isHovered && !isChecked ? 0 : -5,
//           }}
//           transition={{ stiffness: 540, damping: 20, type: "spring" }}
//         >
//           <button
//             onClick={() => {
//               props.toggleModal();
//               props.handleClickedTaskId(props.id);
//             }}
//             className="edit"
//           >
//             <Edit></Edit>
//           </button>
//           <button onClick={() => props.onDelete(props.id)} className="delete">
//             <Delete></Delete>
//           </button>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default Task;

import React, { useEffect, useState } from "react";
import "../src/Task.css";
import MySVGComponent from "./svg/Calendar";
import { motion } from "framer-motion";
import Edit from "./svg/Edit";
import Delete from "./svg/Delete";
import Clock from "./svg/Clock";

function Task({
  id,
  isChecked: initialChecked,
  title,
  description,
  date,
  time,
  addCompletedTask,
  removeCompletedTask,
  handleIsChecked,
  onDelete,
  toggleModal,
  handleClickedTaskId,
  type,
}) {
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [isHovered, setIsHovered] = useState(false);

  function handleIsHovered() {
    setIsHovered(!isHovered);
  }

  function handleCheckboxOnChange(e) {
    setIsChecked(e.target.checked);
  }

  useEffect(() => {
    if (isChecked !== initialChecked) {
      if (isChecked) {
        addCompletedTask(id);
        handleIsChecked(id, true);
        onDelete(id);
      } else {
        removeCompletedTask(id);
        handleIsChecked(id, false);
      }
    }
  }, [
    isChecked,
    id,
    initialChecked,
    addCompletedTask,
    removeCompletedTask,
    handleIsChecked,
    onDelete,
  ]);

  return (
    <div
      className="task"
      key={id}
      onMouseEnter={handleIsHovered}
      onMouseLeave={handleIsHovered}
    >
      <h3 className={isChecked && "done"}>{title.toUpperCase()}</h3>
      <hr style={{ width: "100%" }}></hr>
      <p style={{ color: `${isChecked ? "gray" : "black"}` }}>{description}</p>
      <div className="date">
        <div>
          <p>
            <MySVGComponent></MySVGComponent>
          </p>
          <p>{date}</p>
        </div>

        <div>
          <p>
            <Clock></Clock>
          </p>
          <p>{time}</p>
        </div>
      </div>

      <div className="footer">
        {!type && (
          <input
            className="checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxOnChange}
          ></input>
        )}

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
              toggleModal();
              handleClickedTaskId(id);
            }}
            className="edit"
          >
            <Edit></Edit>
          </button>
          <button onClick={() => onDelete(id)} className="delete">
            <Delete></Delete>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Task;
