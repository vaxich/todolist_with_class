import { v1 } from "uuid";
import { TaskStateType, TodolistType } from "../App";
import { addTodolistAC, todolistsReducer } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";


test("новый тудулист должен быть добавлен", () => {

    const startTaskState: TaskStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTaskState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFormTasks = keys[0];
    const idFormTodolists = endTodolistsState[0].id;



    expect(idFormTasks).toBe(action.payload.todolistId);
    expect(idFormTodolists).toBe(action.payload.todolistId);



})