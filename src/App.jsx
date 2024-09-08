import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <AboutUs />
      <ContactUs />
    </div>
  );
}

export default App;
