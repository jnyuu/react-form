import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"
import regionDropdownOptions from "../variables/regionDropdownOptions"
import Select from 'react-select'


const FormStep7 = () => {

    const { step7, setStep7 } = useContext(AllContext);

    const maxNumberOfFields = 5;

    function setSingleRegion(e, id) {
        let tempObj = [...step7]
        tempObj[id] = e
        setStep7(tempObj)
    }

    function removeField(e, id) {
        e.preventDefault();

        if (step7.length <= 1) {
        } else {
            let tempObj = [...step7]
            tempObj.splice(id, 1);
            setStep7(tempObj)
        }
    }

    function addField(e) {
        e.preventDefault();

        if (step7.length >= maxNumberOfFields) {
        } else {
            let tempObj = [...step7]
            tempObj.push({
                "label": "Choose the : country/region/state",
                "value": "Choose the : country/region/state"
            })
            setStep7(tempObj)
        }
    }

    return <GeneralFormWrapper title={"Example question ?"}
        tip={"Example description ?"}
        formClass="step-7">


        {step7.map((el, index) => {
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
            step7.length >= maxNumberOfFields ? <React.Fragment></React.Fragment> : <div
                className="add-field-button"
            ><i class="fa-solid fa-circle-plus" onClick={addField}></i></div>
        }

    </GeneralFormWrapper >
};

export default FormStep7;
