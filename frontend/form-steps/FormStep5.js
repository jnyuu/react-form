import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep5 = () => {
    const { step5, setStep5 } = useContext(AllContext);

    function setValue1(e) {
        let tempObj = { ...step5 }
        tempObj.value1 = e.target.value
        setStep5(tempObj)
    }
    function setValue2(e) {
        let tempObj = { ...step5 }
        tempObj.value2 = e.target.value
        setStep5(tempObj)
    }

    return <GeneralFormWrapper title={"Example question 5"}
        tip={"Example tip 5 - An example select box 'revenue', and an example text box"}
        formClass="step-5">
        <div className="form-field-wrapper ">
            <select value={step5.value1} name="" id="" onChange={(e) => { setValue1(e) }}>
                <option value="Don't know">Don't know</option>
                <option value="Less than $100 000">Less than $100 000</option>
                <option value="$100 000 - $1 000 000" > $100 000 - $1 000 000</option >
                <option value="$1 000 001 to $100 000 000" > $1 000 001 to $100 000 000</option >
                <option value="more than $100 000 000" > more than $100 00 000</option >
            </select >
            <input type="text" placeholder="placeholder" value={step5.value2} onChange={(e) => { setValue2(e) }} />
        </div>
    </GeneralFormWrapper >
};

export default FormStep5;