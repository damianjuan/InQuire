import React from "react";
import DisplayMultipleChoice from "../components/DisplayMultipleChoice";
import DisplaySelectMultiple from "../components/DisplaySelectMultiple"
import { useQuestionContext } from "../utils/CreateQuestionState";

function StoredQuestions() {
    const [state, dispatch] = useQuestionContext();

    function displayType({ id, question_type, contents }) {

        switch (question_type) {
            case "multipleChoice":
                return (
                    <DisplayMultipleChoice id={id} contents={contents} />
                );
            case "selectApply":
                return (
                    <DisplaySelectMultiple id={id} contents={contents} />
                );
            case "freeResponse":
                return (
                    <input className="m-4" type="text" name="response" />
                )
            default:
                return(
                    <div></div>
                )
        }
    }

    return (
        <ul className="flex flex-col mb-4 text-lightgrey">
            {state.questions.map((item, i) => (
                <li className="flex flex-col flex-1 rounded hover:bg-light hover:text-black p-4" key={i} name={item.id}>
                    <label className="flex flex-col flex-1 text-2xl my-2">
                        {i + 1}:  {item.question_title}
                        {displayType(item)}
                    </label>
                </li>
            ))}
        </ul>
    );
}

export default StoredQuestions;