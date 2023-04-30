export default function Search(props) {
    async function searchPrefix(prefix) {
        if (prefix.length >= 3) {
            prefix = prefix.replace("\s*", "%20")
            const res = await fetch("http://127.0.0.1:9999/notes?title_pre=" + prefix)
            const data = await res.json()
            const notes = data.responseObj
            if (notes.length > 0) props.setSearchNotes(notes)
            else props.setSearchNotes([])
        } else if (props.searchNotes.length !== 0) {
            props.setSearchNotes([])
        }
    }

    function handleChange(evt) {
        const {name, value} = evt.target
        
        props.setSearchPre(prevState => ({
            ...prevState,
            [name]: value
        }))
        
        searchPrefix(value)
    }

    function renderSearchDropDown() {
        return props.searchNotes.map(note => {
            return (
                <div
                    key={note.id} 
                    className="search-dropdown-item"
                    onClick={() => {
                        props.onReturn()
                        props.clickNote(note.id)
                    }}
                    >
                    {note.title}
                </div>
            )
        })
    }

    return (
        <div className="search">
            <div className="note-detail-header">
                <div 
                    className="control-btns back-btn"
                    onClick={props.onReturn}
                ></div>
            </div>
            <div className="search-main">
                <input 
                    type="text" 
                    placeholder="Search by title..."
                    className="search-txtbox"
                    onChange={handleChange}
                    name="txt"
                    value={props.searchPre.txt}
                />
                <div className="search-dropdown">
                    {props.searchNotes.length !== 0 ? renderSearchDropDown() : null}
                </div>
            </div>
        </div>
    )
}