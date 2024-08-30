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
    const [orderList, setOrderList] = useState([])
    const [openReceiptList, showOpenReceiptList] = useState(false)
    const [addItemPrompt, setAddItemPrompt] = useState(false)
    const [itemSelection, setItemSelection] = useState([{ in: "", p: 0 }])
    const [selectedName, setSelectedName] = useState("")
    const [errorMessage, showErrorMessage] = useState(false)
    const openAddOrderPrompt = (name) =>{
        setAddItemPrompt(true)
        setSelectedName(name)
    }
    async function archiveOrderToDB(data){
    const message = await database.insertReceipt(data)
    console.log(message)
    }

    async function removeOrderFromDB(data){
        const message = await database.deleteReceipt(data)
        console.log(message)
    }
    const addOrder = () => {
        setAddItemPrompt(false)
        var quantityNum = document.getElementById("quantityInput").value;
        var orderId = Math.floor(Math.random() * 1000000)+1000;
        console.log(orderId)
        var orderDate = new Date()
        var orderDay = ""+orderDate.getDate()
        
        if(orderDate.getDate() < 10)
        {
            orderDay = "0"+orderDate.getDate()
        }
        var dateString = (orderDate.getMonth()+1)+"/"+orderDay+"/"+orderDate.getFullYear();
        
        let nameArray = orderList.filter(x => x.name === selectedName)
        {nameArray.map((val) =>  (
            val.order.push({ id: orderId, quantity: quantityNum, item: itemSelection[0].in, price: itemSelection[0].p * quantityNum,  date: dateString}),
            archiveOrderToDB({ordername: val.name, quantity: quantityNum, product: itemSelection[0].in, price: itemSelection[0].p * quantityNum, status: "sin pagar", date: dateString})   
                ))}
        setItemSelection([{ in: "", p: 0 }])
        setSelectedName("")
    }
    
    const removeItem = (id, name) =>{
        console.log("name",name)
        console.log("id",id)
        const newList = orderList.map((val) => {
            return{
                ...val,
                order: val.order.filter(x => x.id !== id)
            }
        })
        removeOrderFromDB(id)
        setOrderList(newList)
}
    const closeAddOrderModal = () => {
        setAddItemPrompt(false)
    }
    const closeModal = () => {
        openReceiptModal(false)
    }

    const removeReceipt = (value) =>{
        setOrderList(deleteItem =>{
            return deleteItem.filter(i => i.name !== value)
         })
    }
    const addReceipt = () => {
        var name = document.getElementById("nameInput").value
        if (orderList.length < 1) {
            showOpenReceiptList(true)
        }
        if(name.length < 1){
            showErrorMessage(true)
            
        }
        else {
        showErrorMessage(false)
        orderList.push({ name: name, order: [] })
        console.log(orderList)
        openReceiptModal(false)
        }
    }
    
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
                                        {orderList.map((val) => (
                                            <div class="other-receipt-borders">
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
                                                <>
                                                    {val.order.map((x) => (

                                                        <tr key={x.id}>
                                                            <td> {x.id} </td>
                                                            <td> {x.quantity} </td>
                                                            <td> {x.item}</td>
                                                            <td> {x.price}</td>
                                                            <button type="button" class="btn btn-success" onClick={()=> removeItem(x.id, val.name)}> Cancelar </button>
                                                        </tr>
                                                    ))}

                                                </>
                                                </tbody>
                                                <button type="button" class="btn btn-primary" onClick={() => openAddOrderPrompt(val.name)}> Anadir Compra </button>
                                                <button type="button" class="btn btn-warning" onClick={() => removeReceipt(val.name)}> Remover recibo</button>
                                            </div>
                                            </div>
                                        ))}
                                        
                                    </div>

                                ) : <p> No hay recibos activos en este momento. </p>}

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
                                                            <label htmlFor="nameInput" style={{fontSize: "20px"}}> Nombre de recibo </label>
                                                            {errorMessage ? (
                                                                <p style={{color: "red"}}> Por favor ingrese un nombre. </p>
                                                            ):null}
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
                                ) : null}
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
                            <Modal.Title id="contained-modal-title-vcenter"> Anadir Compra para {selectedName}</Modal.Title>

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
                                    <p> {itemSelection[0].in}</p>
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