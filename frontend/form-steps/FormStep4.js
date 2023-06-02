import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep4 = () => {

    const { step4, setStep4 } = useContext(AllContext);

    const maxNumberOfFields = 5;

    const setSinglePriority = (e, id) => {
        let tempObj = [...step4]
        tempObj[id].priority = parseInt(e.target.value)
        setStep4(tempObj)
    }

    const setSingleValue = (e, id) => {
        let tempObj = [...step4]
        tempObj[id].value = e.target.value
        setStep4(tempObj)
    }

    function removeField(e, id) {
        e.preventDefault();

        if (step4.length <= 1) {
        } else {
            let tempObj = [...step4]
            tempObj.splice(id, 1);
            setStep4(tempObj)
        }
    }

    function addField(e) {
        e.preventDefault();

        if (step4.length >= maxNumberOfFields) {
        } else {
            let tempObj = [...step4]
            tempObj.push({
                value: "1 person",
                priority: 0
            })
            setStep4(tempObj)
        }
    }

    return <GeneralFormWrapper title={"Example question 4"}
        tip={"Example tip 4 - linkedin company employees count select boxes, with an example 'priorities' slider"} formClass="step-4">

        {step4.map((el, index) => {
            if (index == 0) {
                return <div className="form-field-wrapper form-field-wrapper--dynamic">

                    <select value={el.value} name="" id="" onChange={(e) => { setSingleValue(e, index) }}>
                        <option value="1 person">1 person</option>
                        <option value="2 - 10 employees">2 - 10 employees</option>
                        <option value="11 - 50 employees" >11 - 50 employees</option>
                        <option value="51 - 200 employees" >51 - 200 employees</option>
                        <option value="201 - 500 employees" >201 - 500 employees</option>
                        <option value="501 - 1000 employees" >501 - 1000 employees</option>
                        <option value="1001 - 5000 employees" >1001 - 5000 employees</option>
                        <option value="5001 - 10000 employees" >5001 - 10000 employees</option>
                        <option value="10001 + employees" >10001+ employees</option>
                    </select >

                    <div className="slider-container">
                        <input type="range" min={0} max={10} value={el.priority} onChange={(e) => { setSinglePriority(e, index) }} />
                        <div className="higher-priority-label">Higher priority</div>
                        <div className="lower-priority-label" >Lower priority</div>
                    </div>
                </div>
            } else {
                return <div className="form-field-wrapper form-field-wrapper--dynamic">
                    <div className="remove-field-button" onClick={(e) => { removeField(e, index) }}><i class="fa-solid fa-circle-minus"></i></div>

                    <select value={el.value} name="" id="" onChange={(e) => { setSingleValue(e, index) }}>
                        <option value="1 person">1 person</option>
                        <option value="2 - 10 employees">2 - 10 employees</option>
                        <option value="11 - 50 employees" >11 - 50 employees</option>
                        <option value="51 - 200 employees" >51 - 200 employees</option>
                        <option value="201 - 500 employees" >201 - 500 employees</option>
                        <option value="501 - 1000 employees" >501 - 1000 employees</option>
                        <option value="1001 - 5000 employees" >1001 - 5000 employees</option>
                        <option value="5001 - 10000 employees" >5001 - 10000 employees</option>
                        <option value="10001 + employees" >10001+ employees</option>
                    </select >

                    <div className="slider-container">
                        <input type="range" min={0} max={10} value={el.priority} onChange={(e) => { setSinglePriority(e, index) }} />
                        <div className="higher-priority-label">Higher priority</div>
                        <div className="lower-priority-label" >Lower priority</div>
                    </div>
                </div>
            }
        })}

        {
            step4.length >= maxNumberOfFields ? <React.Fragment></React.Fragment> : <div
                className="add-field-button"
            ><i class="fa-solid fa-circle-plus" onClick={addField}></i></div>
        }
    </GeneralFormWrapper >
};

export default FormStep4;


