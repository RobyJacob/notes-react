import Header from "./components/Header";
import Note from "./components/Note";
import dummyData from "./dummyData";
import { useState } from 'react';
import './styles.css';
import Footer from "./components/Footer";
import EmptyNote from "./components/EmptyNote";
import Please from 'pleasejs';
import NoteDetail from "./components/NoteDetail";
import NewNote from "./components/NewNote";
import EditNote from "./components/EditNote";

export default function App() {
  const [notes, setNotes] = useState(dummyData)
  const [clickedNote, setClickedNote] = useState(0)
  const [isNewNote, setIsNewNote] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    body: ""
  })
  const [isEditable, setIsEditable] = useState(false)

  function generateRandomHexColor() {
    return Please.make_color({format: "hex"})
  }

  function setClick(noteId) {
    setClickedNote(noteId)
  }

  function renderMain() {
    if (isNewNote) {
      return <NewNote 
        onReturn={() => setIsNewNote(false)}
        updateNewNote={setNewNote}
        newNote={newNote}
        saveNote={setNotes}
        reset={() => setNewNote({
          title: "",
          body: ""
        })}
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
            />
          } else {
            return <EditNote
              note={newNote}
              onReturn={() => {
                setClickedNote(0)
                setIsEditable(false)
              }}
              updateNote={setNewNote}
              saveNote={setNotes}
              clickNote={setClickedNote}
              setEditable={setIsEditable}
              newId={Math.max(...notes.map(note => note.id)) + 1}
              oldId={noteClicked.id}
              reset={() => setNewNote({
                title: "",
                body: ""
              })}
            />
          }
        } else {
          return notes.map(note => {
            let randomColor = generateRandomHexColor()

            return <Note
              key={note.id}
              note={note} 
              color={randomColor}
              onClick={() => setClick(note.id)}
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
      <Header />
      <main>
        {renderMain()}
      </main>
      { clickedNote === 0 && !isNewNote && <Footer onClick={() => setIsNewNote(true)}/> }
    </div>
  )
}
