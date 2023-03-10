var express = require('express');
var router = express.Router();
var controller = require('../controllers/device')

/* GET home page. */
router.get('/', controller.list);
router.post('/add', controller.create);
router.post('/edit', controller.update);
router.post('/delete', controller.delete);

module.exports = router;
