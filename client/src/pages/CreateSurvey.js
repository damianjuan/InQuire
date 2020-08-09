import React/*, { useState }*/ from "react";
import CreateQuestion from "../components/CreateQuestion";
import { QuestionProvider } from "../utils/CreateQuestionState";
import StoredQuestions from "../components/StoredQuestions";

function CreateSurvey() {
    // const [questionState, setQuestionState] = useState({
    //     question: "",
    //     type: "multipleChoice",
    //     contents: []
    // });

    // function handleFieldChange(e) {
    //     switch (e.target.name) {
    //         case "type":
    //             questionState.type = e.target.value;
    //             break;
    //         case "question":
    //             questionState.question = e.target.value;
    //             break;
    //         case "0":
    //         case "1":
    //         case "2":
    //         case "3":
    //             questionState.contents[parseInt(e.target.name)] = e.target.value;
    //             break;            
    //         default:
    //             return console.error("invalid field");
    //     }

    //     setQuestionState({
    //         ...questionState
    //     });
    // }

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