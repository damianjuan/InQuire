import React, { createContext, useReducer, useContext } from "react";

const QuestionContext = createContext({
    survey_title: "",
    current_question: {
        question_title: "",
        question_type: "",
        contents: []
    },
    questions: []
});
const { Provider } = QuestionContext;

function reducer(state, action) {
    switch (action.call) {
        case "changeSurveyTitle":
            return Object.assign({}, state, {
                survey_title: action.survey_title
            });
        case "changeType":
            if (action.question_type === "freeResponse") {
                return Object.assign({}, state, {
                    current_question: {
                        question_title: state.current_question.question_title,
                        question_type: action.question_type,
                        contents: ["Free Response"]
                    }
                })
            } else {
                return Object.assign({}, state, {
                    current_question: {
                        question_title: state.current_question.question_title,
                        question_type: action.question_type,
                        contents: []
                    }
                });
            }
        case "changeQuestion":
            return Object.assign({}, state, {
                current_question: {
                    question_title: action.question_title,
                    question_type: state.current_question.question_type,
                    contents: state.current_question.contents
                }
            });
        case "changeAnswer":
            const contentsArr = [...state.current_question.contents];
            contentsArr[action.slot] = action.answer;
            return Object.assign({}, state, {
                current_question: {
                    question_title: state.current_question.question_title,
                    question_type: state.current_question.question_type,
                    contents: contentsArr
                }
            });
        case "add":
            return Object.assign({}, state, {
                current_question: {
                    question_title: "",
                    question_type: "choose",
                    contents: []
                },
                questions: [
                    ...state.questions,
                    {
                        id: state.questions.length * Math.random(),
                        question_title: action.question_title,
                        question_type: action.question_type,
                        contents: action.contents
                    }
                ]
            })
        default:
            return state;
    }
}

function QuestionProvider({ value = { survey_title: "", current_question: { question_title: "", question_type: "choose", contents: [] }, questions: [] }, ...props}) {
    const [state, dispatch] = useReducer(reducer, value);

    return <Provider value={[state, dispatch]} {...props} />;
}

function useQuestionContext() {
    return useContext(QuestionContext);
}

export { QuestionProvider, useQuestionContext };