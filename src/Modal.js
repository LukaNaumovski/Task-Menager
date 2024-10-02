import React, { useState } from "react";
import "./Modal.css";

function Modal({ isVisible, onClose, handleOnEdit, taskId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  if (!isVisible) return null;

  const handleTitleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionOnChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateOnChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeOnChange = (e) => {
    setTime(e.target.value);
  };

  const onEdit = () => {
    const newTask = {
      id: taskId,
      title,
      description,
      date,
      time,
    };

    handleOnEdit(taskId, newTask);

    setDate("");
    setDescription("");
    setTitle("");
    setTime("");

    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="overlay" onClick={onClose}></div>

      {/* Modal */}
      <div className="modal">
        <div className="modal-content">
          <input
            type="text"
            placeholder="Enter new title..."
            value={title}
            onChange={handleTitleOnChange}
          ></input>
          <input
            type="text"
            placeholder="Enter new description..."
            value={description}
            onChange={handleDescriptionOnChange}
          ></input>
          <input type="date" value={date} onChange={handleDateOnChange}></input>
          <input type="time" value={time} onChange={handleTimeOnChange}></input>
          <div className="modal-btns">
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
            <button className="close-btn" onClick={onEdit}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
