import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import contentRoutes from './routes/content.routes.js';
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
