import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../utils/API"

function SignUp() {
    const [passwordErrorVis, setPasswordErrorVis] = useState("hidden");
    const [emailErrorVis, setEmailErrorVis] = useState("hidden");

    function submitHandler(event) {
        event.preventDefault();
        setPasswordErrorVis("hidden");
        setEmailErrorVis("hidden");
        if (event.target.password.value === event.target.password2.value && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.email.value))) {
            API.signUp({
                email: event.target.email.value,
                password: event.target.password.value
            })
                .then(() => {
                    window.location.replace("/");
                })
        } else if (event.target.password.value !== event.target.password2.value) {
            console.log("passwords dont match")
            event.target.password.value = "";
            event.target.password2.value = "";
            setPasswordErrorVis("visible");
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.email.value))) {
            setEmailErrorVis("visible");
        }
    }

    function backtoHome(event) {
        event.preventDefault();
        window.location.replace("/");
    }

    return (
        <main className="mx-auto my-4 p-8 w-5/6 bg-gray-300 text-xl">
            <div className="signUpWrap">
                <form onSubmit={submitHandler}>
                    <input className="my-2 w-3/6" type="text" name="email" placeholder="Email" />
                    <br></br>
                    <input className="my-2 w-3/6" type="password" name="password" placeholder="Password" />
                    <br></br>
                    <input className="my-2 w-3/6" type="password" name="password2" placeholder="Confirm Password" />
                    <br></br>
                    <button type="submit" className="text-center m-2 p-2 bg-yellow-500 rounded-full w-40 self-end">Sign Up</button>
                    <p style={{ visibility: passwordErrorVis, color: "red" }}>Passwords don't match. Re-enter password</p>
                    <p style={{ visibility: emailErrorVis, color: "red" }}>Incorrect email format. Re-enter email.</p>
                </form>
                {/* <button onClick={backtoHome} className="text-center m-2 p-2 bg-yellow-500 rounded-full w-40 self-end">Back</button> */}
            </div>
        </main>
    );
}

export default SignUp;


