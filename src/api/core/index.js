const {Router} = require('express');
const router = Router();

router.use(require('./accessCode'));
router.use(require('./register'));

module.exports = router;