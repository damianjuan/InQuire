import React from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
// import API from '../utils/API';

function PublicSurveys({publicSurveys}) {

    return (
        <ul>
            {publicSurveys.map(({ survey_name, uuid }, i) => (
                <li className="" key={i}>
                    <h3 className="text-lightgrey text-3xl my-4 mx-2 rounded-lg">{survey_name}</h3>
                    <div className="flex flex-row items-center my-4">
                        <CopyToClipboard className="text-center mx-2 p-2 bg-light rounded-full w-40" text={`https://inquire-6846.herokuapp.com/take-survey/${uuid}`}>
                            <button>Copy Survey Link</button>
                        </CopyToClipboard>

                        <Link  className="mx-auto mx-2 p-2 bg-light rounded-full w-40 text-center" to={process.env.PUBLIC_URL + `/take-survey/${uuid}`}>Take</Link>
                        
                        {/* <button onClick="link to take survey" id="takeBtn" className="text-center m-2 p-2 bg-light rounded-full w-40 self-end"
                        >Take</button> */}
                        {/* <Link className="mx-auto mx-2 p-2 bg-light rounded-full w-40 text-center" to={process.env.PUBLIC_URL + `/results/${uuid}`}>Results</Link> */}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default PublicSurveys;