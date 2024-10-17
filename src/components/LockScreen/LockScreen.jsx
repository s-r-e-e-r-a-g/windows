import React, { useEffect, useState } from 'react';
import './lockScreen.css';
import { useNavigate } from 'react-router-dom';

const LockScreen = () => {
    const [time, setTime] = useState({ hours: 9, minutes: 30, ampm: null, day: "monday", month: "january", date: 16 });
    const navigate = useNavigate();

    useEffect(() => {
        const timeObj = setInterval(() => {
            const dateObj = new Date();
            const hours = dateObj.getHours();
            const minutes = dateObj.getMinutes();
            const ampm = hours < 12 ? "am" : "pm";
            const day = dateObj.getDay();
            const dayArray = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
            const month = dateObj.getMonth();
            const monthArray = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
            const date = dateObj.getDate()

            setTime({
                hours: hours,
                minutes: minutes,
                ampm: ampm,
                day: dayArray[day],
                month: monthArray[month],
                date: date
            });
        }, 1000);

        return () => clearInterval(timeObj);
    }, []);

    const directToHome = () => {
        !document.requestFullscreen ? document.documentElement.requestFullscreen() : document.exitFullscreen();
        navigate("/homescreen");
    }

    const formattedTime = `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}`;

    return (
        <div className='lockWrapper'>
            <div className="profile">
                <div className="profImg">
                    <span className="material-symbols-outlined">
                        person
                    </span>
                </div>
                <h1>Administrator</h1>
                <input id="signin" type="button" value="Sign in" onClick={directToHome} />
            </div>
            <div className='datenTime'>
                <h1 className='lockTime'>{formattedTime}
                <span>
                     {/* {time.ampm.toUpperCase()} */}
                </span>
                </h1>
                <p className='date'>{`${time.day}, ${time.month} ${time.date}`}</p>
            </div>
        </div>
    );
}

export default LockScreen;
