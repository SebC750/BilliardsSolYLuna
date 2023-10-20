import { Link } from "react-router-dom"
import Navbar from "./navbar.js"
import Dropdown from "react-bootstrap/Dropdown"
import {getReceipts} from "./receiptAPI.js"
import { useState, useEffect } from "react"
const ReceiptHistory = () => {
    const [data, setData] = useState([])
    const [searchType, setSearchType] = useState("")
    const getData = () => {
        getReceipts(receiptData =>
            setData([{ab: receiptData.about, n: receiptData.name}]))
        
        console.log(data)
    }
    return (
        <div>
            <Navbar></Navbar>
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

                            </Dropdown.Menu>
                        </Dropdown>
                        <input type="text" class="form-control" />
                    </div>
                    </div>




                </div>



                <div align="center">
                    <div class="history-table-style" >
                        <div class="table" style={{ width: "1000px" }}>
                            <thead>
                                <tr>
                                    <th scope="col" style={{ width: "700px", fontSize: "36px" }}> Order ID</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "36px" }}> Unidades</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "36px" }}> Producto</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "36px" }}> Precio</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "36px" }}> Fecha de Compra</th>

                                </tr>
                            </thead>
                            <tbody>
                                <td> Test ID</td>
                                <td> Test Unit</td>
                                <td> Test Item</td>
                                <td> Test Precio</td>
                            </tbody>

                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-primary"> <Link to="/" style={{ color: "white", fontSize: "25px", textDecoration: "none" }}> Atras </Link></button> <br/>
            <button type="button" class="btn btn-primary" onClick={() => getData()}> Test Backend </button>
            {data.map((val) => {
                <div>
                    <ul>
                        <li> {val.ab}</li>
                        <li> {val.n}</li>
                    </ul>
                </div>
            })}
        </div>
    );
}
export default ReceiptHistory;