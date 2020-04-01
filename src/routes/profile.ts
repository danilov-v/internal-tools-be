import express from 'express';

const profileRouter = express.Router();

profileRouter.get('/profile', async (req, res) => {
    res.json(req.user);
});

export default profileRouter;
