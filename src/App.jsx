import Header from "./components/Header";
import Note from "./components/Note";
import dummyData from "./dummyData";
import { useState } from 'react';
import './styles.css';
import Footer from "./components/Footer";
import EmptyNote from "./components/EmptyNote";

export default function App() {
  const [notes, setNotes] = useState(dummyData)

  function generateRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0).toUpperCase()}`
  }

  function padZero(str, len) {
    len = len || 2;
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

  function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
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
                textColor={invertColor(randomColor, true)}
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
