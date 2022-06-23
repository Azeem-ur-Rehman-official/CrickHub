const router = require('express').Router();
const commentCtrl = require('../controllers/discusionFormController');

router.get('/comments', commentCtrl.getComments);

module.exports = router;
