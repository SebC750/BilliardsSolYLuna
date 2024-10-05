import { Modal, Form, Dropdown, Col, Button } from "react-bootstrap";
import items from "../utilities/items.js";
import { useState, useEffect } from "react";

//This is the order modal used for recording orders for all receipts.
const OrderModal = ({ isOpen, handleAddPurchase, close, currentReceiptID, isOtherReceipt }) => {
    const [show, setShow] = useState(isOpen);
    const [selectedItem, setSelectedItem] = useState(null);
    const [clientName, setClientName] = useState('');
    const [quantity, setQuantity] = useState("");
    const [errorMessage, showErrorMessage] = useState(null);
    const [priceRange, setPriceRange] = useState(null)
    const [rangePrice, setRangePrice] = useState("")
    
    //Always check to see if the user opened the modal.
    useEffect(() => {
        setShow(isOpen);
    }, [isOpen]);

    const closeModal = () => close();
    
    //Need to record changes to the state as the user adds the input.
    const handleClientNameChange = (e) => {
        setClientName(e.target.value);
    };
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };
    const handleRangePriceChange = (e) => {
        setRangePrice(e.target.value)        
    }
    //Check first if the item has a price range to then handle price input. Then record the selected item's data.
    const handleItemSelect = (itemName, itemPrice) => {
        setRangePrice(null)    
        setPriceRange(null)
        if (Array.isArray(itemPrice)) {
            setPriceRange(itemPrice)
        }
        setSelectedItem({ itemName, itemPrice });
    };

    const addPurchase = () => {
        //First check for edge cases. Items and client names need to be included in the form before proceeding.
        if (!selectedItem || quantity <= 0) {
            showErrorMessage("Por favor seleccione un producto y una cantidad válida.");
            return;
        }
        if (!isOtherReceipt && clientName.trim() === '') {
            showErrorMessage("Por favor ingrese el nombre del cliente.");
            return;
        }
        //Also make sure the user inputs a value within the range. First, I need to check if there is a price range or not.
        if (priceRange && Array.isArray(priceRange)) {        
            if (rangePrice < priceRange[0] || rangePrice > priceRange[1]) {
                showErrorMessage("Por favor seleccione un precio exacto que es entre $" + priceRange[0] + " y $" + priceRange[1])
                return;
            }
        }  
        showErrorMessage(null);
        //The total price of the order depends on whether the user is selecting an order with a single price or a price range.
        let totalPrice = priceRange ? rangePrice : selectedItem?.itemPrice || 0
        //The receipts for the pool tables and the other tables are slightly different in that pool tables ask for names while order receipts don't need to because the names are already prompted for when creating a new receipt.
        if (!isOtherReceipt) {         
            handleAddPurchase(clientName, totalPrice, quantity, selectedItem.itemName);
        }        
        else {
            handleAddPurchase(currentReceiptID, selectedItem.itemName, totalPrice, quantity);
        }
        //Wipe the slate clean and close the order modal.
        resetForm();
        closeModal();
    };
    //Gotta make sure everything is wiped clean to avoid potential conflicts with stale cache data
    const resetForm = () => {
        setQuantity('');
        setClientName('');
        setSelectedItem(null);
        setPriceRange([])
        setRangePrice(null)
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
                                        {/* 
                                        As of Oct 4. 2024, my mom, the business owner, has asked me to change some prices. 
                                        For wine bottles specifically, she wanted a price range so I need to add conditional rendering to handle instances of prices represented in arrays of size 2. 
                                        */}
                                        {Array.isArray(val.item_price) === true ? (<> {val.item_name} - ${val.item_price[0] + " - " + val.item_price[1]} </>) : <> {val.item_name} - ${val.item_price}</>}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        {selectedItem ? (<>
                            {priceRange ? (<p>Producto: {selectedItem.itemName} | Precio: ${selectedItem.itemPrice[0] + " - " + selectedItem.itemPrice[1]}</p>) : 
                            <p>Producto: {selectedItem.itemName} | Precio: ${selectedItem.itemPrice}</p>}
                        </>

                        ) : null}
                        
                        <Form>
                            {/* Render only if the user selects an item with a price range.*/}
                            {selectedItem ? (
                                <>
                                    {priceRange  ? (
                                        <>
                                            <Form.Label htmlFor="quantityInput">Precio Exacto</Form.Label>
                                            <Form.Control
                                                type="number"
                                                id="priceRange"
                                                min="1"
                                                onChange={handleRangePriceChange}
                                                value={rangePrice}
                                                placeholder="Ingrese el precio exacto"
                                                required
                                            />
                                        </>
                                    ) : null}
                                </>
                            ) : null}
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
