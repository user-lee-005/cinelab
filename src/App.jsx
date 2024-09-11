import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ClientTestimonials from "./components/ClientTestimonials";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <AboutUs />
      <ContactUs />
      <ClientTestimonials />
    </div>
  );
}

export default App;
