import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import generate, { random } from "meaningful-string";

function Main() {    
    const [loginUnauth, setLoginUnauth] = useState("none");
    const [guestErr, setGuestErr] = useState("none");

    function logInHandler(event) {
        event.preventDefault();
        API.logIn({
            email: event.target.email.value,
            password: event.target.password.value
        })
        .then(() => {
            window.location.replace("/home");
            console.log("success");
        })
        .catch(() => {
            setLoginUnauth("block");
        });
    }

    async function guestHandler(e) {
        e.preventDefault();

        // Set guest credentials
        const guest = generate.random({
            "startWith": "User",
            "min": 3,
            "max": 4,
            "onlyNumbers": true,
            "endWith": "@guest.email"
        });
        const guestPW = generate.random();
        
        try {
            // Add guest to database
            await API.signUp({
                email: guest,
                password: guestPW,
                rank: "guest"
            });
        } catch (err) {
            console.error(err);
        } finally {
            // login guest
            await setTimeout(async () => {
                await API.logIn({
                    email: guest,
                    password: guestPW
                });
                window.location.replace("/home");
            }, 150);
        }
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
                <button className="mx-auto my-4 p-2 bg-light rounded-full w-48" onClick={guestHandler}>Continue as Guest</button>
                <Link className="mx-auto my-4 p-2 bg-light rounded-full w-40 text-center" to={process.env.PUBLIC_URL + '/signup'}>Sign Up</Link>
                <p className="text-center text-red-500" style={{ display: loginUnauth }}>Email and password pair not found</p>
                <p className="text-center text-red-500" style={{ display: guestErr }}>Something went wrong! Please try again</p>
            </div>
        </main>
    );
}


export default Main;