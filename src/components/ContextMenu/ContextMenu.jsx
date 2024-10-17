import React, { useEffect, useRef } from 'react'
import './contextMenu.css'

const ContextMenu = ({ contextmenu, setContextmenu, ref }) => {

    const contextRef = useRef();
    const clickCheck = (e) => {
        if (contextRef.current && contextRef.current.contains(e.target)) return;
        setContextmenu({ display: false });
    }
    const preventDefaultContextMenu = (e) => {
        e.preventDefault();
    };
    let newX; console.log(contextRef.current && contextRef.current.offsetWidth);
    let newY;
    let contextMenuWidth = contextRef.current && contextRef.current.offsetWidth;
    let contextMenuHeight = contextRef.current && contextRef.current.offsetHeight;
    if (window.innerWidth - contextmenu.clientX < contextMenuWidth ){
        newX = contextmenu.clientX - contextMenuWidth;
        setContextmenu({display: true, clientX: newX, clientY: contextmenu.clientY} )
    } if (window.innerHeight - contextmenu.clientY < contextMenuHeight) {
        newY = contextmenu.clientY - contextMenuHeight;
        setContextmenu({ display: true, clientX: contextmenu.clientX, clientY: newY })
    }
    useEffect(() => {
        document.addEventListener("click", clickCheck)
        contextRef.current && contextRef.current.addEventListener('contextmenu', preventDefaultContextMenu);

        return () => {
            document.removeEventListener("click", clickCheck);
            contextRef.current && contextRef.current.removeEventListener('contextmenu', preventDefaultContextMenu);
        };
    }, []);
    return (
        <div className='context_menu' ref={contextRef} style={{ left: `${contextmenu.clientX}px`, top: `${contextmenu.clientY}px` }}>
            
        </div>
    )
}

export default ContextMenu