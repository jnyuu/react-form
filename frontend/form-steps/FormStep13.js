import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep13 = () => {

    const { step13, setStep13 } = useContext(AllContext);

    const maxNumberOfFields = 10;

    function setSingleUrl(e, id) {
        let tempObj = [...step13]
        tempObj[id] = e.target.value
        setStep13(tempObj)
    }

    function removeField(e, id) {
        e.preventDefault();

        if (step13.length <= 1) {
        } else {
            let tempObj = [...step13]
            tempObj.splice(id, 1);
            setStep13(tempObj)
        }
    }

    function addField(e) {
        e.preventDefault();

        if (step13.length >= maxNumberOfFields) {
        } else {
            let tempObj = [...step13]
            tempObj.push("")
            setStep13(tempObj)
        }
    }

    return <GeneralFormWrapper
        formClass="step-13"
        title={"Example question ?"}
        tip={"Example description ?"}>
        {step13.map((el, index) => {
            if (index == 0) {
                return <div className="form-field-wrapper form-field-wrapper--dynamic">
                    <input type="text" placeholder="placeholder" value={el} onChange={(e) => { setSingleUrl(e, index) }} />
                </div>
            } else {
                return <div className="form-field-wrapper form-field-wrapper--dynamic">
                    <input type="text" placeholder="placeholder" value={el} onChange={(e) => { setSingleUrl(e, index) }} />
                    <div className="remove-field-button" onClick={(e) => { removeField(e, index) }}><i class="fa-solid fa-circle-minus"></i></div>
                </div>

            }
        })}
        {
            step13.length >= maxNumberOfFields ? <React.Fragment></React.Fragment> : <div
                className="add-field-button"
            ><i class="fa-solid fa-circle-plus" onClick={addField}></i></div>
        }

    </GeneralFormWrapper>
};

export default FormStep13;




