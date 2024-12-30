import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { FaCheckDouble } from "react-icons/fa";
import { MdLabelImportant } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

function Sidebar() {

  const history = useNavigate();
  const dispatch = useDispatch();

  const [data1, setData1] = useState();

  const data = [
    {
      title: "All task",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Completed task",
      icon: <FaCheckDouble />,
      link: "/completedTask",
    },
    {
      title: "Incompleted task",
      icon: <MdLabelImportant />,
      link: "/inCompletedTask",
    },
  ];

  // submit logout 
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/header");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // get all tasks
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/getAllTask/get-all-task",
          { headers }
        );
        setData1(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {data1 && (
        <div>
          <h2 className="text-xl font-semibold">{data1.username}</h2>
          <h4 className="mb-4 my-2 text-gray-300">{data1.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-3 flex items-center space-x-2 hover:bg-slate-500 p-2 rounded transition-all duration-300 cursor-pointer"
          >
            <span className="text-2xl">{items.icon}</span>{" "}
            <span>{items.title}</span>
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-blue-600 w-full p-2 rounded" onClick={logout}>
          Log Out
        </button>
      </div>
    </>
  );
}

export default Sidebar;
