import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import AllContext from "../contexts/AllContext"
import ReadAndSetForm from "../components/ReadAndSetForm";

const Protected = ({ children }) => {

    const [loading, setLoading] = useState(true);
    const { loggedIn, setLoggedIn, setCurrentFormStep } = useContext(AllContext);

    useEffect(() => {

        axios.post('/login/initial-cookie-check')
            // axios.post("https://" + window.location.hostname + ':3000/login/initial-cookie-check')
            .then(response => {

                if (response.status === 200) {
                    const tempStepNumber = window.location.pathname.split('-')[1]
                    setCurrentFormStep(parseInt(tempStepNumber))
                    setLoggedIn(true)
                }
                setLoading(false)

            })
            .catch(function (error) {
                setLoading(false)
                console.log(error);
            });

    }, [])
    return (
        <React.Fragment>
            {loading ? <div>LOADING</div>
                :
                loggedIn
                    ?
                    <React.Fragment>
                        <ReadAndSetForm></ReadAndSetForm>
                        {children}
                    </React.Fragment>
                    :
                    <Navigate to="/login-form" replace />}

        </React.Fragment>

    );
}


export default Protected;