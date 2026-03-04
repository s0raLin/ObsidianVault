import express from 'express';

export const router = express.Router();

export default router;

router.get('/home', (req, res) => {
    res.send('home');
});
