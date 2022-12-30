
import { React, useState } from 'react';
import * as config from '../../../config';
import Chart from "react-apexcharts";
import axios from 'axios';


function Comp2() {
    const [sortByTag, setSortByTag] = useState({});     //json으로부터 파싱한 데이터 저장({태그 번호: 문제 수,태그 번호:문제 수})
    
    function getSolvedByTag() {                         //json에서 파싱
        const logindata = sessionStorage.getItem('usrInfo');
        const user_id = JSON.parse(logindata).handle;

        axios.get(`${config.apiurl}/${user_id}/solved-problem/tag`, {

        }).then(function (response) {
            const data = response.data.items;
            const dict = {};
            
            for (let i = 0; i < data.length; i++) {
              const tag = data[i].tag;
              const cnt = data[i].count;
              dict[tag] = cnt;
            }
            
            setSortByTag(dict);

        }).catch(function (error) {
            alert('다음과 같은 에러가 발생하였습니다.   ' + error.toString());
        })
    }

    function RenderChart() {                            //chart display
        let label = [];
        let darr = [];
      
        for (const [key, value] of Object.entries(sortByTag)) {
            label.push((config.bojTagIdMap).get(parseInt(key)));
            darr.push(value);
        }

        const state = {
            options: {
                chart: {
                    width: '400px'
                },
                labels: label,
                legend: {
                    position: 'bottom',
                    fontSize: '20vh',
                    fontFamily: 'system-ui',
                    fontWeight: 900
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '70%',
                            labels: {
                                show: true,
                                total: {
                                    show: true,
                                    fontFamily: 'system-ui',
                                    fontWeight: 900
                                }
                            }
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                }
            },
            series: darr
        };

        return (
            <Chart options={state.options} series={state.series} type="donut" ></Chart>
        );
    }

    return (
        <div>
            <div className="btn-frame">
                <div className="chart-btn" onClick={getSolvedByTag}>보기</div>
            </div>
            <RenderChart></RenderChart>
        </div>
    );
}

export default Comp2;