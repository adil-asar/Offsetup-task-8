import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Viewall from "./Components/Viewall";
import Adduser from "./Components/Adduser";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/add" element={<Adduser />} exact />
        <Route path="/view" element={<Viewall />} exact />
      </Routes>
    </>
  );
};

export default App;
