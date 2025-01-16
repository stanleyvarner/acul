// import { StrictMode } from 'react'
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/index.css'
import App from './App.tsx'
import Footer from './components/Footer.tsx'
import Navbar from './components/Navbar.tsx'

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Navbar />
      <div className="main-forms">
       <App />
      </div>
      <div className="content">
       <Footer />
      </div>
    </React.StrictMode>
  );
});



// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Navbar />
//     <App />
//     <Footer />
//   </StrictMode>
// )
