import React from "react";
import CreateQuestion from "../components/CreateQuestion";
import StoredQuestions from "../components/StoredQuestions";
import SubmitSurvey from "../components/SubmitSurvey";
import CreateSurveyName from "../components/CreateSurveyName";
import { QuestionProvider } from "../utils/CreateQuestionState";

function CreateSurvey() {

    return (
        <main className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg">
            <QuestionProvider>
                <CreateSurveyName />
                <CreateQuestion />
                <StoredQuestions />
                <SubmitSurvey />
            </QuestionProvider>
        </main>
    )
}

export default CreateSurvey;