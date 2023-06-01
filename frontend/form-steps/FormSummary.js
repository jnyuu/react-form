import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"
import axios from "axios"

const FormSummary = () => {
    const { loggedIn, step1, setStep1,
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
    } = useContext(AllContext);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const submitForm = (e) => {
        e.preventDefault()
        if (loggedIn) {
            const body = {
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
                step14: step14
            }
            console.log(body);
            // axios.post('http://localhost:3000/submitICPForm', {
            // axios.post("http://" + window.location.hostname + '/submitICPForm', body)
            axios.post('/submitForm', body)
                // axios.post("https://" + window.location.hostname + ':3000/submitICPForm', body)
                .then(response => {
                    if (response.status === 200) {
                        console.log(response);
                        setErrorMessage("")
                        setSuccessMessage(response.data.message)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    setErrorMessage("Error when submiting, please try again")
                    setSuccessMessage("")
                });
        }
    }

    // const testRequest = () => {
    //     if (loggedIn) {
    //         axios.post('http://localhost:3000/test', {
    //             username: "123",
    //             password: "xdxd",
    //             step1: step1,
    //             step2: step2,
    //             step3: step3,
    //             step4: step4,
    //             step5: step5,
    //             step6: step6,
    //             step7: step7,
    //             step8: step8,
    //             step9: step9,
    //             step10: step10,
    //             step11: step11,
    //             step12: step12,
    //             step13: step13,
    //             step14: step14,
    //         })
    //             .then(response => {
    //                 if (response.status === 200) {
    //                     console.log(response);
    //                     console.log(response.data.message);
    //                 }
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //     }
    // }


    return <GeneralFormWrapper title={"Form summary"}
        tip={"Feel free to go back to any of the steps and view your inputs, if you are done then just submit the form by pressing the button below. You can always go back, change your inputs, and submit the form again."}
        formClass="step-summary">
        <input onClick={(e) => { submitForm(e) }} type="submit" value="Submit" />
        <p className="error-message">{errorMessage}</p>
        <p className="success-message">{successMessage}</p>
        {/* <button onClick={(e) => { testRequest() }}>EZ</button> */}
    </GeneralFormWrapper>
};

export default FormSummary;





