import React from "react"
import {
  Card,
  Button,
  Modal,
  Form,
  Col,
  Row,
  Container,
  Jumbotron,
} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown"
import Table1 from "./Table1.js"

import Table2 from "./Table2.js"
import Table3 from "./Table3.js"
import Navbar from "./navbar.js"
import { useState, useEffect } from "react"
import ItemArray from "./items.js"




const MainPage = () => {
  const [itemList, setItemList] = useState(ItemArray)
  const [receiptModal, openReceiptModal] = useState(false)
  const [orderList, addOrderList] = useState([])
  const [openReceiptList, showOpenReceiptList] = useState(false)
  const [addItemPrompt, setAddItemPrompt] = useState(false)
  const [itemSelection, setItemSelection] = useState([{ in: "", p: 0 }])
  const addOrder = () =>{
    setAddItemPrompt(false)
    /*
        var quantityNum = document.getElementById("quantityInput").value;
        var orderId = Math.floor(Math.random() * 10000)+1000;
        console.log(orderId)
        var name = document.getElementById("nameInput").value
        console.log(orderId)
    */    
        console.log("hello!")
  }
  const closeAddOrderModal = () =>{
    setAddItemPrompt(false)
  }
  const closeModal = () =>{
    openReceiptModal(false)
  }
  
 
  const addReceipt = () =>{
    var name = document.getElementById("nameInput").value
    if(orderList.length < 1){
       showOpenReceiptList(true)
    }
    var orderDate = new Date()
    orderList.push({name: name, date: orderDate.getDate(), order: []})
    console.log(orderList)
    openReceiptModal(false)
  }
  useEffect(() =>{
    
})
  return (
    <div>
     
      <Navbar></Navbar>
     
      <div class="tables">
          <div class="table1">
            <div class="row">
              <div class="col-md">
              <Table2 data={itemList}></Table2>
              <Table1 data={itemList}></Table1>
              </div>
              <div class="col-md">
              <Table3 data={itemList}></Table3>
              <div class="other-receipt-title">
              <h3> Otros Recibos </h3> 
              </div>
              <div class="other-receipt-body">
              {openReceiptList ? (  
                 
                   <div align="center">
                    {orderList.map((val) =>(
                  <div class="table">
                  
                      <h3> {val.name} </h3>
                    
                      
                      <thead>
                        <tr>
                                            <th scope="col"> ID</th>
                                            <th scope="col"> Unidades</th>
                                            <th scope="col"> Producto</th>
                                            <th scope="col"> Precio</th>
                        </tr>
                        
                      </thead>
                      <tbody>
                       
                        
                      
                      </tbody>
                      <button type="button" class="btn btn-primary" onClick={() => setAddItemPrompt(true)}> Anadir Compra </button>
                  </div>
                  ))}
                </div>
              
            ):<p> No hay recibos activos en este momento. </p>}
              
              <button type="button" class="btn btn-primary" onClick={() => openReceiptModal(true)}> Agregar nuevo recibo </button>
              {receiptModal ? (
                <div> 
                  <Modal
                            show={true}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered

                        >
                            <Modal.Header >
                                <Modal.Title id="contained-modal-title-vcenter"> Anadir nuevo recibo</Modal.Title>

                            </Modal.Header>
                            <Modal.Body className="px-5">
                                <div class="form-group">
                                    <div class="form-row">
                                        <div class="col">
                                            
                                       
                                        </div>
                                        <div class="col">
                                            <label htmlFor="nameInput"> Nombre de recibo </label>
                                            <input type="text" class="form-control" id="nameInput"></input>
                                        </div>
                                    </div>
                                </div>

                            </Modal.Body>
                            <Modal.Footer>
                                <button type="button" class="btn btn-primary" onClick={() => closeModal()}> Cancelar orden </button>
                                <button type="button" class="btn btn-primary" onClick={() => addReceipt()}> Ingresar </button>

                            </Modal.Footer>
                        </Modal>
                  </div>
              ):null}
              </div>
              </div>
            </div>
            
          </div>
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
                                                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
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
                                                    
                                                </div>
                                            </div>
                                        </div>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button type="button" class="btn btn-primary" onClick={() => closeAddOrderModal()}> Close </button>
                                        <button type="button" class="btn btn-primary" onClick={() => addOrder()}> Submit </button>

                                    </Modal.Footer>
                                </Modal>
                            </div>
                        ) : null}
      
    </div>
  );
}
export default MainPage;