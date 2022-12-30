
import { React, useState } from 'react';
import * as config from '../../../config';
import Chart from "react-apexcharts";
import axios from 'axios';

function Comp3() {
    const [sortByTier, setSortByTier] = useState({});             //json으로부터 파싱한 데이터 저장({티어 번호: 문제 수,티어 번호:문제 수})
  
    function getSolvedByTier() {                                  //json에서 파싱
        const logindata = sessionStorage.getItem('usrInfo');
        const user_id = JSON.parse(logindata).handle;
        
        axios.get(`${config.apiurl}/${user_id}/solved-problem/level`, {

        }).then(function (response) {
            const data = response.data.items;
            const dict = {};
            
            for (let i = 0; i < data.length; i++) {
                let tier = data[i].level;
                const cnt = data[i].count;
                
                if (tier >= 1 && tier <= 5) {
                    tier = 1;
                }
                else if (tier >= 6 && tier <= 10) {
                    tier = 6;;
                }
                else if (tier >= 11 && tier <= 15) {
                    tier = 11;;
                }
                else if (tier >= 16 && tier <= 20) {
                    tier = 16;
                }
                else if (tier >= 21 && tier <= 25) {
                    tier = 21;
                }
                else if (tier >= 26 && tier <= 30) {
                    tier = 26;
                }
                else {
                    tier = 31;
                }

                dict[tier] = cnt;
            }

            setSortByTier(dict);

        }).catch(function (error) {
            alert('다음과 같은 에러가 발생하였습니다.   ' + error.toString());
        })
    }

    function RenderChart() {                                        //chart display
        let label = [];
        let darr = [];
        let bg = [];
        let lc = [];

        for (const [key, value] of Object.entries(sortByTier)) {
            darr.push(value);
      
            if (parseInt(key) === 1) {
                label.push('Bronze');
                bg.push('rgba(153, 51, 0, 0.8)');
                lc.push('rgba(153, 51, 0, 1)');
            }
            else if (parseInt(key) === 6) {
                label.push('Silver');
                bg.push('rgba(119, 119, 119, 0.8)');
                lc.push('rgba(119, 119, 119, 1)');
            }
            else if (parseInt(key) === 11) {
                label.push('Gold');
                bg.push('rgba(255, 153, 0, 0.8)');
                lc.push('rgba(255, 153, 0, 1)');
            }
            else if (parseInt(key) === 16) {
                label.push('Platinum');
                bg.push('rgba(0, 255, 204, 0.8)');
                lc.push('rgba(0, 255, 204, 1)');
            }
            else if (parseInt(key) === 21) {
                label.push('Diamond');
                bg.push('rgba(51, 204, 255, 0.8)');
                lc.push('rgba(51, 204, 255, 1)');
            }
            else if (parseInt(key) === 26) {
                label.push('Ruby');
                bg.push('rgba(214, 0, 147, 0.8)');
                lc.push('rgba(214, 0, 147, 1)');
            }
            else if (parseInt(key) === 31) {
                label.push('Master');
                bg.push('rgba(255, 204, 255, 0.8)');
                lc.push('rgba(255, 204, 255, 1)');
            }
        }

        const state = {
            options: {
                chart: {
                    width: '400px'
                },
                labels: label,
                colors: bg,
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
                <div className="chart-btn" onClick={getSolvedByTier}>보기</div>
            </div>
            <RenderChart></RenderChart>
        </div>
    );
}

export default Comp3;
