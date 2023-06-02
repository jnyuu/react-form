import React, { useState, useEffect, useContext, useRef } from "react";
import ReactDOM from "react-dom";

import LoginForm from "./form-steps/LoginForm"
import FormStep1 from "./form-steps/FormStep1"
import FormStep2 from "./form-steps/FormStep2"
import FormStep3 from "./form-steps/FormStep3"
import FormStep4 from "./form-steps/FormStep4"
import FormStep5 from "./form-steps/FormStep5"
import FormStep6 from "./form-steps/FormStep6"
import FormStep7 from "./form-steps/FormStep7"
import FormStep8 from "./form-steps/FormStep8"
import FormStep9 from "./form-steps/FormStep9"
import FormStep10 from "./form-steps/FormStep10"
import FormStep11 from "./form-steps/FormStep11"
import FormStep12 from "./form-steps/FormStep12"
import FormStep13 from "./form-steps/FormStep13"
import FormStep14 from "./form-steps/FormStep14"
import FormSummary from "./form-steps/FormSummary"

import FormBackground from "./components/FormBackground"

import AllContext from "./contexts/AllContext";

import Logout from "./components/Logout";
import FormStepArrows from "./components/FormStepArrows";

import NotFound from "./NotFound"
import FormNavigation from "./components/FormNavigation";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Protected from "./components/Protected";
import axios from 'axios';


const App = () => {

    const [currentFormStep, setCurrentFormStep] = useState(1);

    const [loggedIn, setLoggedIn] = useState(false);
    const [formMessage, setFormMessage] = useState("");

    const [step1, setStep1] = useState([{
        industry: "",
        priority: 0
    }]);
    const [step2, setStep2] = useState("");
    const [step3, setStep3] = useState([{ decisionMaker: "", priority: 0 }]);
    const [step4, setStep4] = useState([
        {
            "employees": "1 person",
            "priority": 0
        },
    ]);
    const [step5, setStep5] = useState({
        revenue: "Don't Know",
        funding: ""
    });
    const [step6, setStep6] = useState("");
    const [step7, setStep7] = useState([{
        label: "Choose the : country/region/state",
        value: "Choose the : country/region/state"
    }]);
    const [step8, setStep8] = useState([{
        label: "Choose the : country/region/state",
        value: "Choose the : country/region/state"
    }]);
    const [step9, setStep9] = useState("");
    const [step10, setStep10] = useState([
        {
            "dataPoint": "email",
            "checked": false
        },
        {
            "dataPoint": "phone",
            "checked": false
        },
        {
            "dataPoint": "text",
            "checked": false
        },
        {
            "dataPoint": "socialMedia",
            "checked": false
        },
        {
            "dataPoint": "faceToFace",
            "checked": false
        }
    ]);
    const [step11, setStep11] = useState({
        "productJob": "",
        "customerSolutions": ""
    });
    const [step12, setStep12] = useState("");
    const [step13, setStep13] = useState([""]);
    const [step14, setStep14] = useState("");

    useEffect(() => {
        if (loggedIn) {
            axios.post('/saveForm', {
                step1: step1,
                step2: step2,
                step3: step3,
                step4: step4,
                step5: step5,
                step6: step6,
                step7: step7,
                step8: step8,
                step9: step9,
                step10: step10,
                step11: step11,
                step12: step12,
                step13: step13,
                step14: step14,
            })
                .then(response => {
                    if (response.status === 200) {
                        // console.log(response);
                    }
                })
                .catch(function (error) {
                    console.log("Error Couldn't save form");
                    console.log(error);
                });
        }
    }, [currentFormStep])


    return <React.Fragment>
        <AllContext.Provider value={{
            currentFormStep, setCurrentFormStep,
            loggedIn, setLoggedIn,
            step1, setStep1,
            step2, setStep2,
            step3, setStep3,
            step4, setStep4,
            step5, setStep5,
            step6, setStep6,
            step7, setStep7,
            step8, setStep8,
            step9, setStep9,
            step10, setStep10,
            step11, setStep11,
            step12, setStep12,
            step13, setStep13,
            step14, setStep14,
            formMessage, setFormMessage,
        }}>

            <FormBackground />
            <div className="desktop-notice">
                <div>
                    Please use our desktop version of the website
                </div>
            </div>
            <Router>
                <Routes>
                    <Route path="/login-form" element={<LoginForm setLoggedIn={setLoggedIn} />} />
                    <Route
                        path="/form/step-1"
                        element={
                            <Protected >
                                <FormStep1 />
                            </Protected>
                        }
                    />
                    <Route
                        path="/form/step-2"
                        element={
                            <Protected   >
                                <FormStep2 />
                            </Protected>
                        }
                    />
                    <Route
                        path="/form/step-3"
                        element={
                            <Protected >
                                <FormStep3 />
                            </Protected>
                        }
                    />
                    <Route
                        path="/form/step-4"
                        element={
                            <Protected >
                                <FormStep4 />
                            </Protected>
                        }
                    />
                    <Route
                        path="/form/step-5"
                        element={
                            <Protected >
                                <FormStep5 />
                            </Protected>
                        }
                    />
                    <Route
                        path="/form/step-6"
                        element={
                            <Protected >
                                <FormStep6 />
                            </Protected>
                        }
                    />
                    <Route
                        path="/form/step-7"
                        element={
                            <Protected >
                                <FormStep7 />
                            </Protected>
                        }
                    />
                    <Route
                        path="/form/step-8"
                        element={
                            <Protected >
                                <FormStep8 />
                            </Protected>
                        }
                    />
                    <Route
                        path="/form/step-9"
                        element={
                            <Protected >
                                <FormStep9 />
                            </Protected>
                        }
                    />
                    <Route
                        path="/form/step-10"
                        element={
                            <Protected >
                                <FormStep10 />
                            </Protected>
                        }
                    />
                    <Route
                        path="/form/step-11"
                        element={
                            <Protected >
                                <FormStep11 />
                            </Protected>
                        }
                    />
                    <Route
                        path="/form/step-12"
                        element={
                            <Protected >
                                <FormStep12 />
                            </Protected>
                        }
                    />

                    <Route
                        path="/form/step-13"
                        element={
                            <Protected >
                                <FormStep13 />
                            </Protected>
                        }
                    />
                    <Route
                        path="/form/step-14"
                        element={
                            <Protected >
                                <FormStep14 />
                            </Protected>
                        }
                    />
                    <Route
                        path="/form/step-15"
                        element={
                            <Protected >
                                <FormSummary />
                            </Protected>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                {loggedIn && <FormNavigation />}
                {loggedIn && currentFormStep !== 15 && <FormStepArrows />}
                {loggedIn && <Logout />}

            </Router>
        </AllContext.Provider>

    </React.Fragment>;
};

ReactDOM.render(<App />, document.getElementById("app"));