import Header from "./components/Header";
import Note from "./components/Note";
import dummyData from "./dummyData";
import { useState } from 'react';
import './styles.css';
import Footer from "./components/Footer";
import EmptyNote from "./components/EmptyNote";
import Please from 'pleasejs';
import NoteDetail from "./components/NoteDetail";

export default function App() {
  const [notes, setNotes] = useState(dummyData)
  const [clickedNote, setClickedNote] = useState(0)

  function generateRandomHexColor() {
    return Please.make_color({format: "hex"})
  }

  function addClick(noteId) {
    setClickedNote(noteId)
  }

  function resetClick() {
    setClickedNote(0)
  }

  return (
    <div className="container">
      <Header />
      {
        notes.length > 0 ?
        <main>
          {
            clickedNote != 0 ?
            <NoteDetail
              key={clickedNote}
              note={notes.filter(note => note.id === clickedNote)[0]}
              onReturn={resetClick}
            />
            :
            notes.map(note => {
              let randomColor = generateRandomHexColor()

              return <Note
                key={note.id}
                note={note} 
                color={randomColor}
                onClick={() => addClick(note.id)}
              />
            })
          }
        </main>
        :
        <EmptyNote />
      }
      { clickedNote === 0 && <Footer /> }
    </div>
  )
}
