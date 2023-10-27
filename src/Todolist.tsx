type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const tasksList: Array<JSX.Element> = props.tasks.map(task => {
        return (
            <li key ={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={ () => props.removeTask(task.id)}>X</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>

            </div>
        </div>
    )
}