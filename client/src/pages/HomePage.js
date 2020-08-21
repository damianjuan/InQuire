import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import API from '../utils/API';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// ToDo
// make delete button work
// make link for user to copy survey to send

export default function HomePage(props) {
    console.log(props.userEmail);
    const [userSurveys, setUserSurveys] = useState([]);
    const [userEmail, setUserEmail] = useState();

    useEffect(() => {
        //grabs surveys with uuid linked to user
        axios.get('api/get-user-surveys/').then(res => {
            console.log(res);
            if (res.data.length > 0) {
                setUserSurveys(res.data);
                console.log("saved survey info to state");

            } else {
                console.log("no surveys")
            }
        })
        //grabs user email
        axios.get('api/checkAuthentication').then(res => {
            setUserEmail(res.data.user.email)
        })
    }, []);

    function handleDelete(uuid, event) {
        event.preventDefault();
        API.deleteSurvey(uuid);
    }



    console.log(userSurveys);

    return (
        <main className="flex flex-col mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg">
            <header className="bg-green-300 text-center text-4xl p-4 rounded-lg" >
                Welcome {userEmail}
            </header>
            <Link className="m-2 p-2 bg-yellow-500 rounded-full w-40 self-end" to={process.env.PUBLIC_URL + '/create-survey'} >Create New Survey</Link>
            <section>
                <ul>
                    {userSurveys.map(({ survey_name, uuid }) => (
                        <li className="text-center">
                            <p className=" text-4xl p-4 rounded-lg">{survey_name}</p>
                            <CopyToClipboard text={`http://localhost:3000/take-survey/${uuid}`}>
                                <button className="text-center m-2 p-2 bg-yellow-500 rounded-full w-40 self-end">Copy Survey Link</button>
                            </CopyToClipboard>
                            {/* <button onClick="link to take survey" id="takeBtn" className="text-center m-2 p-2 bg-yellow-500 rounded-full w-40 self-end"
                            >Take</button> */}
                            <button onClick="link to view results here" id="result-Btn" className="text-center  m-2 p-2 bg-yellow-500 rounded-full w-40 self-end"
                            >Results</button>
                            <button id="delete-Btn" surveyId={uuid} className="text-center m-2 p-2 bg-yellow-500 rounded-full w-40 self-end" onClick={(event) => { handleDelete(uuid, event) }}>Delete</button>
                        </li>
                    ))}
                </ul>
            </section>

        </main>
    )
}

