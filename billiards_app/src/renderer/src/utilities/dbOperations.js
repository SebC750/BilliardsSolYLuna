//Modularized db operations away from pages. Makes code clean and easy to follow.
export async function getAllOrders() {
    try {
        console.log("Retrieving all data")
        const response = await window.api.getAll()
        console.log(response)
    } catch (e) {
        console.error("Could not retrieve database records. Error: " + e)

    }

}
export async function getOrderByTable(table) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.getAllByTable(table)
        console.log(response)
    } catch (e) {
        console.error("Could not retrieve database records by table. Error: " + e)

    }
}
export async function getOrderByName(name) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.searchForName(name)
        console.log(response)
    } catch (e) {
        console.error("Could not retrieve database records by name. Error: " + e)

    }
}
export async function getOrderByProduct(product) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.searchForProduct(product)
        console.log(response)
    } catch (e) {
        console.error("Could not retrieve database records by product. Error: " + e)

    }
}
export async function getOrderByDate(date) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.searchForDate(date)
        console.log(response)
    } catch (e) {
        console.error("Could not retrieve database records by date. Error: " + e)

    }
}
export async function getOrderByStatus(status) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.searchForStatus(status)
        console.log(response)
    } catch (e) {
        console.error("Could not retrieve database records by status. Error: " + e)

    }
}
export async function insertOrder(data) {
    try {
        console.log("Inserting data")
        const response = await window.api.insertOrder(
            {
                clientName: data['clientName'],
                product: data['product'],
                quantity: data['quantity'],
                price: data['price'],
                table: data['table'],
                status: data['status']
            })

        return "Order inserted to db successfully!"

    } catch (e) {
        console.error("Could not insert data. Error: " + e)

    }
}
export async function updateOrderAsPaid(dataID) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.updateOrderAsPaid(dataID)
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
export async function generateNewReceiptID(){
    try{
        const response = await window.api.generateNewReceiptID()
        return response
    }catch(e){
        console.error("Generate new receipt id. Error: " + e)
    }
}
