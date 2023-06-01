import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import GeneralFormWrapper from "../components/GeneralFormWrapper"
import AllContext from "../contexts/AllContext";
import { Navigate, useSearchParams } from "react-router-dom";
const LoginForm = (props) => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { formMessage, loggedIn, setLoggedIn } = useContext(AllContext);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setLoading(true)

        if (searchParams.get("username") && searchParams.get("password")) {
            const body = {
                username: searchParams.get("username"),
                password: searchParams.get("password")
            };
            // axios.post('http://localhost:3000/login', body)
            // axios.post("http://" + window.location.hostname + '/login', body)
            axios.post('/login', body)
                // axios.post("https://" + window.location.hostname + ':3000/login', body)
                .then(response => {
                    setLoading(false)
                    console.log(response);
                    if (response.status === 200) {
                        setLoggedIn(true)
                    }
                })
                .catch(function (error) {
                    setLoading(false)
                    console.log(error);
                });
        } else {
            // axios.post('http://localhost:3000/login/initial-cookie-check')
            axios.post('/login/initial-cookie-check')
                // axios.post("http://" + window.location.hostname + '/login/initial-cookie-check')
                // axios.post("https://" + window.location.hostname + ':3000/login/initial-cookie-check')
                .then(response => {
                    if (response.status === 200) {
                        setLoggedIn(true)
                    }
                    setLoading(false)
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false)

                });
        }
        // console.log(window.location.hostname);

    }, [])


    const setLoginCustom = (e) => {
        setLogin(e.target.value)
    }
    const setPasswordCustom = (e) => {
        setPassword(e.target.value)
    }

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = {
            username: login,
            password: password
        };

        setLoading(true)
        // axios.post('http://localhost:3000/login', body)
        // axios.post("http://" + window.location.hostname + '/login', body)
        axios.post('/login', body)
            // axios.post("https://" + window.location.hostname + ':3000/login', body)
            .then(response => {
                setLoading(false)
                console.log(response);
                if (response.status === 200) {
                    setLoggedIn(true)
                }
            })
            .catch(function (error) {
                setLoading(false)
                console.log(error);
            });
    };

    return <React.Fragment>
        {loading ? <div>LOADING</div>
            :
            loggedIn
                ?
                <Navigate to="/form/step-1" replace />
                :
                <GeneralFormWrapper title={"REACT FORM"} tip={""} formMessage={formMessage} onSubmit={handleSubmit}
                    formClass="login-form">
                    <div className="form-field-wrapper ">
                        <input type="text" placeholder="login" value={login} onChange={setLoginCustom} />
                    </div>
                    <div className="form-field-wrapper ">
                        <input type="password" placeholder="password" value={password} onChange={setPasswordCustom} />
                    </div>
                    <input type="submit" value="Log In" />
                </GeneralFormWrapper>
        }
    </React.Fragment>
        ;
};

export default LoginForm;

