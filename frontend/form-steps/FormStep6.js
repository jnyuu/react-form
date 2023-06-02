import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep6 = () => {

    const { step6, setStep6 } = useContext(AllContext);

    function setValue(e) {
        setStep6(e.target.value)
    }

    return <GeneralFormWrapper title={"Example question 6"}
        tip={"Example tip 6 - textarea"}>
        <div className="form-field-wrapper ">
            <textarea placeholder="placeholder" value={step6} onChange={(e) => { setValue(e) }}></textarea>
        </div>
    </GeneralFormWrapper>
};

export default FormStep6;
