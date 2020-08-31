const Router = require('express').Router;
const db = require('../models');
const passport = require('../config/passport');
const apiRoutes = Router();
const isAuthenticated = require('../config/middleware/isAuthenticated');

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
apiRoutes.post('/signup', async (req, res) => {
    const signUpdata = db.User.create(req.body);
    res.json(signUpdata);
});
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
apiRoutes.post('/login', passport.authenticate('local'), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json(req.body);
});

// Check if user is currently logged in and return their information
apiRoutes.get("/checkAuthentication", isAuthenticated, (req, res) => {
    const user = req.user ? req.user : null;
    res.status(200).json({
        user: user,
    });
});

//passport built in function to end any active sessions when called 
apiRoutes.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy(function (err) {
        if (err) {
            return next(err);
        }
        return res.send({ success: true });
    });
});

// Route for getting some data about our user to be used client side
apiRoutes.get('/userdata', (req, res) => {
    if (!req.user) {
        res.json({});
    } else {
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    };
});

// Routes for creating surveys

// This route creates a new survey using passed in survey_name and uuid
apiRoutes.post('/create-survey', isAuthenticated, async (req, res) => {
    req.body.survey.UserId = req.user.id || "anonymous";
    const dbTitle = await db.Survey.create(req.body.survey);

    // Creates any number of new survey questions using a passed in array containing multiple objects with
    // Question_title, question_type, and SurveyUuid, for relating it back to the survey it belongs to
    const dbQuestions = await db.Question.bulkCreate(req.body.questions);

    // Creates any number of new survey question answers using a passed in array containing multiple objects with
    // Answer and QuestionId, for relating it back to the question it belongs to
    req.body.answers.map((answer) => {
        answer.QuestionId = dbQuestions[answer.QuestionId].id;
    });
    const dbAnswers = await db.Answer.bulkCreate(req.body.answers);
    res.json({ dbTitle, dbQuestions, dbAnswers });
});

// Routes for getting survey information

// This route takes in a survey Uuid, and returns ALL information related to that survey
// This includes the survey title as well as all questions and answers, including answer count
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

// This route returns all the names with associated uuids of surveys this user has created
apiRoutes.get('/get-user-surveys/', isAuthenticated, async (req, res) => {
    const surveyList = await db.Survey.findAll({

        attributes: [
            'survey_name',
            'uuid'
        ],
        where: {
            userId: req.user.id
        }
    });
    res.send(surveyList);
});

// This route returns recent public surveys
apiRoutes.get('/get-public-surveys/', async (req, res) => {
    const surveyList = await db.Survey.findAll({
        attributes: [
            'survey_name',
            'uuid'
        ],
        where: {
            publicity: "public"
        }
    });
    res.send(surveyList);
})

// This route takes in a survey Uuid and returns that survey's title, all of that survey's question prompts, as well as all 
// answer choices with related answer counts related to each question
apiRoutes.get('/get-answer-count/:uuid', async (req, res) => {
    const answerList = await db.Survey.findAll({
        attributes: [
            'survey_name',
            'uuid'
        ],
        where: {
            uuid: req.params.uuid
        },
        include: [{
            model: db.Question,
            attributes: [
                'id',
                'question_title',
                'question_type'
            ],
            include: [{
                model: db.Answer,
                attributes: [
                    'id',
                    'answer',
                    'count'
                ],
                include: [{
                    model: db.FreeResponse,
                    attributes: [
                        'response'
                    ]
                }]
            }]
        }]
    });
    res.send(answerList);
});

// Routes for modifying survey information

// This put route takes in an array of question ID numbers, ex. [1, 3, 6], and increments the count value in those answer items by 1
apiRoutes.put('/increment-answers', async (req, res) => {
    let dbResponse;
    req.body.map(async (ans) => {
        if (typeof ans === "number") {
            await db.Answer.increment('count', {
                where: {
                    id: ans
                }
            });
        } else {
            await db.Answer.increment('count', {
                where: {
                    id: ans.AnswerId
                }
            });
            dbResponse = await db.FreeResponse.create(ans);
        }
    });
    res.json(dbResponse);
});

//[delete]
//1. delete survey

apiRoutes.delete('/delete/:id', async (req, res) => {
    const options = {
        where: {
            uuid: req.params.id
        }
    };
    const deleteSurvey = await db.Survey.destroy(options);
    res.json(deleteSurvey);
});

module.exports = apiRoutes;
