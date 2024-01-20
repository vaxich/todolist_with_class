import { v1 } from "uuid";
import { FilterValueType, TodolistType } from "../App";

export const todolistsReducer = (state: TodolistType[], action: TodolistsReducerType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            
            const newTodolist: TodolistType = { id: action.payload.todolistId, title: action.payload.newTitle, filter: "All" } //создаём новый тудулист
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, title: action.payload.newTitle } : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.value } : tl)
        }

        default: return state
    }
}


type TodolistsReducerType = RemoveTodolistACType | AddTodolistACType | changeTodolistTitleACType | changeFilterACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: { todolistId }
    } as const
}

export const addTodolistAC = (newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: { todolistId: v1(), newTitle }
    } as const
}
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: { todolistId, newTitle }
    } as const
}

export const changeFilterAC = (todolistId: string, value: FilterValueType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: { todolistId, value }

    } as const
}