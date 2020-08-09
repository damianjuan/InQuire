import React from "react";
import CreateQuestion from "../components/CreateQuestion";
import { QuestionProvider } from "../utils/CreateQuestionState";
import StoredQuestions from "../components/StoredQuestions";

function CreateSurvey() {

    return (
        <main className="mx-auto my-4 p-4 w-5/6 bg-gray-300">
            <form>
                <label className="text-xl m-2 block">
                    Survey Name: 
                    <input className="my-2 w-full" type="text" name="surveyName" />
                </label>
            </form>
            <QuestionProvider>
                <StoredQuestions />
                <CreateQuestion />
            </QuestionProvider>
        </main>
    )
}

export default CreateSurvey;