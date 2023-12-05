import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Viewall from "./Components/Viewall";
import Adduser from "./Components/Adduser";
import Update from "./Components/Update";
const App = () => {
  const [data, setdata] = useState([]);
  const [fill, setfill] = useState({ name: "", address: "", mobile: "" });
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/add" element={<Adduser />} exact />
        <Route
          path="/view"
          element={
            <Viewall
              data={data}
              setdata={setdata}
              fill={fill}
              setfill={setfill}
            />
          }
          exact
        />
        <Route
          path="/update"
          element={<Update fill={fill} setfill={setfill} />}
          exact
        />
      </Routes>
    </>
  );
};

export default App;
