import React, { useState } from "react";
import CreateQuestion from "../components/CreateQuestion";
import { QuestionProvider } from "../utils/CreateQuestionState";

function CreateSurvey() {
    const [questionState, setQuestionState] = useState({
        question: "",
        type: "multipleChoice",
        contents: []
    });

    function handleTypeChange(e) {
        questionState.type = e.target.value;        

        setQuestionState({
            ...questionState
        });
    }

    return (
        <main className="mx-auto my-4 p-4 w-5/6 bg-gray-300">
            <form>
                <label className="text-xl m-2 block">
                    Survey Name: 
                    <input className="my-2 w-full" type="text" name="surveyName" />
                </label>
            </form>
            <QuestionProvider value={questionState}>
                <CreateQuestion handleTypeChange={handleTypeChange}/>
            </QuestionProvider>
        </main>
    )
}

export default CreateSurvey;