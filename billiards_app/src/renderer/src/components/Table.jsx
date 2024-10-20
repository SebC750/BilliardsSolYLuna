
import { Table, Container, Row, Col, Button, Modal } from "react-bootstrap"
import PoolTableLogo from "../assets/images/pooltable.png"
import { useState, useEffect } from "react"
import OrderModal from "./OrderModal.jsx"
import API from "../utilities/dbOperations.js"
import "../assets/main.css"
import { TipPrompt } from "./TipPrompt.jsx"
const api = new API()
const PoolTable = ({ tableNumber, tableColor }) => {

       const [timeStart, setTimeStart] = useState(false);
       const [time, setTime] = useState(0)
       const [startTime, setStartTime] = useState("")
       const [showStartButton, setShowStartButton] = useState(true)
       const [showEndButton, setShowEndButton] = useState(false)
       const [endTime, setEndTime] = useState("")
       const [addOrderPrompt, setAddOrderPrompt] = useState(false)
       const [orderList, setOrderList] = useState([])
       const [orderListPrice, setOrderListPrice] = useState(0)
       const [tablePrice, setTablePrice] = useState(0)
       const [totalPrice, setTotalPrice] = useState(0)
       const [totalReceipt, showTotalReceipt] = useState(false)
       const [showModal, setShowModal] = useState(false)
       const [showPaidModal, setShowPaidModal] = useState(false);
       const [receiptID, setReceiptID] = useState("")
       const [selectedOrderID, setSelectedOrderID] = useState("")
       const [isTipPromptOpen, setIsTipPromptOpen] = useState(false)
       const [tip, setTip] = useState(null)

       async function handleAddPurchase(clientName, itemPrice, quantity, itemName) {
              setAddOrderPrompt(false)
              let orderDate = new Date()
              let formattedDate = orderDate.toLocaleString("en-US", { timeZone: "America/New_York" })
              let order = {
                     clientName: clientName,
                     receiptID: receiptID,
                     table: tableNumber,
                     quantity: quantity,
                     product: itemName,
                     price: itemPrice * quantity,
                     status: 'sin pagar',
                     date: formattedDate
              };
              setOrderList([...orderList, order]);
              await api.insertOrder(order)
       }
       const handleAddTip = (tip, totalPriceWithTip) => {
              try {
                     setIsTipPromptOpen(false)
                     setTotalPrice(totalPriceWithTip)
                     setTip(tip)
              } catch (e) {
                     return "Sorry! Could not update total! Error: " + e
              }

       }
       const calculateTotalPrice = () => {

              let h = Math.floor(time / 3600).toFixed(0);
              let m = Math.floor((time % 3600) / 60).toFixed(0);
              let s = (time % 60).toFixed(0);
              let total = 0;
              orderList.forEach((val) => {
                     if (val.status === "sin pagar") {
                            total += val.price;
                     }
              });
              setOrderListPrice(total)
              //Calculate the price of playing on the table and add it to the total.
              let tablePrice = (20 * h) + (20 / 60 * m) + (20 / 3600 * s);
              setTablePrice(tablePrice);
              let totalPrice = tablePrice + total;
              let salesTax = totalPrice * 0.08875;
              let totalPriceWithSales = (Math.round((totalPrice + salesTax) * 100) / 100).toFixed(2);
              setTotalPrice(totalPriceWithSales);
       }

       const handleTimerEndClick = () => {
              setTimeStart(false)
              setShowStartButton(false)
              setShowEndButton(false)
              let endDate = new Date()
              let hourTo12 = endDate.getHours();
              let am_pm = "am"
              if (endDate.getHours() > 12) {
                     hourTo12 = endDate.getHours() - 12;
                     am_pm = "pm"
              }
              setEndTime(hourTo12.toString().padStart(2, '0') + ":" + endDate.getMinutes().toString().padStart(2, '0') + ":" + endDate.getSeconds().toString().padStart(2, '0') + " " + am_pm)
              calculateTotalPrice()
              showTotalReceipt(true)
              setIsTipPromptOpen(true)
       }

       const handleTimerStartClick = async () => {
              setTimeStart(true)
              setShowEndButton(true)
              setShowStartButton(false)
              generateNewID()
       }
       const generateNewID = async () => {
              const newReceiptID = await api.generateNewReceiptID();
              setReceiptID(newReceiptID)
       }
       const handleOpenAddOrderModal = () => setAddOrderPrompt(true)

       const closeOrderModal = () => setAddOrderPrompt(false)

       const handleClearTable = () => {
              setShowStartButton(true)
              setShowEndButton(false)
              setAddOrderPrompt(false)
              setOrderList([])
              setStartTime("")
              setEndTime("")
              setReceiptID("")
              setSelectedOrderID("")
              showTotalReceipt(false)
              setTablePrice(0)
              setOrderListPrice(0)
              setTotalPrice(0)
              setTime(0)
              setTip(null)
       }

       useEffect(() => {
              let interval
              if (timeStart) {
                     setShowStartButton(false)
                     let startDate = new Date()
                     let startSeconds = startDate.getSeconds()
                     let hourTo12 = startDate.getHours();
                     let am_pm_time = "am"
                     if (startDate.getHours() > 12) {
                            hourTo12 = startDate.getHours() - 12;
                            am_pm_time = "pm"
                     }
                     setStartTime(hourTo12.toString().padStart(2, '0') + ":" + startDate.getMinutes().toString().padStart(2, '0') + ":" + startDate.getSeconds().toString().padStart(2, '0') + am_pm_time)
                     interval = setInterval(() => {
                            var elapsed = new Date().getTime() - startDate.getTime()
                            var currentTime = (startSeconds + elapsed) * 0.001
                            console.log(Math.round(currentTime))
                            setTime(Math.round(currentTime))

                     }, 1000)
              }
              else if (!timeStart) {
                     clearInterval(interval);
              }
              return () => clearInterval(interval)
       }, [timeStart])
       //Open/Close Paid modal refers to the update order status modal wheras the open and close modal refers to deleting the order entirely.
       const handleOpenPaidModal = (selectedOrderID) => {
              setShowPaidModal(true)
              setSelectedOrderID(selectedOrderID)
       }
       const handleClosePaidModal = () => setShowPaidModal(false)

       const handleOpenModal = (selectedOrderID) => {
              setShowModal(true)
              setSelectedOrderID(selectedOrderID)
       }

       const handleCloseModal = () => setShowModal(false)

       const handleMarkAsPaid = async () => {
              setShowPaidModal(false)
              await api.updateOrderAsPaid(receiptID, selectedOrderID)
              setSelectedOrderID("")
       }

       const handleDeleteOrder = async () => {
              setShowModal(false)
              await api.deleteOrder(receiptID, selectedOrderID)
              setSelectedOrderID("")
       }

       async function getAllReceiptOrders(receiptID) {
              const allReceiptOrders = await api.getOrdersByReceiptID(receiptID)
              if (allReceiptOrders) {
                     setOrderList(allReceiptOrders)
              }
              else {
                     setOrderList([])
              }
       }

       useEffect(() => {
              getAllReceiptOrders(receiptID)
       }, [receiptID, addOrderPrompt, selectedOrderID])

       return (
              <>
                     <Container >
                            <div className="pool-table-title" style={{ backgroundColor: tableColor }}>
                                   <span style={{ fontSize: 24 }}>  Mesa {tableNumber} </span>
                                   {showStartButton ? (
                                          <>
                                                 <Button variant={tableColor === "red" ? "danger" : tableColor === "blue" ? "primary" : "success"} onClick={handleTimerStartClick}> Comenzar tiempo</Button>
                                          </>
                                   ) : showEndButton ? (<Button variant={tableColor === "red" ? "danger" : tableColor === "blue" ? "primary" : "success"} onClick={handleTimerEndClick}> Terminar tiempo</Button>) : null}
                            </div>
                            <Container className="table-container" style={{ borderColor: tableColor }}>
                                   <Row>
                                          <Col>
                                                 <img src={PoolTableLogo} alt="Pool table logo" />
                                          </Col>
                                          <Col className="time-displays">
                                                 <div className="start-time-display">
                                                        <strong> Tiempo comenzado: </strong> {startTime}
                                                 </div>
                                                 <div className="current-time-display">
                                                        <strong> Duracion de tiempo: </strong>
                                                        {startTime ? (
                                                               <>
                                                                      <span> {("0" + Math.floor((time / 3600) % 60)).slice(-2)}:</span>
                                                                      <span> {("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
                                                                      <span> {("0" + Math.floor((time / 1) % 60)).slice(-2)}</span>
                                                               </>
                                                        ) : null}
                                                 </div>
                                                 <div className="end-time-display">
                                                        <strong> Tiempo terminado: </strong> {endTime}
                                                 </div>
                                          </Col>
                                   </Row>
                                   {receiptID ? (<p> ID: {receiptID} </p>) : null}
                                   <Table style={{ overflow: "scroll" }}>
                                          <thead>
                                                 <tr>
                                                        <th> ID </th>
                                                        <th> Fecha</th>
                                                        <th> Nombre de cliente</th>
                                                        <th> Cantidad</th>
                                                        <th> Producto</th>
                                                        <th> Precio</th>
                                                        <th> Estado</th>
                                                        <th> </th>
                                                 </tr>
                                          </thead>
                                          <tbody>
                                                 {orderList.map((val) => (
                                                        <tr key={val._id}>
                                                               <td>{val._id}</td>
                                                               <td>{val.date}</td>
                                                               <td>{val.clientName}</td>
                                                               <td>{val.quantity}</td>
                                                               <td>{val.product}</td>
                                                               <td>${val.price}</td>
                                                               <td style={{ color: val.status === "sin pagar" ? "red" : "green" }}> {val.status} </td>
                                                               <td> <Button variant="success" onClick={() => handleOpenPaidModal(val._id)}> Cancelar </Button> <Button variant="danger" onClick={() => handleOpenModal(val._id)}> Borrar </Button></td>
                                                        </tr>

                                                 ))}
                                          </tbody>
                                   </Table>
                                   {timeStart ? (
                                          <Button variant={tableColor === "red" ? "danger" : tableColor === "blue" ? "primary" : "success"} onClick={handleOpenAddOrderModal}> Anadir orden</Button>
                                   ) : null}
                                   {totalReceipt ? (
                                          <>
                                                 <div className="total-receipt-title" style={{ backgroundColor: tableColor }}> Recibo Total </div>
                                                 <Table>
                                                        <thead> </thead>
                                                        <tbody>
                                                               <tr> <td> Total de productos </td>        <td> ${orderListPrice.toFixed(2)}     </td> </tr>
                                                               <tr> <td> Total de mesa </td>             <td> ${tablePrice.toFixed(2)}         </td> </tr>
                                                               <tr> <td> Sales tax </td>                 <td> 8.875%                           </td> </tr>
                                                               {tip && (<tr> <td> Propina </td> <td> {tip} </td></tr>)}
                                                               <tr> <td> <strong> Total </strong>  </td> <td> <strong> ${totalPrice} </strong> </td> </tr>
                                                        </tbody>
                                                 </Table>
                                                 <TipPrompt isTipPromptOpen={isTipPromptOpen} totalPrice={totalPrice} tableColor={tableColor} handleAddTip={handleAddTip} />
                                                 <Button variant={tableColor === "red" ? "danger" : tableColor === "blue" ? "primary" : "success"} onClick={handleClearTable}> Limpiar mesa</Button>

                                          </>
                                   ) : null}
                                   <OrderModal isOpen={addOrderPrompt} handleAddPurchase={handleAddPurchase} close={closeOrderModal} currentReceiptID={null} isOtherReceipt={false}> </OrderModal>
                            </Container>
                     </Container>
                     <Modal show={showModal}>
                            <Modal.Header>
                                   <Modal.Title>¿Estás seguro?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                   <p>¿Estás seguro de que quieres borrar esta orden? ¡Esta acción es permanente!</p>
                            </Modal.Body>
                            <Modal.Footer>
                                   <Button variant="primary" onClick={handleCloseModal}>Cancelar</Button>
                                   <Button variant="danger" onClick={() => handleDeleteOrder()}>Borrar del todo</Button>
                            </Modal.Footer>
                     </Modal>
                     <Modal show={showPaidModal}>
                            <Modal.Header>
                                   <Modal.Title>¿Estás seguro?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                   <p>¿Estás seguro de que esta orden ha sido pagada? ¡Esta acción es permanente!</p>
                            </Modal.Body>
                            <Modal.Footer>
                                   <Button variant="primary" onClick={handleClosePaidModal}>Cancelar</Button>
                                   <Button variant="success" onClick={() => handleMarkAsPaid()}>Sí, está pagado</Button>
                            </Modal.Footer>
                     </Modal>
              </>
       )
}
export default PoolTable