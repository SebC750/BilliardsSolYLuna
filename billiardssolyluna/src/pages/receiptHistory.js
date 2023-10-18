import {Link} from "react-router-dom"
const ReceiptHistory = () => {
     return(
            <div>
                <h1> Historial de Recibos </h1>
                <button type="button" class="btn btn-primary"> <Link to="/" style={{color: "white", fontSize: "25px", textDecoration: "none"}}> Atras </Link></button>
            </div>
     );
}
export default ReceiptHistory;