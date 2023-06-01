import {
    Link
} from "react-router-dom";
import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import AllContext from "../contexts/AllContext";

const FormNavigation = () => {

    const { currentFormStep, setCurrentFormStep } = useContext(AllContext);

    const updateCurrentFormStep = (e, id) => {
        const nextStepNumber = parseInt(id);
        setCurrentFormStep(nextStepNumber)
    }

    return <nav className="navigation-wrapper" >
        <ul>
            <li>
                <Link className={`${currentFormStep === 1 ? "active" : ""}`} to="/form/step-1"><span onClick={(e) => { updateCurrentFormStep(e, 1) }}>Step 1</span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 2 ? "active" : ""}`} to="/form/step-2"><span onClick={(e) => { updateCurrentFormStep(e, 2) }}>Step 2</span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 3 ? "active" : ""}`} to="/form/step-3"><span onClick={(e) => { updateCurrentFormStep(e, 3) }}>Step 3 </span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 4 ? "active" : ""}`} to="/form/step-4"><span onClick={(e) => { updateCurrentFormStep(e, 4) }}>Step 4</span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 5 ? "active" : ""}`} to="/form/step-5"><span onClick={(e) => { updateCurrentFormStep(e, 5) }}>Step 5</span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 6 ? "active" : ""}`} to="/form/step-6"><span onClick={(e) => { updateCurrentFormStep(e, 6) }}>Step 6</span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 7 ? "active" : ""}`} to="/form/step-7"><span onClick={(e) => { updateCurrentFormStep(e, 7) }}>Step 7</span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 8 ? "active" : ""}`} to="/form/step-8"><span onClick={(e) => { updateCurrentFormStep(e, 8) }}>Step 8</span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 9 ? "active" : ""}`} to="/form/step-9"><span onClick={(e) => { updateCurrentFormStep(e, 9) }}>Step 9</span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 10 ? "active" : ""}`} to="/form/step-10"><span onClick={(e) => { updateCurrentFormStep(e, 10) }}>Step 10</span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 11 ? "active" : ""}`} to="/form/step-11"><span onClick={(e) => { updateCurrentFormStep(e, 11) }}>Step 11</span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 12 ? "active" : ""}`} to="/form/step-12"><span onClick={(e) => { updateCurrentFormStep(e, 12) }}>Step 12</span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 13 ? "active" : ""}`} to="/form/step-13"><span onClick={(e) => { updateCurrentFormStep(e, 13) }}>Step 13</span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 14 ? "active" : ""}`} to="/form/step-14"><span onClick={(e) => { updateCurrentFormStep(e, 14) }}>Step 14</span></Link>
            </li>
            <li>
                <Link className={`${currentFormStep === 15 ? "active" : ""}`} to="/form/step-15"><span onClick={(e) => { updateCurrentFormStep(e, 15) }}>Summary</span></Link>
            </li>
        </ul>
    </nav>
        ;
};

export default FormNavigation;