//app.js
import React, { useState, useEffect } from 'react';
import Chatbox from './components/chatbox';
import './App.css'
import { BiSupport } from "react-icons/bi";

function App() {
  let chatstatus = true;
  
  function handleDisplayBot (){
    if (chatstatus) {
      document.getElementById('chatContainer').classList.add('open');
      document.getElementById('chatContainer').classList.remove('closed');
    }else{
      
      document.getElementById('chatContainer').classList.add('closed')
      document.getElementById('chatContainer').classList.remove('open')
    }
    document.getElementById('toggle-button').style.display = (chatstatus) ? ("none") : ("block");
    chatstatus = (chatstatus) ? (false) : (true);
  }
  

  return (
    <div>
      <button className='toggle-button' id='toggle-button' onClick={handleDisplayBot}><BiSupport /></button>
      <Chatbox toggleFunc={handleDisplayBot}/>
    </div>
  );
}

export default App;