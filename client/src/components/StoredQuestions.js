import React from "react";
import DisplayMultiple from "../components/DisplayMultiple";
import { useQuestionContext } from "../utils/CreateQuestionState";

function StoredQuestions() {
    const [state, dispatch] = useQuestionContext();
    console.log("state ---- ", state);

    function displayType({ id, type, contents }) {
        console.log("----", type, "----", contents);

        switch (type) {
            case "multipleChoice":
                return (
                    <DisplayMultiple id={id} contents={contents}/>
                );
            default:
                return(
                    <div></div>
                )
        }
    }

    return (
        <ul className="flex flex-col p-2 mx-4">
            {state.map((item, i) => (
                <li className="flex flex-col flex-1 mb-2" key={item.id}>
                    <label className="flex flex-col flex-1 text-xl my-2">
                        {i > 0 ? `${i}:  ` : `${state.length}:  `} {item.question}
                        {displayType(item)}
                    </label>
                </li>
            ))}
        </ul>
    );
}

export default StoredQuestions;