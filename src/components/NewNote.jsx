export default function NewNote(props) {
    function handleChange(evt) {
        const {name, value} = evt.target
        props.updateNewNote(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    function saveNote() {
        const newNote = props.newNote

        if (newNote.title === "" || newNote.body === "") return

        props.saveNote(prevState => {
            return [
                ...prevState,
                {
                    id: prevState.length + 1,
                    ...newNote
                }
            ]
        })

        props.resetNewNote()
    }

    return (
        <div className="new-note">
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
                    placeholder="Title" 
                    id="title-txtbox"
                    name="title"
                    value={props.newNote.title}
                    onChange={handleChange}
                />
                <textarea 
                    placeholder="Type something..." 
                    id="body-txtarea"
                    name="body"
                    value={props.newNote.body}
                    onChange={handleChange}
                ></textarea>
            </div>
        </div>
    )
}