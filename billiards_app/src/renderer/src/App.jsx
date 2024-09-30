import "./assets/main.css"
import Navigationbar from "./components/Navbar.jsx"
import Table from "./components/Table.jsx"
import ReceiptHistory from "./components/ReceiptHistory.jsx"
import OtherReceiptsTable from "./components/OtherReceiptsTable.jsx"
function App() {
  
  return (
    <>
      <Navigationbar/>
      <Table tableNumber={1} tableColor={"red"}/>
      <Table tableNumber={2} tableColor={"blue"}/>
      <Table tableNumber={3} tableColor={"green"}/>
      <OtherReceiptsTable/>
      <ReceiptHistory/>  
    </>
  )
}

export default App

