import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from "react"
import { FilterValueType } from "./App"

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const [newTitle, setNewTitle] = useState("");

    let isAddTaskBtnDisabled = newTitle.length > 15 || newTitle.length ===  0

    

    const userMessageStartTyping = newTitle.length === 0 && <p >введите текст</p>
    const userMessageLenghtsTitle = newTitle.length > 15 && <p style={{ color: "red" }}>Your message is long</p>
    
    

    const addTaskHaldler = (newTitle: string) => {
        props.addTask(newTitle)
        setNewTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && !isAddTaskBtnDisabled && addTaskHaldler(newTitle)
    }


    const tasksList: Array<JSX.Element> = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
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
                    onKeyDown={ onKeyDownHandler}
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
                    <button onClick={() => props.changeFilter("All")}>All</button>
                    <button onClick={() => props.changeFilter("Active")}>Active</button>
                    <button onClick={() => props.changeFilter("Completed")}>Completed</button>
                </div>
                
                {userMessageLenghtsTitle}
            </div>
        </div>
    )
}