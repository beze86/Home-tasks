import path from 'path';

import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';

// eslint-disable-next-line import/order
import database from './Database';

config();

import { protectedRoute } from './middlewares/authMiddleware';
import areaRoutes from './routes/area';
import contactRoutes from './routes/contact';
import taskRoutes from './routes/task';
import userRoutes from './routes/user';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/areas', protectedRoute, areaRoutes);
app.use('/api/v1/contacts', protectedRoute, contactRoutes);
app.use('/api/v1/tasks', protectedRoute, taskRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

(async () => {
  await database.dbConnect();
  let port = process.env.PORT;
  if (!port) {
    port = 8000;
  }
  app.listen(port);
})();
