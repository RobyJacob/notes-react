export default function Search(props) {
    async function searchPrefix(prefix) {
        if (prefix.length >= 3) {
            const res = await fetch("http://127.0.0.1:9999/notes?title_pre=" + prefix)
            const notes = await res.json()
            if (notes.length > 0)
                props.setSearchNotes(notes)
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
                        props.clickNote(note.id)
                        props.onReturn()
                        props.setSearchNotes([])
                        props.setSearchPre({
                            txt: ""
                        })
                    }}
                    >
                    {note.title}
                </div>
            )
        })
    }

    console.log(props.searchNotes)
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