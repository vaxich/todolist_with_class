import { useState } from "react";
import { v1 } from "uuid";
import { FilterValueType, TodolistType } from "../App";
import { addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./todolists-reducer";

test("нужный тудулист должен быть удалён", () => {
    
    const todolistId1 = v1();
    const todolistId2 = v1();


    const startState :Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "All" },
        { id: todolistId2, title: "What to buy", filter: "All" },
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);



})

test("нужный тудулист должен быть добавлен", () => {
    
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = "New Todolist"


    const startState :Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "All" },
        { id: todolistId2, title: "What to buy", filter: "All" },
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);



})

test("нужный тудулист должен быть изменено имя", () => {
    
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = "New Todolist"


    const startState :Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "All" },
        { id: todolistId2, title: "What to buy", filter: "All" },
    ]

    const action = {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistId2,
        newTitle: newTodolistTitle
    }

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);



})

test("нужный тудулист должен быть изменен фильтр", () => {
    
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newFilter: FilterValueType = "Completed"


    const startState :Array<TodolistType> = [
        { id: todolistId1, title: "What to learn", filter: "All" },
        { id: todolistId2, title: "What to buy", filter: "All" },
    ]

    const action = {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId2,
        newTitle: newFilter
    }

    const endState = todolistsReducer(startState, changeFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);



})