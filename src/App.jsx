import './App.css'
import {Route, Routes} from 'react-router-dom'
import LockScreen from './components/LockScreen/LockScreen'
import HomeScreen from './components/HomeScreen/HomeScreen'
import WelcomePage from './components/WelcomePage/WelcomePage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage />} />
      <Route path='/lock' element={<LockScreen />} />
      <Route path='/homescreen' element={<HomeScreen />} />
    </Routes>
  )
}

export default App
