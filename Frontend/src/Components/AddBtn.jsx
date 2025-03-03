import React, { useEffect, useState } from "react";

function AddBtn({ addData, editData, setEditData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");


  const handleTitle = (e) => {
    setTitle(e.target.value);
  }
  const handleDes = (e) => {
    setDesc(e.target.value);
  }
  const handleStatus = (e) => {
    setStatus(e.target.value);
  }
 
  useEffect(() => {
    if (editData) {
      setTitle(editData.name);
      setDesc(editData.description);
      setStatus(editData.stat);
      setIsModalOpen(true);
    }
  }, [editData]);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !desc || !status) {
      alert("Please fill all fields!");
      return;
    }

    const obj = {
      name: title,
      description: desc,
      stat: status,
    };

    addData(obj);


    setTitle("");
    setDesc("");
    setStatus("");
    setEditData(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-end m-4">
     
      <button
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {editData ? "Edit Product" : "Add Product"}
      </button>

     
      {isModalOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-700">

            
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editData ? "Update Data" : "Create New Product"}
              </h3>
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
 
            <form className="p-4" onSubmit={handleAdd}>
              <div className="grid gap-4 mb-4 grid-cols-2">

                
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    onChange={handleTitle}
                    value={title}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required
                  />
                </div>
             
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Description
                  </label>
                  <textarea
                    onChange={handleDes}
                    value={desc}
                    id="description"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product description here"
                    required
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    onChange={handleStatus}
                    value={status}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Todo">Todo</option>
                    <option value="In-progress">In-progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

              </div>

             
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {editData ? "Update Product" : "Add New Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddBtn;
