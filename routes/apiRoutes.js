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

apiRoutes.post('/create-survey', async (req, res) => {
    console.log("survey --- ", req.body);
    // const dbTitle = await db.Survey.create(req.body);
    // res.json(dbTitle);
    res.end();
});
apiRoutes.post('/create-survey-question', async (req, res) => {
    console.log("question --- ", req.body);
    // const dbQuestion = await db.Question.create({
    //     question_title: req.body.question_title,
    //     question_type: req.body.question_type,
    //     SurveySurveyUuid: req.body.survey_uuid
    // });
    // res.json(dbQuestion);
    res.end();
});
apiRoutes.post('/create-question-answer', async (req, res) => {
    console.log("answer --- ", req.body);
    // const dbAnswers = await db.Answer.create({
    //     answer: req.body.answer
    // });
    // res.json(dbAnswers);
    res.end();
});

apiRoutes.delete('/delete-survey/:id', async (req, res) => {
    const options = {
        where: {
            survey_uuid: req.params.id
        }
    };
    const deleltebySurveyId = await db.SurveyTitle.destroy(options);
    res.json(deleltebySurveyId);
});


apiRoutes.get('/take-survey/:id', async (req, res) => {
    const options = {
        where: {
            survey_uuid: req.params.id
        },
        include: [db.SurveyQuestion]
    };
    const takebySurveyId = await db.SurveyTitle.findAll(options);
    res.json(takebySurveyId);
});

apiRoutes.post('/results', async (req, res) => {
    const dbResult = await db.SurveyResult.create({
        survey_result: req.body.survey_result,
    });
    res.json(dbResult);
});

apiRoutes.get('/results/:id', async (req, res) => {
    const options = {
        where: {
            survey_uuid: req.params.id
        },
        include: [db.SurveyQuestion, db.SurveyResult]
    };
    const getResultbyId = await db.SurveyTitle.findAll(options);
    res.json(getResultbyId);
});

apiRoutes.post

module.exports = apiRoutes;


