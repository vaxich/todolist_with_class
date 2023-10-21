import React from 'react';

import './App.css';
import { TaskType, Todolist } from './Todolist';

function App() {

  let tasks1:Array<TaskType> = [
    { id: 1, title: "css", isDone: true },
    { id: 1, title: "js", isDone: true },
    { id: 1, title: "react", isDone: false },
  ]

  let tasks2:Array<TaskType> = [
    { id: 1, title: "terminator", isDone: true },
    { id: 1, title: "xxx", isDone: true },
    { id: 1, title: "jentelmens", isDone: false },
  ]




  return (
    <div className="App">
      <Todolist title = "What to learn" tasks = {tasks1}/>
      <Todolist title = "movies" tasks = {tasks2}/>
    </div>
  );
}

export default App;



