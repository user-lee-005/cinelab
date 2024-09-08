import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <AboutUs />
    </div>
  );
}

export default App;
