import {Container, Table} from "react-bootstrap"
import "../assets/main.css"
const OtherReceiptTable = () =>{
       return(
        <>
          <Container className="table-container" style={{ borderStyle: "solid", borderWidth: 2, borderColor: "orange", paddingBottom: 100 }}>
          <div className="receipt-history-title" style={{backgroundColor: "orange", padding: 10, color: "white"}}>
                Otros Recibos
            </div>
          </Container>
        </>
       )
}
export default OtherReceiptTable