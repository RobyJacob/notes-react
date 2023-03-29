import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import dummyData from "./dummyData";
import { useState } from 'react';
import './styles.css';

export default function App() {
  const [notes, setNotes] = useState(dummyData)

  return (
    <div className="container">
      <Header />
      <Main notes={notes}/>
      {/* <Footer /> */}
    </div>
  )
}
