import { useNavigate } from 'react-router-dom';
import '../Menu/Menu.css';

function Menu() {
    let navigate = useNavigate();

    function goTimerPage(){
        navigate('/timer');
    }

    function goSuggPage(){
        navigate('/suggest');
   }

  /*
  function goCommPPage(){
      navigate('/common');
  }
  */

    return (
        <div className = "menuframe">
            <div onClick={goTimerPage} className="menu">문제 풀기</div>
            <div onClick={goSuggPage} className="menu2">나를 위한 추천 문제</div>
            <div /*onClick={goCommPPage}*/ className="menu">공통 문제 뽑기(개발중)</div>
        </div>
    );
}

export default Menu;
