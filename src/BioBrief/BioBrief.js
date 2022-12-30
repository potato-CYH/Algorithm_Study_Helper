import {useNavigate } from 'react-router-dom';

import '../BioBrief/BioBrief.css';

function BioBrief() {
    const logindata = sessionStorage.getItem('usrInfo');
    const username = JSON.parse(logindata).handle;
    const usrmsg = `${username} 님`;
    let navigate = useNavigate();

    function goMyPage(){
        navigate('/mypage');
    }

    return (
        <div className="bioframe">
            <span className="welcomeMsg">{usrmsg}</span>
            <span onClick={goMyPage}className="goMyPage">마이페이지</span>
        </div>
    );
}

export default BioBrief;
