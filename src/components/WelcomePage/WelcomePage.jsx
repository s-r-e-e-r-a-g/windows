import React from 'react'
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const fullScreenMode = () => {
        !document.requestFullscreen ? document.documentElement.requestFullscreen() : document.exitFullscreen();
        navigate("/lock")
    }
    const navigate = useNavigate();
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            background: "linear-gradient(to right, #6495ed, #00adff, #00a2ed, #137bab)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer"
        }} onClick = {fullScreenMode}>
            <h3>Click to Continue...</h3>
            <h2>Password : 2003</h2>
        </div>
    )
}

export default WelcomePage