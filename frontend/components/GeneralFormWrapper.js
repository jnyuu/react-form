import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";


const GeneralFormWrapper = (props) => {
    const { children, title, onSubmit, tip, formMessage, formClass } = props;


    return <div className="form-wrapper">
        <div className={`form-inner-wrapper ` + formClass}  >

            <form onSubmit={onSubmit} >
                <div className="form-logo-wrapper">
                    <img height="110" src="/img/SS-logo-no-letters.png" alt="logo" className="form-logo" />
                </div>
                <h1 className="form-title">{title}</h1>
                <p className="tip">{tip}</p>
                <h2 class="message-box" style={{ color: "#F7C600" }}>{formMessage}</h2>
                {children}
            </form>
        </div>
    </div>;
};

export default GeneralFormWrapper;




