import { useEffect, useRef, useState } from "react";
import "./App.css";
import NewTask from "./NewTask";
import Dashboard from "./svg/Dashboard";
import Tasks from "./svg/Tasks";
import AddTask from "./svg/AddTask";
import ProfileIcon from "./svg/ProfileIcon";
import Task from "./Task";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Login from "./svg/Login";
import Modal from "./Modal";
import { Pie } from "react-chartjs-2";
import PieChart from "./Pie";
import NewModal from "./NewModal";
import Typewriter from "typewriter-effect";

function App() {
  //STATES
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [dashboardArray, setDashboardArray] = useState("");

  const handleDashboardArray = (arrayName) => {
    setDashboardArray(arrayName);
  };

  const addCompletedTask = (id) => {
    const completedTask = tasks.find((task) => task.id === id);

    setCompletedTasks((tasks) => [...tasks, completedTask]);
    console.log(completedTask);
  };
  const removeCompletedTask = (id) => {
    const newCompletedTasks = completedTasks.filter((task) => task.id !== id);
    setCompletedTasks(newCompletedTasks);
  };

  const handleIsChecked = (id, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, isChecked: value } // Return a new task object with updated isChecked
          : task
      )
    );
  };

  const [page, setPage] = useState("mytasks");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [name, setName] = useState("Lea");

  const [isClicked, setIsClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNewModalVisible, setIsNewModalVisible] = useState(false);

  const taskListRef = useRef(null);

  //CURRENT CLICKED TASK ID
  const [taskId, setTaskId] = useState("");
  const [currentTask, setCurrentTask] = useState({});
  const handleClickedTaskId = (id) => {
    setTaskId(id);

    const task = tasks.find((task) => task.id === id);
    console.log(task);

    setCurrentTask(task);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleNewModal = () => {
    setIsNewModalVisible(!isNewModalVisible);
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    if (!user) return;

    setName(user);
    setIsLoggedIn(true);
  };

  const handleUserOnChange = (e) => {
    setUser(e.target.value);
  };

  function handleMyTasksClick() {
    setPage("mytasks");
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Enables smooth scrolling
    });
  }

  function handleDashboardClick() {
    setPage("dashboard");
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Enables smooth scrolling
    });
  }

  function handleCreateTaskClick() {
    setPage("mytasks");
    setIsClicked(true);
  }

  //

  const handleOnDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id)); // Filter tasks by their unique ID
  };

  const handleOnEdit = (id, data) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...data } : task))
    );
  };

  function handleClick() {
    setIsClicked(true);
  }
  function clickFalse() {
    setIsClicked(false);
  }

  function handleAddTask(newTask) {
    setTasks((tasks) => [...tasks, newTask]); // Update the tasks array
  }

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between children animations
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { stiffness: 540, damping: 20, type: "spring" },
    },
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="layout">
          <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 540, damping: 20 }}
          >
            <div className="logo">
              <ProfileIcon></ProfileIcon>
              <h2>
                <span style={{ fontWeight: 300 }}>Welcome,</span> {name}!
              </h2>
            </div>
            <div className="aside-content">
              <div onClick={handleDashboardClick}>
                <Dashboard></Dashboard>
                <span>DASHBOARD</span>
              </div>
              <div onClick={handleMyTasksClick}>
                <Tasks></Tasks>
                <span>MY TASKS</span>
              </div>
              <div onClick={toggleNewModal}>
                <AddTask></AddTask>
                <span>CREATE A TASK</span>
              </div>
            </div>
          </motion.aside>

          {/* MY TASKS PAGE */}
          {page === "mytasks" && (
            <div className="my-tasks">
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="mtt"
              >
                MY TASKS
              </motion.h1>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="task-list"
              >
                <AnimatePresence>
                  {tasks.map((task) => (
                    <motion.div key={task.id} variants={item}>
                      <Task
                        isChecked={task.isChecked}
                        tasksArray={tasks}
                        title={task.title}
                        description={task.description}
                        date={task.date}
                        time={task.time}
                        id={task.id}
                        onDelete={handleOnDelete}
                        onEdit={handleOnEdit}
                        isModalVisible={isModalVisible}
                        toggleModal={toggleModal}
                        handleClickedTaskId={handleClickedTaskId}
                        taskId={task.id}
                        addCompletedTask={addCompletedTask}
                        removeCompletedTask={removeCompletedTask}
                        completedTasksArray={completedTasks}
                        handleIsChecked={handleIsChecked}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                <NewTask
                  tasksArray={tasks}
                  handleAddTask={handleAddTask}
                  isClicked={isClicked}
                  handleClick={handleClick}
                  clickFalse={clickFalse}
                  onDelete={handleOnDelete}
                ></NewTask>
              </motion.div>
            </div>
          )}

          {/* DASHBOARD */}
          {page === "dashboard" && (
            <>
              <div>
                <div className="dashboard-container">
                  <motion.h1
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    DASHBOARD
                  </motion.h1>
                  <PieChart
                    completed={completedTasks.length}
                    inProgress={tasks.length}
                    handleDashboardArray={handleDashboardArray}
                    completedTasks={completedTasks}
                    tasks={tasks}
                    taskListRef={taskListRef}
                  ></PieChart>
                  <h2>
                    {dashboardArray === "completed"
                      ? "COMPLETED TASKS"
                      : dashboardArray === "inprogress"
                      ? "IN PROGRESS TASKS"
                      : null}
                  </h2>
                  {/* DASHBOARD ARRAY */}
                </div>
                <div
                  style={{ marginBottom: "3rem" }}
                  className="my-tasks"
                  ref={taskListRef}
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="task-list"
                  >
                    <AnimatePresence>
                      {dashboardArray === "completed"
                        ? completedTasks.map((task) => {
                            if (!task) return null;
                            return (
                              <motion.div key={task.id} variants={item}>
                                <Task
                                  type={"completed"}
                                  isChecked={true}
                                  tasksArray={tasks}
                                  title={task.title}
                                  description={task.description}
                                  date={task.date}
                                  time={task.time}
                                  id={task.id}
                                  onDelete={handleOnDelete}
                                  onEdit={handleOnEdit}
                                  isModalVisible={isModalVisible}
                                  toggleModal={toggleModal}
                                  handleClickedTaskId={handleClickedTaskId}
                                  taskId={task.id}
                                  addCompletedTask={addCompletedTask}
                                  removeCompletedTask={removeCompletedTask}
                                  completedTasksArray={completedTasks}
                                  handleIsChecked={handleIsChecked}
                                />
                              </motion.div>
                            );
                          })
                        : dashboardArray === "inprogress"
                        ? tasks.map((task) => (
                            <motion.div key={task.id} variants={item}>
                              <Task
                                isChecked={task.isChecked}
                                tasksArray={tasks}
                                title={task.title}
                                description={task.description}
                                date={task.date}
                                time={task.time}
                                id={task.id}
                                onDelete={handleOnDelete}
                                onEdit={handleOnEdit}
                                isModalVisible={isModalVisible}
                                toggleModal={toggleModal}
                                handleClickedTaskId={handleClickedTaskId}
                                taskId={task.id}
                                addCompletedTask={addCompletedTask}
                                removeCompletedTask={removeCompletedTask}
                                completedTasksArray={completedTasks}
                                handleIsChecked={handleIsChecked}
                              />
                            </motion.div>
                          ))
                        : null}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="welcome-page">
          <h1 className="welcome">
            Manage your daily chaos with{" "}
            <Typewriter
              options={{
                strings: ["WORKLY"],
                autoStart: true,
                loop: true,
                delay: 50, // Speed of typing
                deleteSpeed: 25, // Speed of deleting
                pauseFor: 2000, // Delay before typing again
              }}
            />
          </h1>
          <div className="login-container">
            <form className="login">
              <label>NAME:</label>
              <div className="username">
                <input
                  value={user}
                  onChange={handleUserOnChange}
                  type="text"
                  placeholder="Enter your name..."
                ></input>
                <button onClick={handleLogIn}>
                  <Login></Login>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Modal
        taskId={taskId}
        handleOnEdit={handleOnEdit}
        isVisible={isModalVisible}
        onClose={toggleModal}
        currentTask={currentTask}
      ></Modal>
      <NewModal
        isVisible={isNewModalVisible}
        onClose={toggleNewModal}
        addTask={handleAddTask}
        clickFalse={clickFalse}
      ></NewModal>
    </div>
  );
}

export default App;
