import { Link } from "react-router-dom"
import Navbar from "./navbar.js"
import Dropdown from "react-bootstrap/Dropdown"
import {getReceipts, getReceiptsByProduct,getReceiptsByName,getReceiptsByDate} from "./receiptAPI.js"
import { useState, useEffect } from "react"

const { ipcRenderer } = window
/*
const {app} = window.require('electron');
const Datastore = window.require('nedb');

var db = new Datastore({ filename: 'receiptDB.db', autoload: true });
db.loadDatabase();
*/



const ReceiptHistory = () => {
    const [data, setData] = useState([])
    const [searchType, setSearchType] = useState("")
    
    const testDatabase = () => {
        
    }
    
    const insert = () => {
        console.log(window.electron.sendNotification("hello world"))
        /*
        var doc = { name: 'world',
                    age: 23
                   };
         db.insert(doc)
         db.find({name: 'world'})
         console.log()
         */
    }
    /*
    const find = () =>{
        db.find({name: {$exists: true}}, (err, docs)=>{
        console.log(docs)
        setData([docs])
        console.log("result: ",data)
          });
        
    }
    */
    useEffect(() =>{
      
       /*
        getReceipts(receiptData =>{
           setData(receiptData['ReceiptOrders'])
           console.log(receiptData['ReceiptOrders'])
            
        })
        */
        
        
    },[])
       
    const searchItem = () =>{
        if(searchType === "Producto"){
             var productVal = document.getElementById("input").value
             console.log(productVal)
             getReceiptsByProduct(productVal, productResult =>{
                setData(productResult['ReceiptOrders'])
                console.log(data)
             })
             console.log(productVal)
        }
        if(searchType === "Nombre"){
            var nameVal = document.getElementById("input").value
            console.log(nameVal)
            getReceiptsByName(nameVal, nameResult =>{
               setData(nameResult['ReceiptOrders'])
               console.log(data)
            })
            console.log(productVal)
        }
        if(searchType === "Fecha"){

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
                        
                        <input type="text" class="form-control" id="input" name="inputVal"/>
                        
                        <button type="button" class="btn btn-primary" onClick={() => searchItem()}> Ingresar </button>
                    </div>
                    </div>




                </div>



                <div align="center">
                    <div class="history-table-style" >
                        <div class="table" style={{ width: "1000px" }}>
                            <thead>
                                <tr>
                                    
                                    <th scope="col" style={{ width: "700px", fontSize: "36px" }}> Order ID</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "36px" }}> Nombre de Cliente</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "36px" }}> Unidades</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "36px" }}> Producto</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "36px" }}> Precio</th>
                                    <th scope="col" style={{ width: "700px", fontSize: "36px" }}> Fecha de Compra</th>
                                   
                                  
                                </tr>
                            </thead>
                            <tbody>
                            {!data ? (
                                 <div>
                                    <p> Loading </p>
                                 </div>
                            ):null}
                            {data.map((val) => (
                                    <tr key={val.OrderID}>
                                        <td>{val.OrderID}</td>
                                        <td>{val.ReceiptName}</td>
                                        <td>{val.Quantity}</td>
                                        <td>{val.Product}</td>
                                        <td>{val.Price}</td>
                                        <td>{val.Date}</td>
                                    </tr>
                                ))}
                            
                            </tbody>

                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-primary"> <Link to="/" style={{ color: "white", fontSize: "25px", textDecoration: "none" }}> Atras </Link></button> <br/>
           
            
            
                                    
        </div>
    );
}
export default ReceiptHistory;