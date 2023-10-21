from flask import Flask
from flask_cors import CORS
from flask import jsonify
from mysql.connector import Error
import pymysql
import typing
import mysql.connector
import json
api = Flask(__name__)
CORS(api, supports_credentials=True)

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
connection = None
try:
    
    if connection.is_connected():
        db_Info = connection.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = connection.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)

except Error as e:
    print("Error while connecting to MySQL", e)


@api.route('/GetReceipts')
def my_profile():
    
    
    getConnect = connection.cursor(buffered=True)
    query = ("SELECT * FROM Receipts")
    getConnect.execute(query)
    row = getConnect.fetchall()
    print(row)
    return row