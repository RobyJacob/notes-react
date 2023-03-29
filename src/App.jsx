import Header from "./components/Header";
import Note from "./components/Note";
import dummyData from "./dummyData";
import { useState } from 'react';
import './styles.css';
import Footer from "./components/Footer";
import EmptyNote from "./components/EmptyNote";
import Please from 'pleasejs';

export default function App() {
  const [notes, setNotes] = useState(dummyData)

  function generateRandomHexColor() {
    return Please.make_color({format: "hex"})
  }

  return (
    <div className="container">
      <Header />
      {
        notes.length > 0 ?
        <main>
          {
            notes.map(note => {
              let randomColor = generateRandomHexColor()

              return <Note 
                note={note} 
                color={randomColor}
              />
            })
          }
        </main>
        :
        <EmptyNote />
      }
      <Footer />
    </div>
  )
}
