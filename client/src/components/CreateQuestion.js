import React, { useRef } from "react";
import { useQuestionContext } from "../utils/CreateQuestionState";
import CreateMultiple from "../components/CreateMultiple";

function CreateQuestion() {
    const questionRef = useRef();
    const typeRef = useRef();
    const [state, dispatch] = useQuestionContext();
    const CURRENT_QUESTION = state[0];
    console.log(state, "----", CURRENT_QUESTION);

    function testDiv(type) {
        switch (type) {
            case "multipleChoice":
            case "selectApply":
                return (
                    <CreateMultiple />
                );
            case "freeResponse":
                return (
                    <div className="text-xl">Free response will allow users to submit their own responses.</div>
                );
            default:
                return (
                    <div>Please select a question type.</div>
                )
        }
    }

    function addQuestion(e) {
        e.preventDefault();

        if (CURRENT_QUESTION.question && CURRENT_QUESTION.contents[0] && CURRENT_QUESTION.contents[1]) {
            dispatch({
                call: "add",
                question: CURRENT_QUESTION.question,
                type: CURRENT_QUESTION.type,
                contents: CURRENT_QUESTION.contents
            });

            CURRENT_QUESTION.question = "";
            CURRENT_QUESTION.type = "choose";
            CURRENT_QUESTION.contents = [];
            questionRef.current.value = "";
            typeRef.current.value = "choose";

        } else {
            return console.error("Please fill in all fields");
        }
    }

    return(
        <form className="flex flex-col p-2 mx-4" onSubmit={addQuestion}>
            <div className="flex flex-col flex-1">
                <label className="flex-1 text-xl mx-auto">
                    Input Question:
                    <input className="my-2 w-full" type="text" name="question" ref={questionRef} onChange={(e) => dispatch({call: "change", question: e.target.value})} />
                </label>
                <label className="flex-1 text-xl mx-auto">
                    Select Question Type: 
                    <select className="my-2" name="type" ref={typeRef} onChange={(e) => dispatch({call: "change", type: e.target.value})}>
                        <option value="choose">Choose One</option>
                        <option value="multipleChoice">Multiple Choice</option>
                        <option value="selectApply">Select All That Apply</option>
                        <option value="freeResponse">Free Response</option>
                    </select>
                </label>
            </div>
            {testDiv(CURRENT_QUESTION.type)}
            <button className="m-2 p-2 bg-yellow-500 rounded-full w-40 self-end" type="submit">Add Question</button>
        </form>
    );
}

export default CreateQuestion;