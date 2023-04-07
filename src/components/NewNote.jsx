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

    async function saveNote() {
        props.reset()

        const newNote = props.newNote

        if (newNote.title === "" || newNote.body === "") return

        try {
            const res = await fetch("http://127.0.0.1:9999/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(props.newNote)
            })
    
            const savedNote = await res.json()

            props.saveNote(prevState => {
                return [
                    ...prevState,
                    savedNote
                ]
            })
        } catch (ex) {
            console.log(ex)
        }
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