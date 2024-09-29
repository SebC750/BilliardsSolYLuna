import "./assets/main.css"
import Navigationbar from "./components/Navbar.jsx"
import Table from "./components/Table.jsx"
import ReceiptHistory from "./components/ReceiptHistory.jsx"
import OtherReceiptsTable from "./components/OtherReceiptsTable.jsx"
function App() {
  
  return (
    <>
      <Navigationbar> </Navigationbar>
      
      <Table tableNumber={1} tableColor={"red"}></Table>
      <Table tableNumber={2} tableColor={"blue"}></Table>
      <Table tableNumber={3} tableColor={"green"}></Table>
      <OtherReceiptsTable></OtherReceiptsTable>
      <ReceiptHistory id="ReceiptHistory"/>

      
    </>
  )
}

export default App

