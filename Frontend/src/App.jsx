import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { TokenContext,TokenProvider } from "./context/TokenContext";
import ActivityLogPage from "./pages/ActivityLogPage";

function App() {
  //const {token} =useContext(TokenContext);
  return (
    <TokenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/activityLog" element={<ActivityLogPage/>}/>
        </Routes>
      </Router>
    </TokenProvider>
  );
}

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(TokenContext);
  
  return token ? children : <Navigate to="/login" />;
};

export default App;
