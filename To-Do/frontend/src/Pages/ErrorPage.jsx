import React from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import ImgPageNotFound from '../assets/errorpage.png'
function ErrorPage() {
  return (
    <div>
      <Header/>
      <div id="error-page-main-container" className='no-select'>

       <section id="epmc-sec-3">
        <img src={ImgPageNotFound} alt="page-not-found-image" id="img-page-not-found"/>
       </section>

       <section id="epmc-sec-1">
        
        <h1>OOPS!</h1>
        <p>Looks like you are lost.</p>
        <p>This page is not available</p>
        <p>or dose not exist</p>
       </section>

       <section id="epmc-sec-2">
        <button>
            <Link to="/" id="link">GO TO HOME</Link>
        </button>
       </section>

       

      </div>
    </div>
  )
}

export default ErrorPage
