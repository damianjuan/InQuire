import React, { createContext, useReducer, useContext, useState } from "react";

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
        default:
            return state;
    }
}

function QuestionProvider({ value, ...props}) {
    const [state, dispatch] = useReducer(reducer, []);
    // console.log(state);
    // console.log(dispatch);
    // console.log("value", value);

    return <Provider value={[value, dispatch]} {...props} />;
}

function useQuestionContext() {
    return useContext(QuestionContext);
}

export { QuestionProvider, useQuestionContext };