import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cards from './Cards';

function IncompletedTask() {
  const [inCompletedData, setInCompletedData ] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:4000/getInCompleteTask/get-in-complete-task",
        { headers }
      );
      setInCompletedData(response.data.data);
    };
    fetch();
  });
  
  return (
    <div>
      <Cards home={"false"} data={inCompletedData}/>
    </div>
  )
}

export default IncompletedTask