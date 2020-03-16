import express from 'express';
import passport from 'passport';
const authRouter = express.Router();

authRouter.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (!user) {
            res.status(401);
            return res.json({ message: info.message });
        }

        res.sendStatus(205);
    })(req, res, next);
});
//
// authRouter.post('/login', passport.authenticate('local', { failureFlash: true }),
//     function (req, res) {
//         res.sendStatus(205);
//     });

authRouter.post('/logout', function (req, res) {
    req.logOut();
    res.sendStatus(205);
});

export default authRouter;
