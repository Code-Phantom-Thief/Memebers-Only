const router = require('express').Router();
const {
	registerUser,
	loginUser,
	loggedinUser,
	loggedinMember,
	loggedinAdmin,
	logoutUser,
	membershipStatus,
	adminStatus
} = require('../controllers/authController');

const authFunction = require('../middleware/auth');

router.get('/loggedin', loggedinUser);
router.get('/loggedinmember', loggedinMember);
router.get('/loggedinadmin', loggedinAdmin);
router.get('/logout', logoutUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/membership-status', authFunction,membershipStatus);
router.put('/admin-status', authFunction,adminStatus);

module.exports = router;
