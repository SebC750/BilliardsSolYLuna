import { Modal, Form, Dropdown, Col, Button } from "react-bootstrap";
import items from "../utilities/items.js";
import { useState, useEffect } from "react";

const OrderModal = ({ isOpen, handleAddPurchase, close, currentReceiptID, isOtherReceipt }) => {
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

    const handleItemSelect = (itemName, itemPrice) => {
        setSelectedItem({ itemName, itemPrice });
    };

    const addPurchase = (e) => {
        e.preventDefault();      
        if (!selectedItem || quantity <= 0) {
            showErrorMessage("Por favor seleccione un producto y una cantidad válida.");
            return;
        }  
        if (!isOtherReceipt && clientName.trim() === '') {
            showErrorMessage("Por favor ingrese el nombre del cliente.");
            return;
        }   
        showErrorMessage(null);     
        if (!isOtherReceipt) {
            handleAddPurchase(clientName, selectedItem.itemPrice, quantity, selectedItem.itemName);
        } else {
            handleAddPurchase(currentReceiptID, selectedItem.itemName, selectedItem.itemPrice, quantity);
        }   
        resetForm();
        closeModal();
    };

    const resetForm = () => {
        setQuantity('');
        setClientName('');
        setSelectedItem(null);
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
                                    <Dropdown.Item 
                                        key={val.item_id} 
                                        onClick={() => handleItemSelect(val.item_name, val.item_price)}
                                    >
                                        {val.item_name} - ${val.item_price}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        {selectedItem ? (
                            <p>Producto: {selectedItem.itemName} | Precio: ${selectedItem.itemPrice}</p>
                        ) : null}

                        <Form>
                            <Form.Group>
                                <Form.Label htmlFor="quantityInput">Cantidad</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    id="quantityInput" 
                                    min="1"
                                    onChange={handleQuantityChange} 
                                    value={quantity} 
                                    placeholder="Ingrese la cantidad"
                                    required
                                />

                                {!isOtherReceipt && (
                                    <>
                                        <Form.Label htmlFor="nameInput">Nombre de cliente</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            id="nameInput" 
                                            onChange={handleClientNameChange} 
                                            value={clientName} 
                                            placeholder="Ingrese el nombre del cliente"
                                            required
                                        />
                                    </>
                                )}
                            </Form.Group>
                        </Form>

                        {errorMessage && (
                            <Col>
                                <p style={{ color: "red", fontSize: "12px" }}>{errorMessage}</p>
                            </Col>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={closeModal}>Cancelar orden</Button>
                        <Button onClick={addPurchase}>Ingresar</Button>
                    </Modal.Footer>
                </Modal>
            ) : null}
        </>
    );
};

export default OrderModal;
