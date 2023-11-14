import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValueType, TaskType } from "./App"
import './App.css';

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValueType) => void
    addTask: (todolistId: string, newTitle: string) => void
    chengeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValueType
}



export const Todolist = (props: PropsType) => {

    const [newTitle, setNewTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    let isAddTaskBtnDisabled = newTitle.length > 15 || newTitle.length === 0


    // let taskForTodolist = tasks;

    // if (tl.filter === "Active") {
    //   taskForTodolist = tasks.filter(task => task.isDone === false)
    // }
    // if (tl.filter === "Completed") {
    //   taskForTodolist = tasks.filter(task => task.isDone === true)
    // }


    const userMessageStartTyping = newTitle.length === 0 && <p >введите текст</p>
    const userMessageLenghtsTitle = newTitle.length > 15 && <p style={{ color: "red" }}>Your message is long</p>



    const addTaskHaldler = (todolistId: string, newTitle: string) => {
        if (newTitle.trim() !== "") {
            props.addTask(todolistId, newTitle.trim())
            setNewTitle("")
        } else {
            setError("title is required")
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        e.key === "Enter" && !isAddTaskBtnDisabled && addTaskHaldler(props.todolistId, newTitle)
    }
    const onChangeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        props.chengeTaskStatus(todolistId, taskId, isDone)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }


    const tasksList: Array<JSX.Element> = props.tasks.map(task => {
        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={() => onChangeTaskStatus(props.todolistId, task.id, task.isDone)}
                    className={error ? 'error' : ''}
                />
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(props.todolistId, task.id)}>X</button>

            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={removeTodolistHandler}>X</button>
            <div>
                <input
                    value={newTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button
                    disabled={isAddTaskBtnDisabled}
                    onClick={() => addTaskHaldler(props.todolistId, newTitle)}>+</button>
                {userMessageStartTyping}
            </div>
            <div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button className={props.filter === "All" ? "active-filter" : " "} onClick={() => props.changeFilter(props.todolistId, "All")}>All</button>
                    <button className={props.filter === "Active" ? 'active-filter' : ""} onClick={() => props.changeFilter(props.todolistId, "Active")}>Active</button>
                    <button className={props.filter === "Completed" ? 'active-filter' : ""} onClick={() => props.changeFilter(props.todolistId, "Completed")}>Completed</button>
                </div>

                {userMessageLenghtsTitle}
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    )
}