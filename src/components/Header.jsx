export default function Header(props) {
    return (
        <header>
            <h1 className="header-title">Notes</h1>
            <div 
                className="control-btns" 
                id="header-search"
                onClick={props.onSearchClick}></div>
            <div className="control-btns" id="header-info"></div>
        </header>
    )
}