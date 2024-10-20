//Included in this file are functions meant to do stuff so that it doesn't need to be in the webpage code. Particularly useful for functions that just do price calculations.

export function addTip(totalPrice, tipPercentage){
     try{
        let tipAmount = parseFloat(totalPrice) * parseFloat((tipPercentage/100))
        let totalPriceWithTip = parseFloat(totalPrice) + tipAmount;
        return parseFloat(totalPriceWithTip).toFixed(2);
     }catch(e){
        return "Sorry! Cannot calculate the total price with tip amount at this time. Error: "+e
     }
}