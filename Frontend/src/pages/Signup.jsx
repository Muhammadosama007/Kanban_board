import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { signupUser } from '../api/services';

function Signup() {
    const [Fname, setFName] = useState("");
    const [Lname, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            //await axios.post("http://localhost:3002/auth/signup", { Fname, Lname, email, password });
            await signupUser(Fname,Lname,email,password);
            alert("Signup Successful. Please login.");
            navigate("/login");
        } catch (err) {
            console.log("Signup failed", err);
            alert("Signup failed. Try again.");
        }
    };
    const handleFname = (e) => {
        setFName(e.target.value);
    }
    const handleLname = (e) => {
        setLName(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePass = (e) => {
        setPassword(e.target.value);
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-gray-200 mb-6">Create an Account</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <input type="text" placeholder="First Name" value={Fname} onChange={handleFname} required
                        className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <input type="text" placeholder="Last Name" value={Lname} onChange={handleLname} required
                        className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <input type="email" placeholder="Email" value={email} onChange={handleEmail} required
                        className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <input type="password" placeholder="Password" value={password} onChange={handlePass} required
                        className="w-full p-3 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    <button type="submit" className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition duration-300">
                        Sign Up
                    </button>
                </form>
                <p className="text-gray-400 text-center mt-4">
                    Already have an account? <Link to="/login" className="text-gray-300 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
