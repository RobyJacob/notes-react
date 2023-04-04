export default function EditNote(props) {
    function saveNote() {
        if (props.note.title === "" || props.note.body === "") return

        props.saveNote(prevState => {
            let filteredState = [...prevState].filter(note => note.id !== props.oldId)
            
            return [
                ...filteredState,
                {
                    id: props.newId,
                    ...props.note
                }
            ]
        })

        props.setEditable(false)
        props.clickNote(props.newId)
        props.reset()
    }

    function handleChange(evt) {
        const {name, value} = evt.target
        props.updateNote(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    function onReturn() {
        props.onReturn()
        props.reset()
    }

    return (
        <div className="edit-note">
            <div className="new-note-header">
                <div 
                    className="control-btns back-btn"
                    onClick={onReturn}
                ></div>
                <div 
                    className="control-btns" 
                    id="save-btn"
                    onClick={saveNote}
                ></div>
            </div>
            <div className="form">
                <textarea 
                    type="text" 
                    className="title-txtarea"
                    name="title"
                    value={props.note.title}
                    onChange={handleChange}
                ></textarea>
                <textarea 
                    className="body-txtarea"
                    name="body"
                    value={props.note.body}
                    onChange={handleChange}
                ></textarea>
            </div>
        </div>
    )
}