import React, { useRef, useState } from 'react';
import wallpaper from '../../assets/images/wallpaper/desktop.jpg';
// import wallpaper from '../../../../windows assets/home.png'
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

const HomeScreen = () => {
  const [startWindows, setStartWindows] = useState(false);
  const [windowInfo, setWindowInfo] = useState([]);
  const [highlightFn, setHighlightFn] = useState(null);
  const exceptRef = useRef();

  const appObj = [
    {
      name: "This PC",
      icon: ThisPc,
      id: 1,
      link: null
    },
    {
      name: "Recycle Bin",
      icon: Bin,
      id: 2,
      link: null
    },
    {
      name: "Microsoft Edge",
      icon: Edge,
      id: 3,
      link: null
    },
    {
      name: "Whatsapp",
      icon: Whatsapp,
      id: 4,
      link: null
    },
    {
      name: "CineFlix",
      icon: Cineflix,
      id: 5,
      link: "https://s-r-e-e-r-a-g.github.io/cineflix/"
    }
  ];
  const handleIconClick = (id, name, link, setHighlight) => {
    setWindowInfo(prev => {
      const exists = prev.find(win => win.id === id);
      if (!exists) {
        setHighlightFn(()=>setHighlight)
        highlightFn && setHighlight(true)
        return [...prev, { id, name, link, isClosed: false, isMinimize: false }];
      }
      return prev.map(item => 
        item.id === id 
          ? { ...item, isMinimize: false } 
          : item 
      );
    });
  };

  const closeWindow = (id) => {
    highlightFn(false)
    setWindowInfo(prev => prev.filter(win => win.id !== id));
  };

  const toggleMinimize = (id) => {
    highlightFn(true)
    setWindowInfo(prev => 
      prev.map(win => 
        win.id === id ? { ...win, isMinimize: true } : win
      )
    );
  };

  return (
    <div className='homescreen' style={{ background: `url(${wallpaper}) no-repeat center center / cover` }}>
      <div className="appContainer">
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
          />
        ))
      }

      {
        startWindows && <WindowStartUp setStartWindows={setStartWindows} exceptRef={exceptRef} />
      }
      <BaseBar setStartWindows={setStartWindows} exceptRef={exceptRef} handleIconClick={handleIconClick} />
    </div>
  )
}

export default HomeScreen;
