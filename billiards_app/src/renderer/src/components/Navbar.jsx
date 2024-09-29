import { Navbar, Button, Dropdown} from "react-bootstrap"
import logo from "../assets/images/sunandmoon.png"
import "./navbar.css"
const Navigationbar = () => {

   return (
      <>
         <Navbar className="navbar bg-dark" sticky="top" id="navbar-settings">
            <Navbar.Brand className="logo-brand" style={{ color: "white" }}>
               <img src={logo} height="60px" width="60px" alt="billiards sol y luna logo" />
               Billiards Sol y Luna
            </Navbar.Brand>
            <Dropdown style={{marginRight: 10}}>
               <Dropdown.Toggle variant="warning">
                  Navegar a mesa
               </Dropdown.Toggle>
               <Dropdown.Menu>
                  <Dropdown.Item href="#mesa-1">
                      Mesa 1
                  </Dropdown.Item>
                  <Dropdown.Item href="#mesa-2">
                      Mesa 2
                  </Dropdown.Item>
                  <Dropdown.Item href="#mesa-3"> 
                      Mesa 3
                  </Dropdown.Item>
                  <Dropdown.Item href="#otros-recibos">
                      Otros recibos
                  </Dropdown.Item>
                  <Dropdown.Item href="#ReceiptHistory">
                      Historial de Recibos
                  </Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown>
         </Navbar>
      </>
   )
}
export default Navigationbar;