import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GeneralFormWrapper from "../components/GeneralFormWrapper";
import AllContext from "../contexts/AllContext"

const FormStep10 = () => {
    const { step10, setStep10 } = useContext(AllContext);

    const setSingleDataPoint = (e, id) => {
        let tempObj = [...step10]
        tempObj[id].checked = !tempObj[id].checked
        setStep10(tempObj)
    }

    return <GeneralFormWrapper title={"Example question ?"}
        tip={"Example description ?"}
        formClass="step-10"
    >
        <div className="container">
            <div className="row">
                <div className="col-1"></div>
                {step10.map((value, index) => <div className="col-2" onClick={(e) => { setSingleDataPoint(e, index) }}>
                    {value.dataPoint == "email" ?
                        <React.Fragment>
                            <i className={`fa-solid fa-envelope ${value.checked ? "active" : ""}`} ></i>
                            <p>Email</p>
                        </React.Fragment>
                        :
                        value.dataPoint == "phone" ?
                            <React.Fragment>
                                <i className={`fa-solid fa-phone ${value.checked ? "active" : ""}`} ></i>
                                <p>Phone</p>
                            </React.Fragment>
                            :
                            value.dataPoint == "text" ?
                                <React.Fragment>
                                    <i className={`fa-solid fa-comment-dots ${value.checked ? "active" : ""}`} ></i>
                                    <p>Text message</p>
                                </React.Fragment>
                                :
                                value.dataPoint == "socialMedia" ?
                                    <React.Fragment>
                                        <i className={`fa-solid fa-hashtag ${value.checked ? "active" : ""}`} ></i>
                                        <p>Social media</p>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <i className={`fa-solid fa-people-arrows-left-right ${value.checked ? "active" : ""}`}></i>
                                        <p>Face-to-face</p>
                                    </React.Fragment>
                    }
                </div>)
                }
                <div className="col-1"></div>
            </div>
        </div>

    </GeneralFormWrapper >
};

export default FormStep10;




