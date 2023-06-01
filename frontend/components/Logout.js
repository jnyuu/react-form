import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';

const Logout = ({ }) => {

    const [logout, setLogout] = useState(false);

    const Logout = () => {
        // axios.post('http://localhost:3000/logout')
        // axios.post("http://" + window.location.hostname + '/logout')
        axios.post('/logout')
            // axios.post("https://" + window.location.hostname + ':3000/logout')
            .then(response => {

                if (response.status === 200) {
                    console.log("Logged out succesfully");
                    setLogout(true)
                    window.location.reload(false);
                }

            })
            .catch(function (error) {
                console.log("Couldn't log out");
                console.log(error);
            });
    }

    return (
        <React.Fragment>
            <button onClick={Logout} className="logout-button">LOGOUT</button>
        </React.Fragment>

    );
}


export default Logout;