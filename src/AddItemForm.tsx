import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";
import { ChangeEvent, KeyboardEvent, useState } from "react";


export type AddItemPropsType = {
    callBack: (newTitle: string) => void
}

export const AddItemForm = (props: AddItemPropsType) => {
    const styleButton = {
        maxWidth: '38px',
        maxHeight: "38px",
        minWidth: '38px',
        minHeight: '38px'
    }

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
            <TextField
            error={!!error}
            size="small"
                id="outlined-basic"
                label={error ? error : "type somethihg"}
                variant="outlined"
                value={newTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : ''}
            />
            {/* <input
                value={newTitle}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : ''}
            /> */}
            {/* <button
                disabled={isAddTaskBtnDisabled}
                onClick={() => addTaskHaldler(newTitle)}>+</button> */}
            <Button
                onClick={() => addTaskHaldler(newTitle)}
                disabled={isAddTaskBtnDisabled}
                style={styleButton}
                variant="contained">+</Button>

            {error && <div className="error-message">{error}</div>}
            
            {userMessageLenghtsTitle}
        </div>
    )
}