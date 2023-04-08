export default function Search(props) {
    return (
        <div className="search">
            <div className="note-detail-header">
                <div 
                    className="control-btns back-btn"
                    onClick={props.onReturn}
                ></div>
            </div>
            <input 
                type="text" 
                placeholder="Search by title..."
                className="search-txtbox"
            />
        </div>
    )
}