import express, { Application, Request, Response, NextFunction } from 'express';
import connectDB from './config/db';

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Development Server: http://localhost:${PORT}`)
);
