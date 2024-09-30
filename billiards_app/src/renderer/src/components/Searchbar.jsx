import { Dropdown, Form ,Button} from "react-bootstrap"
import {getOrderByName, getOrderByProduct, getOrderByDate, getOrderByStatus} from "../utilities/dbOperations.js"
import {useState, useEffect} from "react"
const Searchbar = ({handleGetByCategory}) => {

    const [selectedCategory, setSelectedCategory] = useState("Buscar por categoria")
    const [searchInput, updateSearchInput] = useState("")

    const searchByInput = async (searchInput) => {
             try{
                   switch(selectedCategory){
                    case "Cliente":
                         const clientData = getOrderByName(searchInput)
                         handleGetByCategory(clientData)
                         break;
                    case "Producto":
                         const productData = getOrderByProduct(searchInput)
                         handleGetByCategory(productData)
                         break;
                    case "Fecha":
                         const dateData = getOrderByDate(searchInput)    
                         handleGetByCategory(dateData)                     
                         break;
                    case "Estado":
                         const statusData = getOrderByStatus(searchInput)
                         handleGetByCategory(statusData)
                         break;
                    default:
                         console.error("Does not compute. Cannot determine category.")
                   }
             }catch(e){
                console.error("This is invalid input.")
             }
    }
    
    const handleSearchInputChange = (e) =>{
        updateSearchInput(e.target.value)
    }

    return (
        <>
            <Form>
                <Form.Group className="" style={{ display: "flex" }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="warning">
                            {selectedCategory}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSelectedCategory("Cliente")}>
                                Cliente
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedCategory("Producto")}>
                                Producto
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedCategory("Fecha")}>
                                Fecha
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSelectedCategory("Estado")}>
                                Estado
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control type="input" id="search-input" onChange={handleSearchInputChange}/>
                    <Button variant="warning" onClick={() => searchByInput(searchInput)}> Buscar </Button>
                </Form.Group>
            </Form>
        </>
    )
}
export default Searchbar