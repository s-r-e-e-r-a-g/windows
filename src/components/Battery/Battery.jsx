import React, { useEffect, useState } from 'react'
import './battery.css'
import batteryImg from '../../assets/images/battery/battery.png'
import chargingImg from '../../assets/images/battery/charging.png'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Battery = () => {
    const [battery, setBattery] = useState(null)
    const [batteryData, setBatteryData] = useState([]);
    const MAX_DATA_POINTS = 50;

    const checkBatteryDevice = async () => {
        if ('getBattery' in navigator) {
            const batteryStatus = await navigator.getBattery();
            setBattery({ level: batteryStatus.level, charging: batteryStatus.charging, chargingTime: batteryStatus.chargingTime, dischargingTime: batteryStatus.dischargingTime });
            // console.log(batteryStatus);

           const newBatteryLevel = {
                    time: new Date().toLocaleTimeString(),
                    level: (batteryStatus.level * 100).toFixed(0) 
                };
            setBatteryData((prevData) => {
                const updatedData = [...prevData, newBatteryLevel];
                return updatedData.slice(-MAX_DATA_POINTS);
            });
            // console.log(batteryData && batteryData);
        }
    }    
    useEffect(()=>{
        const batteryObj = setInterval(() => {
            checkBatteryDevice();
        }, 1500);
        
        return () => {
            clearInterval(batteryObj);
        }    
    },[])

    const formatTime = (totalSeconds) => {
        if(totalSeconds == "Infinity")
            return "Not Available"
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };


  return (
      <div className='battery-container'>
        <div className="battery_wrapper">
            <img className='batteryImage' src={batteryImg} alt='battery' />
            <div className="battery_progress" >
                  {battery?.charging && <img src={chargingImg} alt="" className="chargingImg" />}
                  <div className={`progress battery-${(battery?.level * 10).toFixed()}`} id={"0"} style={{ height: `${battery?.level * 100}%`}} ></div>
            </div>
        </div>
        <div className="batterStatusInfo">
              <div className="percentage"><h3>Percentage : {(battery?.level * 100).toFixed(0)}%</h3></div>
              <div className="status"><h3>Status : {battery?.charging ? "Charging" : "Not Charging"}</h3></div>
              <div className="chargingTime"><h3>Charging Time : {battery?.charging ? formatTime(battery?.chargingTime) : "Not Available"}</h3></div>
              <div className="dischargingTime"><h3>Discharging Time : {!battery?.charging ? formatTime(battery?.dischargingTime) : "Not Available"}</h3></div>
              <div className='chart-container'>
                  <h2 style={{marginBottom: "10px"}}>Battery Usage Graph</h2>
                  <ResponsiveContainer width='100%' height='100%'>
                      <LineChart data={batteryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="level" stroke="#82ca9d" />
                      </LineChart>
                  </ResponsiveContainer>
                  {/* <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={batteryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="level" fill="#82ca9d" />
                      </BarChart>
                  </ResponsiveContainer> */}
              </div>
        </div>
    </div>
  )
}

export default Battery