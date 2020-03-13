import express from 'express';
import passport from 'passport';
const authRouter = express.Router();

authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

authRouter.post('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
})

export default authRouter;
