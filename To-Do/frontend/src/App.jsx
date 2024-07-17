import React, { useState } from "react";
import Header from "./Components/Header";
import Filters from "./Components/Filters";
import Projects from "./Components/Projects";
import Tasks from "./Components/Tasks";


function App() {
  const [show, setShow] = useState(false);
  const closeHandler = () => {
    setShow(false);
  };
  return (
    <div >
      <Header setShow={setShow}/>
      <div id="home-main-container">

       {<section id="filters-section" className={show?"show":"hide"}>
        <Filters setShow={setShow}/> 
        <Projects />
        <button id="btn" onClick={closeHandler}>Apply</button>
        </section>
       }

        <section id="tasks-section">
          <Tasks />
        </section>
      </div>
    </div>
  );
}

export default App;