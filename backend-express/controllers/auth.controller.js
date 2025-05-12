import db from '../utils/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;
  await db.read();
  const user = db.data.user;

  if (!user || user.email !== email) {
    return res.status(401).send('Invalid credentials');
  }

  const validPass = await bcrypt.compare(password, user.passwordHash);
  if (!validPass) return res.status(401).send('Invalid credentials');

  const token = jwt.sign({ email }, 'secret123', { expiresIn: '2h' });
  res.send({ token });
};
