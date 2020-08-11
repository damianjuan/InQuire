import axios from "axios";

export default {
    signUp: function (userdata) {
        return axios.post("/api/signup", userdata);
    },
    logIn: function (userdata) {
        return axios.post("/api/login", userdata);
    }
};
