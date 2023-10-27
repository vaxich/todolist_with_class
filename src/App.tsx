import React, { useState } from 'react';

import './App.css';
import { TaskType, Todolist } from './Todolist';

const App = () => {

  const todolistTitle = "What to learn";

  const [tasks, setTasks] = useState(
    [
      { id: 1, title: "css", isDone: true },
      { id: 2, title: "js", isDone: true },
      { id: 3, title: "react", isDone: false },
    ]
  )

  const removeTask = (id: number) => {

    let taskForTodolist = tasks.filter(task => task.id !== id);
    setTasks(taskForTodolist)


  }





  return (
    <div className="App">
      <Todolist
        title={todolistTitle}
        tasks={tasks}
        removeTask={removeTask}
      />

    </div>
  );
}

export default App;



