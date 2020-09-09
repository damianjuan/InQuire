import React from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useQuestionContext } from "../utils/CreateQuestionState";
import { v4 as uuidv4 } from 'uuid';
import API from "../utils/API";

function PopOut({ visibility }) {
    const [state] = useQuestionContext();
    console.log(state);
    const uuid = uuidv4();

    function submitClick(e) {
        e.preventDefault();

        let answers = [];
        const questions = state.questions.map((questionItem, i) => {
            questionItem.SurveyUuid = uuid;
            questionItem.contents.forEach((answer) => {
                if (answer) {
                    const item = { answer };
                    item.QuestionId = i;
                    answers.push(item);
                }
            });
            delete questionItem.id;
            delete questionItem.contents;
            return questionItem;
        });

        API.publish(
            state.user,
            {
                publicity: state.publicity,
                survey_name: state.survey_title,
                uuid: uuid,
            },
            questions,
            answers
        );
            
        window.location.replace("/home");
    }
    
    return(
        <section className={`${visibility} absolute flex flex-col items-center h-2/3 w-2/3 bg-grey self-center p-4`}>
            <h2 className="text-3xl m-4">Please Copy These Links!</h2>
            <p className="text-2xl m-4">As a guest user these links will only be available to you once!</p>
            <CopyToClipboard className="text-center mx-2 p-2 bg-light rounded-full w-40 m-4" text={`https://inquire-6846.herokuapp.com/take-survey/${uuid}`}>
                <button>Copy Survey Link</button>
            </CopyToClipboard>
            <CopyToClipboard className="mx-auto mx-2 p-2 bg-light rounded-full w-40 text-center m-4" text={`https://inquire-6846.herokuapp.com/results/${uuid}`}>
                <button>Results Link</button>
            </CopyToClipboard>
            <button className="mx-auto p-2 bg-light rounded-full w-40 self-end m-4" onClick={submitClick} type="button">Publish Survey</button>
        </section>
    );
}

export default PopOut;