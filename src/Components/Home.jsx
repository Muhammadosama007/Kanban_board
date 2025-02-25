import React, { useState } from "react";
import Nav from "./Nav";
import AddBtn from "./AddBtn";
import Cards from "./Cards";

function Home() {
  const [arr, setArr] = useState([]);

  const addData = (obj) => {
    setArr([...arr, obj]);
  };

  return (
    <div className="bg-slate-500">
      <Nav />
      <AddBtn addData={addData} />

      <div className="flex justify-between mx-11">
       
        <div className="bg-blue-200 border border-solid rounded-md w-1/3 h-screen text-center">
          <h1 className="font-semibold text-2xl">TO DO</h1>
          <div>
            {arr
              .filter((obj) => obj.stat === "Todo")
              .map((i, index) => (
                <Cards key={index} addData={i} />
              ))}
          </div>
        </div>

        
        <div className="bg-orange-300 border border-solid rounded-md w-1/3 h-screen text-center">
          <h1 className="font-semibold text-2xl">In Progress</h1>
          <div>
            {arr
              .filter((obj) => obj.stat === "In-progress")
              .map((i, index) => (
                <Cards key={index} addData={i} />
              ))}
          </div>
        </div>

        
        <div className="bg-green-500 border border-solid rounded-md w-1/3 h-screen text-center">
          <h1 className="font-semibold text-2xl">Done</h1>
          <div>
            {arr
              .filter((obj) => obj.stat === "Done")
              .map((i, index) => (
                <Cards key={index} addData={i} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
