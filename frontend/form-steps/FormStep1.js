import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep1 = () => {

    const { step1, setStep1 } = useContext(AllContext);

    const maxNumberOfFields = 10;

    const setSingleValue = (e, id) => {
        let tempObj = [...step1]
        tempObj[id].value = e.target.value
        setStep1(tempObj)
    }

    const setSinglePriority = (e, id) => {
        let tempObj = [...step1]
        tempObj[id].priority = parseInt(e.target.value)
        setStep1(tempObj)
    }

    function removeField(e, id) {
        e.preventDefault();

        if (step1.length <= 1) {
        } else {
            let tempObj = [...step1]
            tempObj.splice(id, 1);
            setStep1(tempObj)
        }
    }

    function addField(e) {
        e.preventDefault();

        if (step1.length >= maxNumberOfFields) {
        } else {
            let tempObj = [...step1]
            tempObj.push({
                value: "",
                priority: 0
            })
            setStep1(tempObj)
        }
    }

    return <GeneralFormWrapper title={"Example question 1"}
        tip={"Example tip 1 - items with priorities"}
        formClass="step-1">
        {step1.map((el, index) => {
            if (index == 0) {
                return <div className="form-field-wrapper form-field-wrapper--dynamic">
                    <input type="text" placeholder="Enter an answer" value={el.value} onChange={(e) => { setSingleValue(e, index) }} />
                    <div className="slider-container">
                        <input type="range" min={0} max={10} value={el.priority} onChange={(e) => { setSinglePriority(e, index) }} />
                        <div className="higher-priority-label">Higher priority</div>
                        <div className="lower-priority-label" >Lower priority</div>
                    </div>
                </div>
            } else {
                return <div className="form-field-wrapper form-field-wrapper--dynamic">
                    <input type="text" placeholder="Enter an answer" value={el.value} onChange={(e) => { setSingleValue(e, index) }} />
                    <div className="remove-field-button" onClick={(e) => { removeField(e, index) }}><i class="fa-solid fa-circle-minus"></i></div>
                    <div className="slider-container">
                        <input type="range" min={0} max={10} value={el.priority} onChange={(e) => { setSinglePriority(e, index) }} />
                        <div className="higher-priority-label">Higher priority</div>
                        <div className="lower-priority-label" >Lower priority</div>
                    </div>
                </div>

            }
        })}
        {
            step1.length >= maxNumberOfFields ? <React.Fragment></React.Fragment> : <div
                className="add-field-button"
            ><i class="fa-solid fa-circle-plus" onClick={addField}></i></div>
        }
    </GeneralFormWrapper>
};


export default FormStep1;
