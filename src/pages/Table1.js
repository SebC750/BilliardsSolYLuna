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


const Table1 = ({ data }) => {
    const [timeStart, setTimeStart] = useState(false);
    const [showTimer, setShowTimer] = useState(false)
    const [time, setTime] = useState(0)
    const [startDate, setStartDate] = useState("")
    const [showStartButton, setShowStartButton] = useState(true)
    const [showEndButton, setShowEndButton] = useState(false)
    const [endTime, setEndTime] = useState("")
    const [addItemPrompt, setAddItemPrompt] = useState(false)
    const [itemList, setItemList] = useState(data)
    const [itemPurchaseList, setItemPurchaseList] = useState([])
    const [itemSelection, setItemSelection] = useState([{ in: "", p: 0 }])
    const [totalReceipt, showTotalReceipt] = useState(false)
    const [tablePrice, setTablePrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalTimeElapsed,setTotalTimeElapsed] = useState("")
    const [errorMessage, showErrorMessage] = useState(false)
   
    async function archiveOrderToDB(data){
        const message = await database.insertReceipt(data)
        console.log(message)
        }
    const addPurchase = () => {
        
        var quantityNum = document.getElementById("quantityInput").value;
       
        var name = document.getElementById("nameInput").value
        if(quantityNum.length < 1 || name.length < 1){
            showErrorMessage(true)
        }
        
        else {
            setAddItemPrompt(false)
        console.log(orderId)
        var orderDate = new Date()
        var orderDay = ""+orderDate.getDate()
        
        if(orderDate.getDate() < 10)
        {
            orderDay = "0"+orderDate.getDate()
        }
        var dateString = (orderDate.getMonth()+1)+"/"+orderDay+"/"+orderDate.getFullYear();
        {
            itemSelection.map((val) => {
                itemPurchaseList.push({ name: name, quantity: quantityNum, item: val.in, price: val.p * quantityNum })
                archiveOrderToDB({  ordername: name, quantity: quantityNum, product: val.in, price: val.p * quantityNum, date: dateString})
            })

        }
    }

    }
    const closeModal = () => {
        setItemSelection([{ in: "", p: 0 }])
        setAddItemPrompt(false)
    }
    const calculateTotalPrice = () => {
        var h = Math.floor(time / 3600).toFixed(0);
        var m = Math.floor((time % 3600) / 60).toFixed(0);
        var s = (time % 60).toFixed(0);
        
        var totalTimeElapsed = "Horas " + h.toString().padStart(2, '0') + " Minutos " + m.toString().padStart(2, '0') + " Segundos " + s.toString().padStart(2, '0');
        
        setTotalTimeElapsed(totalTimeElapsed);
        console.log(h + " " + m + " " + s);
        
        var total = 0;
        itemPurchaseList.forEach((val) => {
            total += val.price;
        });
        
        console.log(time);
        
        var tablePrice = (20 * h) + (20 / 60 * m) + (20 / 3600 * s);
        setTablePrice(tablePrice);
        
        var totalPrice = tablePrice + total;
        
        var salesTax = totalPrice * 0.08875; 
        var totalPriceWithSales = (Math.round((totalPrice + salesTax) * 100) / 100).toFixed(2);
        
        setTotalPrice(totalPriceWithSales);
        
    }
    const stopTimer = () => {
        setShowEndButton(false)
        setTimeStart(false)
        var endDate = new Date()
        var hourTo12 = endDate.getHours();
        var am_pm = "am"
        if (endDate.getHours() > 12) {
            hourTo12 = endDate.getHours() - 12;
            am_pm = "pm"
        }
        setEndTime(hourTo12.toString().padStart(2, '0') + ":" + endDate.getMinutes().toString().padStart(2, '0') + ":" + endDate.getSeconds().toString().padStart(2, '0')+" "+am_pm)
        console.log(endDate.getMinutes())
        setAddItemPrompt(false)

        setItemSelection([{ in: "", p: 0 }])
        calculateTotalPrice()
        showTotalReceipt(true)

    }
    const removeItem = (value) =>{
         setItemPurchaseList(deleteItem =>{
            return deleteItem.filter(i => i.id !== value)
         })
    }
    const clearReceipt = () => {
        setShowTimer(false)
        setShowStartButton(true)
        setItemPurchaseList([])
        setStartDate("")
        setEndTime(0)
        showTotalReceipt(false)
        setTime(0)
    }
    
    useEffect(() => {
        let interval
        if (timeStart) {
            console.log(Math.floor((30/60) % 60))
            setShowTimer(true)
            setShowStartButton(false)
            setShowEndButton(true)
            var startDate = new Date()
            var startSeconds = startDate.getSeconds()
            var hourTo12 = startDate.getHours();
        if (startDate.getHours() > 12) {
            hourTo12 = startDate.getHours() - 12;
        }
            setStartDate(hourTo12.toString().padStart(2, '0') + ":" + startDate.getMinutes().toString().padStart(2, '0') + ":" + startDate.getSeconds().toString().padStart(2, '0') + "am")
            interval = setInterval(() => {

                var elapsed = new Date().getTime() - startDate.getTime()
                var currentTime = (startSeconds + elapsed)*0.001
                console.log(Math.round(currentTime))
                    setTime(Math.round(currentTime))
                    
            },1000)
        }
        else if (!timeStart) {

            clearInterval(interval);



        }
        return () => clearInterval(interval)
    }, [timeStart])



    return (
        <div>

            <div class="table1-title">
                <h3>Mesa 1</h3>

            </div>

            <div class="table-page-border">
            <div class="padding">
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
                    {showTimer ? (
                        <div>

                            <h3> Tiempo Comenzado: {startDate}</h3>
                            <h3> Tiempo Restante: <br />
                                <span> {("0" + Math.floor((time / 3600) % 60)).slice(-2)}:</span>
                                <span> {("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
                                <span> {("0" + Math.floor((time / 1) % 60)).slice(-2)}</span>
                            </h3>
                            {endTime ? (
                                <h3> Tiempo Terminado: {endTime}</h3>
                            ) : null}
                            {showEndButton ? (
                                <button type="button" class="btn btn-success" onClick={() => stopTimer()}> Stop time</button>
                            ) : null}





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
                                            
                                            <th scope="col"> Nombre </th>
                                            <th scope="col"> Unidades</th>
                                            <th scope="col"> Producto</th>
                                            <th scope="col"> Precio</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemPurchaseList.map((val,index) => (
                                            <tr key={index}>
                                                
                                                <td>{val.name}</td>
                                                <td>{val.quantity}</td>
                                                <td>{val.item}</td>
                                                <td>$ {val.price}</td>
                                                <button type="button" class="btn btn-success" onClick={()=> removeItem(val.id)}> Cancelar </button>
                                                
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
                                                        <div key={val.item_id}>
                                                            <Dropdown.Item onClick={() => setItemSelection([{ in: val.item_name, p: val.item_price }])}> {val.item_name} {val.item_price}</Dropdown.Item>

                                                        </div>

                                                    ))}
                                                
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        
                                        </div>
                                        <div class="col">
                                            <label for="quantityInput"> Cantidad </label>
                                            <input type="number" class="form-control" id="quantityInput"></input>
                                            <label for="nameInput"> Nombre de cliente </label>
                                            <input type="text" class="form-control" id="nameInput"></input>
                                            {errorMessage ? (
                                                    <p style={{color: "red", fontSize: "12px"}}> Por favor ingresar toda la informacion requerida. </p>
                                                ):null}
                                        </div>
                                    </div>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>
                                <button type="button" class="btn btn-primary" onClick={() => closeModal()}> Cancelar orden </button>
                                <button type="button" class="btn btn-primary" onClick={() => addPurchase()}> Ingresar </button>

                            </Modal.Footer>
                        </Modal>
                    </div>
                ) : null}

            </div>
            {totalReceipt ? (
                <div>
                    <div class="receipt-title-border">
                    <h3> Recibo Total </h3>
                    </div>
                    <div class="receipt-body-border">
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
                                    <tr key={val.id}>
                                        <td>{val.quantity}</td>
                                        <td>{val.item}</td>
                                        <td>$ {val.price*quantity}</td>

                                    </tr>
                                ))}
                                <tr> <td>                 </td> <td> Tiempo de Mesa {totalTimeElapsed} </td> <td> ${tablePrice.toFixed(2)} </td></tr>
                                <tr> <td>                 </td> <td> Sales tax                         </td> <td> 8.875%                   </td></tr>
                                <tr> <td><h4> Total: </h4></td> <td>                                   </td> <td> ${totalPrice}            </td></tr>
                            </tbody>
                            <button type="button" class="btn btn-success" onClick={() => clearReceipt()}> Terminar tiempo </button>
                        </div>
                        </div>
                    </div>
                </div>
            ) : null}
            </div>
            </div>
        </div>
    );
}

export default Table1;