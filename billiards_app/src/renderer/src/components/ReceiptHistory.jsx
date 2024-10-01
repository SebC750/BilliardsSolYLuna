import { Table, Container, Button, Modal } from "react-bootstrap";
import Searchbar from "./Searchbar.jsx";
import { getAllOrders, deleteOrder, updateOrderAsPaid } from "../utilities/dbOperations.js";
import { useState, useEffect } from "react";
import "../assets/main.css";
import PageNavigator from "./PageNavigator.jsx";

const ReceiptHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPaidModal, setShowPaidModal] = useState(false);
  const [orderHistory, updateOrderHistory] = useState([]);
  const [selectedOrderID, setSelectedOrderID] = useState("");
  const [totalRecords, setTotalRecords] = useState(0); 
  const [offset, setOffset] = useState(0); 
  const limit = 10; 

  async function getAllData(offset, limit) {
    const allData = await getAllOrders(offset, limit); 
    console.log(allData)
    if (allData && allData.orders) {
      updateOrderHistory(allData.orders); 
      setTotalRecords(allData.totalCount); 
    }
  }
  const handleDeleteOrder = (orderID) =>{
     setSelectedOrderID(orderID);
     setShowModal(true);
  }
  const handleMarkAsPaid = (orderID) =>{
     setSelectedOrderID(orderID)
     setShowPaidModal(true);
  }
  const handlePageClick = (pageNumber) => {
    let newOffset = (pageNumber - 1) * limit;
    setOffset(newOffset);
  };

  const handleRemoveOrder = async () => {
    await deleteOrder(selectedOrderID);
    setShowModal(false);
    setSelectedOrderID("");
    getAllData(offset, limit); 
  };
  const handleGetAllDataAgain = (allData) =>{
    if (allData && allData.orders) {
      updateOrderHistory(allData.orders); 
      setTotalRecords(allData.totalCount); 
    }
  }
  const handleMarkAsPaidOrder = async () => {
    await updateOrderAsPaid(selectedOrderID);
    setShowPaidModal(false);
    setSelectedOrderID("");
    getAllData(offset,limit); 
  };
  
  useEffect(() => {
    getAllData(offset, limit);
  }, [offset]);

  return (
    <>
      <Container>
        <div className="receipt-history-title">Historial de recibos</div>
        <Container className="receipt-history-container">
          <div className="search-bar">
            <Searchbar handleGetByCategory={(allData) => handleGetAllDataAgain(allData)} />
          </div>

          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre de cliente</th>
                <th>Mesa</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Fecha de compra</th>
                <th>Estado</th>
                
              </tr>
            </thead>
            <tbody>
              {orderHistory.length > 0 ? (
                orderHistory.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.clientName}</td>
                    <td>{order.table}</td>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>${order.price}</td>
                    <td>{order.date}</td>
                    <td style={{ color: order.status === "sin pagar" ? "red" : "green" }}>
                      {order.status}
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteOrder(order._id)}>
                        Borrar
                      </Button>
                      <Button variant="success" onClick={() => handleMarkAsPaid(order._id)}>
                        Cancelar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No hay órdenes disponibles</td>
                </tr>
              )}
            </tbody>
          </Table>
      
          <PageNavigator
            limit={limit}
            totalRecords={totalRecords} 
            handlePageClick={handlePageClick}
          />
          <Button style={{marginTop: 20, marginLeft: "46%"}} onClick={() => getAllData()}> Refrescar </Button>
        </Container>
      </Container>
  
      <Modal show={showPaidModal}>
        <Modal.Header>
          <Modal.Title>¿Estás seguro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que esta orden ha sido pagada? ¡Esta acción es permanente!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowPaidModal(false)}>Cancelar</Button>
          <Button variant="success" onClick={handleMarkAsPaidOrder}>Sí, está pagado</Button>
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
          <Button variant="danger" onClick={handleRemoveOrder}>Borrar del todo</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReceiptHistory;
