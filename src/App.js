import Login from './Login/Login'
import Main from './main/Main'
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />}/>
      </Routes>
      



  );
}

export default App;
