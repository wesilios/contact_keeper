import express, { Application, Request, Response, NextFunction } from 'express';
import connectDB from './config/db';

const path = require('path');
const app: Application = express();
// Connect DB
connectDB();

// Init Middleware
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
  res.json({ message: 'Hello Wolrd' })
);

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static asset in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Development Server: http://localhost:${PORT}`)
);
