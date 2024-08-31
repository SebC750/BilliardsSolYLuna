import { Link } from "react-router-dom"
import Navbar from "./navbar.js"
import Dropdown from "react-bootstrap/Dropdown"
import Modal from "react-bootstrap/Modal"
import Pagination from "react-bootstrap/Pagination"
import PageNavigator from "./pageNavigator.js"
import { useState, useEffect } from "react"



const ReceiptHistory = () => {
    const [data, setData] = useState([])
    const [searchType, setSearchType] = useState("")
    const [errorMessage, showErrorMessage] = useState(false)
    const [openMarkAsPaidModal, setOpenMarkAsPaidModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isChanged, setIsChanged] = useState(false)
    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(data.length / 5)
    const indexOfLastPage = data.length*5
    const indexOfFirstPage = indexOfLastPage - 5
    var ordersShownOnTable = data.slice(indexOfFirstPage, indexOfLastPage);

    const onPageChange = (page) =>{
        setPage(page)
    }
    async function getData(){
        const getdata = await database.getAll();
        console.log(getdata)
        setData(getdata)
    }
    
    
    useEffect(() =>{
        getData()
    },[isChanged])
    async function updateOrderPaidStatus(){
        
        console.log(selectedOrder)
        const message = await database.changeOrderStatus(selectedOrder)
        console.log(message)
        setIsChanged(true)
        getData()
    }
    async function getDataByStatus() {
        const message = await database.searchForUnpaidOrders()
        setData(message)
    }

    async function getDataByProduct(productVal) {
        const message = await database.searchForProduct(productVal)
        setData(message)
    }
    async function getDataByName(nameVal) {
        const message = await database.searchForName(nameVal)
        setData(message)
    }
    async function getDataByDate(dateVal) {
        const message = await database.searchForDate(dateVal)
        setData(message)
    }
    
    const openPaidModal = (id) =>{
        setOpenMarkAsPaidModal(true)
        setSelectedOrder(id)
    }
    const markOrderAsPaid = () => {
        setOpenMarkAsPaidModal(false)
        updateOrderPaidStatus()
    }
    const checkDate = (date) => {
        var regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/
    }
    const searchItem = () => {
        if (searchType === "Producto") {
            var productVal = document.getElementById("input").value
            if (productVal.length < 1) {
                showErrorMessage(true)
            }
            console.log(data)
            getDataByProduct(productVal)
        }
        if (searchType === "Nombre") {
            var nameVal = document.getElementById("input").value
            if (nameVal.length < 1) {
                showErrorMessage(true)
            }
            console.log(nameVal)
            getDataByName(nameVal)
        }
        if (searchType === "Fecha") {
            var dateVal = document.getElementById("input").value
            console.log(dateVal)
            const isValidDate = checkDate(dateVal)

            getDataByDate(dateVal)
        }
        if (searchType === "Status") {
            getDataByStatus()

        }
    }

    return (
        <div>
            




            <div class="history-title">
                <h1> Historial de Recibos </h1>
            </div>

            <div class="history-body">
                <div class="container">


                    <div class="searchBar">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="">Buscar por: </span>
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    {searchType}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSearchType("Producto")}> Producto </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSearchType("Nombre")}> Nombre </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSearchType("Fecha")}> Fecha </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSearchType("Status")}> Deudas/Falta de pago</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {searchType == "Fecha" ? (
                                <div>
                                    <input type="text" class="form-control" id="input" name="inputVal" placeholder="Usa el formato MM/DD/YYYY" />
                                </div>
                            ) : <input type="text" class="form-control" id="input" name="inputVal" />}

                            {errorMessage ? (
                                <p style={{ color: "red", fontStyle: "12px" }}> Por favor ingresar algo en la busqueda. </p>
                            ) : null}
                            <button type="button" class="btn btn-primary" onClick={() => searchItem()}> Ingresar </button>
                        </div>
                    </div>




                </div>



                <div align="center">
                    <div class="history-table-style" >
                        <table class="table" style={{ width: "1000px" }}>
                            <thead>
                                <tr>

                                    <th scope="col" style={{ width: "500px", fontSize: "24px" }}> Order ID</th>
                                    <th scope="col" style={{ width: "500px", fontSize: "24px" }}> Nombre de Cliente</th>
                                    <th scope="col" style={{ width: "500px", fontSize: "24px" }}> Unidades</th>
                                    <th scope="col" style={{ width: "500px", fontSize: "24px" }}> Producto</th>
                                    <th scope="col" style={{ width: "500px", fontSize: "24px" }}> Precio</th>
                                    <th scope="col" style={{ width: "500px", fontSize: "24px" }}> Fecha de Compra</th>
                                    <th scope="col" style={{ width: "500px", fontSize: "24px" }}> Estado</th>

                                </tr>
                            </thead>
                            <tbody>
                                {!data ? (
                                    <div>
                                        <p> Loading </p>
                                    </div>
                                ) : null}
                                {ordersShownOnTable.map((val) => (
                                    <tr key={val._id}>
                                        <td>{val._id}</td>
                                        <td>{val.ordername}</td>
                                        <td>{val.quantity}</td>
                                        <td>{val.product}</td>
                                        <td>{val.price}</td>
                                        <td>{val.date}</td>
                                        {val.status === "sin pagar" ?
                                            (<div> <td style={{ color: "red" }}>{val.status}</td>
                                                <td>
                                                    <button type="button" className="btn btn-danger" onClick={() => openPaidModal(val._id)}> Cancelar </button>
                                                </td> </div>) :
                                            <td style={{ color: "green" }}>{val.status}</td>
                                        }


                                    </tr>
                                ))}

                            </tbody>

                        </table>
                        <div>

            <PageNavigator totalPages={totalPages} currentPage={page} onPageChange={onPageChange} data={data}/>
        </div>
                    </div>
                </div>
            </div>
            {openMarkAsPaidModal ? (
                <Modal
                show={true}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                    <Modal.Title> Estas seguro?</Modal.Title>
                    <Modal.Body>
                        <p> Estas seguro de que quieres cancelar esta orden?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-primary" onClick={() => setOpenMarkAsPaidModal(false)}> No, atras</button>
                        <button type="button" className="btn btn-primary" onClick={() => markOrderAsPaid()}> Si, ya esta pagado</button>
                    </Modal.Footer>
                </Modal>
            ) : null}
            




        </div>
    );
}
export default ReceiptHistory;