import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TokenContext } from '../context/TokenContext';
import { loginUser } from '../api/services';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(TokenContext);
    //console.log("token context",tokenContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            //const response = await axios.post("http://localhost:3002/auth/login", { email, password });
            //localStorage.setItem("token", response.data.token);
            const response= await loginUser({email,password});
            login(response.token);
            alert("Login Successful");
            navigate('/');
        } catch (err) {
            console.log("Login failed", err);
            alert("Invalid email or password");
        }
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePass = (e) => {
        setPassword(e.target.value);
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full">
            <h2 className="text-3xl font-bold text-center text-gray-200 mb-6">Kanban Board</h2>
                <h2 className="text-2xl font-bold text-center text-gray-200 mb-6">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" placeholder="Email" value={email} onChange={handleEmail} required
                        className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <input type="password" placeholder="Password" value={password} onChange={handlePass} required
                        className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition duration-300">
                        Login
                    </button>
                </form>
                <p className="text-gray-400 text-center mt-4">
                    Don't have an account? <Link to="/signup" className="text-gray-300 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
