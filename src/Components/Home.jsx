import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import AddBtn from "./AddBtn";
import Cards from "./Cards";

function Home() {
    const [arr, setArr] = useState([]);
    const [editData, setEditData] = useState(null);

    const addData = (obj) => {
        if (editData) {
            const updatedArr = arr.map((i) => (i === editData ? obj : i));
            setArr(updatedArr);
            setEditData(null);
        } else {
            setArr([...arr, obj]);
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


    return (
        <div className="bg-slate-500 ">
            <Nav />
            <AddBtn addData={addData} editData={editData} setEditData={setEditData} />

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
