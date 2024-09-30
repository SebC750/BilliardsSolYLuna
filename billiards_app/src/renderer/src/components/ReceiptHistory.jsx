import { Table, Container } from "react-bootstrap"
import Searchbar from "./Searchbar.jsx"
import { getAllOrders } from "../utilities/dbOperations.js"
import {useState, useEffect} from "react"
const ReceiptHistory = () => {

    const [orderHistory, updateOrderHistory] = useState([])
    const handleGetDataByCategory = (data) => {
        updateOrderHistory(data)
    }
    useEffect(() => {
        async function getAllData(){
            const allData = await getAllOrders()
            updateOrderHistory(allData)
        }
        getAllData()
    }, [])
    return (
        <>

            <Container style={{ borderStyle: "solid", borderWidth: 2, borderColor: "purple", paddingBottom: 100 }}>

                <div className="receipt-history-title" style={{ backgroundColor: "purple", padding: 10, color: "white" }}>
                    Historial de recibos
                </div>
                <Searchbar handleGetByCategory={handleGetDataByCategory}></Searchbar>
                <Table>
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> Nombre de cliente</th>
                            <th> Producto</th>
                            <th> Cantidad</th>
                            <th> Precio</th>
                            <th> Fecha de compra</th>
                            <th> Estado</th>
                        </tr>

                    </thead>
                    <tbody>
                        {orderHistory ? (
                            <>
                                {orderHistory.map((order) => (
                                    <tr key={order._id}>
                                        <td> {order._id} </td>
                                        <td> {order.clientName} </td>
                                        <td> {order.product} </td>
                                        <td> {order.quantity} </td>
                                        <td> {order.price} </td>
                                        <td> {order.date} </td>
                                        <td> {order.status} </td>
                                    </tr>
                                ))}
                            </>
                        ) :null}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
export default ReceiptHistory