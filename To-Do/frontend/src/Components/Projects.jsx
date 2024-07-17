import React from 'react'
import Default from '../assets/ic--outline-folder.png'  

function Projects() {
  return (
    <div id="projects-main-container">
      <h2 id="projects-heading">Projects</h2>
      <ul id="project-list">
        <li>
          <span><img src={Default} alt="default-icon" className='icon'/></span>
          <span className='pl-text'> Default</span>
          </li>
      </ul>
    </div>
  )
}

export default Projects
