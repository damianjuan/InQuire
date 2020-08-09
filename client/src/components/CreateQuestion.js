import React, { useRef } from "react";
import { useQuestionContext } from "../utils/CreateQuestionState";
import CreateMultiple from "../components/CreateMultiple";

function CreateQuestion(/*{ handleFieldChange }*/) {
    const questionRef = useRef();
    const answerOneRef = useRef();
    const answerTwoRef = useRef();
    const answerThreeRef = useRef();
    const answerFourRef = useRef();
    const [state, dispatch] = useQuestionContext();
    console.log(state);

    function testDiv(type) {
        switch (type) {
            case "multipleChoice":
            case "selectApply":
                return (
                    <CreateMultiple answerOneRef={answerOneRef} answerTwoRef={answerTwoRef} answerThreeRef={answerThreeRef} answerFourRef={answerFourRef} />
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

        dispatch({
            call: "add",
            question: state.question,
            type: state.type,
            contents: state.contents
        });
    }

    return(
        <form className="flex flex-col p-2 mx-4" onSubmit={addQuestion}>
            <div className="flex flex-col flex-1">
                <label className="flex-1 text-xl mx-auto" ref={questionRef}>
                    Input Prompt:
                    <input className="my-2 w-full" type="text" name="question" />
                </label>
                <label className="flex-1 text-xl mx-auto">
                    Select Question Type: 
                    <select className="my-2" name="type" onChange={(e) => dispatch({call: "change", type: e.target.value})}>
                        <option value="choose">Choose One</option>
                        <option value="multipleChoice">Multiple Choice</option>
                        <option value="selectApply">Select All That Apply</option>
                        <option value="freeResponse">Free Response</option>
                    </select>
                </label>
            </div>
            {testDiv(state[state.length - 1].type)}
            <button className="m-2 p-2 bg-yellow-500 rounded-full w-40 self-end" type="submit">Add Question</button>
        </form>
    );
}

export default CreateQuestion;