import express from 'express';
import {
  getAllUser,
  createUser,
  createExerciseLog,
  getUserLogs,
} from '../controller/userController.js';
const userRouter = express.Router();

//get all user
userRouter.get('/', getAllUser);
//get specify user exercise logs
userRouter.get('/:_id/logs', getUserLogs);
//create user
userRouter.post('/', createUser);
//create exercise log
userRouter.post('/:_id/exercises', createExerciseLog);

export default userRouter;
