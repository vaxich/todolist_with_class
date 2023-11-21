import { ChangeEvent, KeyboardEvent, useState } from "react";


export type AddItemPropsType = {
    callBack: (newTitle: string) => void
}

export const AddItemForm = (props: AddItemPropsType) => {

    const [newTitle, setNewTitle] = useState("");
    const [error, setError] = useState<string | null>(null);


    const addTaskHaldler = (newTitle: string) => {

        if (newTitle.trim() !== "") {
            props.callBack(newTitle.trim())
            setNewTitle("")
        } else {
            setError("title is required")
        }

    }

    let isAddTaskBtnDisabled = newTitle.length > 15 || newTitle.length === 0
    const userMessageStartTyping = newTitle.length === 0 && <p >введите текст</p>
    const userMessageLenghtsTitle = newTitle.length > 15 && <p style={{ color: "red" }}>Your message is long</p>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        e.key === "Enter" && !isAddTaskBtnDisabled && addTaskHaldler(newTitle)
    }

    return (
        <div>
            <input
                value={newTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : ''}
            />
            <button
                disabled={isAddTaskBtnDisabled}
                onClick={() => addTaskHaldler(newTitle)}>+</button>

            {error && <div className="error-message">{error}</div>}
            {userMessageStartTyping}
            {userMessageLenghtsTitle}
        </div>
    )
}