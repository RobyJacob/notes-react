export default function Note(props) {
    return (
        <div 
            className="note" 
            style={{backgroundColor: props.color}}
            onClick={props.onClick}
        >
            <span className="note-title">
                {props.note.title}
            </span>
        </div>
    )
}