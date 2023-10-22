//import $ from "jquery";
import { apiAddresses } from "./appInfo";
import $ from "jquery";
const setUp = () =>
  $.ajaxSetup({
    xhrFields: {
      withCredentials: true,
    },
  });

  const getReceipts = (callback) =>{
    setUp();
    $.get({
      url: apiAddresses.getReceipts,
      
      success: (data) => callback(data),
    });
  }
  const getReceiptsByProduct = (productInput, callback) =>{
    setUp();
    $.get({
      url: apiAddresses.getReceiptsByProduct,
      data: {
        productInput: productInput
      },
      success: (data) => callback(data),
    });
  }
  const getReceiptsByName = (nameInput,callback) =>{
    setUp();
    $.get({
      url: apiAddresses.getReceiptsByName,
      data: {
        nameInput: nameInput,
      },
      success: (data) => callback(data),
    });
  }
  const getReceiptsByDate = (dateInput,callback) =>{
    setUp();
    $.get({
      url: apiAddresses.getReceiptsByDate,
      data: {
        dateInput: dateInput,
      },
      success: (data) => callback(data),
    });
  }
export {getReceipts, getReceiptsByProduct,getReceiptsByName,getReceiptsByDate}
