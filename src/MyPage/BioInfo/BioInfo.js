import * as config from '../../config';
import { useNavigate } from 'react-router-dom';
import './BioInfo.css'

function BioInfo() {

    let navigate = useNavigate();
   
    const logindata = sessionStorage.getItem('usrInfo')
    const username = JSON.parse(logindata).handle
    const tier = JSON.parse(logindata).tier
    const tierImg = `https://static.solved.ac/tier_small/${tier}.svg`


  return (
      <div className="bioInfo">
        <div className='imgframe'>
          <img className="tierimg" src={tierImg}></img>
        </div>
          <div className="info">
              <span className="usrname-style">{username.padEnd(15,'\u00A0')}</span>
              <div className='tier-group'>
                <span className="tier-style">{config.tierMap[tier]}</span>
                <div onClick={()=> navigate(-1)} className="back-btn">돌아가기</div>
              </div>
          </div>
      </div>
  );
}

export default BioInfo;
