import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../utils/API"

function SignUp() {
    const [passwordErrorVis, setPasswordErrorVis] = useState("none");
    const [emailErrorVis, setEmailErrorVis] = useState("none");

    function submitHandler(event) {
        event.preventDefault();
        if (event.target.password.value === event.target.password2.value && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.email.value))) {
            API.signUp({
                email: event.target.email.value,
                password: event.target.password.value
            })
                .then(() => {
                    window.location.replace("/");
                })
        } else if (event.target.password.value !== event.target.password2.value) {
            console.log("Passwords don't match")
            event.target.password.value = "";
            event.target.password2.value = "";
            setPasswordErrorVis("block");
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.email.value))) {
            setEmailErrorVis("block");
        }
    }

    // function backtoHome(event) {
    //     event.preventDefault();
    //     window.location.replace("/");
    // }

    return (
        <main className="bg-dark sm:w-2/3 md:w-1/2 sm:rounded mx-auto my-8 p-8">
            <form className="flex flex-col" onSubmit={submitHandler}>
                <input className="my-4 mx-auto w-2/3 p-1" type="text" name="email" placeholder="Email" />
                <input className="my-4 mx-auto w-2/3 p-1" type="password" name="password" placeholder="Password" />
                <input className="my-4 mx-auto w-2/3 p-1" type="password" name="password2" placeholder="Confirm Password" />
                <button type="submit" className="text-center my-4 mx-auto p-2 bg-light rounded-full w-40">Sign Up</button>
                <p className="text-center text-red-500" style={{ display: passwordErrorVis }}>Passwords don't match. Re-enter password</p>
                <p className="text-center text-red-500" style={{ display: emailErrorVis }}>Incorrect email format. Re-enter email.</p>
            </form>
            {/* <button onClick={backtoHome} className="text-center m-2 p-2 bg-yellow-500 rounded-full w-40 self-end">Back</button> */}
        </main>
    );
}

export default SignUp;


