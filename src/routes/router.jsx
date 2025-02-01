import React from 'react';
import { BrowserRouter as Router, Route, Routes ,UNSAFE_DataRouterContext } from 'react-router-dom';
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
import MyHealingMessageList from '../pages/mypage/MyHealingMessageList';
import MyHealingMessageDetail from '../pages/mypage/MyHealingMessageDetail';
import MyLikedHealingMessages from '../pages/mypage/MyLikedHealingMessages'
import MyLikedHealingMessageDetail from '../pages/mypage/MyLikedHealingMessageDetail'
import OurNewsList from "../pages/OurNews/OurNewsList"
import OurNewsDetail from '../pages/OurNews/OurNewsDetail';
import OurNewsCreate from '../pages/OurNews/OurNewsCreate';
import HealingStoreMain from '../pages/HealingService/HealingStore/HealingStoreMain'
import AiServiceMain from '../pages/HealingService/AiService/AiServiceMain';
import AiLetter from '../pages/HealingService/AiService/AiLetter/AiLetter';
import AiLetterResult from '../pages/HealingService/AiService/AiLetter/AiLetterResult';
import Question1 from '../pages/HealingService/AiService/TodayAiSnapShot/question1';
import Question2 from '../pages/HealingService/AiService/TodayAiSnapShot/questoin2';
import Question3 from '../pages/HealingService/AiService/TodayAiSnapShot/question3';
import Question4 from '../pages/HealingService/AiService/TodayAiSnapShot/question4';
import Question5 from '../pages/HealingService/AiService/TodayAiSnapShot/question5';
import Question6 from '../pages/HealingService/AiService/TodayAiSnapShot/question6';
import Question7 from '../pages/HealingService/AiService/TodayAiSnapShot/question7';
import AiResponsePage from '../pages/HealingService/AiService/TodayAiSnapShot/AiResponsePage';
import HealingMusicList from '../pages/HealingService/HealingCommunity/HealingMusic/HealingMusicList';
import HealingMusicDetail from '../pages/HealingService/HealingCommunity/HealingMusic/HealingMusicDetail';
import MyHealingMusicList from '../pages/mypage/MyHealingMusicList';
import MyLikedHealingMusicList from '../pages/mypage/MyLikedHealingMusicList';

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
        <Route path="/my-healing-message-list" element={<MyHealingMessageList/>}/>
        <Route path="/my-healing-message-detail/:messageId" element={<MyHealingMessageDetail/>}/>
        <Route path="/liked-healing-message-list" element={<MyLikedHealingMessages/>}/>
        <Route path="/liked-healing-message-detail/:messageId" element={<MyLikedHealingMessageDetail/>}/>
        <Route path="/our-news-list" element={<OurNewsList/>}/>
        <Route path="/ournews/detail/:ourNewsNumber" element={<OurNewsDetail/>}/>
        <Route path="/ournews-create" element={<OurNewsCreate/>} />
        <Route path="/healing-store-main" element={<HealingStoreMain/>}/>
        <Route path="/ai-service-main" element={<AiServiceMain/>}/>
        <Route path="ai-letter" element={<AiLetter/>}/>
        <Route path="/ai-letter-result" element={<AiLetterResult/>}/>
        <Route path='/question1' element={<Question1/>}/>
        <Route path='/question2' element={<Question2/>}/>
        <Route path='/question3' element={<Question3/>}/>
        <Route path='/question4' element={<Question4/>}/>
        <Route path='/question5' element={<Question5/>}/>
        <Route path='/question6' element={<Question6/>}/>
        <Route path='/question7' element={<Question7/>}/>
        <Route path='/ai-response' element={<AiResponsePage/>}/>
        <Route path='/healing-music-list' element={<HealingMusicList/>}/>
        <Route path='/healing-music-detail/:musicId' element={<HealingMusicDetail/>}/>
        <Route path='/my-healing-music-list' element={<MyHealingMusicList/>}/>
        <Route path='/my-liked-healing-music-list' element={<MyLikedHealingMusicList/>}/>
      </Routes>
  
  );
}

export default AppRouter;
