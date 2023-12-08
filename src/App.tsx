import React, { useState } from 'react';

import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper';


export type FilterValueType = "All" | "Active" | "Completed"
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}


const App = () => {

  const todolistId1 = v1();
  const todolistId2 = v1();
  //const [filter, setFilter] = useState<FilterValueType>("All");

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ])

  const [tasks, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "css", isDone: true },
      { id: v1(), title: "js", isDone: true },
      { id: v1(), title: "react", isDone: false },
      { id: v1(), title: "rest api", isDone: false },
      { id: v1(), title: "ajax", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "css2", isDone: true },
      { id: v1(), title: "js2", isDone: true },
      { id: v1(), title: "react2", isDone: false },
      { id: v1(), title: "rest api2", isDone: false },
      { id: v1(), title: "ajax2", isDone: false },
    ],
  })

  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
    // let taskForTodolist = tasks.filter(task => task.id !== id);
    // setTasks(taskForTodolist)
  }

  const addTask = (todolistId: string, newTitle: string) => {

    const newTask: TaskType = {
      id: crypto.randomUUID(),
      title: newTitle,
      isDone: false
    }

    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })

    // const nextState: Array<TaskType> = [newTask, ...tasks]
    // setTasks(nextState)
  }

  const changeFilter = (todolistId: string, value: FilterValueType) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, filter: value } : tl))

    // const currentTodolist = todolists.find(tl => tl.id === todolistId);
    // if (currentTodolist) {
    //   currentTodolist.filter = value;
    // }
    // setTodolists([...todolists])
    //setFilter(value)

  }

  const chengeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {

    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone: !isDone } : task) })
    // let task = tasks.find(task => task.id === taskId);
    // if (task) {
    //   task.isDone = !isDone;
    //   setTasks([...tasks])
    // }
  }
  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete tasks[todolistId]
  }

  const addTodolist = (newTitle: string) => {
    const newTodolist: TodolistType = { id: v1(), title: newTitle, filter: "All" } //создаём новый тудулист
    setTodolists([newTodolist, ...todolists]) // добавляем новый тудулист к старым тудулистам
    setTasks({ ...tasks, [newTodolist.id]: [] })// обновляем таскм и создаём пустой массив для нового туддулиста
  }

  const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title: newTitle } : task) })
  }

  const updateTodolistTitle = (todolistId: string, newTitle: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistId ? { ...tl, title: newTitle } : tl))
  }

  return (
    <div className="App">
      <ButtonAppBar />

      <Container fixed>
        <Grid container  style={{margin:'20px'}}>
          <AddItemForm callBack={addTodolist} />
        </Grid>
        <Grid container  >
          {todolists.map(tl => {
            let taskForTodolist = tasks[tl.id];

            if (tl.filter === "Active") {
              taskForTodolist = tasks[tl.id].filter(task => task.isDone === false)
            }
            if (tl.filter === "Completed") {
              taskForTodolist = tasks[tl.id].filter(task => task.isDone === true)
            }
            return (
              <Grid item >
                <Paper elevation={3} style={{padding:'20px', margin:'10px'}}>
                <Todolist
                  key={tl.id}
                  todolistId={tl.id}
                  title={tl.title}
                  tasks={taskForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  chengeTaskStatus={chengeTaskStatus}
                  removeTodolist={removeTodolist}
                  filter={tl.filter}
                  updateTask={updateTask}
                  updateTodolistTitle={updateTodolistTitle}
                />
                </Paper>
              </Grid>

            )
          }
          )
          }
        </Grid>


      </Container>



    </div>
  );
}

export default App;



