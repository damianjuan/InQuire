import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import API from '../utils/API';
import YourSurveys from "../components/YourSurveys";
import PublicSurveys from "../components/PublicSurveys";

// ToDo
// make button for user to copy survey to clipboard use whatever the current host is 

export default function HomePage(props) {
    const [userSurveys, setUserSurveys] = useState([]);
    const [userEmail, setUserEmail] = useState();
    // const [linkStart, setLinkStart] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const userSurveys = await API.getUserSurveys();
            const { data } = await API.checkAuth();

            setUserSurveys(userSurveys);
            setUserEmail(data.user.email);
        };
        fetchData();
        //grabs surveys with uuid linked to user
        // setLinkStart(process.env.PUBLIC_URL);
        // console.log(stuff);
        // axios.get('api/get-user-surveys/').then(res => {
        //     if (res.data.length > 0) {
        //         setUserSurveys(res.data);
        //         console.log("saved survey info to state");

        //     } else {
        //         console.log("no surveys");
        //     }
        // })
        //grabs user email
        
        // axios.get('api/checkAuthentication').then(res => {
        //     setUserEmail(res.data.user.email);
        // })
    }, []);

    return (
        <main className="flex flex-col bg-dark sm:w-2/3 lg:w-1/2 sm:rounded mx-auto my-8 p-8">
            <header className="text-center text-lightgrey text-3xl mb-4 rounded-lg">
                Welcome {userEmail}
            </header>

            <Link className="self-end my-4 p-2 bg-light rounded-full w-40" to={process.env.PUBLIC_URL + '/create-survey'} >Create New Survey</Link>
            
            <YourSurveys userSurveys={userSurveys} />

            <PublicSurveys />

        </main>
    )
}

