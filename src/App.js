import { useEffect, useState } from "react";
import "./App.css";
import NewTask from "./NewTask";
import Dashboard from "./svg/Dashboard";
import Tasks from "./svg/Tasks";
import AddTask from "./svg/AddTask";
import ProfileIcon from "./svg/ProfileIcon";
import Task from "./Task";

function App() {
  //PAGES
  const [page, setPage] = useState("mytasks");

  function handleMyTasksClick() {
    setPage("mytasks");
  }

  function handleDashboardClick() {
    setPage("dashboard");
  }

  function handleCreateTaskClick() {
    setPage("mytasks");
    setIsClicked(true);
  }

  //

  const [tasks, setTasks] = useState([]);

  const handleOnDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)); // Filter tasks by their unique ID
  };

  const [name, setName] = useState("Lea");

  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    setIsClicked(true);
  }
  function clickFalse() {
    setIsClicked(false);
  }

  function handleAddTask(newTask) {
    setTasks((tasks) => [...tasks, newTask]); // Update the tasks array
  }

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <div className="App">
      <div className="layout">
        <aside>
          <div className="logo">
            <ProfileIcon></ProfileIcon>
            <h2>
              <span style={{ fontWeight: 300 }}>Welcome,</span> {name}!
            </h2>
          </div>
          <div className="aside-content">
            <div onClick={handleDashboardClick}>
              <Dashboard></Dashboard>DASHBOARD
            </div>
            <div onClick={handleMyTasksClick}>
              <Tasks></Tasks>MY TASKS
            </div>
            <div onClick={handleCreateTaskClick}>
              <AddTask></AddTask>CREATE A TASK
            </div>
          </div>
        </aside>

        {/* MY TASKS PAGE */}
        {page === "mytasks" && (
          <div className="my-tasks">
            <h1>MY TASKS</h1>
            <div className="task-list">
              {tasks.map((task) => (
                <Task
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  date={task.date}
                  time={task.time}
                  id={task.id}
                  onDelete={handleOnDelete}
                />
              ))}

              <NewTask
                tasksArray={tasks}
                handleAddTask={handleAddTask}
                isClicked={isClicked}
                handleClick={handleClick}
                clickFalse={clickFalse}
                onDelete={handleOnDelete}
              ></NewTask>
            </div>
          </div>
        )}

        {/* DASHBOARD */}
        {page === "dashboard" && <h1>DASHBOARD</h1>}
      </div>
    </div>
  );
}

export default App;
