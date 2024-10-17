import './App.css'
import {Route, Routes} from 'react-router-dom'
import LockScreen from './components/LockScreen/LockScreen'
import HomeScreen from './components/HomeScreen/HomeScreen'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LockScreen />} />
      <Route path='/homescreen' element={<HomeScreen />} />
    </Routes>
  )
}

export default App
