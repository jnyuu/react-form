import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep3 = () => {

    const { step3, setStep3 } = useContext(AllContext);

    const maxNumberOfFields = 10;

    const setSingleIdealDecisionMaker = (e, id) => {
        let tempObj = [...step3]
        tempObj[id].decisionMaker = e.target.value
        setStep3(tempObj)
    }

    const setSinglePriority = (e, id) => {
        let tempObj = [...step3]
        tempObj[id].priority = parseInt(e.target.value)
        setStep3(tempObj)
    }


    function removeField(e, id) {
        e.preventDefault();

        if (step3.length <= 1) {
        } else {
            let tempObj = [...step3]
            tempObj.splice(id, 1);
            setStep3(tempObj)
        }
    }

    function addField(e) {
        e.preventDefault();

        if (step3.length >= maxNumberOfFields) {
        } else {
            let tempObj = [...step3]
            tempObj.push({
                decisionMaker: "",
                priority: 0
            })
            setStep3(tempObj)
        }
    }

    return <GeneralFormWrapper title={"Example question 3"}
        tip={"Example tip 3 - items with priorities"} formClass="step-3">
        {step3.map((el, index) => {
            if (index == 0) {
                return <div className="form-field-wrapper form-field-wrapper--dynamic">
                    <input type="text" placeholder="placeholder" value={el.decisionMaker} onChange={(e) => { setSingleIdealDecisionMaker(e, index) }} />
                    <div className="slider-container">
                        <input type="range" min={0} max={10} value={el.priority} onChange={(e) => { setSinglePriority(e, index) }} />
                        <div className="higher-priority-label">Higher priority</div>
                        <div className="lower-priority-label" >Lower priority</div>
                    </div>
                </div>
            } else {
                return <div className="form-field-wrapper form-field-wrapper--dynamic">
                    <input type="text" placeholder="placeholder" value={el.decisionMaker} onChange={(e) => { setSingleIdealDecisionMaker(e, index) }} />
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
            step3.length >= maxNumberOfFields ? <React.Fragment></React.Fragment> : <div
                className="add-field-button"
            ><i class="fa-solid fa-circle-plus" onClick={addField}></i></div>
        }
    </GeneralFormWrapper>
};


export default FormStep3;
