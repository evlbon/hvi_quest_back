const {Router} = require('express');
const router = Router();

router.use(require('./login'));
router.use(require('./status'));

module.exports = router;