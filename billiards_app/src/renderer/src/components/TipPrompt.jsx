//Added tip prompt in its separate file. I don't want to keep clogging the table and other receipts page. Also makes it reusable for all kinds of receipts.
import { useState } from "react"
import { Row, Button } from "react-bootstrap"
import { addTip } from "../utilities/functions.js";
export const TipPrompt = ({ isTipPromptOpen, totalPrice, tableColor, handleAddTip }) => {
    const addTipToPrice = (tipPercentage) => {
        try {
            let totalPriceWithTip = null;
            let tipInfo = null
            let tipAmount = null
            switch (tipPercentage) {
                case "10%":
                    totalPriceWithTip = addTip(totalPrice, 10);
                    tipAmount = (totalPrice * 0.1).toFixed(2)
                    tipInfo = "10% (" + tipAmount + ")"
                    handleAddTip(tipInfo, totalPriceWithTip)
                    break;
                case "15%":
                    totalPriceWithTip = addTip(totalPrice, 15);
                    tipAmount = (totalPrice * 0.15).toFixed(2)
                    tipInfo = "15% (" + tipAmount + ")"
                    handleAddTip(tipInfo, totalPriceWithTip);     
                    break;
                case "20%":
                    totalPriceWithTip = addTip(totalPrice, 20);
                    tipAmount = (totalPrice * 0.20).toFixed(2)
                    tipInfo = "20% (" + tipAmount + ")"
                    handleAddTip(tipInfo, totalPriceWithTip)
                    break;
                default:
                    break;
            }
        } catch (e) {
            return "Error:" + e;
        }
    }
    return (
        <>
            {isTipPromptOpen && (
                <Row>
                    <div className="tip-section"> Si aplicable, selecione porcentaje de propina
                        <div className="tip-options">
                            <Button variant={tableColor === "red" ? "danger" : tableColor === "blue" ? "primary" : tableColor === "green" ? "success" : "warning"} onClick={() => addTipToPrice("10%")}> 10% </Button>
                            <Button variant={tableColor === "red" ? "danger" : tableColor === "blue" ? "primary" : tableColor === "green" ? "success" : "warning"} onClick={() => addTipToPrice("15%")}> 15% </Button>
                            <Button variant={tableColor === "red" ? "danger" : tableColor === "blue" ? "primary" : tableColor === "green" ? "success" : "warning"} onClick={() => addTipToPrice("20%")}> 20% </Button>
                        </div>

                    </div>
                </Row>
            )}

        </>
    )
}