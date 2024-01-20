import { v1 } from "uuid";
import { TaskStateType, TaskType } from "../App";
import { AddTodolistACType, RemoveTodolistACType } from "./todolists-reducer";

export const tasksReducer = (state: TaskStateType, action: TasksReducerType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }

        }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.newTitle,
                isDone: false
            }

            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return     { ...state, 
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, isDone: !action.payload.isDone } : task) }

        }
        case "CHANGE-TASK-TITLE" : {
            return { ...state, 
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, title: action.payload.newTitle } : task) }
        }
        case "ADD-TODOLIST" : {
            return {...state, 
                [action.payload.todolistId]:[]
            }
        }
        case "REMOVE-TODOLIST":{
            let copyState = {...state};
            delete copyState[action.payload.todolistId]
            return  copyState
        }


        default: return state
    }
}


type TasksReducerType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | changeTaskTitleACType | AddTodolistACType | RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>



export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: { todolistId, taskId }
    } as const
}

export const addTaskAC = (todolistId: string, newTitle: string) => {
    return {
        type: "ADD-TASK",
        payload: { todolistId, newTitle }
    } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: { todolistId, taskId,  isDone}
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: { todolistId, taskId,  newTitle}
    } as const
}




