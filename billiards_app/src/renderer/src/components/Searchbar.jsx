import { Dropdown, Form ,Button} from "react-bootstrap"

const Searchbar = () => {

    const searchByCatergory = (category) => {
             try{
                   switch(category){
                    case "cliente":

                    case "producto":
                    
                    case "fecha":
                    
                    case "estado":
                            
                    default:
                         console.error("Does not compute. Cannot determine category.")
                   }
             }catch(e){
                console.error("This is invalid input.")
             }
    }
    return (
        <>
            <Form>
                <Form.Group className="" style={{ display: "flex" }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="warning">
                            Buscar por Categoria
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                Cliente
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Producto
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Fecha
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Estado
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control type="input" id="search-input" />
                    <Button variant="warning"> Buscar </Button>
                </Form.Group>
            </Form>
        </>
    )
}
export default Searchbar