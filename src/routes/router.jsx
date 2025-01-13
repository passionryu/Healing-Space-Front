import React from 'react';
import { BrowserRouter as Router, Route, Routes, UNSAFE_DataRouterContext } from 'react-router-dom';
import Main from '../pages/MainPage'
import AboutUs from '../pages/AboutUs';
import Team from '../pages/Team';
import HealingProgram from '../pages/HealingProgram'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import DiaryPage from '../pages/DiaryPage'
import DiaryResultPage from '../pages/DiaryResultPage'
import Mypage from '../pages/Mypage'
import HealingMessageList from '../pages/HealingMessageList'
import HealingMessageCreate from '../pages/HealingMessageCreate'
import HealingMessageDetail from '../pages/HealingMessageDetail';
import DiaryList from '../pages/mypage/DiaryList';
import DiaryDetail from '../pages/mypage/DiaryDetail';

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
        <Route path="/healing-message-list" element={<HealingMessageList/>} />
        <Route path="/healing-message-create" element={<HealingMessageCreate/>} />
        <Route path="/healing-message-detail/:messageId" element={<HealingMessageDetail/>} />
        <Route path="/diary-list" element={<DiaryList/>}/>
        <Route path="/diary-detail/:diaryNumber" element={<DiaryDetail />} />
        
      </Routes>
  
  );
}

export default AppRouter;
