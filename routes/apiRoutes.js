const Router = require('express').Router;
const db = require("../models");
const passport = require("../config/passport");
const apiRoutes = Router();

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
apiRoutes.post("/signup", async (req, res) => {
    const signUpdata = db.User.create(req.body);
    res.json(signUpdata);
});
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
apiRoutes.post("/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json(req.body);
});
// Route for getting some data about our user to be used client side
apiRoutes.get("/user_data", (req, res) => {
    if (!req.user) {
        res.json({});
    } else {
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    };
});

apiRoutes.delete('/surveys/delete/:id', async (req, res) => {
    const options = {
        where: {
            id: req.params.id
        }
    };
    const deleltebySurveyId = await db.Surveys.destroy(options);
    res.json(deleltebySurveyId);
});

apiRoutes.post('/surveys/create', async (req, res) => {
    const dbSurveys = await db.Surveys.create({
        survey_title: req.body.survey_title,
        UserId: req.user.id
    });
    const dbQuestions = await db.Survey_Questions.create({
        survey_questions: req.body.survey_questions,
        SurveyId: dbSurveys.id
    });
    res.json(dbSurveys);
    res.json(dbQuestions);
});

apiRoutes.get('/surveys/take/:id', async (req, res) => {
    const options = {
        where: {
            id: req.params.id
        },
        include: [db.Survey_Questions]
    };
    const takebySurveyId = await db.Surveys.findAll(options);
    res.json(takebySurveyId);
});

apiRoutes.post('/surveys/result', async (req, res) => {
    const dbResult = await db.Survey_Results.create({
        survey_result: req.body.survey_result,
        SurveyQuestionId: req.body.SurveyQuestionId
    });
    res.json(dbResult);
});

apiRoutes.get('/surveys/result/:id', async (req, res) => {
    const options = {
        where: {
            id: req.params.id
        },
        include: [db.Survey_Questions, db.Survey_Results]
    };
    const getResultbyId = await db.Surveys.findAll(options);
    res.json(getResultbyId);
});

apiRoutes.post

module.exports = apiRoutes;


