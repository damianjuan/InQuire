import axios from "axios";

export default {
    signUp: function (userdata) {
        return axios.post("/api/signup", userdata);
    },

    logIn: function (userdata) {
        return axios.post("/api/login", userdata);
    },

    publish: async function (survey, questions, answers) {
        await axios.post("/api/create-survey", survey);
        await axios.post("/api/create-survey-question", questions);

        const { data } = await axios.get(`/api/get-survey-questions/${survey.uuid}`);
        answers.map((item) => {
            item.QuestionId = data[item.QuestionId].id;
        });
        await axios.post("/api/create-question-answer", answers);

        return console.log("Survey Published!");
    },

    getSurveyById: async function (uuid) {
        const { data } = await axios.get(`/api/get-survey/${uuid}`);

        return data[0];
    }
};
