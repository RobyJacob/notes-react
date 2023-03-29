export default function Note(props) {
    return (
        <div className="note" style={{backgroundColor: props.color}}>
            <span className="note-title" style={{color: props.textColor}}>{props.note.title}</span>
        </div>
    )
}