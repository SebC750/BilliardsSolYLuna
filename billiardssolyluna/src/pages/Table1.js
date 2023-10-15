import {
    Card,
    Button,
    Modal,
    Form,
    Col,
    Row,
    Container,
  } from "react-bootstrap";
import pool from "../images/pooltable.png"
import {useState} from "react"
const Table1 = () => {
    const [timeStart, setTimeStart] = useState(false);
    var totalSeconds = 0;
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    const startTimer = () =>{
        setTimeStart(true)
        setTime()
    }

    const setTime = () =>{
        
        totalSeconds++
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));

    }
    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
          return "0" + valString;
        } else {
          return valString;
        }
      }
    return (
        <div>
            <div class="container">
                <div class="table1-title">
                    <h3>Mesa 1</h3>
                    
                </div>
                <img src={pool}></img>
                <Button class="btn-success" onClick={() => startTimer()}> Start time</Button>
                {timeStart ? (
                    <h3> Time: <label id="minutes">00</label>:<label id="seconds">00</label></h3>
                ): null}
                
            </div>
        </div>
    );
}
export default Table1;