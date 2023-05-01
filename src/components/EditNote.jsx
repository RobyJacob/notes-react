export default function EditNote(props) {
    async function saveNote() {
        if (props.note.title === "" || props.note.body === "") return

        const res = await fetch("http://127.0.0.1:9999/notes/" + props.noteId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(props.note)
        })

        if (res.status === 202) {
            const updatedNote = await res.json()
    
            props.saveNote(prevState => {
                let filteredState = [...prevState].filter(note => note.id !== props.noteId)
                
                return [
                    ...filteredState,
                    updatedNote.responseObj
                ]
            })
    
            props.showToast(updatedNote.message)
            props.onReturn()
            props.clickNote(props.noteId)
            props.updateNote({
                title: "",
                body: ""
            })
        }

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
            <div className="note-detail-header">
                <div 
                    className="control-btns back-btn"
                    onClick={props.onReturn}
                ></div>
                <div 
                    className="control-btns save-btn" 
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