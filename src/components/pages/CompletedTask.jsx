import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";

function CompletedTask() {
  const [completedData, setCompletedData ] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:4000/getCompleteTask/get-complete-task",
        { headers }
      );
      setCompletedData(response.data.data);
    };
    fetch();
  });
  
  return (
    <div>
      <Cards home={"false"} data={completedData}/>
    </div>
  );
}

export default CompletedTask;
