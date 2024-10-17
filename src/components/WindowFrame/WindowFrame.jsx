import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import './windowFrame.css';
import Battery from '../Battery/Battery';

const WindowFrame = ({ id, name, isMinimize, closeWindow, toggleMinimize, link, component }) => {
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
            <abbr title='Minimize'>
              <div className="minimize signs" onClick={() => toggleMinimize(id)}>
                <span className="material-symbols-outlined">remove</span>
              </div>
            </abbr>
            <abbr title='Maximize'>
              <div className="maximize signs" onClick={fullScreen}>
                <span className="material-symbols-outlined">filter_none</span>
              </div>
            </abbr>
            <abbr title='Close'>
              <div className="close signs" onClick={() => closeWindow(id)}>
                <span className="material-symbols-outlined">close</span>
              </div>
            </abbr>
          </div>
        </div>
        { link && <iframe src={link} style={{border: "none"}} width='100%' height='100%'></iframe> }
        { component == "battery" ? <Battery /> : null }
      </div>
    </Draggable>
  );
};

export default WindowFrame;
