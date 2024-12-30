import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "./InputData";
import axios from "axios";

function AllTask() {
  const [close, setClose] = useState("hidden");
  const [data1, setData1] = useState();
  const [updatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:4000/getAllTask/get-all-task",
        { headers }
      );
      setData1(response.data.data);
    };
    fetch();
  });

  return (
    <>
      <div>
        <div className="w-full flex justify-end items-end px-2 py-2">
          <button onClick={() => setClose("fixed")}>
            <IoAddCircleSharp className="text-4xl text-gray-600 hover:text-gray-800 transition-all duration-300 cursor-pointer" />
          </button>
        </div>
        {data1 && (
          <Cards
            home={"true"}
            setClose={setClose}
            data={data1.tasks}
            setUpdatedData={setUpdatedData}
          />
        )}
      </div>
      <InputData
        close={close}
        setClose={setClose}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
        f
      />
    </>
  );
}

export default AllTask;
