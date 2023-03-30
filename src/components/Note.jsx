export default function Note(props) {
    return (
        <div 
            className="note" 
            style={{backgroundColor: props.color}}
            onClick={props.onClick}
        >
            {props.note.title}
        </div>
    )
}