import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from '../pages/MainPage'
import AboutUs from '../pages/AboutUs';
import Team from '../pages/Team';
import HealingProgram from '../pages/HealingProgram'


function AppRouter() {
  return (

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
        <Route path="/healing-program" element={<HealingProgram />} />
      </Routes>
  
  );
}

export default AppRouter;
