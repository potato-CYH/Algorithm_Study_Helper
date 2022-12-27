import React, { useState } from 'react';
import axios from 'axios'
import * as config from '../config'
import { useNavigate } from 'react-router-dom';

import "../commonCss.css"
import "../Timer/Timer.css";

let interval

let startTime = 0
let stopTime = 0
let curTime = 0

function calcTime(num) {
    return [parseInt(num / 3600000), parseInt((num % 3600000) / 60000), parseInt(((num % 3600000) % 60000) / 1000)]
}

function convertTimeformat(obj){
    const arr=[obj.getFullYear(),obj.getMonth()+1,obj.getDate(),obj.getHours(),obj.getMinutes(),obj.getSeconds()]
    
    return `${arr[0]}-${arr[1]}-${arr[2]} ${arr[3]}:${arr[4]}:${arr[5]}`
}

function Timer() {
    let navigate = useNavigate();

    const [recordedTime, setRecordedTime] = useState([0, 0, 0])
    const [pid, setPid] = useState(0);

    let timercore = function () {
        curTime = new Date().getTime();
        let diff = curTime - startTime.getTime()

        setRecordedTime(calcTime(diff));
    }

    function startTimer() {
        startTime = new Date();
        interval = setInterval(timercore, 500)
    }

    function timerStop() {
        stopTime = new Date();
        clearInterval(interval);
    }

    function submit() {
        const logindata = sessionStorage.getItem('usrInfo')
        const userid = JSON.parse(logindata).handle
        
        const problemId = pid;
        
        axios.post(`${config.apiurl}/${userid}/submissions/`,
            {
                problem_id: problemId,
                time_start: convertTimeformat(startTime),
                time_accepted: convertTimeformat(stopTime)
            })
            .then(function (response) {
                const data = response.data;
                if(data.status===200){
                    alert('풀이 시간이 서버로 전송되었습니다.');
                }else{
                    alert('풀이 시간의 서버 전송이 실패하였습니다. 다시 시도해 주십시오.')
                }
            })
            .catch(function (error) {
                alert('다음과 같은 에러가 발생하였습니다.   '+error.toString());
            });

    }
    return (
        <div className="commonFrame">
            <div className = "title-frame">
            <span className="title">문제 풀기</span>
            <div onClick={()=>navigate('/main')} className='go-mainpage'>메인페이지로</div>
            </div>
            <div className="setting">
                <div className="setSpace">
                    <span className="setTitle">문제 번호 : </span>
                    <input onChange={(e) => { setPid(e.target.value) }} className="setInput"></input>
                </div>
            </div>

            <div onClick={startTimer} className="startBtn">TIMER START</div>
            <span className="time">{`${recordedTime[0].toString().padStart(2, '0')}:${recordedTime[1].toString().padStart(2, '0')}:${recordedTime[2].toString().padStart(2, '0')}`}</span>
            <div onClick={timerStop} className="stopBtn">TIMER STOP</div>
            <div onClick={submit} className="submitBtn">Submit</div>
        </div>
    );
};

export default Timer;