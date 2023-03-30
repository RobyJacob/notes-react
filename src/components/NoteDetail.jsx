export default function NoteDetail(props) {
    console.log(props)
    return (
        <div className="note-detail">
            <div className="note-detail-header">
                <div 
                    className="control-btns back-btn" 
                    onClick={props.onReturn}
                >
                </div>
                <div className="control-btns" id="edit-btn"></div>
            </div>
            <h1 className="note-detail-title">{props.note.title}</h1>
            <p className="note-detail-body">{props.note.body}</p>
        </div>
    )
}