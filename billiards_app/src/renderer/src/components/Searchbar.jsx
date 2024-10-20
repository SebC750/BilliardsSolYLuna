import { Dropdown, Form, Button } from "react-bootstrap"
import API from "../utilities/dbOperations.js"
import { useState} from "react"

const api = new API()
const Searchbar = ({ handleGetByCategory }) => {

    const [selectedCategory, setSelectedCategory] = useState("Buscar por categoria")
    const [searchInput, updateSearchInput] = useState("")
    const [currentPlaceholder, setCurrentPlaceholder] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    const searchByInput = async (searchInput) => {
        try {
            switch (selectedCategory) {
                case "Cliente":
                    try{
                        const clientData = await api.getOrderByName(searchInput, 0, 10)                  
                        handleGetByCategory(clientData)
                    }catch(e){
                        setErrorMessage("Error! La busqueda de los datos no se pudo realizar! "+e)
                    }           
                    break;
                case "Producto":
                    try{
                        const productData = await api.getOrderByProduct(searchInput, 0, 10)    
                        handleGetByCategory(productData)
                    }catch(e){
                         setErrorMessage("Error! La busqueda de los datos no se pudo realizar! "+e)
                    }             
                    break;
                case "Fecha":
                    try{
                        const dateData = await api.getOrderByDate(searchInput, 0, 10)
                        handleGetByCategory(dateData)
                    }catch(e){
                        setErrorMessage("Error! La busqueda de los datos no se pudo realizar! "+e)
                    }  
                    break;
                case "Estado":
                    try{
                        const statusData = await api.getOrderByStatus(searchInput, 0, 10)
                        handleGetByCategory(statusData)
                    }catch(e){
                        setErrorMessage("Error! La busqueda de los datos no se pudo realizar! "+e)
                    }                 
                    break;
                case "Mesa":
                    try{
                        const tableData = await api.getOrderByTable(searchInput, 0, 10)
                        handleGetByCategory(tableData)
                    }catch(e){
                        setErrorMessage("Error! La busqueda de los datos no se pudo realizar! "+e)
                    }
                    break;
                default:
                    setErrorMessage("Categoria de busqueda no esta determinado")
            }
            
        } catch (e) {
            return "This is an invalid input. Error: "+e
        }
    }
    const getAllDataAgain = async (category) =>{
        setSelectedCategory(category)
        
        const allData = await api.getAllOrders(0, 10)
        handleGetByCategory(allData)
    }
    const handleSearchInputChange = (e) => {
        updateSearchInput(e.target.value)
    }
    const handleCategoryChange = (category, categoryPlaceholder) =>{
        setSelectedCategory(category)
        setCurrentPlaceholder(categoryPlaceholder)
    }
    return (
        <>
            <Form>
                <Form.Group style={{ display: "flex" }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="warning" >
                            {selectedCategory}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleCategoryChange("Cliente", "Ingresa el nombre del cliente")}>
                                Cliente
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleCategoryChange("Producto", "Ingresa el nombre del producto")}>
                                Producto
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleCategoryChange("Fecha", "Escribe la fecha en el formato: MM/DD/YYYY")}>
                                Fecha
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleCategoryChange("Estado","Busque deudas")}>
                                Estado
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleCategoryChange("Mesa", "Busque por mesas")}>
                                Mesa
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => getAllDataAgain("Todos")}>
                                Todos los ordenes
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control type="input" id="search-input" placeholder={currentPlaceholder} onChange={handleSearchInputChange} />
                    <Button variant="warning" onClick={() => searchByInput(searchInput)}> Buscar </Button>
                </Form.Group>
            </Form>
            {errorMessage ? (<p> {errorMessage} </p>):null}
        </>
    )
}
export default Searchbar