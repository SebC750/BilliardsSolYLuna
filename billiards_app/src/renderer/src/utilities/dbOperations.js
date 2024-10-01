//Modularized db operations away from pages. Makes code clean and easy to follow.
export async function getAllOrders(offset, limit) {
    try {
        console.log("Retrieving all data. Offset: "+offset+", Limit: "+limit)
        const response = await window.api.getAll(offset, limit)
        return response
    } catch (e) {
        console.error("Could not retrieve database records. Error: " + e)
    }

}
export async function getOrderByTable(table, offset, limit) {
    try {
        console.log("Retrieving all data. Offset: "+offset+", Limit: "+limit)
        const response = await window.api.getAllByTable(table, offset, limit)
        return response
    } catch (e) {
        console.error("Could not retrieve database records by table. Error: " + e)

    }
}
export async function getOrderByName(name, offset, limit) {
    try {
        console.log("Retrieving all data. Offset: "+offset+", Limit: "+limit)
        const response = await window.api.searchForName(name, offset, limit)
        return response
    } catch (e) {
        console.error("Could not retrieve database records by name. Error: " + e)

    }
}
export async function getOrderByProduct(product, offset, limit) {
    try {
        console.log("Retrieving all data. Offset: "+offset+", Limit: "+limit)
        const response = await window.api.searchForProduct(product, offset, limit)
        return response
    } catch (e) {
        console.error("Could not retrieve database records by product. Error: " + e)

    }
}
export async function getOrderByDate(date, offset, limit) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.searchForDate(date, offset, limit)
        return response
    } catch (e) {
        console.error("Could not retrieve database records by date. Error: " + e)

    }
}
export async function getOrderByStatus(status) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.searchForStatus(status)
        return response
    } catch (e) {
        console.error("Could not retrieve database records by status. Error: " + e)

    }
}
export async function getOrdersByReceiptID(receiptID) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.searchForReceiptOrders(receiptID)
        return response
    } catch (e) {
        console.error("Could not retrieve database records by receipt. Error: " + e)

    }
}
export async function insertOrder(data) {
    try {
        console.log("Inserting data")
        const response = await window.api.insertOrder(
            {
                clientName: data['clientName'],
                receiptID: data['receiptID'],
                product: data['product'],
                quantity: data['quantity'],
                price: data['price'],
                table: data['table'],
                status: data['status'],
                date: data['date'],
            })

        return "Order inserted to db successfully!"

    } catch (e) {
        console.error("Could not insert data. Error: " + e)

    }
}
export async function updateOrderAsPaid(dataID) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.changeOrderStatus(dataID)
        console.log(response)
    } catch (e) {
        console.error("Could not update paid order. Error: " + e)

    }
}
export async function deleteOrder(dataID) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.deleteOrder(dataID)
        console.log(response)
    } catch (e) {
        console.error("Could not delete order. Error: " + e)

    }
}
export async function deleteAllOrdersFromReceipt(dataID){
    try {
        console.log("Retrieving all data")
        const response = await window.api.deleteAllOrdersFromReceipt(dataID)
        console.log(response)
    } catch (e) {
        console.error("Could not delete order. Error: " + e)

    }
}
export async function generateNewReceiptID(){
    try{
        const response = await window.api.generateNewReceiptID()
        return response
    }catch(e){
        console.error("Generate new receipt id. Error: " + e)
    }
}
