import sunAndMoon from "../images/sunandmoon.png"
const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="navbar-styling">
        <img src={sunAndMoon} height="50" width="50" className="billiardsLogo" alt="this is an image"/>
        <h2> Billiards Sol Y Luna</h2>
      </div>




    </nav>
  );

}
export default Navbar;