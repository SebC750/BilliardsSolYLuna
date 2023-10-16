import {
    Card,
    Button,
    Modal,
    Form,
    Col,
    Row,
    Container,
    ModalTitle,
} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown"
import pool from "../images/pooltable.png"
import { useState, useEffect } from "react"
const Table1 = () => {
    const [timeStart, setTimeStart] = useState(false);
    const [time, setTime] = useState(0)
    const [startDate, setStartDate] = useState("")
    const [showStartButton, setShowStartButton] = useState(true)
    const [endTime, setEndTime] = useState(0)
    const [addItemPrompt, setAddItemPrompt] = useState(false)
    /*
       var date = new Date();
       var second = date.getSeconds()
    
       var minute = date.getMinutes()

       var hour = date.getHours()
       */
    const addPurchase = () => {

    }
    const stopTimer = () => {
        setTimeStart(false)
        setAddItemPrompt(false)
    }
    useEffect(() => {
        let interval
        if (timeStart) {
            setShowStartButton(false)

            var date = new Date()
            var hourTo12 = date.getHours();
            if (date.getHours() > 12) {
                hourTo12 = date.getHours() - 12;
            }
            setStartDate(hourTo12.toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" + date.getSeconds().toString().padStart(2, '0'))
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1000)
            }, 1000)
        }
        else if (!timeStart) {
            clearInterval(interval);
            setTime(0)
            setShowStartButton(true)

        }
        return () => clearInterval(interval)
    }, [timeStart])



    return (
        <div>
            <div class="container">
                <div class="table1-title">
                    <h3>Mesa 1</h3>

                </div>
                <div class="row">
                    <div class="col-sm">
                        <img src={pool} alt="this is an image"></img> <br />

                        {showStartButton ?
                            (
                                <div>
                                    <button type="button" class="btn btn-success" onClick={() => setTimeStart(true)}> Start time</button>
                                </div>
                            ) : null}
                    </div>

                    <div class="col-sm">
                        {timeStart ? (
                            <div>

                                <h3> Start time: {startDate}</h3>
                                <h3> Time:
                                    <span> {("0" + Math.floor((time / 360000) % 60)).slice(-2)}:</span>
                                    <span> {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                                    <span> {("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                                </h3>
                                <button type="button" class="btn btn-success" onClick={() => stopTimer()}> Stop time</button>




                            </div>

                        ) : null}
                    </div>
                    <div class="col-sm">
                        {timeStart ? (
                            <div>
                                <h3> Recibo </h3>
                                <div align="center">
                                    <div class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"> Unidades</th>
                                                <th scope="col"> Producto</th>
                                                <th scope="col"> Precio</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                        <button type="button" class="btn btn-success" onClick={() => setAddItemPrompt(true)}> Anadir Compra </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    {addItemPrompt ? (
                        <div>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Seleccionar producto
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item > Cerveza </Dropdown.Item>
                                    <Dropdown.Item > Bocadillo </Dropdown.Item>
                                    <Dropdown.Item > Bebida sin alcohol </Dropdown.Item>
                                    <Dropdown.Item > Michelada </Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    ) : null}

                </div>
            </div>
        </div>
    );
}
export default Table1;