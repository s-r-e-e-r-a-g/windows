import React, { useState } from 'react'
import './notificationBar.css'
import { Link } from 'react-router-dom'

const notificationIcon = [
  {name: "Location", icon: "location_on"},
  {name: "Night light", icon: "brightness_4"},
  {name: "All settings", icon: "settings"},
  {name: "Network", icon: "rss_feed"},
  {name: "Connect", icon: "devices"},
  {name: "Project", icon: "tv_displays"},
  {name: "VPN", icon: "vpn_lock"},
  {name: "Focus assist", icon: "brightness_2"},
  {name: "Screen snip", icon: "screenshot_monitor"},
]

const NotificationBar = () => {

  const [expand, setExpand] = useState(false)

  return (
      <div className='NotificationBar'>
        <div className="notification_top">
          <Link className='noti_link' to='/'>Manage notifications</Link>
        </div>
        <div className="notification_container">
          No new notifications
        </div>
        <div className="notification_footer">
          <p className='ex_col' onClick={()=>setExpand(prev => !prev)}>{expand ? "Collapse" : "Expand"}</p>
          <div className="noti_icons_cont">
            {
              notificationIcon.map((el, i) => {
                if(!expand && i > 3) return 
                return <div className="noti_icon" key={i}>
                  <span className="material-symbols-outlined">{el.icon}</span>
                  <p>{el.name}</p>
                </div>
              })
            }
          </div>
        </div>
      </div>
  )
}

export default NotificationBar