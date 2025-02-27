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
        localStorage.setItem("data", JSON.stringify(arr));
    }, [arr]);
    const onDelete = (task) => {
        const updatedArr = arr.filter((i) => i !== task);
        setArr(updatedArr);
        localStorage.setItem("data", JSON.stringify(updatedArr));
    };
    const onDragStart = (e, item, index) => {
        e.dataTransfer.setData("task", JSON.stringify(item));
        e.dataTransfer.setData("index", index);
    };
    const onDragOver = (e) => {
        e.preventDefault();
    };
    const onDrop = (e, newStatus) => {
        e.preventDefault();
        const draggedTodo = JSON.parse(e.dataTransfer.getData("task"));
        const targetCard = e.target.closest(".draggable-card");
        let updatedTodos = arr.filter((i) => JSON.stringify(i) !== JSON.stringify(draggedTodo));
        if (targetCard) {
            const targetIndex = parseInt(targetCard.dataset.index, 10);
            const sameColumnItems = updatedTodos.filter(i => i.stat === newStatus);
            const fullIndex = updatedTodos.findIndex(i => JSON.stringify(i) === JSON.stringify(sameColumnItems[targetIndex]));
            if (fullIndex !== -1) {
                updatedTodos.splice(fullIndex, 0, { ...draggedTodo, stat: newStatus });
            } else {
                updatedTodos.push({ ...draggedTodo, stat: newStatus });
            }
        } else {
            updatedTodos.push({ ...draggedTodo, stat: newStatus });
        }
        setArr(updatedTodos);
        localStorage.setItem("data", JSON.stringify(updatedTodos));
    };
    return (
        <div className="bg-slate-500">
            <Nav />
            <AddBtn addData={addData} editData={editData} setEditData={setEditData} />
            <div className="flex justify-between mx-11">
                {['Todo', 'In-progress', 'Done'].map((status, colIndex) => (
                    <div
                        key={colIndex}
                        className={`border border-solid rounded-md w-1/3 h-auto text-center ${status === "Todo" ? "bg-blue-200" : status === "In-progress" ? "bg-orange-300" : "bg-green-500"
                            }`}
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, status)}
                    >
                        <h1 className="font-semibold text-2xl">{status}</h1>
                        <div className="m-3">
                            {arr
                                .filter((obj) => obj && obj.stat === status)
                                .map((i, index) => (
                                    <Cards
                                        key={index}
                                        addData={i}
                                        onDel={() => onDelete(i)}
                                        setEditData={() => setEditData(i)}
                                        onDragStart={(e) => onDragStart(e, i, index)}
                                        dataIndex={index}
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Home;