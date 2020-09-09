import React, { useState } from "react";
import CreateQuestion from "../components/CreateQuestion";
import StoredQuestions from "../components/StoredQuestions";
import SubmitSurvey from "../components/SubmitSurvey";
import CreateSurveyName from "../components/CreateSurveyName";
import PopOut from "../components/PopOut";
import { QuestionProvider } from "../utils/CreateQuestionState";

function CreateSurvey() {
    const [visibility, setVisibility] = useState("invisible");

    function manipulatePopOut() {
        setVisibility("visible");
    };

    return (
        <main className="flex flex-col md:flex-row justify-around m-8">
            <QuestionProvider>
                <PopOut visibility={visibility}/>
                <div className="bg-dark md:w-5/12 md:rounded p-8">
                    <CreateSurveyName />
                    <CreateQuestion />
                </div>
                <div className="bg-dark md:w-5/12 md:rounded p-8">
                    <StoredQuestions />
                    <SubmitSurvey manipulatePopOut={manipulatePopOut}/>
                </div>
            </QuestionProvider>
        </main>
    )
}

export default CreateSurvey;