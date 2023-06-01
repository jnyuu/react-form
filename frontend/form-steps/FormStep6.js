import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep6 = () => {

    const { step6, setStep6 } = useContext(AllContext);

    function setAssociations(e) {
        setStep6(e.target.value)
    }

    return <GeneralFormWrapper title={"Example question ?"}
        tip={"Example description ?"}>
        <div className="form-field-wrapper ">
            <textarea placeholder="placeholder..." value={step6} onChange={(e) => { setAssociations(e) }}></textarea>
        </div>
    </GeneralFormWrapper>
};

export default FormStep6;
