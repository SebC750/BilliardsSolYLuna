//Modularized db operations away from pages. Makes code clean and easy to follow. Also separates the api from the UI. 

//Included all of my api in a class to easily define the apis where needed and write out the functions with api. instead of having to write import statements for the functions.
class API {
    constructor() {
        
    }

async getAllOrders(offset, limit) {
    try {     
        const response = await window.api.getAll(offset, limit)
        return response
    } catch (e) {
        console.error("Could not retrieve database records. Error: " + e)
    }

}
async getOrderByTable(table, offset, limit) {
    try {
        
        const response = await window.api.searchForTable(table, offset, limit)
        return response
    } catch (e) {
        console.error("Could not retrieve database records by table. Error: " + e)
    }
}
async getOrderByName(name, offset, limit) {
    try {
        
        const response = await window.api.searchForName(name, offset, limit)
        return response
    } catch (e) {
        console.error("Could not retrieve database records by name. Error: " + e)

    }
}
async getOrderByProduct(product, offset, limit) {
    try {
       
        const response = await window.api.searchForProduct(product, offset, limit)
        return response
    } catch (e) {
        console.error("Could not retrieve database records by product. Error: " + e)

    }
}
async getOrderByDate(date, offset, limit) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.searchForDate(date, offset, limit)
        return response
    } catch (e) {
        console.error("Could not retrieve database records by date. Error: " + e)

    }
}
async getOrderByStatus(status) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.searchForStatus(status)
        return response
    } catch (e) {
        console.error("Could not retrieve database records by status. Error: " + e)

    }
}
async getOrdersByReceiptID(receiptID) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.searchForReceiptOrders(receiptID)
        return response
    } catch (e) {
        console.error("Could not retrieve database records by receipt. Error: " + e)

    }
}
async insertOrder(data) {
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
async updateOrderAsPaid(receiptID, orderID){
    try {
        console.log("Retrieving all data")
        const response = await window.api.changeOrderStatus(receiptID, orderID)
        console.log(response)
    } catch (e) {
        console.error("Could not update paid order. Error: " + e)
    }
}
async updateOrderAsPaidByDate(receiptID, date) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.changeOrderStatusByDate(receiptID, date)
        console.log(response)
    } catch (e) {
        console.error("Could not update paid order. Error: " + e)

    }
}
async deleteOrder(receiptID, orderID) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.deleteOrder(receiptID, orderID)
        console.log(response)
    } catch (e) {
        console.error("Could not delete order. Error: " + e)

    }
}
async deleteOrderByDate(receiptID, date) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.deleteOrderByDate(receiptID, date)
        console.log(response)
    } catch (e) {
        console.error("Could not delete order. Error: " + e)

    }
}
async deleteAllOrdersFromReceipt(receiptID) {
    try {
        console.log("Retrieving all data")
        const response = await window.api.deleteAllOrdersFromReceipt(receiptID)
        console.log(response)
    } catch (e) {
        console.error("Could not delete order. Error: " + e)

    }
}
async generateNewReceiptID() {
    try {
        const response = await window.api.generateNewReceiptID()
        return response
    } catch (e) {
        console.error("Generate new receipt id. Error: " + e)
    }
}
}
export default API