import { Table, Container, Row, Col, Button } from "react-bootstrap"
import PoolTableLogo from "../assets/images/pooltable.png"
import { useState, useEffect } from "react"
import OrderModal from "./OrderModal.jsx"
import { insertOrder, generateNewReceiptID } from "../utilities/dbOperations.js"
const PoolTable = ({ tableNumber, tableColor }) => {

       const [timeStart, setTimeStart] = useState(false);
       const [time, setTime] = useState(0)
       const [startTime, setStartTime] = useState("")
       const [showStartButton, setShowStartButton] = useState(true)
       const [showEndButton, setShowEndButton] = useState(false)
       const [endTime, setEndTime] = useState("")
       const [addOrderPrompt, setAddOrderPrompt] = useState(false)
       const [orderList, setOrderList] = useState([])
       const [tablePrice, setTablePrice] = useState(0)
       const [totalPrice, setTotalPrice] = useState(0)
       const [totalReceipt, showTotalReceipt] = useState(false)
       const [totalTimeElapsed, setTotalTimeElapsed] = useState("")
       
       
       async function handleAddPurchase(itemName, itemPrice, quantity, clientName) {
              setAddOrderPrompt(false)
              let orderDate = new Date()
              let orderDay = "" + orderDate.getDate()
              if (orderDate.getDate() < 10) {
                     orderDay = "0" + orderDate.getDate()
              }
              let dateString = (orderDate.getMonth() + 1) + "/" + orderDay + "/" + orderDate.getFullYear() + ", " + orderDate.getHours() + ":" + orderDate.getMinutes() + ":" + orderDate.getSeconds();
              let order = {
                     clientName: clientName,
                     table: tableNumber,
                     quantity: quantity,
                     product: itemName,
                     price: itemPrice * quantity,
                     status: 'sin pagar',
                     date: dateString
              };

              setOrderList([...orderList, order]);
              const response = await insertOrder(order)
       }

       const calculateTotalPrice = () => {
              let h = Math.floor(time / 3600).toFixed(0);
              let m = Math.floor((time % 3600) / 60).toFixed(0);
              let s = (time % 60).toFixed(0);

              let totalTimeElapsed = h.toString().padStart(2, '0') + " : " + m.toString().padStart(2, '0') + " : " + s.toString().padStart(2, '0');

              setTotalTimeElapsed(totalTimeElapsed);

              let total = 0;
              orderList.forEach((val) => {
                     total += val.price;
              });

              console.log(time);

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
       }

       const handleTimerStartClick = async () => {
              setTimeStart(true)
              setShowEndButton(true)
              setShowStartButton(false)
              
              setOrderList([])
       }

       const handleOpenAddOrderModal = () => {
              setAddOrderPrompt(true)
       }

       const closeOrderModal = () => {
              setAddOrderPrompt(false)
       }

       const handleClearTable = () => {
              setShowStartButton(true)
              setShowEndButton(false)
              setAddOrderPrompt(false)
              setOrderList([])
              setStartTime("")
              setEndTime("")
              showTotalReceipt(false)
              setTime(0)
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

       return (
              <>
                     <Container style={{ borderStyle: "solid", borderWidth: 2, borderColor: tableColor, paddingBottom: 100 }}>

                            <div style={{ backgroundColor: tableColor, padding: 10, color: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                   Mesa {tableNumber}
                                   {showStartButton ? (
                                          <>
                                                 <Button variant={tableColor === "red" ? "danger" : tableColor === "blue" ? "primary" : "success"} onClick={handleTimerStartClick}> Comenzar tiempo</Button>
                                          </>
                                   ) : showEndButton ? (<Button variant={tableColor === "red" ? "danger" : tableColor === "blue" ? "primary" : "success"} onClick={handleTimerEndClick}> Terminar tiempo</Button>) : null}

                            </div>
                            <Row>
                                   <Col>
                                          <img src={PoolTableLogo} alt="Pool table logo" />
                                   </Col>
                                   <Col>
                                          <div className="start-time-display">
                                                 Tiempo comenzado: {startTime}
                                          </div>
                                          <div className="current-time-display">
                                                 Duracion de tiempo:
                                                 {startTime ? (
                                                        <>
                                                               <span> {("0" + Math.floor((time / 3600) % 60)).slice(-2)}:</span>
                                                               <span> {("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
                                                               <span> {("0" + Math.floor((time / 1) % 60)).slice(-2)}</span>
                                                        </>
                                                 ) : null}

                                          </div>
                                          <div className="end-time-display">
                                                 Tiempo terminado: {endTime}
                                          </div>
                                   </Col>
                            </Row>

                            <Table style={{ overflow: "scroll" }}>
                                   <thead>
                                          
                                          <tr>
                                                 <th> Fecha</th>
                                                 <th> Nombre de cliente</th>
                                                 <th> Cantidad</th>
                                                 <th> Producto</th>
                                                 <th> Precio</th>
                                                 <th> Estado</th>
                                          </tr>

                                   </thead>
                                   <tbody>
                                          {orderList.map((val, index) => (
                                                 <tr key={index}>
                                                        <td>{val.date}</td>
                                                        <td>{val.clientName}</td>
                                                        <td>{val.quantity}</td>
                                                        <td>{val.product}</td>
                                                        <td>{val.price}</td>
                                                        <td>{val.status}</td>
                                                 </tr>
                                          ))}
                                   </tbody>
                                   {timeStart ? (
                                          <Button variant={tableColor === "red" ? "danger" : tableColor === "blue" ? "primary" : "success"} onClick={handleOpenAddOrderModal}> Anadir orden</Button>
                                   ) : null}

                            </Table>
                            {totalReceipt ? (
                                   <>
                                          <div >

                                                 <strong style={{ padding: 10 }}> Tiempo de Mesa {totalTimeElapsed}: ${tablePrice.toFixed(2)} </strong>
                                                 <strong> Sales tax: 8.875%</strong>
                                                 <strong> Total: ${totalPrice}  </strong>

                                          </div>
                                          <Button variant={tableColor === "red" ? "danger" : tableColor === "blue" ? "primary" : "success"} onClick={handleClearTable}> Limpiar mesa</Button>
                                   </>

                            ) : null}

                            <OrderModal isOpen={addOrderPrompt} handleAddPurchase={handleAddPurchase} close={closeOrderModal}> </OrderModal>
                     </Container>
              </>
       )
}
export default PoolTable