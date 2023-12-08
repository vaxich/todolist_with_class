
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton/IconButton";
import { AddItemForm } from "./AddItemForm";
import { FilterValueType, TaskType } from "./App";
import './App.css';
import { EdiableSpan } from "./EditableSpan";
import Button from '@mui/material/Button/Button';
import Checkbox from '@mui/material/Checkbox/Checkbox';



type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    addTask: (todolistId: string, newTitle: string) => void
    chengeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterValueType
}

const style = {
    display: 'flex',
    alignItems: 'center'
}

export const Todolist = (props: PropsType) => {

    const onChangeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        props.chengeTaskStatus(todolistId, taskId, isDone)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }
    const updateTodolistTitleHandler = (newTitle: string) => {
        props.updateTodolistTitle(props.todolistId, newTitle)
    }



    const tasksList: Array<JSX.Element> = props.tasks.map(task => {

        const updateTaskHandler = (newTitle: string) => {
            props.updateTask(props.todolistId, task.id, newTitle)
        }


        return (
            <div >
                <li style={style}
                    key={task.id}
                    className={task.isDone ? "is-done" : ""}>
                    <Checkbox
                        checked={task.isDone}
                        onChange={() => onChangeTaskStatus(props.todolistId, task.id, task.isDone)} />

                    <EdiableSpan oldTitle={task.title} callBack={updateTaskHandler} />
                    <IconButton onClick={() => props.removeTask(props.todolistId, task.id)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </li>
            </div>

        )
    })

    return (
        <div>
            <h3 style={style}><EdiableSpan oldTitle={props.title} callBack={updateTodolistTitleHandler} />
                <IconButton onClick={removeTodolistHandler} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm callBack={addTaskHandler} />
            <div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    {/* <button className={props.filter === "All" ? "active-filter" : " "} onClick={() => props.changeFilter(props.todolistId, "All")}>All</button>
                    <button className={props.filter === "Active" ? 'active-filter' : ""} onClick={() => props.changeFilter(props.todolistId, "Active")}>Active</button>
                    <button className={props.filter === "Completed" ? 'active-filter' : ""} onClick={() => props.changeFilter(props.todolistId, "Completed")}>Completed</button> */}

                    <Button
                        variant={props.filter === "All" ? "outlined" : "contained"}
                        color="success"
                        onClick={() => props.changeFilter(props.todolistId, "All")}>
                        All
                    </Button>
                    <Button
                        variant={props.filter === "Active" ? "outlined" : "contained"}
                        color="primary"
                        onClick={() => props.changeFilter(props.todolistId, "Active")}>
                        Active
                    </Button>
                    <Button
                        variant={props.filter === "Completed" ? "outlined" : "contained"}
                        color="error"
                        onClick={() => props.changeFilter(props.todolistId, "Completed")}>
                        Completed
                    </Button>
                </div>


            </div>
        </div>
    )
}