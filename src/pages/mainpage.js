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
import Table1 from "./Table1.js"

import Table2 from "./Table2.js"
import Table3 from "./Table3.js"
import Navbar from "./navbar.js"
import { useState, useEffect } from "react"
import ItemArray from "./items.js"
const {ipcRenderer} = require("electron")


const MainPage = () => {
  const [itemList, setItemList] = useState(ItemArray)
  const [receiptModal, openReceiptModal] = useState(false)
  const closeModal = () =>{
    openReceiptModal(false)
  }
  const addReceipt = () =>{

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
                                            <label for="nameInput"> Nombre de recibo </label>
                                            <input type="number" class="form-control" id="nameInput"></input>
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
      
       

        
    </div>
  );
}
export default MainPage;