import React, { useEffect, useRef } from 'react'
import './windowStartUp.css'

const WindowStartUp = ({setStartWindows, exceptRef}) => {

    const winRef = useRef();
    
    useEffect(() => {
        const handleClick = (e) => {
          if (winRef.current && !winRef.current.contains(e.target) && !exceptRef.current.contains(e.target)) {
            setStartWindows(false)
          } else {
            setStartWindows(true)
          }
        };
    
        document.addEventListener('click', handleClick);
    
        return () => {
          document.removeEventListener('click', handleClick);
        };
      }, []);

  return (
    <div className='windowStartUp' ref={winRef}>
      
    </div>
  )
}

export default WindowStartUp
