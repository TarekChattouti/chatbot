//chatbot.js
import React, { useEffect, useState, useRef } from 'react';
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { GoDependabot } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import socketIOClient from 'socket.io-client';
import './chatbox.css';

const ENDPOINT = 'http://localhost:5000';
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function Chatbox(props) {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const socketRef = useRef();

    useEffect(()=> {
        socketRef.current = socketIOClient(ENDPOINT);

        socketRef.current.on('message', (msg) => {
            
            setChat(prevChat => [...prevChat, bot_msg(msg)]);
            
            scrollToBottom();
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (!message){
            return;
        }
        if (socketRef.current) {
            socketRef.current.emit('message', message);
            setChat(prevChat => [...prevChat, client_msg(message)]);
            setMessage('');
            scrollToBottom()
            scrollToBottomInTime()
        }
    };

    return (
        <div className='chatbox' id='chatContainer'>
            <div className='chatbox-header'>
                <h3>Chatbot</h3>
                <span onClick={props.toggleFunc}><IoClose /></span>
            </div>
            <div className='chatbox-messages' id='chatMessages'>
                <div className='bot-msg'><GoDependabot /><span>Hello, how can I help?</span></div>
                {chat.map((msg, index) => (
                    <div key={index}>{msg}</div>
                    
                ))}
            </div>
            <div className='chatbox-input'>
                <form action='#' onKeyPress={e => {if (e.key === 'Enter') {e.preventDefault();sendMessage();}}}  className='input-wrapper'>
                    <input 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        type='text' 
                        id='chatInput' 
                        maxLength={64} 
                        placeholder='Chat here...'
                        autocomplete="off"
                    />
                    <button type='button' className='sendMsg' id='sendMsg' onClick={sendMessage}>
                        <IoMdSend />
                    </button>
                </form>
            </div>
        </div>
    );
}

const bot_msg = (msg) => {
    return (
        <div className='bot-msg'>
            <GoDependabot /><span>{msg}</span>
        </div>
    );
};
const scrollToBottomInTime = async () => {
    await sleep(1000);
    document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
}
const scrollToBottom = async () => {

    document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
}
const client_msg = (msg) => {
    return (
        <div className='client-msg'>
            <span>{msg}</span><CiUser />
        </div>
    );
};

export default Chatbox;
