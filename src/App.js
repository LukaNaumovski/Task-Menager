import { useState } from 'react';
import './App.css';
import Task from './Task';
import NewTask from './NewTask';


function App() {

  const [tasks, setTasks] = useState([]);

  function handleAddTask(newTask) {
    setTasks((tasks) => [...tasks, newTask]); // Update the tasks array
  }

  

  return (
    <div className="App">
        <h1>Tasks</h1>
        <div className='task-list'>
          {tasks.map((t) => t)}
          
          <NewTask tasksArray={tasks} handleAddTask={handleAddTask}></NewTask>
        </div>
        
    </div>
  );
}

export default App;
