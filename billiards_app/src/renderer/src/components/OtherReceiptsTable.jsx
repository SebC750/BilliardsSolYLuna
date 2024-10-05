import { Container, Table, Row, Col, Modal, Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import API from "../utilities/dbOperations.js"
import OrderModal from "./OrderModal.jsx"
import '../assets/main.css'
//Section including other receipts not related to the pool tables. Some people don't want to play but just drink.
const api = new API();
const OtherReceiptTable = () => {
  const [receiptList, updateReceiptList] = useState([])
  const [receiptName, setReceiptName] = useState("")
  const [showNewReceiptModal, setShowNewReceiptModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showPaidModal, setShowPaidModal] = useState(false)
  const [addOrderPrompt, setAddOrderPrompt] = useState(false)
  const [showReceiptTotal, setShowReceiptTotal] = useState(false)
  const [selectedReceiptID, setSelectedReceiptID] = useState("")
  const [selectedOrderDate, setSelectedOrderDate] = useState("")

  async function addOrderToReceipt(receiptID, itemName, itemPrice, quantity) {
    setAddOrderPrompt(false)
    const receiptToAdd = receiptList.find((id) => id.receiptID === receiptID)
    //The date is formatted in localeString because the establishment is in NYC EST. The time needs to reflect that.
    let orderDate = new Date()
    let formattedDate = orderDate.toLocaleString("en-US", { timeZone: "America/New_York" })
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
    //Add orders first to the receipt object and then to the database to keep the order on record.
    receiptToAdd.orders.push(order)
    await api.insertOrder(order)
  }

  const removeOrderFromReceipt = async () => {
    setShowModal(false)
    updateReceiptList((prevList) => {
      return prevList.map((receipt) => {
        if (receipt.receiptID === selectedReceiptID) {
          const updatedOrders = receipt.orders.filter((order) => order.date !== selectedOrderDate);
          return { ...receipt, orders: updatedOrders };
        }
        return receipt;
      });
    })
    await api.deleteOrderByDate(selectedReceiptID, selectedOrderDate)
    setSelectedOrderDate("")
    setSelectedReceiptID("")
  }

  const markOrderAsPaid = async () => {
    setShowPaidModal(false)
    updateReceiptList((prevList) => {
      return prevList.map((receipt) => {
        if (receipt.receiptID === selectedReceiptID) {
          const updatedOrders = receipt.orders.map((order) => {
            if (order.date === selectedOrderDate) {
              return { ...order, status: 'cancelado' };
            }
            return order;
          });
          return { ...receipt, orders: updatedOrders };
        }
        return receipt;
      });
    })
    await api.updateOrderAsPaidByDate(selectedReceiptID, selectedOrderDate)
    setSelectedOrderDate("")
    setSelectedReceiptID("")
  }

  const calculateTotal = (receiptID) => {
    updateReceiptList((prevList) => {
      return prevList.map((receipt) => {
        if (receipt.receiptID === receiptID) {
          let total = 0;
          receipt.orders.forEach((val) => {
            //Should only charge for orders not marked as paid yet. Sometimes, people pay in advance.
            if (val.status === "sin pagar") {
              total += val.price;
            }
          });
          let salesTax = total * 0.08875;
          let totalPriceWithSales = (Math.round((total + salesTax) * 100) / 100).toFixed(2);

          return { ...receipt, showReceiptTotal: true, orderListPrice: totalPriceWithSales };
        }
        return receipt;
      });
    });
  }

  const clearReceipt = (receiptID) => {
    const updatedArray = receiptList.filter((id) => id.receiptID !== receiptID)
    updateReceiptList(updatedArray)
    setShowReceiptTotal(false)
  }

  const closeOrderModal = () => setAddOrderPrompt(false)
  //The receiptList array holds receipts each having their ID, name and their own list of orders.
  const createNewReceipt = async () => {
    setShowNewReceiptModal(false)
    const newReceiptID = await api.generateNewReceiptID()
    receiptList.push({
      receiptID: newReceiptID,
      receiptName: receiptName,
      orders: [],
      showReceiptTotal: false,
      orderListPrice: 0
    })
    setReceiptName("")
  }

  const handleReceiptNameChange = (e) => {
    setReceiptName(e.target.value)
  }

  const handleNewReceiptClick = () => {
    setShowNewReceiptModal(true)
  }
  //Sometimes, people might not want to drink and that might not be known until after the receipt is created. Receipts can be deleted without invoices.
  const handleEraseReceiptClick = async (receiptID) => {
    const receiptToRemove = receiptList.find((id) => id.receiptID === receiptID)
    await api.deleteAllOrdersFromReceipt(receiptToRemove.receiptID)
    console.log("Clearing receipt")
    clearReceipt(receiptID)
  }
   //For when the user wants to print out the final invoice.
  const handleFinishReceiptClick = (receiptID) => {
    calculateTotal(receiptID)
  }

  const handleAddPurchasePrompt = (receiptID) => {
    setAddOrderPrompt(true)
    setSelectedReceiptID(receiptID)
  }

  const handleDeleteOrder = (receiptID, orderDate) => {
    setSelectedOrderDate(orderDate);
    setSelectedReceiptID(receiptID)
    setShowModal(true);
  }
  const handleMarkAsPaid = (receiptID, orderDate) => {
    console.log(receiptID)
    console.log(orderDate)
    setSelectedOrderDate(orderDate)
    setSelectedReceiptID(receiptID)

    setShowPaidModal(true);
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
                    <Col xs={6}>
                      <Container style={{ padding: 20 }}>
                        <h2> {val.receiptName}</h2>
                        <p> ID: {val.receiptID}</p>
                        <Table>
                          <thead>
                            <tr>

                              <th> Cantidad</th>
                              <th> Producto</th>
                              <th> Precio</th>
                              <th> Fecha</th>
                              <th> Estado</th>
                              <th> </th>

                            </tr>
                          </thead>
                          <tbody>
                            {val.orders.map((order, index) => (
                              <tr key={index}>

                                <td> {order.quantity} </td>
                                <td> {order.product} </td>
                                <td> ${order.price} </td>
                                <td> {order.date} </td>
                                <td style={{ color: order.status === "sin pagar" ? "red" : "green" }}> {order.status} </td>
                                
                                  <td> <Button variant="danger" onClick={() => handleDeleteOrder(val.receiptID, order.date)}>
                                    Borrar
                                  </Button>
                                    {order.status === "sin pagar" ? (<Button variant="success" onClick={() => handleMarkAsPaid(val.receiptID, order.date)}> Cancelar </Button>) : null}
                                  </td>
                               

                              </tr>

                            ))}
                          </tbody>

                          {val.showReceiptTotal ? (
                            <>
                              <div className="total-receipt-title" style={{ backgroundColor: 'orange' }}> Recibo Total </div>
                              <Table>
                                <thead> </thead>
                                <tbody>
                                  <tr> <td> Sales tax                </td> <td> 8.875%                                   </td> </tr>
                                  <tr> <td> <strong> Total </strong> </td> <td> <strong> ${val.orderListPrice} </strong> </td> </tr>
                                </tbody>
                              </Table>
                            </>
                          ) : null}


                        </Table>
                        <Button variant="warning" style={{ marginRight: 10 }} onClick={() => handleAddPurchasePrompt(val.receiptID)}> Anadir orden </Button>
                         
                        {!val.showReceiptTotal ? (
                          <>
                            <Button variant="warning" style={{ marginRight: 10 }} onClick={() => handleFinishReceiptClick(val.receiptID)}> Terminar recibo</Button>
                            <Button variant="warning" style={{ marginRight: 10 }} onClick={() => handleEraseReceiptClick(val.receiptID)}> Borrar recibo </Button>
                          </>) : <Button variant="warning" style={{ marginRight: 10 }} onClick={() => clearReceipt(val.receiptID)}> Limpiar Recibo </Button>}

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
        show={showNewReceiptModal}
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
          <Button variant="warning" onClick={() => setShowNewReceiptModal(false)}> Cancelar</Button>
          <Button variant="warning" onClick={() => createNewReceipt()}> Anadir</Button>
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
          <Button variant="primary" onClick={() => setShowPaidModal(false)}>Cancelar</Button>
          <Button variant="success" onClick={() => markOrderAsPaid()}>Sí, está pagado</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>¿Estás seguro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que quieres borrar esta orden? ¡Esta acción es permanente!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={() => removeOrderFromReceipt()}>Borrar del todo</Button>
        </Modal.Footer>
      </Modal>
      <OrderModal isOpen={addOrderPrompt} handleAddPurchase={addOrderToReceipt} close={closeOrderModal} currentReceiptID={selectedReceiptID} isOtherReceipt={true}> </OrderModal>
    </>
  )
}
export default OtherReceiptTable