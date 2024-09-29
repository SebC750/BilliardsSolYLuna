import { Link } from "react-router-dom"
import Navbar from "./navbar.js"
import Dropdown from "react-bootstrap/Dropdown"
import Modal from "react-bootstrap/Modal"
import {Container, Table} from "react-bootstrap"
import PageNavigator from "./pageNavigator.js"
import { useState, useEffect } from "react"

const ReceiptHistory = ({tableData}) => {
    const [data, setData] = useState([])
    const [searchType, setSearchType] = useState("")
    const [errorMessage, showErrorMessage] = useState(false)
    const [openMarkAsPaidModal, setOpenMarkAsPaidModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isChanged, setIsChanged] = useState(false)
    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(data.length / 5)
    const indexOfLastPage = data.length * 5
    const indexOfFirstPage = indexOfLastPage - 5
    //let ordersShownOnTable = data.slice(indexOfFirstPage, indexOfLastPage);

    const onPageChange = (page) => {
        setPage(page)
    }

    useEffect(() => {
        setData(tableData)
    }, [tableData, isChanged])
    async function updateOrderPaidStatus() {

        console.log(selectedOrder)
        const message = await database.changeOrderStatus(selectedOrder)
        console.log(message)
        setIsChanged(true)
    }
    async function getDataByStatus() {
        const message = await database.searchForStatus()
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

    const openPaidModal = (id) => {
        setOpenMarkAsPaidModal(true)
        setSelectedOrder(id)
    }

    const markOrderAsPaid = () => {
        setOpenMarkAsPaidModal(false)
        updateOrderPaidStatus()
    }

    const searchItem = () => {
        if(!searchType){
            showErrorMessage("Por favor entrar algo para la busqueda.")
            return;
        }
        switch (searchType) {
            case "Producto":
                getDataByProduct(inputValue);
                break;
            case "Nombre":
                getDataByName(inputValue);
                break;
            case "Fecha":
                getDataByDate(inputValue);
                break;
            case "Status":
                getDataByStatus();
                break;
            default:
                showErrorMessage(true);
        }
    }

    return (
        <>

            <Container>
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
                                {searchType === "Fecha" ? (

                                    <input type="text" class="form-control" id="input" name="inputVal" placeholder="Usa el formato MM/DD/YYYY" />

                                )
                                    : searchType === "Status" ? (<input type="text" class="form-control" id="input" name="inputVal" placeholder="Escribe 'cancelado' o 'sin pagar' para ver deudas y pagos" />)

                                        : <input type="text" class="form-control" id="input" name="inputVal" />}

                                {errorMessage ? (
                                    <p style={{ color: "red", fontStyle: "12px" }}> Por favor ingresar algo en la busqueda. </p>
                                ) : null}
                                <button type="button" class="btn btn-primary" onClick={() => searchItem()}> Ingresar </button>
                            </div>
                        </div>

                    </div>

                    <div align="center">
                        <div class="history-table-style" >
                            <Table>
                                <thead>
                                    <tr>

                                        <th scope="col" > Order ID</th>
                                        <th scope="col" > Nombre de Cliente</th>
                                        <th scope="col" > Unidades</th>
                                        <th scope="col" > Producto</th>
                                        <th scope="col" > Precio</th>
                                        <th scope="col" > Fecha de Compra</th>
                                        <th scope="col" > Estado</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {!data ? (
                                        <div>
                                            <p> Loading </p>
                                        </div>
                                    ) : null}
                                    {data.map((val) => (
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

                            </Table>
                            <div>

                                <PageNavigator totalPages={totalPages} currentPage={page} onPageChange={onPageChange} data={data} />
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
            </Container>

        </>
    );
}
export default ReceiptHistory;