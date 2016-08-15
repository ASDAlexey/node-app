const express = require('express');
const authRouter = express.Router();

const router = (nav) => {
    authRouter.post('/signUp', (req, res) => {
        console.log(req.body);
    });
    return authRouter;
};

module.exports = router;
