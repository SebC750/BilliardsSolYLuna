import { Table, Container, Button, Modal } from "react-bootstrap";
import Searchbar from "./Searchbar.jsx";
import API from "../utilities/dbOperations.js";
import { useState, useEffect } from "react";
import "../assets/main.css";
import PageNavigator from "./PageNavigator.jsx";
//The receipt history renders a table of past invoices and information such as date of purchase, status of payment, client names etc.
const api = new API()
const LIMIT_OF_DATA_FOR_EACH_PAGE = 10;
const ReceiptHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPaidModal, setShowPaidModal] = useState(false);
  const [orderHistory, updateOrderHistory] = useState([]);
  const [selectedOrderID, setSelectedOrderID] = useState("");
  const [selectedReceiptID, setSelectedReceiptID] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [offset, setOffset] = useState(0);
  //Get all the data including the orders and the total number of records.
  async function getAllData(offset, limit) {
    const allData = await api.getAllOrders(offset, limit);
    if (allData && allData.orders) {
      updateOrderHistory(allData.orders);
      setTotalRecords(allData.totalCount);
    }
  }
  const handleDeleteOrder = (receiptID, orderID) => {
    setSelectedOrderID(orderID);
    setSelectedReceiptID(receiptID)
    setShowModal(true);
  }
  const handleMarkAsPaid = (receiptID, orderID) => {
    setSelectedOrderID(orderID)
    setSelectedReceiptID(receiptID)
    setShowPaidModal(true);
  }
  //Handles page clicks to cause a reload of the data with a new offset.
  const handlePageClick = (pageNumber) => {
    let newOffset = (pageNumber - 1) * LIMIT_OF_DATA_FOR_EACH_PAGE;
    setOffset(newOffset);
  };

  const handleRemoveOrder = async () => {
    await api.deleteOrder(selectedReceiptID, selectedOrderID);
    setShowModal(false);
    setSelectedOrderID("");
    getAllData(offset, LIMIT_OF_DATA_FOR_EACH_PAGE);
  };
  //This order receives order results from the searchbar component and updates the order list.
  const handleGetDataByCategory = (allData) => {
    if (allData && allData.orders) {
      updateOrderHistory(allData.orders);
      setTotalRecords(allData.totalCount);
    }
  }
  //Update status of payment as paid when people pay for their orders.
  const handleMarkAsPaidOrder = async () => {
    await api.updateOrderAsPaid(selectedReceiptID, selectedOrderID);
    setShowPaidModal(false);
    setSelectedOrderID("");
    getAllData(offset, LIMIT_OF_DATA_FOR_EACH_PAGE);
  };

  useEffect(() => {
    getAllData(offset, LIMIT_OF_DATA_FOR_EACH_PAGE);
  }, [offset]);

  return (
    <>
      <Container>
        <div className="receipt-history-title">Historial de recibos</div>
        <Container className="receipt-history-container">
          <div className="search-bar">
            <Searchbar handleGetByCategory={(allData) => handleGetDataByCategory(allData)} />
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
                      <Button variant="danger" onClick={() => handleDeleteOrder(order.receiptID, order._id)}>
                        Borrar
                      </Button>
                      <Button variant="success" onClick={() => handleMarkAsPaid(order.receiptID, order._id)}>
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
            limit={LIMIT_OF_DATA_FOR_EACH_PAGE}
            totalRecords={totalRecords}
            handlePageClick={handlePageClick}
          />
          {/* Refresh button for the user to update the list manually after orders are added.*/}
          <Button size={"lg"} style={{ marginTop: 20, width: "100%", marginBottom: 10 }} onClick={() => getAllData(0, 10)}> Refrescar </Button>
        </Container>
      </Container>
      {/* Modals for warning user about permanent deletions and status updates. Will modularize this further in the future. */}
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
