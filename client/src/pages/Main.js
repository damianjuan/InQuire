import React from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../utils/API";

function Main() {

    function logInHandler(event) {
        event.preventDefault();
        API.logIn({
            email: event.target.email.value,
            password: event.target.password.value
        })
        .then(() => {
            window.location.replace("/home");
        });
    }

    return (
        <main className="bg-dark sm:w-2/3 md:w-1/2 sm:rounded mx-auto my-8 p-8">
            <h1 className="pb-4 text-3xl text-lightgrey text-center">Welcome</h1>
            <form className="flex flex-col items-center" onSubmit={logInHandler}>
                <input className="my-4 w-2/3 p-1" type="text" name="email" placeholder="Email" />
                <input className="my-4 w-2/3 p-1" type="password" name="password" placeholder="Password" />
                <button className="mx-auto my-4 p-2 bg-light rounded-full w-40" type="submit">Log In</button>
            </form>
            <div className="flex flex-col mx-auto w-full text-lg">
                {/* <Link className="mx-auto p-2 bg-yellow-500 rounded-full w-40 text-center" to={process.env.PUBLIC_URL + '/create-survey'}>Login as Guest</Link><br /> */}
                <Link className="mx-auto mt-4 p-2 bg-light rounded-full w-40 text-center" to={process.env.PUBLIC_URL + '/signup'}>Sign Up</Link>
            </div>
        </main>
    );
}


export default Main;