import React, { createContext, useReducer, useContext } from "react";

const QuestionContext = createContext({
    id: "",
    question_title: "",
    question_type: "",
    contents: []
});
const { Provider } = QuestionContext;

function reducer(state, action) {
    switch (action.call) {
        case "add":
            return [
                ...state,
                {
                    id: state.length * Math.random(),
                    question_title: action.question_title,
                    question_type: action.question_type,
                    contents: action.contents
                }
            ];
        case "change":
            console.log(state, action);
            return state.map((item, i) => {
                if (i === 0) {
                    if (action.type === "selectType") {
                        action.question_type === "freeResponse" ? item.contents = ["Free Response"] : item.contents = [];
                        item.question_type = action.question_type;
                    } else if (action.type === "question") {
                        item.question_title = action.question_title;
                    } else if (action.type === "answer") {
                        action.choice === "" ? item.contents[action.slot] = undefined : item.contents[action.slot] = action.choice;
                    }
                }
                return item;
            });
        default:
            return state;
    }
}

function QuestionProvider({ value = [{ id: "", question_title: "", question_type: "choose", contents: [] }], ...props}) {
    const [state, dispatch] = useReducer(reducer, value);

    return <Provider value={[state, dispatch]} {...props} />;
}

function useQuestionContext() {
    return useContext(QuestionContext);
}

export { QuestionProvider, useQuestionContext };