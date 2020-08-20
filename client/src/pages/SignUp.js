import React from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../utils/API"


function SignUp() {

    function submitHandler(event) {
        event.preventDefault();
        API.signUp({
            email: event.target.email.value,
            password: event.target.password.value
        })
            .then(() => {
                window.location.replace("/");
            })

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
                    <button type="submit" className="text-center m-2 p-2 bg-yellow-500 rounded-full w-40 self-end">Sign Up</button>
                </form>
                <button onClick={backtoHome} className="text-center m-2 p-2 bg-yellow-500 rounded-full w-40 self-end">Back</button>
            </div>
        </main>
    );
}

export default SignUp;


