import Login from './Login/Login'
import Main from './main/Main'
import MyPage from './MyPage/MyPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
  
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main name={'main'}/>}/>
          <Route path="/timer" element={<Main name={'timer'}/>}/>
          <Route path="/suggest" element={<Main name={'suggest'}/>}/>
          <Route path="/common" element={<Main name={'common'}/>}/>
          <Route path="/mypage" element={<MyPage />}/>
        </Routes>
    </BrowserRouter >
  );
}

export default App;
