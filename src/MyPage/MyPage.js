import BioInfo from './BioInfo/BioInfo'
import MyInfo from './MyInfo/MyInfo'
import '../MyPage/MyPage.css';

function MyPage() {

  return (
    <div>

      <div className="info-frame">
        <BioInfo></BioInfo>
      </div>
      <MyInfo></MyInfo>
    </div>
  );
}

export default MyPage;
