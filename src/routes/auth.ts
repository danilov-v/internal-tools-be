import express from 'express';
import passport from 'passport';
const authRouter = express.Router();

authRouter.post('/login', function (req, res, next) {
    passport.authenticate('custom', function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            res.status(401);
            return res.json({ message: 'Invalid credentials' });
        }

        req.login(user, function (err) {
            if (err) {
                return next(err);
            }

            res.json(user);
        });
    })(req, res, next);
});

authRouter.post('/logout', function (req, res) {
    req.logOut();
    res.status(200);
    res.json({ message: 'Success' });
});

export default authRouter;
