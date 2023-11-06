import { Link } from "react-router-dom"
import Navbar from "./navbar.js"
import Dropdown from "react-bootstrap/Dropdown"

import { useState, useEffect } from "react"



const ReceiptHistory = () => {
    const [data, setData] = useState([])
    const [searchType, setSearchType] = useState("")
    async function getData(){
        const message = await database.getAll()
        setData(message)
        
       
      }
    
    
    const insert = () => {
        
    }
    async function getDataByProduct(productVal){
           const message = await database.searchForProduct(productVal)
           setData(message)
    }
    async function getDataByName(nameVal){
        const message = await database.searchForName(nameVal)
        setData(message)
 }
 async function getDataByDate(dateVal){
    const message = await database.searchForDate(dateVal)
    setData(message)
 }
    useEffect(() =>{
      getData()
       
        
        
    },[])
       
    const searchItem = () =>{
        if(searchType === "Producto"){
             var productVal = document.getElementById("input").value
             console.log(data)
             getDataByProduct(productVal)
        }
        if(searchType === "Nombre"){
            var nameVal = document.getElementById("input").value
            console.log(nameVal)
            getDataByName(nameVal)
        }
        if(searchType === "Fecha"){
            var dateVal = document.getElementById("input").value
            console.log(dateVal)
            
            
            getDataByDate(dateVal)
        }
    }    
    
    return (
        <div>
            <Navbar></Navbar>
            
                                    
                                   
                                   
            <div class="history-title">
                <h1> Historial de Recibos </h1>
            </div>

            <div class="history-body">
                <div class="container">

                 
                   <div class="searchBar">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="">Buscar por: </span>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                {searchType}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setSearchType("Producto")}> Producto </Dropdown.Item>
                                <Dropdown.Item onClick={() => setSearchType("Nombre")}> Nombre </Dropdown.Item>
                                <Dropdown.Item onClick={() => setSearchType("Fecha")}> Fecha </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>
                        {searchType == "Fecha" ? (
                                 <div>
                                         <input type="text" class="form-control" id="input" name="inputVal" placeholder="Usa el formato MM/DD/YYYY"/>
                                 </div>
                        ):<input type="text" class="form-control" id="input" name="inputVal"/>}
                        
                        
                        <button type="button" class="btn btn-primary" onClick={() => searchItem()}> Ingresar </button>
                    </div>
                    </div>




                </div>



                <div align="center">
                    <div class="history-table-style" >
                        <div class="table" style={{ width: "1000px" }}>
                            <thead>
                                <tr>
                                    
                                    <th scope="col" style={{ width: "700px", fontSize: "24px" }}> Order ID</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "24px" }}> Nombre de Cliente</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "24px" }}> Unidades</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "24px" }}> Producto</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "24px" }}> Precio</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "24px" }}> Fecha de Compra</th>
                                   
                                  
                                </tr>
                            </thead>
                            <tbody>
                            {!data ? (
                                 <div>
                                    <p> Loading </p>
                                 </div>
                            ):null}
                            {data.map((val) => (
                                     <tr key={val._id}>
                                     <td>{val._id}</td>
                                     <td>{val.ordername}</td>
                                     <td>{val.quantity}</td>
                                     <td>{val.product}</td>
                                     <td>{val.price}</td>
                                     <td>{val.date}</td>
                                     
                                     
                                 </tr>
                                ))}
                            
                            </tbody>

                        </div>
                    </div>
                </div>
            </div>
           
           
            
            
                                    
        </div>
    );
}
export default ReceiptHistory;