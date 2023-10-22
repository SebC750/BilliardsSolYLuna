from flask import Flask, request
from flask_cors import CORS
from flask import jsonify
from mysql.connector import Error
import pymysql
import typing
import mysql.connector
import json
api = Flask(__name__)
CORS(api, supports_credentials=True)

#Class for Receipt
class Receipt:
    def __init__(self,ID,name,date):
        self.ID = ID
        self.name = name
        self.date = date
    def to_json(self):
        return {
            "ID": self.ID,
            "ReceiptName": self.name,
            "Date": self.date
        }

class ReceiptOrder:
    def __init__(self,orderID,receiptName,quantity,product,price,date):
        self.orderID = orderID
        self.receiptName = receiptName
        self.quantity = quantity
        self.product = product
        self.price = price
        self.date = date
    def to_json(self):
        return {
            "OrderID": self.orderID,
            "ReceiptName": self.receiptName,
            "Quantity": self.quantity,
            "Product": self.product,
            "Price": self.price,
            "Date": self.date,
        }

connection = None
try:
    connection = mysql.connector.connect(host="", database="", username="",password="",port="")
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)

except Error as e:
    print("Error while connecting to MySQL", e)

@api.route('/')
def welcomeMessage():
    welcome = "hello world"
    return welcome
    
@api.route('/GetReceipts')
def getReceipts():    
    getConnect = connection.cursor(buffered=True)
    query = ("SELECT ReceiptOrders.OrderID, Receipts.ReceiptName, ReceiptOrders.quantity, ReceiptOrders.product, ReceiptOrders.price, ReceiptOrders.ReceiptDate FROM ReceiptOrders INNER JOIN receipts ON receipts.ReceiptID = receiptorders.ReceiptID")
    getConnect.execute(query)
    row = getConnect.fetchall()
    
    rowList = []
    for i in row:
        d = ReceiptOrder(i[0],i[1],i[2],i[3],i[4],i[5]).to_json()
        rowList.append(d)
    rowDict = {
        "ReceiptOrders": rowList
    }  
    
    return rowDict
@api.route('/GetReceiptsByProduct', methods=['GET'])
def getReceiptsByProduct():
    getConnect = connection.cursor(buffered=True)
    product = request.args.get('productInput')
    print("Result",product)
    query = "SELECT ReceiptOrders.OrderID, Receipts.ReceiptName, ReceiptOrders.quantity, ReceiptOrders.product, ReceiptOrders.price, ReceiptOrders.ReceiptDate FROM ReceiptOrders INNER JOIN receipts ON receipts.ReceiptID = receiptorders.ReceiptID WHERE receiptorders.product = %s"
    
    productQuery = (product,)
    getConnect.execute(query, productQuery)
    row = getConnect.fetchall()
    
    rowList = []
    for i in row:
        d = ReceiptOrder(i[0],i[1],i[2],i[3],i[4],i[5]).to_json()
        rowList.append(d)
    rowDict = {
        "ReceiptOrders": rowList
    }
    return rowDict
@api.route('/GetReceiptsByName')
def getReceiptsByName():
    getConnect = connection.cursor(buffered=True)
    name = request.args.get('nameInput')
    print("Result",name)
    query = "SELECT ReceiptOrders.OrderID, Receipts.ReceiptName, ReceiptOrders.quantity, ReceiptOrders.product, ReceiptOrders.price, ReceiptOrders.ReceiptDate FROM ReceiptOrders INNER JOIN receipts ON receipts.ReceiptID = receiptorders.ReceiptID WHERE receipts.ReceiptName = %s"
    
    nameQuery = (name,)
    getConnect.execute(query, nameQuery)
    row = getConnect.fetchall()
    
    rowList = []
    for i in row:
        d = ReceiptOrder(i[0],i[1],i[2],i[3],i[4],i[5]).to_json()
        rowList.append(d)
    rowDict = {
        "ReceiptOrders": rowList
    }
    return rowDict
@api.route('/GetReceiptsByDate')
def getReceiptsByDate():
    print("")