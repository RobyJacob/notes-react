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

export default function App() {
  const [notes, setNotes] = useState(dummyData)
  const [clickedNote, setClickedNote] = useState(0)
  const [isNewNote, setIsNewNote] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    body: ""
  })

  function generateRandomHexColor() {
    return Please.make_color({format: "hex"})
  }

  function setClick(noteId) {
    setClickedNote(noteId)
  }

  return (
    <div className="container">
      <Header />
      <main>
        {
          isNewNote ?
            <NewNote 
              onReturn={() => setIsNewNote(false)}
              updateNewNote={setNewNote}
              newNote={newNote}
              saveNote={setNotes}
              resetNewNote={() => setNewNote({
                title: "",
                body: ""
              })}
            />
          :
          notes.length > 0 ?
            clickedNote != 0 ?
              <NoteDetail
                note={notes.filter(note => note.id === clickedNote)[0]}
                onReturn={() => setClickedNote(0)}
              />
            :
              notes.map(note => {
                let randomColor = generateRandomHexColor()

                return <Note
                  key={note.id}
                  note={note} 
                  color={randomColor}
                  onClick={() => setClick(note.id)}
                />
              })
          :
            <EmptyNote />
        }
      </main>
      { clickedNote === 0 && !isNewNote && <Footer onClick={() => setIsNewNote(true)}/> }
    </div>
  )
}
