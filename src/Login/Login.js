import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import './Login.css';

function Login() {

    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [msg, setMsg] = useState("");

    function isMember() {
        const options = {
            method: 'GET',
            url: 'https://solved.ac/api/v3/search/user',
            params: { query: id },
            headers: { 'Content-Type': 'application/json' }
        };

        axios.request(options).then(function (response) {
            const data = response.data;
            console.log(data)
            if (data.count === 0) {
                setMsg('일치하는 사용자가 없습니다. https://acmicpc.net 에 먼저 회원가입 하신 후 시도하시기 바랍니다.');
            }
            else {
                //세션 스토리지에 data json 저장
                sessionStorage.setItem('usrInfo', JSON.stringify(data.items[0]))
                // authorized : true
                navigate("/main")
            }

        }).catch(function (error) {
            console.error(error);
            setMsg('다음과 같은 에러가 발생하였습니다. 관리자에게 문의 바랍니다.\n' + String(error));
        });

    }
    return (

        <div className="formStyle">
            <input onChange={(e) => { setId(e.target.value) }} className="textBox" placeholder="Input your Baekjoon ID" ></input>
            <div onClick={isMember} className="loginBtn">LOGIN</div>
            <span className="errMsg">{msg}</span>
        </div>

    );
}

export default Login;
