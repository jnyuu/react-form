import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep14 = () => {

    const { step14, setStep14 } = useContext(AllContext);

    function setCustomerSolutions(e) {
        setStep14(e.target.value)
    }

    return <GeneralFormWrapper title={"Example question 14"}
        tip={"Example tip 14 - textarea"}>
        <div className="form-field-wrapper ">
            <textarea placeholder="placeholder" value={step14} onChange={(e) => { setCustomerSolutions(e) }}></textarea>
        </div>
    </GeneralFormWrapper>
};

export default FormStep14;