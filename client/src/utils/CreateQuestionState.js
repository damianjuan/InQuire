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
            return state.map((item, i) => {
                if (i === 0) {
                    if (action.question_type) {
                        if (action.question_type === "freeResponse") {
                            item.contents = ["Free Response"];
                        } else {
                            item.contents = [];
                        }
                        item.question_type = action.question_type;
                    } else if (action.question_title) {
                        item.question_title = action.question_title;
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

function QuestionProvider({ value = [{ id: "", question_title: "", question_type: "choose", contents: [] }], ...props}) {
    const [state, dispatch] = useReducer(reducer, value);

    return <Provider value={[state, dispatch]} {...props} />;
}

function useQuestionContext() {
    return useContext(QuestionContext);
}

export { QuestionProvider, useQuestionContext };