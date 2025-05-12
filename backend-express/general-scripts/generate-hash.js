import bcrypt from 'bcryptjs'
const password = 'admin123'; // שנה כאן את הסיסמה לפי הצורך

bcrypt.hash(password, 10)
  .then(hash => {
    console.log('Hashed password:', hash);
  })
  .catch(err => {
    console.error('Error hashing password:', err);
  });
