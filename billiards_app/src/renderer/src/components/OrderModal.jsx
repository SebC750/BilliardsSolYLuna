import { Modal, Form, Dropdown, Col } from "react-bootstrap";
import items from "../utilities/items.js";
import { useState, useEffect } from "react";

const OrderModal = ({ isOpen, handleAddPurchase, close }) => {
    const [show, setShow] = useState(isOpen);
    const [selectedItem, setSelectedItem] = useState(null);
    const [clientName, setClientName] = useState('');
    const [quantity, setQuantity] = useState("");
    const [errorMessage, showErrorMessage] = useState(null);

    useEffect(() => {
        setShow(isOpen);
    }, [isOpen]);

    const closeModal = () => close();

    const handleClientNameChange = (e) => {
        setClientName(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const addPurchase = (e) => {
        e.preventDefault();
        if (!selectedItem || quantity <= 0) {
            showErrorMessage("Por favor ingrese la información requerida.");
        } else {
            showErrorMessage(null);
            handleAddPurchase(selectedItem.itemName, selectedItem.itemPrice, quantity, clientName);
            setQuantity('');
            setClientName('');
            setSelectedItem(null);
            closeModal();
        }
    };

    return (
        <>
            {show ? (
                <Modal
                    show={show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">Añadir Compra</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="px-5">
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Escoger producto
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {items.map((val) => (
                                    <div key={val.item_id}>
                                        <Dropdown.Item onClick={() => setSelectedItem({ itemName: val.item_name, itemPrice: val.item_price })}>
                                            {val.item_name} {val.item_price}
                                        </Dropdown.Item>
                                    </div>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form>
                            <Form.Group>
                                <Form.Label htmlFor="quantityInput">Cantidad</Form.Label>
                                <Form.Control type="number" id="quantityInput" onChange={(e) => handleQuantityChange(e)} value={quantity}></Form.Control>
                                <Form.Label htmlFor="nameInput">Nombre de cliente</Form.Label>
                                <Form.Control type="text" id="nameInput" onChange={(e) => handleClientNameChange(e)} value={clientName}></Form.Control>
                            </Form.Group>
                        </Form>
                        <Col>
                            {errorMessage ? (
                                <p style={{ color: "red", fontSize: "12px" }}>{errorMessage}</p>
                            ) : null}
                        </Col>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-primary" onClick={closeModal}>Cancelar orden</button>
                        <button type="button" className="btn btn-primary" onClick={(e) => addPurchase(e)}>Ingresar</button>
                    </Modal.Footer>
                </Modal>
            ) : null}
        </>
    );
};

export default OrderModal;
