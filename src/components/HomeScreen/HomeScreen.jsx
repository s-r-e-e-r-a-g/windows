import React, { useEffect, useRef, useState } from 'react';
import wallpaper from '../../assets/images/wallpaper/desktop.jpg';
import './homeScreen.css';
import BaseBar from '../BaseBar/BaseBar';
import Icon from '../Icon/Icon';
import WindowStartUp from '../WindowStartUp/WindowStartUp';
import Edge from '../../assets/images/icons/edge.png';
import Bin from '../../assets/images/icons/bin.png';
import ThisPc from '../../assets/images/icons/thispc.png';
import Whatsapp from '../../assets/images/icons/whatsapp.png';
import Cineflix from '../../assets/images/icons/cineflix.png';
import WindowFrame from '../WindowFrame/WindowFrame';
import ContextMenu from '../ContextMenu/ContextMenu';

const HomeScreen = () => {
  const [startWindows, setStartWindows] = useState(false);
  const [windowInfo, setWindowInfo] = useState([]);
  const [highlightFn, setHighlightFn] = useState(null);
  const [battery, setBattery] = useState(null);
  const [contextmenu, setContextmenu] = useState(null)
  const exceptRef = useRef();
  const clickRef = useRef();

  const appObj = [
    {
      name: "This PC",
      icon: ThisPc,
      id: 1,
      link: null,
      component: null
    },
    {
      name: "Recycle Bin",
      icon: Bin,
      id: 2,
      link: null,
      component: null
    },
    {
      name: "Microsoft Edge",
      icon: Edge,
      id: 3,
      link: null,
      component: null
    },
    {
      name: "Whatsapp",
      icon: Whatsapp,
      id: 4,
      link: null,
      component: null
    },
    {
      name: "CineFlix",
      icon: Cineflix,
      id: 5,
      link: "https://s-r-e-e-r-a-g.github.io/cineflix/",
      component: null
    }
  ];
  const handleIconClick = (id, name, link, setHighlight, component) => {
    setWindowInfo(prev => {
      const exists = prev.find(win => win.id === id);
      if (!exists) {
        setHighlightFn(() => setHighlight)
        // highlightFn && highlightFn(true)
        setHighlight && setHighlight(true)
        return [...prev, { id, name, link, component, isClosed: false, isMinimize: false }];
      }
      return prev.map(item => 
        item.id === id 
          ? { ...item, isMinimize: false } 
          : item 
      );
    });
  };
  // console.log(windowInfo);
  const closeWindow = (id) => {
    setHighlightFn(false)
    setWindowInfo(prev => {
      return prev.filter(win => win.id !== id)
    });
  };

  const toggleMinimize = (id) => {
    highlightFn(true)
    setWindowInfo(prev => 
      prev.map(win => 
        win.id === id ? { ...win, isMinimize: true } : win
      )
    );
  };

  const customRightClickFunction = (event) => {
    setContextmenu(null)
    event.preventDefault();
    setContextmenu({ display: true, clientX: event.clientX, clientY: event.clientY})
  };

  useEffect(() => {
    clickRef.current && clickRef.current.addEventListener('contextmenu', customRightClickFunction);

    return () => {
      clickRef.current && clickRef.current.removeEventListener('contextmenu', customRightClickFunction);
    };
  }, []);

  return (
    <div className='homescreen' style={{ background: `url(${wallpaper}) no-repeat center center / cover` }}>
      <div className="appContainer" ref={clickRef}>
        {
          appObj.map(app => (
            <Icon key={app.id} id={app.id} icon={app.icon} name={app.name} link={app.link} draggable={true} onClick={handleIconClick} />
          ))
        }
      </div>

      {
        windowInfo?.map(win => (
          <WindowFrame 
            key={win.id} 
            id={win.id} 
            name={win.name} 
            isClosed={win.isClosed} 
            isMinimize={win.isMinimize} 
            closeWindow={closeWindow} 
            toggleMinimize={toggleMinimize}
            link={win.link} 
            component={win.component}
          />
        ))
      }

      {
        startWindows && <WindowStartUp setStartWindows={setStartWindows} exceptRef={exceptRef} />
      }
      {
        contextmenu && contextmenu.display && <ContextMenu contextmenu={contextmenu} setContextmenu={setContextmenu} />
      }
      <BaseBar setStartWindows={setStartWindows} exceptRef={exceptRef} handleIconClick={handleIconClick} battery={battery} setBattery={setBattery} />
    </div>
  )
}

export default HomeScreen;
