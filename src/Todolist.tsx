
import { FilterValueType, TaskType } from "./App"
import './App.css';
import { AddItemForm } from "./AddItemForm";
import { EdiableSpan } from "./EditableSpan";

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
            
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={() => onChangeTaskStatus(props.todolistId, task.id, task.isDone)}
                />
                <EdiableSpan oldTitle={task.title} callBack={updateTaskHandler} />
                <button onClick={() => props.removeTask(props.todolistId, task.id)}>X</button>
            </li>
        )
    })

    return (
        <div>
            <h3><EdiableSpan oldTitle={props.title} callBack={updateTodolistTitleHandler} />
                <button onClick={removeTodolistHandler}>X</button>
            </h3>

            <AddItemForm callBack={addTaskHandler} />
            <div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button className={props.filter === "All" ? "active-filter" : " "} onClick={() => props.changeFilter(props.todolistId, "All")}>All</button>
                    <button className={props.filter === "Active" ? 'active-filter' : ""} onClick={() => props.changeFilter(props.todolistId, "Active")}>Active</button>
                    <button className={props.filter === "Completed" ? 'active-filter' : ""} onClick={() => props.changeFilter(props.todolistId, "Completed")}>Completed</button>
                </div>

                
            </div>
        </div>
    )
}