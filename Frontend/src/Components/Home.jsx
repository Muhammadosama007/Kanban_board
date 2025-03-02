import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import AddBtn from "./AddBtn";
import Cards from "./Cards";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Home() {
    const [arr, setArr] = useState([]);
    const [editData, setEditData] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchTask();
    }, [token]);

    const fetchTask = async () => {
        console.log("token", token);

        try {
            const response = await axios.get("http://localhost:3002/task/getTask", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setArr(response.data.tasks);
        } catch (err) {
            console.log("Error retriveving tasks!!", err);
        }
    }

    const addData = async (obj) => {
        try {
            if (editData) {
                const response = await axios.patch(`http://localhost:3002/task/updateTask/${editData._id}`, obj, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const updatedArr = arr.map((i) => (i === editData ? response.data : i));
                setArr(updatedArr);
                setEditData(null);
            } else {
                const response = await axios.post("http://localhost:3002/task/create", obj, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setArr([...arr, response.data]);
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
        console.log("error in deleting");
        try {
            await axios.delete(`http://localhost:3002/task/delTask/${task._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const updatedArr = arr.filter((i) => i !== task);
            setArr(updatedArr);
            localStorage.setItem("data", JSON.stringify(updatedArr));
        } catch (err) {
            console.log("error inn deleting task!!", err);
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
            const response = await axios.patch(`http://localhost:3002/task/updateTask/${draggedItem._id}`,{ stat: newStat },{
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 201) {
                console.log("Task updated:", response.data);
            } else {
                console.error("Failed to update task");
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("Logged out successfully");
        navigate('/login');
    }
    return (
        <div className="bg-slate-500 ">
            <Nav />
            <AddBtn addData={addData} editData={editData} setEditData={setEditData} />
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
                Logout
            </button>
            <div className="flex justify-between mx-11">
                {/* TO DO Section */}
                <div
                    className="bg-blue-200 border border-solid rounded-md w-1/3 h-auto text-center"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, "Todo")}
                >
                    <h1 className="font-semibold text-2xl">TO DO</h1>
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
                {/* In Progress Section */}
                <div
                    className="bg-orange-300 border border-solid rounded-md w-1/3 h-auto text-center"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, "In-progress")}
                >
                    <h1 className="font-semibold text-2xl">In Progress</h1>
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

                {/* Done Section */}
                <div
                    className="bg-green-500 border border-solid rounded-md w-1/3 h-auto text-center"
                    onDragOver={onDragOver}
                    onDrop={(e) => onDrop(e, "Done")}
                >
                    <h1 className="font-semibold text-2xl">Done</h1>
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