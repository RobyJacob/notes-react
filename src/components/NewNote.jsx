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
        props.updateNewNote({
            title: "",
            body: ""
        })

        const newNote = props.newNote

        if (newNote.title === "" || newNote.body === "") return

        try {
            const res = await fetch("http://127.0.0.1:9999/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newNote)
            })
    
            if (res.status === 201) {
                const data = await res.json()
    
                props.saveNote(prevState => {
                    return [
                        ...prevState,
                        data.responseObj
                    ]
                })

                props.showToast(data.message)
            }
        } catch (ex) {
            props.showToast("Error while saving")
        }
    }

    return (
        <div className="new-note">
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