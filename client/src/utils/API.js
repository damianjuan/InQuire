import axios from "axios";

export default {
    signUp: function (userdata) {
        return axios.post("/api/signup", userdata);
    },

    logIn: function (userdata) {
        return axios.post("/api/login", userdata);
    },

    publish: async function (survey, question) {
        console.log(survey, "---", question);
        await axios.post("/api/create-survey", survey);
        const questionIDs = await axios.post("/api/create-survey-question", question);
        console.log(questionIDs);
        return console.log("Survey Published!");
    }
};
