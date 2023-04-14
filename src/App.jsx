import Header from "./components/Header";
import Note from "./components/Note";
import { useState, useEffect } from 'react';
import './styles.css';
import Footer from "./components/Footer";
import EmptyNote from "./components/EmptyNote";
import Please from 'pleasejs';
import NoteDetail from "./components/NoteDetail";
import NewNote from "./components/NewNote";
import EditNote from "./components/EditNote";
import Search from "./components/Search";

export default function App() {
  const [notes, setNotes] = useState([])
  const [clickedNote, setClickedNote] = useState(0)
  const [isNewNote, setIsNewNote] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    body: ""
  })
  const [isEditable, setIsEditable] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [isInfo, setIsInfo] = useState(false)
  const [searchNotes, setSearchNotes] = useState([])
  const [searchPre, setSearchPre] = useState({
    txt: ""
  })

  function reset() {
    setClickedNote(0)
    setIsNewNote(false)
    setNewNote({ title: "", body: "" })
    setIsEditable(false)
    setIsSearch(false)
    setIsInfo(false)
    setSearchNotes([])
    setSearchPre({ txt: "" })
  }

  function isHome() {
    return clickedNote === 0 &&
      !isNewNote && !isEditable && !isSearch &&
      !isInfo
  }

  function generateRandomHexColor() {
    return Please.make_color({format: "hex"})
  }

  function setClick(noteId) {
    setClickedNote(noteId)
  }

  useEffect(() => {
    (async function() {
      const res = await fetch("http://127.0.0.1:9999/notes")
      const data = await res.json()
      setNotes(data)
    })()
  }, [])

  function renderMain() {
    if (isSearch) {
      return <Search 
        onReturn={reset}
        searchNotes={searchNotes}
        setSearchNotes={setSearchNotes}
        setSearchPre={setSearchPre}
        searchPre={searchPre}
        clickNote={setClickedNote}
      />
    } else if (isNewNote) {
      return <NewNote 
        onReturn={reset}
        updateNewNote={setNewNote}
        newNote={newNote}
        saveNote={setNotes}
      />
    } else {
      if (notes.length > 0) {
        if (clickedNote != 0) {
          let noteClicked = notes.filter(note => note.id === clickedNote)[0]
          if (!isEditable) {
            return  <NoteDetail
              note={noteClicked}
              onReturn={reset}
              setEditable={setIsEditable}
              setNote={setNewNote}
              updateNotes={setNotes}
            />
          } else {
            return <EditNote
              note={newNote}
              onReturn={reset}
              updateNote={setNewNote}
              saveNote={setNotes}
              clickNote={setClickedNote}
              setEditable={setIsEditable}
              noteId={noteClicked.id}
            />
          }
        } else {
          // TODO: Display notes in sorted order of their creation
          
          return notes.map(note => {
            let randomColor = generateRandomHexColor()

            return <Note
              key={note.id}
              note={note} 
              color={randomColor}
              onClick={() => {
                reset()
                setClick(note.id)
              }}
            />
          })
        }
      } else {
        return <EmptyNote />
      }
    }
  }

  return (
    <div className="container">
      <Header 
        onSearchClick={() => {
          reset()
          setIsSearch(true)
        }}  
        onInfoClicked={() => {
          reset()
          setIsInfo(true)
        }}
      />
      <main>
        {renderMain()}
      </main>
      { isHome() && <Footer 
        onClick={() => {
          reset()
          setIsNewNote(true)
        }} 
      /> }
    </div>
  )
}
