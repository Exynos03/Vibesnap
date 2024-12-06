import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/user-account-management/Home'
import Profile from './pages/profile/container/Profile'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/profile' element={<Profile />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
