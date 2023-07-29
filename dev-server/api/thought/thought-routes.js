import express from 'express';
import * as controller from './thought-controller'
import * as auth from '../../services/auth-service'

const apicache = require('apicache');
let cache = apicache.middleware;

const router = express.Router();

router.post('/thought', auth.requireLogin, async (req, res) => {
    await controller.create(req, res);
    apicache.clear('/api/thoughts');
})

router.get('/thought', cache('5 minutes'), controller.index)

router.put('/thought', auth.requireLogin, async (req, res) => {
    await controller.update(req, res);
    apicache.clear('/api/thoughts');
})

router.delete('/thought/:id', auth.requireLogin, async (req, res) => {
    await controller.remove(req, res);
    apicache.clear('/api/thoughts');
})

router.get('/thought/:id', cache('5 minutes'), controller.show)

router.put('/thought/:id/likes', auth.requireLogin, controller.updateLikes)
// no cache for like updates because it modifies server state**

export default router;
