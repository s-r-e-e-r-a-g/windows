import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import './windowFrame.css';

const WindowFrame = ({ id, name, isMinimize, closeWindow, toggleMinimize, link }) => {
  const maxRef = useRef(null);
  
  const fullScreen = () => {
    if (document.fullscreenElement !== maxRef.current) {
      maxRef.current?.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen().catch(err => console.log(err));
    }
  };
  
  return (
    <Draggable handle='.frameTopLeft'>
      <div tabIndex="0" className='windowFrame' ref={maxRef} style={{ display: isMinimize ? "none" : "block" }} >
        <div className="frameTop">
          <div className="frameTopLeft">
            <p>{name}</p>
          </div>
          <div className="frameTopRight">
            <div className="minimize signs" onClick={() => toggleMinimize(id)}>
              <span className="material-symbols-outlined">remove</span>
            </div>
            <div className="maximize signs" onClick={fullScreen}>
              <span className="material-symbols-outlined">filter_none</span>
            </div>
            <div className="close signs" onClick={() => closeWindow(id)}>
              <span className="material-symbols-outlined">close</span>
            </div>
          </div>
        </div>
        {link && <iframe src={link} style={{border: "none"}} width='100%' height='100%'></iframe>}
      </div>
    </Draggable>
  );
};

export default WindowFrame;
