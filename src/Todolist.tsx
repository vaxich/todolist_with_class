import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from "react"
import { FilterValueType } from "./App"
import './App.css';
import './App.css';
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    chengeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValueType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const [newTitle, setNewTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    let isAddTaskBtnDisabled = newTitle.length > 15 || newTitle.length === 0



    const userMessageStartTyping = newTitle.length === 0 && <p >введите текст</p>
    const userMessageLenghtsTitle = newTitle.length > 15 && <p style={{ color: "red" }}>Your message is long</p>



    const addTaskHaldler = (newTitle: string) => {
        if (newTitle.trim() != "") {
            props.addTask(newTitle.trim())
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
        e.key === "Enter" && !isAddTaskBtnDisabled && addTaskHaldler(newTitle)
    }
    const onChangeTaskStatus = (taskId: string, isDone: boolean) => {
        props.chengeTaskStatus(taskId, isDone)
    }


    const tasksList: Array<JSX.Element> = props.tasks.map(task => {
        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={() => onChangeTaskStatus(task.id, task.isDone)}
                    className={error ? 'error' : ''}
                />
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>X</button>
                
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button
                    disabled={isAddTaskBtnDisabled}
                    onClick={() => addTaskHaldler(newTitle)}>+</button>
                {userMessageStartTyping}
            </div>
            <div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button className={props.filter === "All" ? "active-filter" : " "} onClick={() => props.changeFilter("All")}>All</button>
                    <button className={props.filter === "Active" ? 'active-filter' : ""} onClick={() => props.changeFilter("Active")}>Active</button>
                    <button className={props.filter === "Completed" ? 'active-filter' : ""} onClick={() => props.changeFilter("Completed")}>Completed</button>
                </div>

                {userMessageLenghtsTitle}
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    )
}