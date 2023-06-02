import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep12 = () => {

    const { step12, setStep12 } = useContext(AllContext);

    function setCustomersSpecialRequirements(e) {
        setStep12(e.target.value)
    }

    return <GeneralFormWrapper title={"Example question 12"}
        tip={"Example tip 12 - textarea"}>
        <div className="form-field-wrapper ">
            <textarea placeholder="placeholder" value={step12} onChange={(e) => { setCustomersSpecialRequirements(e) }}></textarea>
        </div>
    </GeneralFormWrapper>
};

export default FormStep12;





