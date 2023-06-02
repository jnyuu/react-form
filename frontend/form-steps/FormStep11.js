import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep11 = () => {

    const { step11, setStep11 } = useContext(AllContext);

    function setProductJob(e) {
        let tempObj = { ...step11 }
        tempObj.productJob = e.target.value
        setStep11(tempObj)
    }
    function setCustomerSolutions(e) {
        let tempObj = { ...step11 }
        tempObj.customerSolutions = e.target.value
        setStep11(tempObj)
    }

    return <GeneralFormWrapper title={"Example question 11.1"}
        tip={"Example tip 11.1 - textarea"}>
        <div className="form-field-wrapper">
            <textarea placeholder="placeholder" value={step11.productJob} onChange={(e) => { setProductJob(e) }}></textarea>
        </div>
        <h1 className="form-title">Example description 11.2</h1>
        <p className="tip">Example tip 11.2 - textarea</p>
        <div className="form-field-wrapper">
            <textarea placeholder="placeholder" value={step11.customerSolutions} onChange={(e) => { setCustomerSolutions(e) }}></textarea>
        </div>
    </GeneralFormWrapper>
};

export default FormStep11;



