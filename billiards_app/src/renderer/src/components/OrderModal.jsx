import { Modal, Form } from "react-bootstrap"
import items from "../utilities/items.js"
const OrderModal = ({ isOpen , handleAddPurchase}) => {
    const [show, setShow] = useState(isOpen)
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState(0);
 
    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

    const addPurchase = (e) => {
        
      };
    return (
        <>
            {isOpen ? (
                <>
                    <Modal
                        show={openModal}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered

                    >
                        <Modal.Header >
                            <Modal.Title id="contained-modal-title-vcenter"> Anadir Compra</Modal.Title>

                        </Modal.Header>
                        <Modal.Body className="px-5">

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Escoger producto
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {items.map((val) => (
                                        <div key={val.item_id}>
                                            <Dropdown.Item onClick={() => setItemSelection([{ in: val.item_name, p: val.item_price }])}> {val.item_name} {val.item_price}</Dropdown.Item>

                                        </div>

                                    ))}

                                </Dropdown.Menu>
                            </Dropdown>
                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor="quantityInput"> Cantidad</Form.Label>
                                    <Form.Control type="number" id="quantityInput"></Form.Control>
                                    <Form.Label htmlFor="nameInput"> Nombre de cliente</Form.Label>
                                    <Form.Control type="text" id="nameInput"></Form.Control>
                                </Form.Group>

                            </Form>
                            <Col>
                                <label for="quantityInput"> Cantidad </label>
                                <input type="number" class="form-control" id="quantityInput"></input>
                                <label for="nameInput"> Nombre de cliente </label>
                                <input type="text" class="form-control" id="nameInput"></input>
                                {errorMessage ? (
                                    <p style={{ color: "red", fontSize: "12px" }}> Por favor ingresar toda la informacion requerida. </p>
                                ) : null}
                            </Col>

                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" class="btn btn-primary" onClick={() => closeModal()}> Cancelar orden </button>
                            <button type="button" class="btn btn-primary" onClick={() => addPurchase()}> Ingresar </button>

                        </Modal.Footer>
                    </Modal>
                </>
            ) : null}
        </>
    )
}
export default OrderModal