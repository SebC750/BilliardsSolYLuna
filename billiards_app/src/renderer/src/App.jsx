import Navigationbar from "./components/Navbar.jsx"

function App() {
  /*
  const addOrder = () => {
    setAddItemPrompt(false)
    var quantityNum = document.getElementById("quantityInput").value;


    var orderDate = new Date()
    var orderDay = "" + orderDate.getDate()

    if (orderDate.getDate() < 10) {
        orderDay = "0" + orderDate.getDate()
    }
    var dateString = (orderDate.getMonth() + 1) + "/" + orderDay + "/" + orderDate.getFullYear() + ", " + orderDate.getHours() + ":" + orderDate.getMinutes() + ":" + orderDate.getSeconds();
    
    let nameArray = orderList.filter(x => x.name === selectedName)
    {

        nameArray.map((val) => (
            
            val.order.push({ other_receipt_id: val.id, quantity: quantityNum, product: itemSelection[0].in, price: itemSelection[0].p * quantityNum, date: dateString }),
            archiveOrderToDB({ other_receipt_id: val.id, ordername: val.name, mesa: "mesa normal", quantity: quantityNum, product: itemSelection[0].in, price: itemSelection[0].p * quantityNum, status: "sin pagar", date: dateString })
        ))
    }
    setItemSelection([{ in: "", p: 0 }])
    setSelectedName("")
    setDataChanged(true);
    getData()
}
    */
  return (
    <>
      <Navigationbar> </Navigationbar>
      <h1> Hello world! </h1>
    </>
  )
}

export default App

