import React from "react";
import { Link, useLocation } from "react-router-dom";

function SignUp() {
    return (
        <main className="mx-auto my-4 p-8 w-5/6 bg-gray-300 text-xl">
            <div>
                <input className="my-2 w-3/6" type="text" name="prompt" placeholder="Email" />
            </div>
            <div>
                <input className="my-2 w-3/6" type="text" name="prompt" placeholder="Password" />
            </div>
            <div>
                <Link to={process.env.PUBLIC_URL + '/'}>Sign Up</Link>
            </div>
        </main>
    );
}

export default SignUp;


