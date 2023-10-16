import {Link} from "react-router-dom"
import sunAndMoon from "../images/sunandmoon.png"
const Navbar = () =>{
    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="navbar-styling">
      <a class="navbar-brand" style={{color: "white", fontSize: "30px"}}><div class="billiardsLogo"> <img src={sunAndMoon} alt="this is an image"></img></div>Billares Sol Y Luna </a>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
        <div class="link-spacing">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <Link to="/" style={{color: "white", fontSize: "25px", textDecoration: "none"}}> Mesas </Link>
          </li>
          <br/>
          <li class="nav-item">
          <Link to="/ReceiptHistory" style={{color: "white", fontSize: "25px",textDecoration: "none"}}> Historial de Recibos </Link>
          </li>
          <br/>
          
           
          
          </ul>
          </div>
      </div>
      
       
     
                </nav>
  );
    
}
export default Navbar;