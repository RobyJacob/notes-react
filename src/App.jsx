import Header from "./components/Header";
import Note from "./components/Note";
import { useState, useEffect, useRef } from 'react';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";
import EmptyNote from "./components/EmptyNote";
import Please from 'pleasejs';
import NoteDetail from "./components/NoteDetail";
import NewNote from "./components/NewNote";
import EditNote from "./components/EditNote";
import Search from "./components/Search";
import { toast, ToastContainer } from "react-toastify";

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
  const toastId = useRef(null)

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

  function showToast(msg) {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg)
    }
    return toastId.current
  }

  useEffect(() => {
    (async function() {
      try {
        const res = await fetch("http://127.0.0.1:9999/notes")
        if (res.status !== 200) {
          showToast(res.body)
          return
        }
        const data = await res.json()
        setNotes(data.responseObj)
      } catch (ex) {
        showToast(ex.toString())
      }
    })()
  }, [])

  function renderMain() {
    if (isSearch) {
      return <Search 
        onReturn={() => setIsSearch(false)}
        searchNotes={searchNotes}
        setSearchNotes={setSearchNotes}
        setSearchPre={setSearchPre}
        searchPre={searchPre}
        clickNote={setClickedNote}
      />
    } else if (isNewNote) {
      return <NewNote 
        onReturn={() => setIsNewNote(false)}
        updateNewNote={setNewNote}
        newNote={newNote}
        saveNote={setNotes}
        showToast={showToast}
      />
    } else {
      if (notes.length > 0) {
        if (clickedNote != 0) {
          let noteClicked = notes.filter(note => note.id === clickedNote)[0]
          if (!isEditable) {
            return  <NoteDetail
              note={noteClicked}
              onReturn={() => setClickedNote(0)}
              setEditable={setIsEditable}
              setNote={setNewNote}
              updateNotes={setNotes}
              showToast={showToast}
            />
          } else {
            return <EditNote
              note={newNote}
              onReturn={() => setIsEditable(false)}
              updateNote={setNewNote}
              saveNote={setNotes}
              clickNote={setClickedNote}
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
                // reset()
                setClickedNote(note.id)
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
          setSearchNotes([])
          setSearchPre({ txt: "" })
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
      <ToastContainer 
        autoClose={3000}
        position="bottom-center"
        theme="dark"
      />
    </div>
  )
}
