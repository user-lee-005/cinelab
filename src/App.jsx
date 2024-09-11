import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ClientTestimonials from "./components/ClientTestimonials";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <AboutUs />
      <ContactUs />
      <ClientTestimonials />
      <Footer />
    </div>
  );
}

export default App;
