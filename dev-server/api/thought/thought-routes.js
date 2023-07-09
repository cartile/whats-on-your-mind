import express from 'express';
import * as controller from './thought-controller'
const router = express.Router();

router.post('/thought', controller.create)

router.get('/thought', controller.index)

router.get('/thought/:id', controller.show)

router.put('/thought', controller.update)

router.delete('/thought', controller.remove)

export default router;
