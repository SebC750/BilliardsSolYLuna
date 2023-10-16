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
import {useState, useEffect} from "react"
const Table1 = () => {
    const [timeStart, setTimeStart] = useState(false);
    const [time, setTime] = useState(0)
    const [show, showDate] = useState(false)
    const [date, setDate] = useState("")
    

    useEffect(() => {
       let interval
       if(timeStart){
        interval = setInterval(() => {
            setTime((prevTime) => prevTime + 10)

        }, 10)

       }
       else if (!timeStart){
        clearInterval(interval);

       }
       return () => clearInterval(interval)
    }, (timeStart))

    const getDate = () =>{
        const currentDate = new Date()
        setDate(currentDate.getHours()+":"+currentDate.getMinutes()+":"+currentDate.getSeconds())
        showDate(true)
    }
    /*
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
      */
    return (
        <div>
            <div class="container">
                <div class="table1-title">
                    <h3>Mesa 1</h3>
                    
                </div>
                <img src={pool}></img> <br/>
                <button type="button" class="btn btn-success" onClick={() => (setTimeStart(true))}> Start time</button>
                <button type="button" class="btn btn-success" onClick={() => getDate()}> Get Time</button> 
                {date ? (
                    <div>
                       <p> {date}</p>
                    </div>
                ):null

                }
                {timeStart ? (
                    <div>
                    <h3> Time: 
                        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>:
                        <span >{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>:
                        <span >{("0" + ((time / 10) % 100)).slice(-2)}</span>
                    </h3>
                    <button type="button" class="btn btn-success" onClick={() => {setTime(0); setTimeStart(false)}}> Stop time</button>
                    </div>
                ): null}
                
            </div>
        </div>
    );
}
export default Table1;