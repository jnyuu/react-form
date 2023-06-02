import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep2 = () => {

    const { step2, setStep2 } = useContext(AllContext);

    function setWhoToAvoid(e) {
        setStep2(e.target.value)
    }

    return <GeneralFormWrapper title={"Example question 2"}
        tip={"Example tip 2 - textarea"}>
        <div className="form-field-wrapper ">
            <textarea placeholder="placeholder" value={step2} onChange={(e) => { setWhoToAvoid(e) }}></textarea>
        </div>
    </GeneralFormWrapper>
};

export default FormStep2;