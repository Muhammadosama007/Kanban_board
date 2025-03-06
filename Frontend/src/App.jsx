import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { TokenContext } from "./context/TokenContext";
import ActivityLogPage from "./pages/ActivityLogPage";

function App() {
  const { token } = useContext(TokenContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to='/login' />} />
        <Route path="/login" element={token ? <Navigate to='/' /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/activityLog" element={<ActivityLogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
