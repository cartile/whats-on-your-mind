import express from 'express';
import * as controller from './thought-controller'
import * as auth from '../../services/auth-service'
const router = express.Router();

router.post('/thought', auth.requireLogin, controller.create)

router.get('/thought', controller.index)

router.get('/thought/:id', controller.show)

router.put('/thought', auth.requireLogin, controller.update)

router.delete('/thought', auth.requireLogin, auth.requireLogin, controller.remove)

export default router;
