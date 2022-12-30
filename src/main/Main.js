import BioBrief from '../BioBrief/BioBrief';
import Menu from '../Menu/Menu';
import Timer from "../Menu/Timer/Timer";
import Suggest from '../Menu/Suggest/Suggest';
import GetCommonP from '../Menu/GetCommonP/GetCommonProblem';

import './Main.css';

function Main(props) {

    function compSelector(){
        if(props.name === 'main'){
            return <Menu></Menu>
        }
        else if(props.name === 'timer'){
            return <Timer></Timer>
        }
        else if(props.name === 'suggest'){
            return <Suggest></Suggest>
        }
        else if(props.name === 'common'){
            return <GetCommonP></GetCommonP>
        }
    }

    return (
        <div>
            <BioBrief></BioBrief>
            {compSelector()}
        </div>
    );
}

export default Main;
