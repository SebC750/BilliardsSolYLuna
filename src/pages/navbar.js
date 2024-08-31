import { Link } from "react-router-dom"
import sunAndMoon from "../images/sunandmoon.png"
const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="navbar-styling">
        <a class="navbar-brand" style={{ color: "white", fontSize: "30px" }}><img src={sunAndMoon} className="billiardsLogo" alt="this is an image"></img> <br />Billares Sol Y Luna </a>
      </div>




    </nav>
  );

}
export default Navbar;