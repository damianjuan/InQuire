import React, { useState } from "react";
import API from "../utils/API"

function SignUp() {
    const [passwordErrorVis, setPasswordErrorVis] = useState("none");
    const [passwordLengthVis, setPasswordLengthVis] = useState("none");
    const [emailErrorVis, setEmailErrorVis] = useState("none");

    function submitHandler(event) {
        event.preventDefault();

        // Check each condition, email format, password length, and password matching
        // individually in regards to displaying error messages

        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.email.value))) {
            setEmailErrorVis("block");
        } else {
            setEmailErrorVis("none");
        }
        
        if (event.target.password.value.length < 6) {
            console.log(event.target.password.value);
            event.target.password.value = "";
            event.target.password2.value = "";
            setPasswordLengthVis("block");
        } else {
            setPasswordLengthVis("none");
        }
        
        if (event.target.password.value !== event.target.password2.value) {
            event.target.password.value = "";
            event.target.password2.value = "";
            setPasswordErrorVis("block");
        } else {
            setPasswordErrorVis("none");
        }

        // Check conditions together to decide whether to make API call

        if ((/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.email.value)) && event.target.password.value.length >= 6 && event.target.password.value === event.target.password2.value) {
            API.signUp({
                email: event.target.email.value,
                password: event.target.password.value
            })
            .then((res) => {
                window.location.replace("/");
            })
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
                <p className="text-center text-red-500" style={{ display: passwordLengthVis }}>Password must contain at least 6 characters</p>
                <p className="text-center text-red-500" style={{ display: emailErrorVis }}>Incorrect email format. Re-enter email.</p>
            </form>
            {/* <button onClick={backtoHome} className="text-center m-2 p-2 bg-yellow-500 rounded-full w-40 self-end">Back</button> */}
        </main>
    );
}

export default SignUp;


