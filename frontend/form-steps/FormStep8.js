import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"
import Select from 'react-select'
import regionDropdownOptions from "../variables/regionDropdownOptions"

const FormStep8 = () => {

    const { step8, setStep8 } = useContext(AllContext);

    const maxNumberOfFields = 5;

    function setSingleRegion(e, id) {
        let tempObj = [...step8]
        tempObj[id] = e
        setStep8(tempObj)
    }

    function removeField(e, id) {
        e.preventDefault();

        if (step8.length <= 1) {
        } else {
            let tempObj = [...step8]
            tempObj.splice(id, 1);
            setStep8(tempObj)
        }
    }

    function addField(e) {
        e.preventDefault();

        if (step8.length >= maxNumberOfFields) {
        } else {
            let tempObj = [...step8]
            tempObj.push({
                "label": "Choose the : country/region/state",
                "value": "Choose the : country/region/state"
            })
            setStep8(tempObj)
        }
    }

    return <GeneralFormWrapper title={"Example question 8"}
        tip={"Example tip 8 - Country/Region select boxes"}
        formClass="step-8" >
        {step8.map((el, index) => {
            if (index == 0) {
                return <div className="form-field-wrapper form-field-wrapper--dynamic">
                    <Select options={regionDropdownOptions} value={el} onChange={(e) => { setSingleRegion(e, index) }} placeholder="Choose the : country/region/state" />

                </div>
            } else {
                return <div className="form-field-wrapper form-field-wrapper--dynamic">
                    <Select options={regionDropdownOptions} value={el} onChange={(e) => { setSingleRegion(e, index) }} placeholder="Choose the : country/region/state" />
                    <div className="remove-field-button" onClick={(e) => { removeField(e, index) }}><i class="fa-solid fa-circle-minus"></i></div>
                </div>

            }
        })}
        {
            step8.length >= maxNumberOfFields ? <React.Fragment></React.Fragment> : <div
                className="add-field-button"
            ><i class="fa-solid fa-circle-plus" onClick={addField}></i></div>
        }

    </GeneralFormWrapper >
};

export default FormStep8;


