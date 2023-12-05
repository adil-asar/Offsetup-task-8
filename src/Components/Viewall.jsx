import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Viewall = () => {
  const API_URL = "https://656dc64dbcc5618d3c23ec70.mockapi.io/v1/users";

  const navigate = useNavigate();
  const jump_to = (paths) => {
    navigate(paths);
  };

  //   usestate for storing api data
  const [data, setdata] = useState([]);

  //   user deletion function
  useEffect(() => {
    const fetchDataWithDelay = async () => {
      try {
        const response = await axios.get(API_URL);
        setdata(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
        alert("Error fetching data. Please try again later.");
      }
    };

    fetchDataWithDelay(); // Adjust the delay as needed
  }, []);

  const deleteUser = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {});
    const newArr = data.filter((item) => item.id != id);
    setdata(newArr);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-700">
      <button
        onClick={() => jump_to("/")}
        className="px-6 py-2 mb-8 text-yellow-600 bg-transparent border border-yellow-600 rounded-md"
      >
        Go Back
      </button>

      <div className="w-full px-8 py-2 overflow-x-auto rounded-lg h-96">
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Address</th>
              <th className="px-4 py-2 border-b">Number</th>
              <th className="px-4 py-2 border-b">Operations</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="px-4 py-2 text-center border-b">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 text-center border-b">
                    {item.address}
                  </td>
                  <td className="px-4 py-2 text-center border-b">
                    {item.mobile}
                  </td>
                  <td className="px-4 py-2 text-center border-b">
                    <button className="px-2 py-1 text-white bg-blue-500 rounded">
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(item.id)}
                      className="px-2 py-1 ml-2 text-white bg-red-500 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Viewall;
