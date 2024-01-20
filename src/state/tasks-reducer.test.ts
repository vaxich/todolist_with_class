
import { v1 } from "uuid";
import { TaskStateType } from "../App";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC,  tasksReducer } from "./tasks-reducer";
import { removeTodolistAC } from "./todolists-reducer";

test("нужный таска должена быть удалёна", () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TaskStateType = {
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
    }

    const endState = tasksReducer(startState, removeTaskAC(todolistId1, startState[todolistId1][0].id))

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][0].title).toBe("js");



}
)

test("нужный таска должена быть добавлена", () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    let newTitle = 'juse'

    const startState: TaskStateType = {
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
    }

    const endState = tasksReducer(startState, addTaskAC(todolistId1, newTitle))


    expect(endState[todolistId1].length).toBe(6);
    expect(endState[todolistId1][0].title).toBe("juse");



}
)

test("статус нужной таски должена быть изменён", () => {

    const todolistId1 = v1();
    const todolistId2 = v1();


    const startState: TaskStateType = {
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
    }

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistId1, startState[todolistId1][4].id, startState[todolistId1][4].isDone))


    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][4].isDone).toBe(true);



}
)

test("тайтл нужной таски должена быть изменён", () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    let newTitle = "newTitle"

    const startState: TaskStateType = {
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
    }

    const endState = tasksReducer(startState, changeTaskTitleAC(todolistId1, startState[todolistId1][4].id, newTitle))


    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][4].title).toBe(newTitle);



}
)

test("тудулист должен быть удалён", () => {

    const todolistId1 = v1();
    const todolistId2 = v1();    

    const startState: TaskStateType = {
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
    }

    const endState = tasksReducer(startState, removeTodolistAC(todolistId1))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1);    
    expect(endState[todolistId1]).not.toBeDefined();
    expect(endState[todolistId2]).toBeDefined();



}
)
