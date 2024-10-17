import React, { useState, useEffect } from 'react'
import './baseBar.css'
import win from '../../assets/logo/win.png'
import Icon from '../Icon/Icon'
import edge from '../../assets/images/icons/edge.png'
import explorer from '../../assets/images/icons/explorer.png'
import store from '../../assets/images/icons/store.png'
import SearchInput from '../SearchInput/SearchInput'
import NotificationBar from '../NotificationBar/NotificationBar'

const BaseBar = ({ setStartWindows, exceptRef, handleIconClick, battery, setBattery }) => {
    const [time, setTime] = useState({ hours: 9, minutes: 30, ampm: null, day: "thursday", month: 1, date: 16, year: 2024 });
    
    useEffect(() => {
        const timeObj = setInterval(() => {
            
            const dateObj = new Date();
            const hours = dateObj.getHours();
            const minutes = dateObj.getMinutes();
            const ampm = hours < 12 ? "am" : "pm";
            const day = dateObj.getDay() + 1;
            const month = dateObj.getMonth() + 1;
            const date = dateObj.getDate()
            const year = dateObj.getFullYear();

            setTime({
                hours: hours,
                minutes: minutes,
                ampm: ampm,
                day: day,
                month: month,
                date: date,
                year: year
            });
            checkBatteryDevice();
        }, 1000);

        const checkBatteryDevice = async () => {
            if ('getBattery' in navigator) {
                const batteryStatus = await navigator.getBattery();
                setBattery(batteryStatus);
                // console.log(battery);
            }
        }

        return () => clearInterval(timeObj);
    }, []);

    const appObj = [
        {
            icon: edge,
            name : "Microsoft Edge",
            id: 3
        },
        {
            icon: explorer,
            name : "Explorer",
            id: 5
        },
        {
            icon: store,
            name : "Microsoft Store",
            id: 6
        }
    ]

  return (
    <div className='baseBar' >
        <div className="win" ref={exceptRef}>
            <img src={win} alt='win' className='winLogo' onClick={() => setStartWindows(prev => !prev)}/>
        </div>
        <SearchInput />
        <div className="appWrapper">
            {
             appObj.map(app => (
                 <Icon key={app.id} id={app.id} icon={app.icon} name={app.name} draggable={false} onClick={handleIconClick} isSmall />
            ))
            }
        </div>
        <div className="bottomRight">
              <div tabIndex="0" className="dropUp hoverEffect">
                <div className="dropUpBox">
                    
                </div>
                <span className="material-symbols-outlined">arrow_drop_up</span>
            </div>
            <div className="internet hoverEffect">
                <span className="material-symbols-outlined" style={{fontSize: "20px"}}>{navigator.onLine ? "wifi" : "wifi_off"}</span>
            </div>
            <div className="sound hoverEffect">
                <span className="material-symbols-outlined">volume_up</span>
            </div>
            <div className="lang hoverEffect">
                <p>{navigator.language}</p>
            </div>
            { battery &&
                  <div className="battery hoverEffect" onClick={() => handleIconClick(8, "🔋 Power Management", null, null, "battery" )}>
                    <div className="battery_message">
                          <p>{battery.charging ? `Battery status: ${battery.level * 100}% available (plugged in)` : `Battery status: ${battery.level * 100}% remaining`}</p>
                    </div>
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                          {battery.charging ? "battery_charging_80" : "battery_5_bar"}
                    </span>
                </div>
            }
            <div className="baseTime hoverEffect">
                <p>{`${time.hours.toString().padStart(2, 0)}:${time.minutes.toString().padStart(2, 0)}`}</p>
                <p>{`${time.date.toString().padStart(2, 0)}-${time.month.toString().padStart(2, 0)}-${time.year.toString().padStart(2, 0)}`}</p>
            </div>
            <div tabIndex='0' className="notification hoverEffect">
                <NotificationBar />
                <span className="material-symbols-outlined">mode_comment</span>
            </div>
        </div>
    </div>
  )
}

export default BaseBar
