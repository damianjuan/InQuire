import React from "react";
import CreateQuestion from "../components/CreateQuestion";
import StoredQuestions from "../components/StoredQuestions";
import SubmitSurvey from "../components/SubmitSurvey";
import CreateSurveyName from "../components/CreateSurveyName";
import { QuestionProvider } from "../utils/CreateQuestionState";

function CreateSurvey() {

    return (
        <main className="flex flex-col md:flex-row justify-around m-8">
            <QuestionProvider>
                <div className="bg-dark md:w-5/12 lg:w-1/3 md:rounded p-8">
                    <CreateSurveyName />
                    <CreateQuestion />
                </div>
                <div className="bg-dark md:w-5/12 lg:w-1/3 md:rounded p-8">
                    <StoredQuestions />
                    <SubmitSurvey />
                </div>
            </QuestionProvider>
        </main>
    )
}

export default CreateSurvey;