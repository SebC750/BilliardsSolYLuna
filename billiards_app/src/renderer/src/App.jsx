
import Navigationbar from "./components/Navbar.jsx"
import Table from "./components/Table.jsx"
import ReceiptHistory from "./components/ReceiptHistory.jsx"
import OtherReceiptsTable from "./components/OtherReceiptsTable.jsx"
function App() {
  return (
    <>
      <Navigationbar/>
      <div id="mesa-1">
        <Table tableNumber={1} tableColor={"red"} />
      </div>
      <div id="mesa-2">
        <Table tableNumber={2} tableColor={"blue"} />
      </div>
      <div id="mesa-3">
        <Table tableNumber={3} tableColor={"green"} />
      </div>
      <div id="otros-recibos">
        <OtherReceiptsTable tableColor={"orange"}/>
      </div>
      <div id="receipt-history">
        <ReceiptHistory />  
      </div>
    </>
  )
}

export default App

