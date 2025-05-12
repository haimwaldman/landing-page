import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized');
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, 'secret123');
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).send('Invalid Token');
  }
}
