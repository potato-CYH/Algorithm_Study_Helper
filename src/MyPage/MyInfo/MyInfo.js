import {useState} from 'react';
import Comp1 from '../MyInfo/Comp1/Comp1';
import Comp2 from '../MyInfo/Comp2/Comp2';
import Comp3 from '../MyInfo/Comp3/Comp3';
import Nav from 'react-bootstrap/Nav';

import './MyInfo.css';

function MyInfo() {
  const [tabkey, setTabkey] = useState(0);

    function EnableTab(props){
        if(props.tabkey===0){
            return(
                <Comp1></Comp1>
            );
        }
        else if(props.tabkey===1){
            return(
                <Comp2></Comp2>
            );
        }
        else if(props.tabkey === 2){
            return(
                <Comp3></Comp3>
            );
        }
    }

    return (
      <div className="myinfo-frame">
          <span className="myinfo-title">내가 푼 문제</span>
          <div className="myinfo-area">
              <Nav justify variant="tabs" defaultActiveKey="/home">
                  <Nav.Item>
                      <Nav.Link eventKey="link-0" onClick={() => setTabkey(0)}>날짜</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="link-1" onClick={() => setTabkey(1)}>유형</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="link-2" onClick={() => setTabkey(2)}>레벨</Nav.Link>
                  </Nav.Item>
              </Nav>
              <EnableTab tabkey={tabkey}></EnableTab>
          </div>
      </div>
    );
}

export default MyInfo;
