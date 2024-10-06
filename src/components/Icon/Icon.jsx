import React, { useState } from 'react';
import './icon.css';
import Draggable from 'react-draggable';

const Icon = ({ id, icon, name, link, draggable, onClick, isSmall }) => {
  const [highlight, setHighlight] = useState(false);
  return (
    <Draggable disabled={!draggable} handle='.iconImg'>
      <div 
        className='icon' style={{ backgroundColor: highlight && isSmall && "rgba(255, 255, 255, 0.205)"}}
        onDoubleClick={() => !isSmall && onClick(id, name, link, setHighlight)}
        onClick={() => isSmall && onClick(id, name, link, setHighlight)}
      >
        <img src={icon} className={`iconImg ${draggable ? "deskIcon" : ""}`} alt='' />
        {draggable && !isSmall && <p>{name}</p>}
      </div>
    </Draggable>
  );
};

export default Icon;
