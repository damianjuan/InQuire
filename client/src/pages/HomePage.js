import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import API from '../utils/API';
import YourSurveys from "../components/YourSurveys";
import PublicSurveys from "../components/PublicSurveys";

// ToDo
// make button for user to copy survey to clipboard use whatever the current host is 

export default function HomePage() {
    const [userSurveys, setUserSurveys] = useState([]);
    const [publicSurveys, setPublicSurveys] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    // const [linkStart, setLinkStart] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const yourSurveys = await API.getUserSurveys();
            const { user } = await API.checkAuth();
            const othersSurveys = await API.getPublicSurveys();

            setUserSurveys(yourSurveys);
            setCurrentUser(user);
            setPublicSurveys(othersSurveys);
        };
        fetchData();
    }, []);

    return (
        <main className="flex flex-col md:flex-row justify-around m-8">
            <div className="flex flex-col bg-dark md:w-5/12 md:rounded p-8">
                <h2 className="text-center text-lightgrey text-3xl mb-4 rounded-lg">
                    Welcome {currentUser.email ? currentUser.email.split("@")[0] : currentUser.email} <br />Your Surveys
                </h2>

                <Link className="self-end my-4 p-2 bg-light rounded-full w-40" to={process.env.PUBLIC_URL + '/create-survey'} >Create New Survey</Link>
                
                <YourSurveys userSurveys={userSurveys} />
            </div>

            <div className="bg-dark md:w-5/12 md:rounded p-8">
                <h2 className="text-center text-lightgrey text-3xl mb-4 rounded-lg">
                    Public Surveys
                </h2>
                <PublicSurveys publicSurveys={publicSurveys} />
            </div>

        </main>
    )
}

