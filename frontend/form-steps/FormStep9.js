import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep9 = () => {

    const { step9, setStep9 } = useContext(AllContext);

    function setCustomerSimiliarities(e) {
        setStep9(e.target.value)
    }

    return <GeneralFormWrapper title={"Example question ?"}
        tip={"Example description ?"}>
        <div className="form-field-wrapper ">
            <textarea placeholder="The similarities between my target customers are..." value={step9} onChange={(e) => { setCustomerSimiliarities(e) }}></textarea>
        </div>
    </GeneralFormWrapper>
};

export default FormStep9;


