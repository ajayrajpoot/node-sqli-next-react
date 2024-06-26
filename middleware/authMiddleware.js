
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Get the token from the request headers
    const authHeader = req.headers.authorization || req.headers.Authorization; 
  
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
  }

    const token = authHeader.split(' ')[1]

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    } 
    const SECRET_KEY = process.env.SECRET_KEY || 'test';  
    // Verify the token
    jwt.verify(token, SECRET_KEY , (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized: Invalid token', err });
    } else {
      // Attach the decoded user information to the request object
      req.user = decoded;
      console.log("decoded---", decoded)
      req.user = decoded.UserInfo 
      next(); // Continue to the next middleware or route handler
    }
  });
}

module.exports = authMiddleware;
