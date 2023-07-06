import express from 'express';

const router = express.Router();

router.post('/thought', (req, res) => {
    res.send('post.thoughts - create a thought');
});

router.get('/thoughts', (req, res) => {
    res.send('get.thoughts - get all thoughts');
});

router.get('/thought/:id', (req, res) => {
    const thoughtId = req.params.id;
    res.send(`get.thoughts/${thoughtId} - get thought by id`);
});

router.put('/thought', (req, res) => {
    res.send('put.thoughts - update a thought');
});

router.delete('/thought', (req, res) => {
    res.send('delete.thoughts - delete a thought');
});

export default router;
