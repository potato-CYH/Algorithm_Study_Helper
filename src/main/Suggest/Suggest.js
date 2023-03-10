import React, { useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import * as config from '../../config';
import { useNavigate } from 'react-router-dom';

import "../../commonCss.css";
import "./Suggest.css";

function Suggest() {
    let navigate = useNavigate();
    const[tier, setTier] = useState(1);
    const[tag, setTag] = useState(12);
    const[problem, setProblem] = useState([]);
    
    function TierDropDownBox(){
        const tierlist=[];
        const TierMap = config.tierMap;
        
        for(let i = 1; i < TierMap.length; i++){
            tierlist.push(<option key={i} value={i}>{TierMap[i]}</option>);
        }
        
        return (
            <select onChange={(e) => {setTier(e.currentTarget.value)}} value={tier} className="setSelect">
                {tierlist}
            </select>
        );
    }
    
    function TagDropDownBox(){
        const taglist=[];
        const TagMap = config.bojTagIdMap;
        
        for(const[key, value] of TagMap){
            taglist.push(<option key={key} value={key}>{value}</option>);
        }
        
        return (
            <select onChange={(e) => {setTag(e.currentTarget.value)}} value = {tag} className="setSelect">
                {taglist}
            </select>
        );
    }
    
    function reqToServer() {
        const problemList=[];
        const logindata = sessionStorage.getItem('usrInfo');
        const user_id = JSON.parse(logindata).handle;
        
        axios.get(`${config.apiurl}/problems/standard/`, {

            params: {
                user_id: user_id,
                level : tier,
                tag : tag
            }

        }).then(function (response) {
            const data = response.data;

            for(let i = 0; i < data.length;i++){
                const dataArr=[
                    data[i].problem.id, 
                    data[i].problem.level,
                    data[i].problem.tag,
                    data[i].is_solved
                ];
                let tagstr = "";
                let flag = "";
                  
                for(let i = 0; i < dataArr[2].length; i++){     //????????? ????????? ???????????? ??????
                    if(i === dataArr[2].length-1){
                        tagstr += (config.bojTagIdMap).get(dataArr[2][i])    
                    }
                    else{
                        tagstr += (config.bojTagIdMap).get(dataArr[2][i]) + ", "
                    }
                }
                                    
                if(dataArr[3] === true){                        //???????????? ?????? ????????? ??????
                    flag = "O";
                }
                else{
                    flag = "X";
                }

                const hyperlink = `https://www.acmicpc.net/problem/${dataArr[0].toString()}`;

                problemList.push(
                    <li key={data[i].problem.id} >
                        <div className='listfield'>
                            <span className={classnames('field1','new-align')}><a href={hyperlink} target='_blank' rel='noreferrer' >{dataArr[0]}</a></span>
                            <span className='field2'>{(config.tierMapIdent[dataArr[1]])} </span>
                            <span className={classnames('field3','new-align')}>{tagstr} </span>
                            <span className={classnames('field4',{'solved':dataArr[3]})}>{flag} </span>
                        </div>
                    </li>
                );
            }

            setProblem(problemList);                       
        }).catch(function (error) {
            alert('????????? ?????? ????????? ?????????????????????.   '+error.toString());
        })
    }

    function SuggestList(){

        return(
            <ul className="listStyle">
                {problem}
            </ul>
        );
    }
    
    return (
        <div className="commonFrame">
            <div className = "title-frame">
                <span className="title">?????? ??????</span>
                <div onClick={()=>navigate('/main')} className='go-mainpage'>??????????????????</div>
            </div>
            <div className="setting">
                <div className="setSpace">
                    <span className="setTitle">?????? ?????? : </span>
                    <TierDropDownBox></TierDropDownBox>
                </div>
                <div className="setSpace">
                    <span className="setTitle">?????? ?????? : </span>
                    <TagDropDownBox></TagDropDownBox>
                </div>
            </div>
            <div onClick={reqToServer} className="getBtn">???????????? ????????????</div>
            <div className="field">
                <div className="field1" >??????</div>
                <div className="field2" >??????</div>
                <div className="field3" >??????</div>
                <div className="field4" >??????</div>
            </div>
            <SuggestList></SuggestList>
        </div>
    );
};

export default Suggest;