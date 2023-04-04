export default function EditNote(props) {
    console.log(props)
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

    return (
        <div className="edit-note">
            <div className="new-note-header">
                <div 
                    className="control-btns back-btn"
                    onClick={props.onReturn}
                ></div>
                <div 
                    className="control-btns" 
                    id="save-btn"
                    onClick={saveNote}
                ></div>
            </div>
            <div className="form">
                <input 
                    type="text" 
                    className="title-txtbox"
                    name="title"
                    value={props.note.title}
                    onChange={handleChange}
                />
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