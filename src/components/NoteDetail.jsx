export default function NoteDetail(props) {
    function onEditClicked() {
        props.setEditable(true)
        props.setNote({
            title: props.note.title,
            body: props.note.body
        })
    }

    async function onDeleteClicked() {
        const res = await fetch("http://127.0.0.1:9999/notes/" + props.note.id, {
            method: "DELETE"
        });

        if (res.status === 202) {
            const data = await res.json()
            
            props.updateNotes(prevState => {
                return prevState.filter(note => note.id !== props.note.id)
            })

            props.showToast(data.message)
            props.onReturn()
        }
    }

    return (
        <div className="note-detail">
            <div className="note-detail-header">
                <div 
                    className="control-btns back-btn" 
                    onClick={props.onReturn}
                >
                </div>
                <div 
                    className="control-btns" 
                    id="edit-btn"
                    onClick={onEditClicked}></div>
                <div 
                    className="control-btns" 
                    id="delete-btn"
                    onClick={onDeleteClicked}></div>
            </div>
            <h1 className="note-detail-title">{props.note.title}</h1>
            <p className="note-detail-body">{props.note.body}</p>
        </div>
    )
}