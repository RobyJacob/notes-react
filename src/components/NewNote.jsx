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

        props.reset()
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
                <textarea 
                    type="text" 
                    placeholder="Title" 
                    className="title-txtarea"
                    name="title"
                    value={props.newNote.title}
                    onChange={handleChange}
                ></textarea>
                <textarea 
                    placeholder="Type something..." 
                    className="body-txtarea"
                    name="body"
                    value={props.newNote.body}
                    onChange={handleChange}
                ></textarea>
            </div>
        </div>
    )
}