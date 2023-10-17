import pool from "../images/pooltable.png"
import {useState, useEffect} from "react"
const Table3 = (data) => {
    const [timeStart, setTimeStart] = useState(false);
    const [time, setTime] = useState(0)
    const [startDate, setStartDate] = useState("")
    const [showStartButton,setShowStartButton] = useState(true)
    const [endTime, setEndTime] = useState(0)
    /*
       var date = new Date();
       var second = date.getSeconds()
    
       var minute = date.getMinutes()

       var hour = date.getHours()
       */
    
    useEffect(() => {
       let interval   
       if(timeStart){
        setShowStartButton(false)
        
       var date = new Date()
       var hourTo12 = date.getHours();
       if(date.getHours() > 12){
        hourTo12 = date.getHours() - 12;
       }
       setStartDate(hourTo12.toString().padStart(2,'0')+":"+date.getMinutes().toString().padStart(2,'0')+":"+date.getSeconds().toString().padStart(2,'0'))
       interval = setInterval(() =>{
            setTime((prevTime) => prevTime + 1000)
        }, 1000)
       }
       else if (!timeStart){
        clearInterval(interval);
        setTime(0)
        setShowStartButton(true)

       }
       return () => clearInterval(interval)
    }, [timeStart])

    
    
    return (
        <div>
            <div class="container">
                <div class="table3-title">
                    <h3>Mesa 2</h3>
                    
                </div>
                <div class="row">
                <div class="col-sm">
                <img src={pool} alt="this is an image"></img> <br/>
                
                { showStartButton ?
                   (
                    <div>
                          <button type="button" class="btn btn-primary" onClick={() => setTimeStart(true)}> Start time</button>
                     </div>
                   ):null}
                </div>
                
                <div class="col-sm">
                {timeStart ? (
                    <div>
                    <h3> Start time: {startDate}</h3>
                    <h3> Time: 
                        <span> {("0" + Math.floor((time/360000) % 60)).slice(-2)}:</span>
                        <span> {("0" + Math.floor((time/60000) % 60)).slice(-2)}:</span>
                        <span> {("0" + Math.floor((time/1000) % 60)).slice(-2)}</span>
                    </h3>
                    <button type="button" class="btn btn-primary" onClick={() => setTimeStart(false)}> Stop time</button>
                    </div>
                ): null}
                </div>
                </div>
            </div>
        </div>
    );
}
export default Table3;