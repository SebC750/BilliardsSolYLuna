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
const Table2 = ({ data }) => {
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
    const [totalTimeElapsed, setTotalTimeElapsed] = useState("")


    const addPurchase = () => {
        setAddItemPrompt(false)
        var quantityNum = document.getElementById("quantityInput").value;
        var orderId = Math.floor(Math.random() * 10000) + 1000;


        {
            itemSelection.map((val) => {
                itemPurchaseList.push({ id: orderId, quantity: quantityNum, item: val.in, price: val.p * quantityNum })

            })

        }


    }
    const closeModal = () => {
        setItemSelection([{ in: "", p: 0 }])
        setAddItemPrompt(false)
    }
    const calculateTotalPrice = () => {
        var s = ((time/1000) % 60).toFixed(0)
        var m = ((time/60000) % 60).toFixed(0)
        var h = ((time/3600000000) % 60).toFixed(0)

        const totalTimeElapsed = "Horas "+h.toString().padStart(2,'0')+" Minutos "+m.toString().padStart(2,'0')+" Segundos "+s.toString().padStart(2,'0')
        setTotalTimeElapsed(totalTimeElapsed)
        console.log(h+" "+m+" "+s)
        var total = 0
        {
            itemPurchaseList.map((val) => {
                total += val.price
            })
        }
        console.log(time)
        var tablePrice = (20*h)+((20/60)*m)+((20/3600)*s)
        setTablePrice(tablePrice)
        var totalPrice = tablePrice+total

        var salesTax = totalPrice*0.08875
        var totalPriceWithSales = (Math.round((totalPrice+salesTax)*100)/100).toFixed(2)
        setTotalPrice(totalPriceWithSales)
       
        console.log(totalPriceWithSales)
    }
    const stopTimer = () => {
        setShowEndButton(false)
        setTimeStart(false)
        var endDate = new Date()
        var hourTo12 = endDate.getHours();
        if (endDate.getHours() > 12) {
            hourTo12 = endDate.getHours() - 12;
        }
        setEndTime(hourTo12.toString().padStart(2, '0') + ":" + endDate.getMinutes().toString().padStart(2, '0') + ":" + endDate.getSeconds().toString().padStart(2, '0'))

        setAddItemPrompt(false)

        setItemSelection([{ in: "", p: 0 }])
        calculateTotalPrice()
        showTotalReceipt(true)

    }
    const removeItem = (value) => {
        setItemPurchaseList(deleteItem => {
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
            setShowTimer(true)
            setShowStartButton(false)
            setShowEndButton(true)
            var startDate = new Date()
            var startSeconds = startDate.getSeconds()
            var hourTo12 = startDate.getHours();
        if (startDate.getHours() > 12) {
            hourTo12 = startDate.getHours() - 12;
        }
            setStartDate(hourTo12.toString().padStart(2, '0') + ":" + startDate.getMinutes().toString().padStart(2, '0') + ":" + startDate.getSeconds().toString().padStart(2, '0'))
            interval = setInterval(() => {

                var elapsed = new Date().getTime() - startDate.getTime()
                var currentTime = startSeconds + elapsed
                
                    setTime(currentTime)
            },1000)
            
        }
        else if (!timeStart) {

            clearInterval(interval);



        }
        return () => clearInterval(interval)
    }, [timeStart])



    return (
        <div>

            <div class="table2-title">
                <h3>Mesa 2</h3>

            </div>

            <div class="table-page-border">
                <div class="padding">
                    <div class="row">
                        <div class="col-sm">
                            <img src={pool} alt="this is an image"></img> <br />

                            {showStartButton ?
                                (
                                    <div>
                                        <button type="button" class="btn btn-danger" onClick={() => setTimeStart(true)}> Start time</button>
                                    </div>
                                ) : null}
                        </div>

                        <div class="col-sm">
                            {showTimer ? (
                                <div>

                                    <h3> Start time: {startDate}</h3>
                                    <h3> Elapsed time: <br />
                                    <span> {("0" + Math.floor((time / 3600000000) % 60)).slice(-2)}:</span>
                                <span> {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                                <span> {("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                                    </h3>
                                    {endTime ? (
                                        <h3> End time: {endTime}</h3>
                                    ) : null}
                                    {showEndButton ? (
                                        <button type="button" class="btn btn-danger" onClick={() => stopTimer()}> Stop time</button>
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
                                                    <th scope="col"> ID</th>
                                                    <th scope="col"> Unidades</th>
                                                    <th scope="col"> Producto</th>
                                                    <th scope="col"> Precio</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {itemPurchaseList.map((val) => (
                                                    <tr key={val.id}>
                                                        <td>{val.id}</td>
                                                        <td>{val.quantity}</td>
                                                        <td>{val.item}</td>
                                                        <td>$ {val.price}</td>
                                                        <button type="button" class="btn btn-danger" onClick={() => removeItem(val.id)}> Cancelar </button>

                                                    </tr>
                                                ))}
                                            </tbody>
                                            <button type="button" class="btn btn-danger" onClick={() => setAddItemPrompt(true)}> Anadir Compra </button>
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
                                                        <Dropdown.Toggle variant="danger" id="dropdown-basic">
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
                                                    <p> {itemSelection[0].in}</p>
                                                </div>
                                                <div class="col">
                                                    <label for="quantityInput"> Cantidad </label>
                                                    <input type="number" class="form-control" id="quantityInput"></input>
                                                </div>
                                            </div>
                                        </div>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button type="button" class="btn btn-primary" onClick={() => closeModal()}> Close </button>
                                        <button type="button" class="btn btn-primary" onClick={() => addPurchase()}> Submit </button>

                                    </Modal.Footer>
                                </Modal>
                            </div>
                        ) : null}

                    </div>
                    {totalReceipt ? (
                        <div>
                            <div class="receipt-title-border-red">
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
                                                    <td>$ {val.price}</td>

                                                </tr>
                                            ))}
                                            <tr> <td></td> <td> Tiempo de Mesa {totalTimeElapsed}</td> <td> ${tablePrice.toFixed(2)} </td></tr>
                                            <tr> <td></td> <td> Sales tax </td> <td> 8.875% </td></tr>
                                            <tr> <td><h4> Total: </h4></td> <td> </td> <td> ${totalPrice}</td></tr>
                                        </tbody>
                                        <button type="button" class="btn btn-danger" onClick={() => clearReceipt()}> Terminar tiempo </button>
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
export default Table2;