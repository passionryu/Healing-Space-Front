import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from '../pages/MainPage'
import AboutUs from '../pages/AboutUs';
import Team from '../pages/Team';
import HealingProgram from '../pages/HealingProgram'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import DiaryPage from '../pages/DiaryPage'
import DiaryResultPage from '../pages/DiaryResultPage'
import Mypage from '../pages/Mypage'

function AppRouter() {
  return (

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
        <Route path="/healing-program" element={<HealingProgram />} />
        <Route path="/diary" element={<DiaryPage/>} />
        <Route path="/diary/result" element={<DiaryResultPage/>} />
        <Route path="/mypage" element={<Mypage/>} />
      </Routes>
  
  );
}

export default AppRouter;
