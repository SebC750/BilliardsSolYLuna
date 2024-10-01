import { Container, Table, Row, Col, Modal, Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { generateNewReceiptID, insertOrder, deleteOrder, updateOrderAsPaid, deleteAllOrdersFromReceipt } from "../utilities/dbOperations.js"
import OrderModal from "./OrderModal.jsx"
import '../assets/main.css'
const OtherReceiptTable = () => {
  const [receiptList, updateReceiptList] = useState([])
  const [receiptName, setReceiptName] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [addOrderPrompt, setAddOrderPrompt] = useState(false)
  const [orderListPrice, setOrderListPrice] = useState(0)
  const [showReceiptTotal, setShowReceiptTotal] = useState(false)
  const [selectedReceiptID, setSelectedReceiptID] = useState("")
  async function addOrderToReceipt(receiptID, itemName, itemPrice, quantity) {
    setAddOrderPrompt(false)
    const receiptToAdd = receiptList.find((id) => id.receiptID === receiptID)
    console.log(receiptToAdd)
    let orderDate = new Date()
    let formattedDate = orderDate.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, '');

    let order = {
      clientName: receiptToAdd.receiptName,
      receiptID: receiptToAdd.receiptID,
      table: 'mesa normal',
      quantity: quantity,
      product: itemName,
      price: itemPrice * quantity,
      status: 'sin pagar',
      date: formattedDate
    };  
    receiptToAdd.orders.push(order)
    console.log(receiptList)
    await insertOrder(order)
  }

  const removeOrderFromReceipt = async (receiptID, orderID) => {
    const getReceipt = receiptList.filter((id) => id.receiptID !== receiptID)
    const orderToRemove = getReceipt.orders.find((id) => id.orderID === orderID)
    await deleteOrder(orderToRemove.orderID)
  }

  const markOrderAsPaid = async (receiptID, orderID) => {
    const getReceipt = receiptList.filter((id) => id.receiptID !== receiptID)
    const orderToRemove = getReceipt.orders.find((id) => id.orderID === orderID)
    await markOrderAsPaid(orderToRemove.orderID)
  }
  const calculateTotal = (receiptID) => {     
       const getReceipt = receiptList.find((id) => id.receiptID === receiptID)
       let total = 0
       getReceipt.orders.map((val) => {
          let orderPrice = val.quantity * val.price
          total += orderPrice
       })
       showReceiptTotal(true)
       setOrderListPrice(total)
  }

  const clearReceipt = (receiptID) => {
       const updatedArray = receiptList.filter((id) => id.receiptID === receiptID)
       setReceiptList(...receiptList, updatedArray)
  }

  const closeOrderModal = () => setAddOrderPrompt(false)

  const handleCloseModal = () => setShowModal(false)

  const createNewReceipt = async () => {
    setShowModal(false)
    const newReceiptID = await generateNewReceiptID()
    receiptList.push({ receiptID: newReceiptID, receiptName: receiptName, orders: [] })
    console.log(receiptList)
    setReceiptName("")
  }

  const handleReceiptNameChange = (e) => {
    setReceiptName(e.target.value)
  }

  const handleNewReceiptClick = () => {
    setShowModal(true)
  }

  const handleEraseReceiptClick = async (receiptID) => {
    const receiptToRemove = receiptList.filter((id) => id.receiptID !== receiptID)
    await deleteAllOrdersFromReceipt(receiptToRemove.receiptID)
    clearReceipt(receiptID)
  }
  const handleFinishReceiptClick = (receiptID) => {
      calculateTotal(receiptID)
  }
  const handleAddPurchasePrompt = (receiptID) => {
    setAddOrderPrompt(true)
    setSelectedReceiptID(receiptID)
  }
  return (
    <>
      <Container >
        <div className="other-receipts-title" >
          Otros Recibos
          <Button variant="warning" onClick={handleNewReceiptClick} className="billiards-button"> Anadir recibo</Button>
        </div>
        <Container className="other-receipts-table-container">
          <Row>
            {receiptList.length > 0 ? (
              <>
                {receiptList.map((val) => (
                  <>
                    <Col md={4}>
                      <Container style={{ padding: 20 }}>
                        <h2> {val.receiptName}</h2>

                        <Table>
                          <thead>
                            <tr>
                              
                              <th> Cantidad</th>
                              <th> Producto</th>
                              <th> Precio</th>
                              <th> Fecha</th>
                              <th> Estado</th>
                              <th> </th>
                              <th> </th>
                            </tr>
                          </thead>
                          <tbody>
                            {val.orders.map((order, index) => (
                              <tr key={index}>
                                
                                <td> {order.quantity} </td>
                                <td> {order.product} </td>
                                <td> {order.price} </td>
                                <td> {order.date} </td>
                                <td style={{ color: order.status === "sin pagar" ? "red" : "green" }}> {order.status} </td>
                                <td> <Button variant="danger" onClick={() => removeOrderFromReceipt(val.receiptID, order._id)}> Borrar </Button></td>
                                <td> <Button variant="success" onClick={() => markOrderAsPaid(val.receiptID, order._id)}> Cancelar </Button></td>
                              </tr>

                            ))}
                          </tbody>
                          {showReceiptTotal ?  (
                                          <>
                                                 <div className="total-receipt-title" style={{backgroundColor: tableColor}}> Recibo Total </div>
                                                 <Table>
                                                        <thead> </thead>
                                                        <tbody>
                                                               <tr> <td> Sales tax </td>                 <td> 8.875%                                          </td> </tr>    
                                                               <tr> <td> <strong> Total </strong> </td>  <td> <strong> ${orderListPrice.toFixed(2)} </strong> </td> </tr>                                                                
                                                                                                                        
                                                        </tbody>
                                                 </Table>
                                                 
                                          </>
                                   ) : null}
                          
                        </Table>
                        <Button variant="warning" onClick={() => handleAddPurchasePrompt(val.receiptID)}> Anadir orden </Button>
                       {!showReceiptTotal ? (<Button variant="warning" onClick={() => handleEraseReceiptClick(val.receiptID)}> Borrar recibo </Button>): <Button variant="warning" onClick={() => handleFinishReceiptClick(val.receiptID)}> Terminar recibo</Button>} 
                        
                      </Container>
                    </Col>
                  </>
                ))}
              </>
            ) : <p> No hay recibos disponibles </p>}
          </Row>
        </Container>
      </Container>
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title> Ingresar nuevo recibo </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label htmlFor="quantityInput">Nombre de Recibo</Form.Label>
              <Form.Control type="text" id="receiptNameInput" onChange={(e) => handleReceiptNameChange(e)}></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCloseModal}> Cancelar</Button>
          <Button variant="warning" onClick={() => createNewReceipt()}> Anadir</Button>
        </Modal.Footer>
      </Modal>
      <OrderModal isOpen={addOrderPrompt} handleAddPurchase={addOrderToReceipt} close={closeOrderModal} currentReceiptID={selectedReceiptID} isOtherReceipt={true}> </OrderModal>
    </>
  )
}
export default OtherReceiptTable