import { useState,useEffect } from 'react'
import './App.css'
import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'


function App() {
  const [token,setToken]=useState(localStorage.getItem("token"));
  useEffect(()=>{
    const token = localStorage.getItem("token");

    if(token){
      setToken(token);
    }
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App
