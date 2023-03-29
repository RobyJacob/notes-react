import Footer from "./Footer"

export default function Main(props) {
    const renderNotes = props.notes.map(note => {
        return (
            <div className="note">
                <span className="note-title">{note.title}</span>
            </div>
        )
    })

    return (
            <main>
                {
                    props.notes.length > 0 ?
                    renderNotes
                    :
                    <div className="empty-note">
                        <img src="/src/assets/empty-note-logo.svg" className="empty-note-img"/>
                        <span className="empty-note-txt">Create your first note !</span>
                    </div>
                }
                <Footer />
            </main>
    )
}