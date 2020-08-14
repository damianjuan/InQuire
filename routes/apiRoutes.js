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
apiRoutes.get("/userdata", (req, res) => {
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
    const dbTitle = await db.Survey.create(req.body);
    res.json(dbTitle);
});
apiRoutes.post('/create-survey-question', async (req, res) => {
    const dbQuestions = await db.Question.bulkCreate(req.body);
    res.json(dbQuestions);
});
apiRoutes.post('/create-question-answer', async (req, res) => {
    const dbAnswers = await db.Answer.bulkCreate(req.body);
    res.json(dbAnswers);
});

apiRoutes.get('/get-survey/:uuid', async (req, res) => {
    const survey = await db.Survey.findAll({
        where: {
            uuid: req.params.uuid
        },
        include: [{
            model: db.Question,
            include: db.Answer
        }]
    });
res.send(survey);
});
apiRoutes.get('/get-survey-questions/:uuid', async (req, res) => {
    const surveyQuestions = await db.Question.findAll({
        where: {
            SurveyUuid: req.params.uuid
        }
    });
    res.send(surveyQuestions);
});
apiRoutes.get('/get-question-answers/:id', async (req, res) => {
    const questionAnswers = await db.Answer.findAll({
        where: {
            QuestionId: req.params.id
        }
    });
    res.send(questionAnswers);
});

//[delete]
//1. delete survey

apiRoutes.delete('/delete/:id', async (req, res) => {
    const options = {
        where: {
            uuid: req.params.id
        }
    };
    const delelteSurvey = await db.Survey.destroy(options);
    res.json(delelteSurvey);
});


//[get]
//1. get survey & question info for rendering take-survey page.
apiRoutes.get('/take-survey/:id', async (req, res) => {
    const options = {
        where: {
            uuid: req.params.id
        },
        include: [db.Question]
    };
    const takeSurvey = await db.Survey.findAll(options);
    res.json(takeSurvey);
});

//2. get answer info for rendering results-survey page
apiRoutes.get('/results/:id', async (req, res) => {
    const options = {
        where: {
            uuid: req.params.id
        },
        include: [db.Question, db.Answer]
    };
    const getResult = await db.Survey.findAll(options);
    res.json(getResult);
});



module.exports = apiRoutes;


