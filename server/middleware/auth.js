const jwt = require('jsonwebtoken');
const JWT_ACCESSTOKEN_SECRET =
	process.env.JWT_ACCESSTOKEN_SECRET;

const authFunction = (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token)
			return res.status(401).json({
				message: 'Sorry, you are not authorized.',
            });
        
        const verify = jwt.verify(token, JWT_ACCESSTOKEN_SECRET);
        req.user = verify.user;

        next();
	} catch (error) {
		res
			.status(401)
			.json({ message: 'Sorry, you are not authorized.' });
	}
};

module.exports = authFunction;
