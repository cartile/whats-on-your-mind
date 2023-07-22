import express from 'express';
const router = express.Router();
import * as controller from './user-controller'

router.get('/user', controller.index);

router.get('/user/:id', controller.show)


export default router;
