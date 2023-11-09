import React, { useState } from 'react';

import './App.css';
import { TaskType, Todolist } from './Todolist';


export type FilterValueType = "All" | "Active" | "Completed"

const App = () => {

  const todolistTitle = "What to learn";

  const [filter, setFilter] = useState<FilterValueType>("All")

  const [tasks, setTasks] = useState<Array<TaskType>>(
    [
      { id: crypto.randomUUID(), title: "css", isDone: true },
      { id: crypto.randomUUID(), title: "js", isDone: true },
      { id: crypto.randomUUID(), title: "react", isDone: false },
    ]
  )

  const removeTask = (id: string) => {
    let taskForTodolist = tasks.filter(task => task.id !== id);
    setTasks(taskForTodolist)
  }

const addTask = (title: string) => {
  const newTask: TaskType = {
    id: crypto.randomUUID(),
    title: title,
    isDone: false
  }

  const nextState:Array<TaskType> = [ newTask, ... tasks]
  setTasks(nextState)
}

  const changeFilter = (value: FilterValueType) => {
    setFilter(value)

  }

  const chengeTaskStatus = (taskId: string, isDone:boolean) => {
    let task = tasks.find( task => task.id === taskId);
    if(task) {
      task.isDone = !isDone;
      setTasks([...tasks])
    }
  }

  let filteredTasks = tasks;

  if (filter === "Active") {
    filteredTasks = tasks.filter(task => task.isDone === false)
  }
  if (filter === "Completed") {
    filteredTasks = tasks.filter(task => task.isDone === true)
  }





  return (
    <div className="App">
      <Todolist
        title={todolistTitle}
        tasks={filteredTasks}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        chengeTaskStatus = {chengeTaskStatus}
        filter = {filter}
      />

    </div>
  );
}

export default App;



