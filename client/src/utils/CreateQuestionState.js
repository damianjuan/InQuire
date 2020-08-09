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
            // return [
            //     ...state,
            //     {
            //         id: action.id,
            //         question: action.question,
            //         type: action.type,
            //         contents: action.Contents
            //     }
            // ];
            return state;
        case "change":
            return state.map((item, i) => {
                if (i === (state.length - 1)) {
                    return Object.assign({}, item, {
                        type: action.type
                    });
                }
                return item;
            });
            // const item = state[state.length - 1];
            // const changed = Object.assign(item, {
            //     type: action.type
            // });
            // console.log(changed);
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