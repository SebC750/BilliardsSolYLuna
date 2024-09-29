import { Table, Container } from "react-bootstrap"
import Searchbar from "./Searchbar.jsx"
const ReceiptHistory = () => {
    return (
        <>
            
            <Container style={{borderStyle: "solid", borderWidth: 2, borderColor: "purple", paddingBottom: 100}}>
            
            <div className="receipt-history-title" style={{backgroundColor: "purple", padding: 10, color: "white"}}>
                Historial de recibos
            </div>
            <Searchbar></Searchbar>
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

                    </tbody>
                </Table>
            </Container>
        </>
    )
}
export default ReceiptHistory