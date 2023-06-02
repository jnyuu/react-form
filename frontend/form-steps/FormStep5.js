import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep5 = () => {
    const { step5, setStep5 } = useContext(AllContext);

    function setRevenue(e) {
        let tempObj = { ...step5 }
        tempObj.revenue = e.target.value
        setStep5(tempObj)
    }
    function setFunding(e) {
        let tempObj = { ...step5 }
        tempObj.funding = e.target.value
        setStep5(tempObj)
    }

    return <GeneralFormWrapper title={"Example question 5"}
        tip={"Example tip 5 - An example select box 'revenue', and an example text box"}
        formClass="step-5">
        <div className="form-field-wrapper ">
            <select value={step5.revenue} name="" id="" onChange={(e) => { setRevenue(e) }}>
                <option value="Don't know">Don't know</option>
                <option value="Less than $100 000">Less than $100 000</option>
                <option value="$100 000 - $1 000 000" > $100 000 - $1 000 000</option >
                <option value="$1 000 001 to $100 000 000" > $1 000 001 to $100 000 000</option >
                <option value="more than $100 000 000" > more than $100 00 000</option >
            </select >
            <input type="text" placeholder="placeholder" value={step5.funding} onChange={(e) => { setFunding(e) }} />
        </div>
    </GeneralFormWrapper >
};

export default FormStep5;