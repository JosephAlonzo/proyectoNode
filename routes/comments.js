var express = require('express');
const CommentsController = require('../Controllers/CommentController');
var router = express.Router();

router.get('/show/:id', CommentsController.show);
router.post('/add', CommentsController.add);

module.exports = router;