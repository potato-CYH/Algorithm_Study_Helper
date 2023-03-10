import { useState } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import * as config from '../../../config';
import '../Comp1/Comp1.css';

function Comp1() {
    const [month, setMonth] = useState('선택');
    const [solvedlist, setSolvedlist] = useState({});

    function MonthDropdownBox() {
        const monthList = [];
        const monthMap = ['선택', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

        for (let i = 0; i < 13; i++) {
            monthList.push(<option key={i} value={i}>{monthMap[i]}</option>);
        }

        return (
            <select onChange={(e) => { getSolved(e.currentTarget.value) }} value={month} className={classnames("setSelect", "dropdown-style",)}>
                {monthList}
            </select>
        );
    }

    function getSolved(sel_month) {
        setMonth(sel_month);
        const logindata = sessionStorage.getItem('usrInfo');
        const user_id = JSON.parse(logindata).handle;
        const cur_year = new Date().getFullYear();

        axios.get(`${config.apiurl}/${user_id}/solved-problem`, {

            params: {
                yyyy: cur_year,
                mm: sel_month
            }

        }).then(function (response) {
            const data = response.data.items;
            const dict = {};

            for (let i = 0; i < data.length; i++) {
                const soldate = parseInt((data[i].solving_time.date).split('-')[2]);    //풀이 날짜
                const soltimestr = (data[i].solving_time.time_elapsed).split(':');      //풀이 소요시간
                const soltime = `${soltimestr[0]}h ${soltimestr[1]}m`;
                const pid = data[i].problem.id;                                         //문제 아이디
                const plv = data[i].problem.level;                                      //문제 레벨
                
                if (soldate in dict) {                                                  //해당 날짜에 푼 문제가 있다면 update
                    dict[soldate][0]++;
                    dict[soldate][1].push([pid, plv, soltime]);                         //{날짜 :[푼 문제 수, [[id, lv, dur_time],[]] ],}
                }
                else {                                                                  //해당 날짜에 푼 문제가 없다면 딕셔너리 추가
                    dict[soldate] = [1, [[pid, plv, soltime]]];
                }
            }

            setSolvedlist(dict);

        }).catch(function (error) {
                alert('다음과 같은 에러가 발생하였습니다.   ' + error.toString());
        })
    }

    function RenderList() {
        let acclist = [];
        let idx = 0;

        for (const [key, value] of Object.entries(solvedlist)) {
            let accSublist = [];

            for (let i = 0; i < value[0]; i++) {
                const p = value[1][i];
              
                accSublist.push(
                    <li key={p[0]} >
                        <div className='sublist-frame'>
                            <span className=''>문제 번호 : {(p[0].toString()).padStart(5, '\u00A0')}</span>
                            <div className='sublist-lv'>
                                <span className=''>레밸 :</span>
                                <img className="list-tier-img" alt="" src={`https://static.solved.ac/tier_small/${p[1]}.svg`}></img>
                            </div>
                            <span className=''>풀이 시간 : {p[2]}</span>
                        </div>
                    </li>
                );
            }

            acclist.push(
                <Accordion.Item eventKey={idx}>
                    <Accordion.Header>{key}일  해결한 문제 수 : {value[0]}</Accordion.Header>
                    <Accordion.Body>
                        <ul className="ul-style">
                            {accSublist}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            );

            idx++;
        }

        return (
            <div style={{ width: '43vmax' }}>
                <Accordion defaultActiveKey={0} flush>
                    {acclist}
                </Accordion>
            </div>
        );
    }

    return (
        <div className="comp1-frame">
            <MonthDropdownBox></MonthDropdownBox>
            <RenderList></RenderList>
        </div>
    );
}

export default Comp1;
