import express from 'express';
import passport from 'passport';

const authRouter = express.Router();

authRouter.post('/login', (req, res, next) => {
    passport.authenticate('custom', (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            res.status(401);
            return res.json({ message: 'Invalid credentials' });
        }

        req.login(user, err => err ? next(err) : res.json(user));
    })(req, res, next);
});

authRouter.get('/profile', async (req, res) => {
    res.json(req.user);
});

authRouter.post('/logout', (req, res) => {
    req.logOut();
    res.status(200);
    res.json({ message: 'Success' });
});

export default authRouter;
