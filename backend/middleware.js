import 'dotenv/config';
import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied: token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: 'Access Denied', error: error.message });
  }
};

export default authenticateToken;
