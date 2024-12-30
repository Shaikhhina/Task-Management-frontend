import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

function InputData({ close, setClose, updatedData, setUpdatedData }) {
  const [newTask, setNewTask] = useState({
    title: "",
    desc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleSubmit = async () => {
    try {
      if (newTask.title === "" || newTask.desc === "") {
        alert("All fields are required");
      } else {
        await axios.post(
          "http://localhost:4000/createTask/create-task",
          newTask,
          { headers }
        );
        setNewTask({
          title: "",
          desc: "",
        });

        setClose("hidden");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const updateTask = async () => {
    if (newTask.title === "" || newTask.desc === "") {
      alert("All fields are required");
    } else {
      await axios.put(
        `http://localhost:4000/updateTask/update-task/${updatedData.id}`,
        newTask,
        { headers }
      );
      setUpdatedData({ id: "", title: "", desc: "" });
      setNewTask({
        title: "",
        desc: "",
      });
      setClose("hidden");
    }
  };

  useEffect(() => {
    setNewTask({ title: updatedData.title, desc: updatedData.desc });
  }, [updatedData]);

  return (
    <>
      <div
        className={`${close} top-0 left-0 bg-gray-700 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${close} top-0 left-0 bg-gray-700 flex items-center justify-center h-screen w-full text-white `}
      >
        <div className="w-2/6 bg-gray-400 p-4 rounded  ">
          <div className="flex justify-end ">
            <button
              className="text-2xl"
              onClick={() => {
                setClose("hidden");
                setNewTask({ title: "", desc: "" });
                setUpdatedData({ id: "", title: "", desc: "" });
              }}
            >
              <RxCross2 />
            </button>
          </div>
          {/* title field */}
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
          />
          {/* desc field */}
          <textarea
            name="desc"
            id=""
            cols="30"
            rows="10"
            placeholder="Description..."
            value={newTask.desc}
            onChange={handleChange}
            className="px-3 py-2 rounded w-full bg-gray-700"
          ></textarea>
          {updatedData.id === "" ? (
            <button
              className="px-3 py-2 bg-blue-400  text-black text-xl font-semibold rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-blue-400  text-black text-xl font-semibold rounded"
              onClick={updateTask}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default InputData;
