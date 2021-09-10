
import express from 'express';
import fileupload from 'express-fileupload';
import userRouter from '@app/backend/src/routes/user';
import postRouter from '@app/backend/src/routes/post';
import { registerUser, loginUser } from '@app/backend/src/controllers/user';
import { tokenMiddleware } from '@app/backend/src/middlewares/auth';
import { cors } from '@app/lib/src/middlewares/cors';

const app = express();
app.use(express.json());
app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use('/users', tokenMiddleware, fileupload(), userRouter);
app.post('/login', loginUser);
app.post('/register', registerUser);
app.use('/posts',  tokenMiddleware, fileupload(), postRouter);

// Make sure this is the last middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof Error) {
    res.status(500).json({err: 'Something went wrong'});
  }
  else {
    next();
  }
});

export default app;
