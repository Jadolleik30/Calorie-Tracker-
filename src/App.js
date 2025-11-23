import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Tracker from "./pages/Tracker";

import mealBg from "./assets/meal.jpg"; // background image

function App() {
  return (
    <div
      className="app-bg"
      style={{
        backgroundImage: `url(${mealBg})`,
      }}
    >
      <div className="overlay"></div>

      <div className="content-wrapper">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
