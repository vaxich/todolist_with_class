import { ChangeEvent, useState } from "react"


export type EdiableSpanPropsType = {
    oldTitle: string
    callBack: (newTitle: string) => void
}

export const EdiableSpan = (props: EdiableSpanPropsType) => {
    const [newTitle, setNewTitle] = useState(props.oldTitle);
    const [edit, setEdit] = useState(false);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            updateTask()
        }
    }

    

    const updateTask = () => {
        props.callBack(newTitle)
    }

    //let isAddTaskBtnDisabled = newTitle.length > 15 || newTitle.length === 0
    const userMessageStartTyping = newTitle.length === 0 && <p >введите текст</p>
    const userMessageLenghtsTitle = newTitle.length > 15 && <p style={{ color: "red" }}>Your message is long</p>

    return (
        <div>
            {edit
                ? <input value={newTitle} onBlur={editHandler} autoFocus onChange={onChangeHandler} />
                : <span onDoubleClick={editHandler}>{props.oldTitle}</span>}


            {userMessageStartTyping}
            {userMessageLenghtsTitle}
        </div>


    )
}