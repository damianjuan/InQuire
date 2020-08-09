import React, { createContext, useReducer, useContext } from "react";

const QuestionContext = createContext({
    id: "",
    question: "",
    type: "",
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
                    question: action.question,
                    type: action.type,
                    contents: action.Contents
                }
            ];
            return state;
        case "change":
            return state.map((item, i) => {
                if (i === 0) {
                    if (action.type) {
                        item.type = action.type;
                    } else if (action.question) {
                        item.question = action.question;
                    } else if (action.choice) {
                        item.contents[action.slot] = action.choice;
                    }
                }
                return item;
            });
        default:
            return state;
    }
}

function QuestionProvider({ value = [{ id: "", question: "", type: "choose", contents: [] }], ...props}) {
    const [state, dispatch] = useReducer(reducer, value);

    return <Provider value={[state, dispatch]} {...props} />;
}

function useQuestionContext() {
    return useContext(QuestionContext);
}

export { QuestionProvider, useQuestionContext };