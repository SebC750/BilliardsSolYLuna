import {Navbar, Button} from "react-bootstrap"
import logo from "../assets/images/sunandmoon.png"
import "../assets/navbar.css"
const Navigationbar = () => {

   return (
      <>
         <Navbar className="navbar bg-dark"> 
                <Navbar.Brand className="logo-brand"> 
                      <img src={logo} height="60px" width="60px" alt="billiards sol y luna logo"/>
                      Billiards Sol y Luna
                </Navbar.Brand>
                <Button variant="warning"> <a href="#ReceiptHistory"> Historial de Recibos </a></Button>
         </Navbar>
      </>
   )
}
export default Navigationbar;