import React, { useContext, useEffect, useState } from "react";
import Nav from "../Components/Nav";
import AddData from "../Components/AddModal";
import Cards from "../Components/Cards";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";
import { getTasks, updateTask, createTask, deleteTask } from "../api/services";
import AddModal from "../Components/AddModal";

function Home() {
    const [arr, setArr] = useState([]);
    const [editData, setEditData] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { logout } = useContext(TokenContext);

    useEffect(() => {
        fetchTask();
    }, [token]);

    const fetchTask = async () => {
        try {
            // const response = await axios.get("http://localhost:3002/task/getTask", {
            //     headers: { Authorization: `Bearer ${token}` }
            // });
            const response = await getTasks(token);

            setArr(response);
        } catch (err) {
            console.log("Error retriveving tasks!!", err);
        }
    }

    const addData = async (obj) => {
        try {
            if (editData) {
                // const response = await axios.patch(`http://localhost:3002/task/updateTask/${editData._id}`, obj, {
                //     headers: { Authorization: `Bearer ${token}` }
                // })
                const response = await updateTask(token, editData._id, obj);
                const updatedArr = arr.map((i) => (i === editData ? response : i));
                setArr(updatedArr);
                setEditData(null);
            } else {
                // const response = await axios.post("http://localhost:3002/task/create", obj, {
                //     headers: { Authorization: `Bearer ${token}` }
                // })
                const response = await createTask(token, obj)
                setArr([...arr, response]);
                alert("task added successfully!!");
                fetchTask();
            }
        } catch (err) {
            console.log("Error in Adding task!!!", err);
        }
    };
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("data"));
        if (savedData) {
            setArr(savedData);
        }
    }, []);
    useEffect(() => {
        if (arr.length > 0) {
            localStorage.setItem("data", JSON.stringify(arr));
        }
    }, [arr]);
    const onDelete = async (task) => {
        try {
            // await axios.delete(`http://localhost:3002/task/delTask/${task._id}`, {
            //     headers: { Authorization: `Bearer ${token}` }
            // })
            await deleteTask(token, task._id);
            const updatedArr = arr.filter((i) => i !== task);
            setArr(updatedArr);
            localStorage.setItem("data", JSON.stringify(updatedArr));
        } catch (err) {
            console.log("Error in deleting task!!", err);
        }
    };
    const onDragStart = (e, item) => {
        e.dataTransfer.setData("task", JSON.stringify(item));
    };
    const onDragOver = (e) => {
        e.preventDefault();
    };
    const onDrop = async (e, newStat) => {
        e.preventDefault();
        const draggedItem = JSON.parse(e.dataTransfer.getData("task"));

        const updatedArr = arr.map((i) =>
            JSON.stringify(i) === JSON.stringify(draggedItem) ? { ...i, stat: newStat } : i
        );
        setArr(updatedArr);
        localStorage.setItem("data", JSON.stringify(updatedArr));

        try {
            // const response = await axios.patch(`http://localhost:3002/task/updateTask/${draggedItem._id}`, { stat: newStat }, {
            //     headers: { Authorization: `Bearer ${token}` },
            // }
            // );
            const response = await updateTask(token, draggedItem._id, { stat: newStat });
            if (response.status === 201) {
                console.log("Task updated:", response);
            } else {
                console.error("Failed to update task");
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };


    const handleLogout = () => {
        logout();
        alert("Logged out successfully");
       // navigate('/login');
    }
    const handleActivityLog = () => {
        alert("Navigating to Activity Log!!");
        navigate('/activityLog')
    }
    return (
        <div className="bg-gray-900 min-h-screen p-6">
            <Nav />
            <div className="flex justify-between items-center mb-6">
                <AddModal addData={addData} editData={editData} setEditData={setEditData} />
                <div className="flex space-x-4">
                    
                    <button
                        onClick={handleActivityLog}
                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                    >
                        History
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
    
            <div className="flex justify-between mx-8 space-x-4">
                <div
                    className="bg-gray-800 border border-gray-700 rounded-lg w-1/3 h-auto text-center shadow-lg"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, "Todo")}
                >
                    <h1 className="font-semibold text-xl text-gray-200 py-3 border-b border-gray-700">
                        TO DO
                    </h1>
                    <div className="m-3">
                        {arr
                            .filter((obj) => obj && obj.stat === "Todo")
                            .map((i, index) => (
                                <Cards
                                    key={index}
                                    addData={i}
                                    onDel={() => onDelete(i)}
                                    setEditData={() => setEditData(i)}
                                    onDragStart={(e) => onDragStart(e, i)}
                                />
                            ))}
                    </div>
                </div>
    
                <div
                    className="bg-gray-800 border border-gray-700 rounded-lg w-1/3 h-auto text-center shadow-lg"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, "In-progress")}
                >
                    <h1 className="font-semibold text-xl text-gray-200 py-3 border-b border-gray-700">
                        In Progress
                    </h1>
                    <div className="m-3">
                        {arr
                            .filter((obj) => obj && obj.stat === "In-progress")
                            .map((i, index) => (
                                <Cards
                                    key={index}
                                    addData={i}
                                    onDel={() => onDelete(i)}
                                    setEditData={() => setEditData(i)}
                                    onDragStart={(e) => onDragStart(e, i)}
                                />
                            ))}
                    </div>
                </div>
    
                <div
                    className="bg-gray-800 border border-gray-700 rounded-lg w-1/3 h-auto text-center shadow-lg"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, "Done")}
                >
                    <h1 className="font-semibold text-xl text-gray-200 py-3 border-b border-gray-700">
                        Done
                    </h1>
                    <div className="m-3">
                        {arr
                            .filter((obj) => obj && obj.stat === "Done")
                            .map((i, index) => (
                                <Cards
                                    key={index}
                                    addData={i}
                                    onDel={() => onDelete(i)}
                                    setEditData={() => setEditData(i)}
                                    onDragStart={(e) => onDragStart(e, i)}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
    
}
export default Home;
