import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { TokenContext, TokenProvider } from "./context/tokencontext";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

function App() {
    return (
        <TokenProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
        </TokenProvider>
    );
}

const ProtectedRoute = ({ children }) => {
    const { token } = React.useContext(TokenContext);
    return token ? children : <Navigate to="/login" />;
};

export default App;
