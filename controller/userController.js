import User from '../model/userModel.js';
import Log from '../model/logModel.js';

//create user
export const createUser = async (req, res, next) => {
  const { username } = req.body;
  try {
    const newUser = await User.create({ username });
    return res.status(200).json(newUser);
  } catch (err) {
    next(err);
  }
};

//create exercise log
export const createExerciseLog = async (req, res, next) => {
  const { duration, date, description } = req.body;
  const { _id } = req.params;
  try {
    const log = await Log.create({ duration, description, date });
    const updateUser = await User.findByIdAndUpdate({ _id }, { $push: { log: log._id } });
    return res.status(200).json({
      _id: updateUser._id,
      username: updateUser.username,
      duration: log.duration,
      description: log.description,
      date: log.date.toDateString(),
    });
  } catch (err) {
    next(err);
  }
};

//get all user
export const getAllUser = async (req, res, next) => {
  try {
    const allUser = await User.find();
    return res.status(200).json(allUser);
  } catch (err) {
    next(err);
  }
};

//get user's log
export const getUserLogs = async (req, res, next) => {
  const { _id } = req.params;
  const from = req.query.from || new Date(0);
  const to = req.query.to || new Date();
  const limit = Number(req.query.limit) || 0;
  try {
    const userWithLogs = await User.findById({ _id })
      .populate({
        path: 'log',
        match: { date: { $gte: from, $lte: to } },
        options: { limit },
        select: '-__v -_id',
      })
      .exec();
    // convert date to String
    const newLogs = userWithLogs.log.map((each) => {
      return {
        description: each.description,
        duration: each.duration,
        date: each.date.toDateString(),
      };
    });
    return res.status(200).json({
      _id: userWithLogs._id,
      username: userWithLogs.username,
      from: new Date(from).toDateString(),
      to: new Date(to).toDateString(),
      count: newLogs.length,
      log: newLogs,
    });
  } catch (err) {
    next(err);
  }
};
