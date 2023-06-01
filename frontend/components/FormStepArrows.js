import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import AllContext from "../contexts/AllContext"
import { useNavigate } from "react-router-dom";

const FormStepArrows = ({ children }) => {
    const navigate = useNavigate();
    const { currentFormStep, setCurrentFormStep } = useContext(AllContext);


    const NextStep = () => {
        if (currentFormStep !== 15) {
            const nextStepNumber = parseInt(currentFormStep) + 1;
            navigate(`/form/step-${nextStepNumber}`, { replace: true });
            setCurrentFormStep(nextStepNumber)
        }
    }

    const PreviousStep = () => {
        if (currentFormStep !== 1) {
            const nextStepNumber = parseInt(currentFormStep) - 1;
            navigate(`/form/step-${nextStepNumber}`, { replace: true });
            setCurrentFormStep(nextStepNumber)
        }
    }

    useEffect(() => {

    }, [])
    return (
        <React.Fragment>
            <button onClick={PreviousStep} className="previous-step-button"><i class="fa-solid fa-square-caret-left"></i></button>
            <button onClick={NextStep} className="next-step-button"><i class="fa-solid fa-square-caret-right"></i></button>
        </React.Fragment>
    );
}


export default FormStepArrows;
