import {
    Card,
    Button,
    Modal,
    Form,
    Col,
    Row,
    Container,
    ModalTitle,
    DropdownHeader,
    DropdownMenu,
    DropdownItem,
} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown"
import pool from "../images/pooltable.png"
import { useState, useEffect } from "react"
const Table1 = ({data}) => {
    const [timeStart, setTimeStart] = useState(false);
    const [time, setTime] = useState(0)
    const [startDate, setStartDate] = useState("")
    const [showStartButton, setShowStartButton] = useState(true)
    const [endTime, setEndTime] = useState(0)
    const [addItemPrompt, setAddItemPrompt] = useState(false)
    const [itemList, setItemList] = useState(data)
    const [itemPurchaseList, setItemPurchaseList] = useState([])
    const [itemSelection, setItemSelection] = useState("")
    
    /* 
       var date = new Date();
       var second = date.getSeconds()
    
       var minute = date.getMinutes()

       var hour = date.getHours()
       */
    
    
    const addPurchase = () =>{
        setAddItemPrompt(false)
        var quantityNum = document.getElementById("#quantityInput").value;
         itemPurchaseList.push({quantity: quantityNum, item: itemSelection[0].in, price: itemSelection[0].p})
        
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
                                        {itemPurchaseList.map((val) => (
                                           <tr key={val.quantity}>
                                           <td>{val.quantity}</td>
                                           <td>{val.product}</td>
                                           <td>{val.price}</td>
                                          
                                           </tr>
                                        ))}
                                        </tbody>
                                        <button type="button" class="btn btn-success" onClick={() => setAddItemPrompt(true)}> Anadir Compra </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    {addItemPrompt ? (
                        <div>
                            <Modal 
             show={true}
             size="lg"
             aria-labelledby="contained-modal-title-vcenter"
             centered
             
             >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter"> Anadir Compra</Modal.Title>
                    
                </Modal.Header>
                <Modal.Body className="px-5">
                    <div class="form-group">
                    <div class="form-row">
    <div class="col">
                 <Dropdown>
                 <Dropdown.Toggle variant="success" id="dropdown-basic">
        Escoger producto
      </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {itemList.map((val) => (
                            <div key= {val.item_id}>
                                 <Dropdown.Item onClick={()=> setItemSelection({in: val.item_name, p: val.item_price})}> {val.item_name} {val.item_price}</Dropdown.Item>
                                 
                            </div>
                           
                        ))}
                    </Dropdown.Menu>
                 </Dropdown>
                 </div>
                 <div class="col">
                 <label for="quantityInput"> Cantidad</label>
                 <input type="number" class="form-control" id="quantityInput"></input>
                 </div>
                  </div>
                 </div>  
                </Modal.Body>
                <Modal.Footer>
                
                <button type="button" class="btn btn-primary" onClick={()=> addPurchase()}> Submit</button>
              
                </Modal.Footer>
             </Modal>
                        </div>
                    ) : null}

                </div>
            </div>
        </div>
    );
}
export default Table1;