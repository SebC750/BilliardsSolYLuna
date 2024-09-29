export function calculateTotalPrice(time, itemPurchaseList){
        let h = Math.floor(time / 3600).toFixed(0);
        let m = Math.floor((time % 3600) / 60).toFixed(0);
        let s = (time % 60).toFixed(0);
        
        let total = 0;
        itemPurchaseList.forEach((val) => {
            total += val.price;
        });

        let tablePrice = (20 * h) + (20 / 60 * m) + (20 / 3600 * s);
      
        let totalPrice = tablePrice + total;
        
        let salesTax = totalPrice * 0.08875; 
        let totalPriceWithSales = (Math.round((totalPrice + salesTax) * 100) / 100).toFixed(2);
        
        
       return totalPriceWithSales
}