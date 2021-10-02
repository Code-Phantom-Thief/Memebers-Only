const router = require('express').Router();
const {
	getAllMessage,
	getMessage,
	createMessage,
	updateMessage,
	deleteMessage,
} = require('../controllers/messageController');

const authFunction = require('../middleware/auth');

router.get('/', getAllMessage);
router.post('/', authFunction,createMessage);
router.put('/', authFunction,updateMessage);
router.delete('/', authFunction, deleteMessage);

router.get('/:id', authFunction,getMessage);
router.put('/:id', authFunction,updateMessage);
router.delete('/:id', authFunction,deleteMessage);

module.exports = router;
