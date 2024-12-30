import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

function Cards({ home, setClose, data, setUpdatedData }) {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/updatecompleteTask/update-complete-task/${id}`,
        {},
        { headers }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/deleteTask/delete-task/${id}`,
        { headers }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error delete tasks:", error);
    }
  };

  const updateTask = async (id, title, desc) => {
    try {
      setClose("fixed");
      setUpdatedData({ id: id, title: title, desc: desc });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 text-white">
      {data &&
        data.map((items, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-gray-700 rounded-sm p-4"
          >
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  items.complete === false ? "bg-red-500" : "bg-green-700"
                } p-2 rounded w-3/6`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? " Completed " : "In Completed"}
              </button>
              <div className="text-white p-2 w-4/6 text-2xl font-semibold flex justify-around">
                <button
                  onClick={() => updateTask(items._id, items.title, items.desc)}
                >
                  <FaEdit />
                </button>
                <button onClick={() => deleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center bg-gray-700 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300 col-span-full sm:col-span-1"
          onClick={() => setClose("fixed")}
        >
          <IoAddCircleSharp className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
}

export default Cards;
