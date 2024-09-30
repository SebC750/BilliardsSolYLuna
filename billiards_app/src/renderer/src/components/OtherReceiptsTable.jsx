import { Container, Table, Row, Col, Modal, Form, Button } from "react-bootstrap"
import "../assets/main.css"
import { useState, useEffect } from "react"
import { generateNewReceiptID, insertOrder } from "../utilities/dbOperations.js"
const OtherReceiptTable = () => {
  const [receiptList, updateReceiptList] = useState([])
  const [receiptName, setReceiptName] = useState("")
  const [showModal, setShowModal] = useState(false)

  const createNewReceipt = async () => {
    const newReceiptID = await generateNewReceiptID()
    receiptList.push({ receiptID: newReceiptID, receiptName: receiptName, orders: [] })
    setReceiptName("")
  }

  const handleReceiptNameChange = (e) => {
    setReceiptName(e.target.value)
  }
  
  const handleNewReceiptClick = () => {
    setShowModal(true)
  }

  return (
    <>
      <Container className="table-container" style={{ borderStyle: "solid", borderWidth: 2, borderColor: "orange", paddingBottom: 100 }}>
        <div className="receipt-history-title" style={{ backgroundColor: "orange", padding: 10, color: "white" }}>
          Otros Recibos
        </div>
        <Button variant="warning" onClick={handleNewReceiptClick}> Anadir recibo</Button>
        <Row>
          {receiptList.length > 0 ? (
            <Col>
              <Container md={4}>
                <Table>
                  <thead>
                    <tr>
                      <th> ID</th>
                      <th> Nombre de cliente</th>
                      <th> Cantidad</th>
                      <th> Producto</th>
                      <th> Precio</th>
                      <th> Fecha</th>
                      <th> Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipt.orders.map((order) => (
                      <tr key={order._id}>
                        <td> {order._id} </td>
                        <td> {order.clientName} </td>
                        <td> {order.quantity} </td>
                        <td> {order.product} </td>
                        <td> {order.price} </td>
                        <td> {order.date} </td>
                        <td> {order.status} </td>
                      </tr>

                    ))}
                  </tbody>
                </Table>
              </Container>
            </Col>
          ) : <p> No hay recibos disponibles </p>}
        </Row>
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
          <Button variant="warning" onClick={() => setShowModal(false)}> Cancelar</Button>
          <Button variant="warning" onClick={() => createNewReceipt()}> Anadir</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default OtherReceiptTable