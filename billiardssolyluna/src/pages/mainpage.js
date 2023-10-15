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
import Table2 from "./Table2.js"
import Table3 from "./Table3.js"

const MainPage = () => {
  return (
    <div>

      <div class="jumbotron bg-dark">
        <div class="title-style">
          <h1> Billares Sol y Luna</h1>
        </div>
        
      </div>

      <div class="tables">
          <div class="table1">
            <div class="row">
              <div class="col-md">
              <Table2></Table2>
              <Table1></Table1>
              </div>
              <div class="col-md">
              <Table3></Table3>
              </div>
            </div>
            
          </div>
      </div>


      
    </div>
  );
}
export default MainPage;