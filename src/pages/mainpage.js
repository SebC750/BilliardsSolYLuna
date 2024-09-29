import React from "react"
import {

    Modal,

} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown"
import Table1 from "./Table1.js"
import ReceiptHistory from "./receiptHistory.js"
import Table2 from "./Table2.js"
import Table3 from "./Table3.js"
import Navbar from "./navbar.js"
import { useState, useEffect } from "react"
import ItemArray from "./items.js"
import { otherReceiptIDGenerator } from "./functions.js";

const MainPage = () => {
    const [tableData, setTableData] = useState([])
    const [itemList, setItemList] = useState(ItemArray)
    const [receiptModal, openReceiptModal] = useState(false)
    const [orderList, setOrderList] = useState([])
    const [openReceiptList, showOpenReceiptList] = useState(false)
    const [addItemPrompt, setAddItemPrompt] = useState(false)
    const [itemSelection, setItemSelection] = useState([{ in: "", p: 0 }])
    const [selectedName, setSelectedName] = useState("")
    const [errorMessage, showErrorMessage] = useState(false)
    const [dataChanged, setDataChanged] = useState(false)


    useEffect(() => {
        getData();
    }, []);


    useEffect(() => {
        getData();
    }, [dataChanged]);
    const openAddOrderPrompt = (name) => {
        setAddItemPrompt(true)
        setSelectedName(name)
    }
    async function archiveOrderToDB(data) {
        const message = await database.insertReceipt(data)
        console.log(message)
        setDataChanged(true);
    }
    async function getData() {
        const message = await database.getAll()
        console.log(message)
        setTableData(message);
    }

    async function removeOrderFromDB(id, section, name) {
        const message = await database.deleteReceiptFromOtherReceipts(id,section,name)
        console.log(message)
    }
    const addOrder = () => {
        setAddItemPrompt(false)
        var quantityNum = document.getElementById("quantityInput").value;


        var orderDate = new Date()
        var orderDay = "" + orderDate.getDate()

        if (orderDate.getDate() < 10) {
            orderDay = "0" + orderDate.getDate()
        }
        var dateString = (orderDate.getMonth() + 1) + "/" + orderDay + "/" + orderDate.getFullYear() + ", " + orderDate.getHours() + ":" + orderDate.getMinutes() + ":" + orderDate.getSeconds();
        
        let nameArray = orderList.filter(x => x.name === selectedName)
        {

            nameArray.map((val) => (
                
                val.order.push({ other_receipt_id: val.id, quantity: quantityNum, product: itemSelection[0].in, price: itemSelection[0].p * quantityNum, date: dateString }),
                archiveOrderToDB({ other_receipt_id: val.id, ordername: val.name, mesa: "mesa normal", quantity: quantityNum, product: itemSelection[0].in, price: itemSelection[0].p * quantityNum, status: "sin pagar", date: dateString })
            ))
        }
        setItemSelection([{ in: "", p: 0 }])
        setSelectedName("")
        setDataChanged(true);
        getData()
    }

    const removeItem = (id, section, name) => {

        const newList = orderList.map((val) => {
            return {
                ...val,
                order: val.order.filter(x => x.other_receipt_id !== id)
            }
        })
        removeOrderFromDB(id, section, name)
        setOrderList(newList)
    }
    
    const closeAddOrderModal = () => {
        setAddItemPrompt(false)
    }
    const closeModal = () => {
        openReceiptModal(false)
    }

    const removeReceipt = (value) => {
        setOrderList(deleteItem => {
            return deleteItem.filter(i => i.name !== value)
        })
    }
    const addReceipt = () => {
        var name = document.getElementById("nameInput").value
        if (orderList.length < 1) {
            showOpenReceiptList(true)
        }
        if (name.length < 1) {
            showErrorMessage(true)

        }
        else {
            let newReceiptId = otherReceiptIDGenerator()
            showErrorMessage(false)
            orderList.push({ id: newReceiptId, name: name, order: []})
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

                                                            <th scope="col"> Unidades</th>
                                                            <th scope="col"> Producto</th>
                                                            <th scope="col"> Precio</th>
                                                        </tr>

                                                    </thead>
                                                    <tbody>
                                                        <>
                                                            {val.order.map((x) => (

                                                                <tr key={x.other_receipt_id}>

                                                                    <td> {x.quantity} </td>
                                                                    <td> {x.product}</td>
                                                                    <td> {x.price}</td>
                                                                    <button type="button" class="btn btn-success" onClick={() => removeItem(x.other_receipt_id, 'mesa normal', val.name)}> Cancelar </button>
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
                                                            <label htmlFor="nameInput" style={{ fontSize: "20px" }}> Nombre de recibo </label>
                                                            {errorMessage ? (
                                                                <p style={{ color: "red" }}> Por favor ingrese un nombre. </p>
                                                            ) : null}
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
                            <Modal.Title id="contained-modal-title-vcenter"> Anadir compra para {selectedName}</Modal.Title>

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

            <ReceiptHistory tableData={tableData} />


        </div>
    );
}
export default MainPage;