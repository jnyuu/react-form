import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import AllContext from "../contexts/AllContext";

const ReadAndSetForm = (props) => {

    const [loading, setLoading] = useState(false);
    const { loggedIn,
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
    } = useContext(AllContext);


    useEffect(() => {

        // axios.post('http://localhost:3000/readICPForm')
        // axios.post("http://" + window.location.hostname + '/readICPForm')
        axios.post('/readForm')
            // axios.post("https://" + window.location.hostname + ':3000/readICPForm')
            .then(response => {

                if (response.status === 200) {
                    console.log(response);
                    setStep1(response.data.step1)
                    setStep2(response.data.step2)
                    setStep3(response.data.step3)
                    setStep4(response.data.step4)
                    setStep5(response.data.step5)
                    setStep6(response.data.step6)
                    setStep7(response.data.step7)
                    setStep8(response.data.step8)
                    setStep9(response.data.step9)
                    setStep10(response.data.step10)
                    setStep11(response.data.step11)
                    setStep12(response.data.step12)
                    setStep13(response.data.step13)
                    setStep14(response.data.step14)
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [])

    return <React.Fragment></React.Fragment>
};

export default ReadAndSetForm;