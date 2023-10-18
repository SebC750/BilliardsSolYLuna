import React from "react"
import {
  Card,
  Button,
  Modal,
  Form,
  Col,
  Row,
  Container,
  Jumbotron,
} from "react-bootstrap";
import Table1 from "./Table1.js"
import {profitImport} from "./Table1.js"
import Table2 from "./Table2.js"
import Table3 from "./Table3.js"
import Navbar from "./navbar.js"
import { useState, useEffect } from "react"
import ItemArray from "./items.js"
const MainPage = () => {
  const [itemList, setItemList] = useState(ItemArray)
  
  return (
    <div>

      <Navbar></Navbar>

      <div class="tables">
          <div class="table1">
            <div class="row">
              <div class="col-md">
              <Table2 data={itemList}></Table2>
              <Table1 data={itemList}></Table1>
              </div>
              <div class="col-md">
              <Table3 data={itemList}></Table3>
              
              </div>
            </div>
            
          </div>
      </div>
      
       

        
    </div>
  );
}
export default MainPage;