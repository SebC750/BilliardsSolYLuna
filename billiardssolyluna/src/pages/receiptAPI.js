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

export {getReceipts}
